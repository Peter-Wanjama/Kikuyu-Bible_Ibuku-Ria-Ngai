import Checkbox from "expo-checkbox";
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";
import Ionic from "react-native-vector-icons/Ionicons";
import { useContext, useEffect, useState } from "react";
import kikuyubibledb from "../../assets/kikuyubibledb";
import { BibleContext } from "../../contexts/BibleContext";
import colors from "../../config/colors";

function BibleSearch() {
    return (
        <View>
            <Text>This is for Bible Search</Text>
        </View>
    )
}
function NotesSearch() {
    return (
        <View><Text>This is for Note Search</Text></View>
    )
}
export default function SearchPage({navigation}) {
    const {setBible,darkThemeOn}=useContext(BibleContext);
    const styles = StyleSheet.create({
        item: {
            //backgroundColor: '#f9c2ff',
            marginVertical: 2,
            marginHorizontal: 2,
        },
        title: {
            fontSize: 16,
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
        searchResults: {
            
        },
        list:{
            paddingBottom:140
        },
        container: { 
            flex: 1, 
            backgroundColor:darkThemeOn?colors.dark:colors.light,
            // justifyContent: 'center', 
            // alignItems: 'center' 
        },
        specialCharacters: {
            marginLeft: 10,
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        spI: {
            fontSize: 20,
            fontFamily: 'OldBoldFont',color:darkThemeOn?colors.light:colors.black,
        },
        spU: {
            fontSize: 20,
            fontFamily: 'OldBoldFont',color:darkThemeOn?colors.light:colors.black,
        },
        searchBox: {
            flex: 4,
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            height: 40,
            marginLeft: 8,
            marginVertical: 8,
            borderWidth: 1,
            borderRadius: 3,
            borderColor: '#d3d3d3',
        },
        searchIcon: {
            marginRight: -5,
        },
        searchInput: {
            marginLeft: -5,
            color:darkThemeOn?colors.light:colors.black,
        },
        searchResults: {
            padding: 5,
        },
        searchScope: {
            flexDirection: 'row',
            marginLeft: 5,
        },
        OT: {
            flexDirection: 'row',
        },
        NT: {
            marginLeft: 10,
            marginRight: 10,
            flexDirection: 'row',
        }
    });

    
    const [loading, setLoading] = useState(false);
    const [selectOT, setSelectOT] = useState(true);
    const [selectNT, setSelectNT] = useState(true);
    const [results, setResults] = useState(0);
    const [searchText, setSearchText] = useState('');

    const [DATA, setData] = useState([]);
    onSelectionsChange = (items) => {
        setSelectedTestament(items);
    }

    const handleSearch = () => {
        setTimeout(() => { setLoading(false) }, 3000);// turn off activity progress after 10s
        text = searchText;//setSearchText(text);.replace(/\s/g, '');/[^a-zA-Z0-9 ]/g Nake Jesũ agĩkũra
        text = text.replace(/[^a-zA-Zĩũ ]/g, ""); text = text.trim();
        if (searchText.length > 1) {
            setData([]); setResults(0)
            setLoading(true);
            console.log("Searching...");

            //
            

            var tempResults = [];
            (selectOT ? (selectNT ? Object.keys(kikuyubibledb) : Object.keys(kikuyubibledb).slice(0, 39)) : selectNT ? Object.keys(kikuyubibledb).slice(-27) : Object.keys(kikuyubibledb)).map((k, i) => {
                Object.keys(kikuyubibledb[k][0]).map((kk, ii) => {
                    Object.keys(kikuyubibledb[k][0][kk]).map((kkk, iii) => {
                        if ((kikuyubibledb[k][0][kk][kkk].t).search(new RegExp(text, 'i')) >= 0) {
                            tempResults.push({ id: k + kk + kkk+(kikuyubibledb[k][0][kk][kkk].t).slice(0,3), book: k, chapter: kk, verse: kkk })
                        }
                    })
                })
            })
            setResults(tempResults.length);
            setData(tempResults);
            //console.log(DATA)

            //

        } //console.log(text + ' ' + text.length)
    }
    const Verse = ({ item }) => (
        <View style={styles.item}>
            <View style={styles.verseHeader}>
                <Text style={styles.verseHeaderText}>{item.book} {item.chapter}:{item.verse- -1}</Text>
            </View>
            <TouchableOpacity onPress={()=>{ToastAndroid.show('Please wait',ToastAndroid.SHORT);setBible({book:item.book,chapter:item.chapter,verse:item.verse});navigation.navigate('ScriptureReading')}}><Text style={styles.title}>{kikuyubibledb[item.book][0][item.chapter][item.verse].t}</Text></TouchableOpacity>
        </View>
    );
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}><View style={styles.specialCharacters}>
                <TouchableOpacity onPress={() => setSearchText(searchText + 'ĩ')}><Text style={styles.spI}>ĩ</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setSearchText(searchText + 'ũ')}><Text style={styles.spU}>ũ</Text></TouchableOpacity>
            </View>
                <View style={styles.searchBox}>
                    <TextInput style={styles.searchInput} cursorColor={colors.brown} value={searchText} onChangeText={(text) => setSearchText(text)} placeholderTextColor={darkThemeOn?colors.coollight:colors.warmgrey} placeholder="Type text here to search" />

                    <TouchableOpacity onPress={handleSearch}><Ionic style={styles.searchIcon} name={'search-outline'} color={'#a5a5a5'} size={20} /></TouchableOpacity>
                </View>
                {loading ? <ActivityIndicator color={'#BB5C04'} /> : null}
                <View style={styles.searchScope}>
                    <View style={styles.OT}><Checkbox color={'#BB5C04'} disabled={false} value={selectOT} onValueChange={() => setSelectOT(!selectOT)} /><Text style={{ marginLeft: 5,color:darkThemeOn?colors.light:colors.black, }}>OT</Text></View>
                    <View style={styles.NT}><Checkbox color={'#BB5C04'} disabled={false} value={selectNT} onValueChange={() => setSelectNT(!selectNT)} /><Text style={{ marginLeft: 5,color:darkThemeOn?colors.light:colors.black, }}>NT</Text></View>
                </View>
            </View>
            <View style={styles.searchResults}>
                {results >= 0 ? <Text style={{color:darkThemeOn?colors.light:colors.black,}}>Search results: {results}</Text> : null}
                <FlatList
                    data={DATA}
                    renderItem={({ item }) => <Verse item={item} />}
                    style={styles.list}
                    keyExtractor={item => item.id} />
            </View>
        </View>
    );
}
