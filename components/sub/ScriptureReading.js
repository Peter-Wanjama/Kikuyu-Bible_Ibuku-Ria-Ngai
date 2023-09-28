import { Clipboard, FlatList, RefreshControl, SafeAreaView, Share, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import kikuyubibledb from "../../assets/kikuyubibledb";
import React, { useLayoutEffect,useCallback, useContext, useState } from "react";
import { BibleContext } from "../../contexts/BibleContext";
import Ionic from "react-native-vector-icons/Ionicons";
import Swiper from "react-native-swiper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../../config/colors";

export default function ScriptureReading({ navigation }) {
    const { book, chapter, verse, setBible, darkThemeOn } = useContext(BibleContext);
    const styles = StyleSheet.create({
        wrapper: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        container: {
            flex: 1,
            backgroundColor:darkThemeOn?colors.dark:colors.light,
        },
        item: {
            //backgroundColor: '#f9c2ff',
            marginVertical: 8,
            marginHorizontal: 8,
        },
        title: {
            fontSize: 20,
            fontFamily: 'RegularFont',
            color:darkThemeOn?colors.light:colors.black,
        },
        verseHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        verseHeaderText: {
            color: '#BB5C04',
            fontFamily: 'MediumFont',
            fontSize: 16,
        },
        verseOptions: {
        },
        verseOptionsText: {
            color: '#BB5C04',
        }
    });
    myRef = React.useRef(null);
    ref2 = React.useRef(null);
    
    const [showMoreTools, setShowMoreTools] = useState(false)
    const [currentItem, setCurrentItem] = useState(-1)
    const [favorites, setFavorites] = useState([]);

    const getMoreIcons = (item, b, c) => {
        console.log('more ' + item.v)
        //ref2.current?.
        return (<View style={{ flexDirection: 'row', backgroundColor: 'red' }}><Text>Hello</Text><Text>{b} {c}:{item.v}</Text></View>);
    }
    const saveToFavorites = async (item, book, chapter) => {
        console.log('Storing...')
        const id = ('favorites-' + (book + chapter + item.v)).replace(/\s/g, '');
        setFavorites([...favorites,id]);
        const obj = { book: book, chapter: chapter, verse: item.v };
        console.log('obj...')
        console.log(obj)
        await AsyncStorage.setItem(id, JSON.stringify(obj), (err) => {
            if (err) {
                console.log("an error");
                throw err;
            }
            console.log("success saving..."+id);
        }).catch((err) => {
            console.log("saving error is: " + err);
        });
    };
    const deleteItem = async (item, book, chapter) => {
        const id = ('favorites-' + (book + chapter + item.v)).replace(/\s/g, '');
        console.log("Deleting..." + id)
        var x=favorites; x=x.filter((i)=>i!=id); setFavorites(x);
        await AsyncStorage.removeItem(id)
    }
    
    const handleMore=(id)=>{
        console.log('Handling more...'+id)
        if (showMoreTools&&currentItem!=id) {
            setCurrentItem(id);
        }else{
        setShowMoreTools(!showMoreTools)
        setCurrentItem(id);
        }
    }
    const shareVerse= async (msg)=>{
    try {
        await Share.share({
            message:msg,
            title:'Share verse',
        })
    } catch (error) {
        console.log("ERROR SHARING:"+error)
    }
    }
    const Verse = ({ item, b, c }) => (
        <View style={styles.item}>
            <View style={styles.verseHeader}>
                <Text style={styles.verseHeaderText}>{b} {c}:{item.v}</Text>
                <View style={{ flexDirection: 'row' }}>
                    { showMoreTools&&currentItem==item.v?
                    <View style={{ flexDirection: 'row', marginRight: 10, paddingRight: 20 }}>
                        <TouchableOpacity onPress={() => {
                            Clipboard.getString() === item.t ? '' : Clipboard.setString(b+" "+c+":"+item.v+"\n"+item.t);
                            ToastAndroid.show("Copied", ToastAndroid.SHORT)
                        }}><Ionic style={{ marginRight: 8 }} name="copy-outline" color={'#BB5C04'} size={20} /></TouchableOpacity>
                        {favorites.includes(('favorites-' + (b + c + item.v)).replace(/\s/g, '')) ?
                        <TouchableOpacity onPress={() => deleteItem(item, b, c)}><Ionic style={{ marginRight: 8 }} name="heart" color={'#BB5C04'} size={20} /></TouchableOpacity>
                        :<TouchableOpacity onPress={() => saveToFavorites(item, b, c)}><Ionic style={{ marginRight: 8 }} name="heart-outline" color={'#BB5C04'} size={20} /></TouchableOpacity>
                        }
                        <TouchableOpacity onPress={()=>shareVerse(b+" "+c+":"+item.v+"(Ibuku rĩa Ngai)\n"+item.t)}><Ionic style={{ marginRight: 8 }} name="share-social-outline" color={'#BB5C04'} size={20} /></TouchableOpacity>
                    </View> : null
                    }
                    <TouchableOpacity onPress={()=>handleMore(item.v)} style={[styles.verseOptions, { marginLeft: 10 }]} ref={ref2}><Ionic name="ellipsis-horizontal" color={'#BB5C04'} size={20} /></TouchableOpacity>
                </View>
            </View>
            <Text style={styles.title}>{item.t}</Text>
        </View>
    );

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setBible({book:book, chapter:chapter, verse:1});
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);
    useLayoutEffect(() => {
        AsyncStorage.getAllKeys((err, keys) => {
            var x = []
            keys.forEach((key) => {
                if (key.startsWith('favorites')) {
                    x.push(key)
                }
            })
            setFavorites(x);
        });
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            
            <Swiper showPagination={true} showsButtons={false} loop={false} index={chapter - 1} dot={<View></View>} activeDot={<View></View>} onIndexChanged={(i) => { navigation.setOptions({ title: book + ' ' + (i + 1), }); }} loadMinimal={true} loadMinimalSize={1}>
                {
                    Object.keys(kikuyubibledb[book][0]).map(function (element, key) {
                        return (<View key={key}>
                            <FlatList
                                ref={(ref) => myRef = ref}
                                key={key}
                                data={kikuyubibledb[book][0][element]}
                                initialScrollIndex={(chapter - 1) === key ? (verse > 4 ? Math.abs(verse - 3) : verse - 1) : 0}
                                renderItem={({ item }) => <Verse item={item} b={book} c={element} />}
                                keyExtractor={item => item.v}
                                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                            />
                        </View>)
                    })

                }
            </Swiper>

        </SafeAreaView>
    );
}
