import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { FlatList, RefreshControl, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import kikuyubibledb from '../assets/kikuyubibledb';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLayoutEffect, useState } from "react";

export default function SavedScreen() {
    ToastAndroid.show('Loading...', ToastAndroid.SHORT);
    const TopTab = createMaterialTopTabNavigator();
    const BibleBooks = Object.keys(kikuyubibledb);
    function Bk() {
        return (
            <View>
                <Text>Bookmarks</Text>
            </View>)
    }
    function Fav() {
        /* const favorites = [{ id: 1, book: 1, chapter: 2, verse: 4 }, { id: 2, book: 39, chapter: 17, verse: 21 }, { id: 3, book: 38, chapter: 3, verse: 10 }, { id: 4, book: 10, chapter: 2, verse: 4 }];
          */
         //
        const [myR, setMyR] = useState([]);
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
                                //arr.push(v);
                                setMyR(v);
                            }
                        });
                        //console.log(arr.length + ' items:' + arr);
                    });
                });
            } catch (error) {
                console.log("ERROR FETCHING:" + error)
            }
        }
        useLayoutEffect(()=>{fetchAllItems()},[])
        
        const Verse = ({ item }) => (
            <View style={styles.item}>
                <Text style={styles.verseText}>{kikuyubibledb[BibleBooks[item.book]][0][item.chapter][item.verse - 1].t}</Text>
                <Text style={styles.verseRef}>{BibleBooks[item.book]} {item.chapter}:{item.verse}</Text>
            </View>
        );
        // const saveToFavorites = async () => {
        //     console.log('Storing...')
        //     await AsyncStorage.setItem('favorites', JSON.stringify(favorites), (err) => {
        //         if (err) {
        //             console.log("an error");
        //             throw err;
        //         }
        //         console.log("success saving");
        //     }).catch((err) => {
        //         console.log("saving error is: " + err);
        //     });
        // };
        return (
            <View>
                <FlatList
                    data={myR}
                    renderItem={({ item }) => <Verse item={item} book={item.book} chapter={item.chapter} />}
                    keyExtractor={item => item.id}
                />
            </View>)
    }
    return (
        <View style={styles.container}>
            <TopTab.Navigator style={styles.nav} screenOptions={{
                tabBarIndicatorStyle: { backgroundColor: '#BB5C04' },
                tabBarItemStyle: { width: 100, },
            }}>
                <TopTab.Screen name='favorites' component={Fav} />
                <TopTab.Screen name='bookmarks' component={Bk} />
            </TopTab.Navigator>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'right',
        flexDirection: 'row'
    },
    nav: {
    },
    item: {
        // backgroundColor: '#f9c2ff'
        borderRadius: 1,
        borderWidth: 0.4,
        borderColor: '#d2d2d2',
        marginVertical: 8,
        marginHorizontal: 8,
        padding: 5,
    },
    verseText: {
        fontSize: 17,
        fontFamily: 'OldRegularFont',
        maxHeight: 35,
    },
    verseRef: {
        marginTop: 3,
        fontSize: 16,
        fontFamily: 'OldBoldFont'
    }
});