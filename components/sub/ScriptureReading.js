import { Clipboard, FlatList, RefreshControl, SafeAreaView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import kikuyubibledb from "../../assets/kikuyubibledb";
import React, { useCallback, useContext, useState } from "react";
import { BibleContext } from "../../contexts/BibleContext";
import Ionic from "react-native-vector-icons/Ionicons";
import Swiper from "react-native-swiper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ScriptureReading({ navigation }) {
    myRef = React.useRef(null);
    ref2 = React.useRef(null);
    const { book, chapter, verse, setBible } = useContext(BibleContext);
    const getMoreIcons=(item,b,c)=>{
        console.log('more '+item.v)
        //ref2.current?.
        return(<View style={{flexDirection:'row',backgroundColor:'red'}}><Text>Hello</Text><Text>{b} {c}:{item.v}</Text></View>);
    }
    const saveToFavorites = async (item,book,chapter) => {
        console.log('Storing...')
        const obj={book:book,chapter:chapter,verse:item.v};
        console.log('obj...')
        console.log(obj)
        await AsyncStorage.setItem('favorites-'+(book+chapter+verse).replace(/\s/g, ''), JSON.stringify(obj), (err) => {
            if (err) {
                console.log("an error");
                throw err;
            }
            console.log("success saving");
        }).catch((err) => {
            console.log("saving error is: " + err);
        });
        };
    const Verse = ({ item, b, c }) => (
        <View style={styles.item}>
            <View style={styles.verseHeader}>
                <Text style={styles.verseHeaderText}>{b} {c}:{item.v}</Text>
                <View style={{flexDirection:'row'}}>
                    <View style={{flexDirection:'row',marginRight:10,paddingRight:20}}>
                        <TouchableOpacity onPress={()=>{Clipboard.getString()===item.t?'':Clipboard.setString(item.t);
                        ToastAndroid.show("Copied",ToastAndroid.SHORT)}}><Ionic style={{marginRight:8}} name="copy-outline" color={'#BB5C04'} size={20} /></TouchableOpacity>
                        <TouchableOpacity onPress={()=>saveToFavorites(item,b,c)}><Ionic style={{marginRight:8}} name="heart-outline" color={'#BB5C04'} size={20} /></TouchableOpacity>
                        <TouchableOpacity><Ionic style={{marginRight:8}} name="share-social-outline" color={'#BB5C04'} size={20} /></TouchableOpacity>
                    </View>
                <TouchableOpacity style={[styles.verseOptions,{marginLeft:10}]} ref={ref2}><Ionic name="ellipsis-horizontal" color={'#BB5C04'} size={20} /></TouchableOpacity>
                </View>
            </View>
            <Text style={styles.title}>{item.t}</Text>
        </View>
    );

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);
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
                                initialScrollIndex={(chapter - 1) === key ? (verse>4?Math.abs(verse - 4):verse-1) : 0}
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
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
    },
    item: {
        //backgroundColor: '#f9c2ff',
        marginVertical: 8,
        marginHorizontal: 8,
    },
    title: {
        fontSize: 20,
        fontFamily: 'RegularFont',
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