import { FlatList, RefreshControl, SafeAreaView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useCallback, useContext, useLayoutEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import kikuyubibledb from '../assets/kikuyubibledb';
import colors from "../config/colors";
import { BibleContext } from "../contexts/BibleContext";
import { StatusBar } from "expo-status-bar";

function Bookmarks() {
    const styles = StyleSheet.create({
       container: {
            flex: 1,
             backgroundColor:colors.dark,
            alignItems: 'left'
            // justifyContent: 'flex-end',
            // alignItems: 'right',
            // flexDirection: 'row'
        }
    });
    return (
        <View style={styles.container}>
            <Text>Bookmarks</Text>
        </View>
    );
}
function Favorites() {

    const { darkThemeOn } = useContext(BibleContext);
    const styles = StyleSheet.create({
        container:{
            flex:1,
            backgroundColor:darkThemeOn?colors.dark:colors.light,
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
            maxHeight: 36,
            color:darkThemeOn?colors.light:colors.dark,
        },
        verseRef: {
            marginTop: 3,
            fontSize: 16,
            fontFamily: 'OldBoldFont',
            color:darkThemeOn?colors.coollight:colors.dark,
        }
    });
    
    const [arr, setArr] = useState({id:'',book:'',chapter:'',verse:''});
    var myR = [];
    const BibleBooks = Object.keys(kikuyubibledb);
    const fetchAllItems = async () => {
        console.log("Fetching data...")
        await AsyncStorage.getAllKeys((err, keys) => {
            AsyncStorage.multiGet(keys, (err, stores) => {
                console.log(stores.length + ' items')
                stores.map((result, i, store) => {
                    // get at each store's key/value so you can work with it
                    let key = store[i][0];
                    let value = store[i][1];
                    // console.log("Key-" + key)
                    // console.log("Value-" + value)
                    v = JSON.parse(value)
                    if (key.startsWith('favorites'))
                        myR.push(v);
                });
            });
        });
    }
    const deleteItem = async (id ) => {
        console.log("Deleting..." + id)
        await AsyncStorage.removeItem(id)
        onRefresh()
    }
    const Verse = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.verseText}>{kikuyubibledb[item.book][0][item.chapter][item.verse - 1].t}</Text>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={styles.verseRef}>{item.book} {item.chapter}:{item.verse}</Text>
                <TouchableOpacity style={{ marginRight: 25 }} onPress={() => deleteItem(item.id)} ><FontAwesome name="trash" size={20} color={'#939393'} /></TouchableOpacity>
                </View>
        </View>
    );
    
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            myR = []
            fetchAllItems()
            setArr(myR)
            setRefreshing(false);
        }, 1000);
    }, []);
    useLayoutEffect(() => {console.log("note view");//AsyncStorage.clear();
        fetchAllItems();
        setArr(myR)
    }, []);
    return (
        <View style={styles.container}>
            <FlatList
                data={arr}
                renderItem={({ item }) => <Verse item={item} />}
                keyExtractor={item => item.id}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />
        </View>
    );
}
export default function NotesScreen() {
    const { darkThemeOn } = useContext(BibleContext);

    const styles = StyleSheet.create({
        wrapper: {
            flex: 1,
        },
        container: {
            flex: 1,
            backgroundColor:colors.danger,
            // justifyContent: 'flex-end',
            // alignItems: 'right',
            // flexDirection: 'row'
        },
        nav: {
            backgroundColor:colors.danger,
        },
        
    });
    const TopTab = createMaterialTopTabNavigator();
    return (
        <SafeAreaView style={styles.wrapper}>
            <TopTab.Navigator style={styles.nav} screenOptions={{
                tabBarIndicatorStyle: { backgroundColor: '#BB5C04' },
                tabBarItemStyle: { width: 120,color:colors.danger },
                tabBarActiveTintColor:darkThemeOn?colors.light:colors.dark,
                tabBarStyle: { backgroundColor: darkThemeOn?colors.black:colors.light },
            }}>
                <TopTab.Screen name='favorites' component={Favorites} />
                <TopTab.Screen name='bookmarks' component={Bookmarks} />
            </TopTab.Navigator>
        </SafeAreaView>
    );
}

