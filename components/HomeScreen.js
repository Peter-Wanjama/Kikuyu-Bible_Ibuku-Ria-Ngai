import { useContext, useLayoutEffect, useRef, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, ToastAndroid } from "react-native";
import Ionic from 'react-native-vector-icons/Ionicons';
import ActionSheet from "react-native-actions-sheet";
// import kikuyubibledb from "../assets/tempbible";
import kikuyubibledb from "../assets/kikuyubibledb";
import { BibleContext } from "../contexts/BibleContext";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function HomeScreen({navigation}) {
    const [favoriteVerse,setFavoriteVerse]=useState({book:'',chapter:1,verse:1});
    const BibleBooks = Object.keys(kikuyubibledb);
    const fetchAllItems = async () => {
        console.log("Fetching data...")
        try {
            await AsyncStorage.getAllKeys((err, keys) => {
                AsyncStorage.multiGet(keys, (err, stores) => {
                    stores.map((result, i, store) => {
                        let key = store[i][0];
                        let value = store[i][1];
                        // console.log("Key-" + key)
                        // console.log("Value-" + value)
                        if (key.startsWith('favorites')) {
                            v = JSON.parse(value)
                            setFavoriteVerse(v[(Math.floor(Math.random() * Object.keys(v).length) + 1)]);
                        }
                    });
                    console.log(favoriteVerse.length + ' items:' + favoriteVerse);
                });
            });
        } catch (error) {
            console.log("ERROR FETCHING:" + error)
        }
    }
    
    useLayoutEffect(()=>{fetchAllItems();},[])
    var text=kikuyubibledb[BibleBooks[favoriteVerse.book]][0][favoriteVerse.chapter][favoriteVerse.verse][0].t;
    console.log(text)
    const {setBible}=useContext(BibleContext);
    const [data, setData] = useState([]);
    const [testament, setTestament] = useState('');
    const bibleSheet = useRef(null);
    const [bibleselected] = useState({
        bookSet: '',
        chapterSet: 0,
        verseSet: 0
    });
    const [prepared, setPrepared] = useState('');
    const resetBible=()=>{
        setData([]); bibleselected.bookSet = ''; bibleselected.verseSet = 0;
        bibleselected.chapterSet = 0; bibleSheet.current?.hide();
    }
    const displayVerse = (value) => {
        setBible({book:bibleselected.bookSet,chapter:bibleselected.chapterSet,verse:bibleselected.verseSet});
        // console.log(kikuyubibledb['Thama'][0][1][0].t)
        console.log(kikuyubibledb[bibleselected.bookSet][0][bibleselected.chapterSet][bibleselected.verseSet - 1].t);
        /* let v = bibleselected.bookSet + " " + bibleselected.chapterSet + "." + bibleselected.verseSet + "\n" +
            kikuyubibledb[bibleselected.bookSet][0][bibleselected.chapterSet][bibleselected.verseSet - 1].t;
        setData([v]); */
        resetBible();ToastAndroid.show('Please wait...',ToastAndroid.LONG);
        navigation.navigate('ScriptureReading');
    }
    const handleVerse = (value) => {
        console.log(bibleselected.chapterSet);
        setPrepared(prepared + " " + value);
        setData((Object.keys(kikuyubibledb[bibleselected.bookSet][0][bibleselected.chapterSet])).map(function (x) {
            return parseInt(x) + 1;
        }));
    }
    const handleChapter = (value) => {
        console.log(bibleselected.bookSet);
        setPrepared(value);
        setData((Object.keys(kikuyubibledb[bibleselected.bookSet][0])).map(function (x) {
            return parseInt(x);
        }));
    }
    const handleBible = (value) => {
        setTestament(value);
        switch (value) {
            case 'OT':
                console.log("OT");
                setPrepared('Kirikaniro Gikũrũ');
                setData(Object.keys(kikuyubibledb).slice(0, 39));
                bibleSheet.current?.show();
                break;

            case 'NT':
                console.log("NT");
                setPrepared('Kirikaniro Kĩerũ');
                setData(Object.keys(kikuyubibledb).slice(-27));
                // console.log(data.length);
                bibleSheet.current?.show();
                break;

            default:
                break;
        }

    }
    return (
            <View style={styles.container}>
                <View style={styles.appBody}>
                    <Image style={styles.logo} source={require('.././assets/logo.png')} />
                    <View style={styles.dailyVerseBody}>
                        <Text style={styles.dailyVerseHeader}>Daily Verse</Text>
                        <TouchableOpacity onPress={()=>{ToastAndroid.show('Please wait...',ToastAndroid.LONG); setBible({book:'Thaburi',chapter:14,verse:7}); navigation.navigate('ScriptureReading');}}>
                            <Text style={styles.dailyVerseText}>{text}</Text>
                        </TouchableOpacity>
                        <View style={styles.dailyVerseFooter}>
                            <Text style={styles.dailyVerseRef}>{BibleBooks[favoriteVerse.book]} {favoriteVerse.chapter}:{favoriteVerse.verse}</Text>
                            <View style={styles.footerTools}>
                                <TouchableOpacity style={{ paddingRight: 15 }}>
                                    <Ionic name="heart-outline" color={"#BB5C04"} size={30} />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Ionic name="share-social-outline" color={"#BB5C04"} size={30} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.bibleSection}>
                        <TouchableOpacity>
                            <Text style={styles.startReading}>Start Reading</Text>
                        </TouchableOpacity>
                        <View style={styles.testamentsSection}>
                            <TouchableOpacity onPress={() => { handleBible('OT'); }}>
                                <Text style={styles.testaments}>Kirikaniro Gikũrũ</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { handleBible('NT'); }}>
                                <Text style={styles.testaments}>Kirikaniro Kĩerũ</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ActionSheet ref={bibleSheet} onClose={() => { resetBible();}} >
                        <View style={styles.bibleSheetView}>

                            <TouchableOpacity style={styles.divider} onPress={() => bibleSheet.current?.hide()}></TouchableOpacity>

                            {

                                <TouchableOpacity style={styles.bibleSheetViewHeader}>
                                    <Text style={styles.bibleSheetViewHeaderText}>{prepared}</Text>
                                </TouchableOpacity>

                            }<View style={styles.dividerBottom}></View>

                            <ScrollView horizontal={false} vertical={true} style={{ flex: 1 }}>
                                <View style={(bibleselected.bookSet === '' ? styles.booksList : styles2.booksList)}>
                                    {

                                        data.map(function (key, index) {
                                            //console.log(key);
                                            return (<TouchableOpacity onPress={() => {
                                                if (bibleselected.bookSet) {
                                                    if (bibleselected.chapterSet) {
                                                        if (!bibleselected.verseSet) {
                                                            bibleselected.verseSet = key; displayVerse(key);
                                                        }

                                                    } else {
                                                        bibleselected.chapterSet = key; handleVerse(key);
                                                    }

                                                }
                                                else { bibleselected.bookSet = key; handleChapter(key); }

                                            }} key={key} style={(bibleselected.bookSet === '' ? styles1.bookListItem : (bibleselected.verseSet? styles.bookListItem: styles2.bookListItem))}>
                                                <Text style={(bibleselected.bookSet === '' ? styles1.bookListItemText : (bibleselected.verseSet? styles.bookListItemText: styles2.bookListItemText))}>{key}</Text>
                                            </TouchableOpacity>);
                                        })
                                    }
                                </View>
                            </ScrollView>
                        </View>
                    </ActionSheet>
                </View>
            </View>
        );
}

const styles1 = StyleSheet.create({
    bookListItem: {
        padding: 5,
        margin: 2,
        borderColor: 'rgba(211,211,211,1)',
        borderRadius: 2,
        borderWidth: 0.1,
    },
    bookListItemText: {
        fontSize: 20,
        fontFamily: 'RegularFont',
    },
    booksList: {
        flex: 1,
        //height: 100,
        marginTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        //backgroundColor:'#f55',
        justifyContent: 'space-evenly'
    },
});
const styles2 = StyleSheet.create({
    bookListItem: {
        padding: 7,
        margin: 5,
        borderColor: 'rgba(211,211,211,1)',
        //borderColor: '#f2a',
        borderRadius: 1,
        borderWidth: 0.1,
        width: 45,
        height: 40,
        alignItems: 'center',
    },
    bookListItemText: {
        fontSize: 20,
        fontFamily: 'MediumFont',
    },
    booksList: {
        flex: 1,
        //height: 100
        marginTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        //backgroundColor:'#f55',
        justifyContent: 'flex-start'
    }
});

const styles = StyleSheet.create({
    bibleSheetView: {
        //flex:1,
        height: 380,
    },
    divider: {
        backgroundColor: '#d3d3d3',
        width: 50,
        height: 3,
        borderRadius: 3,
        alignSelf: 'center',
        marginBottom: 10,
        marginTop: 15,
    },
    dividerBottom:{
        backgroundColor: '#d3d3d3',
        width: '150%',
        height: 1,
        borderRadius: 3,
        alignSelf: 'center',
        marginBottom: 5,
        marginTop: 5,
    },
    bibleSheetViewHeader: {
        alignSelf: 'center',
        padding:5,
    },
    bibleSheetViewHeaderText: {
        fontFamily: 'SemiBoldFont',
        fontSize: 20,
    },
    booksList: {
        flex: 1,
        //height: 100,
        marginTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        //backgroundColor:'#f55',
        justifyContent: 'space-evenly'
    },
    bookListItem: {
        padding: 5,
        margin: 2,
        borderColor: 'rgba(211,211,211,1)',
        borderRadius: 2,
        borderWidth: 0.1,
    },
    bookListItemText: {
        fontSize: 20,
        fontFamily: 'RegularFont',
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    appBody: {
        flex: 1,
    },
    appHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 15,
        paddingLeft: 15,
    },
    appName: {
        fontFamily: 'BoldFont',
        //paddingRight: 10,
    },
    logo: {
        alignSelf: 'center',
        marginTop: 15,
    },
    dailyVerseBody: {
        borderRadius: 5,
        borderColor: '#eee',
        borderWidth: 1,
        margin: 10,
        marginTop: 15,
        flexDirection: 'column',
    },
    dailyVerseHeader: {
        borderColor: '#eee',
        borderWidth: 1,
        padding: 5,
        fontFamily: 'BoldFont',
        textAlign: 'center',
        fontSize: 22,
    },
    dailyVerseRef: {
        fontFamily: 'BoldFont',
        fontSize: 18,
    },
    dailyVerseText: {
        padding: 10,
        fontFamily: 'RegularFont',
        fontSize: 22,
    },
    dailyVerseFooter: {
        borderColor: '#eee',
        borderWidth: 1,
        paddingLeft: 5,
        fontFamily: 'RegularFont',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    footerTools: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 5,
        justifyContent: 'space-around'
    },
    footerToolsIcons: {
        margin: 10,
    },
    bibleSection: {
        borderRadius: 5,
        borderColor: '#eee',
        borderWidth: 1,
        margin: 10,
        flexDirection: 'column',
        flexWrap: 'wrap',
    },
    startReading: {
        fontFamily: 'BoldFont',
        textAlign: 'center',
        fontSize: 15,
        padding: 5,
    },
    testamentsSection: {
        borderRadius: 5,
        borderColor: '#eee',
        borderWidth: 1,
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    testaments: {
        backgroundColor: '#BB5C04',
        borderRadius: 5,
        borderColor: '#eee',
        borderWidth: 1,
        color: '#fff',
        padding: 16,
        letterSpacing: 1,
        fontFamily: 'RegularFont',
        fontSize: 16,
    }
});