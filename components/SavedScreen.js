import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { FlatList, RefreshControl, StyleSheet, Text, ToastAndroid, View } from "react-native";
import kikuyubibledb from '../assets/kikuyubibledb';

export default function SavedScreen() {
    ToastAndroid.show('Loading...', ToastAndroid.SHORT);
    const TopTab = createMaterialTopTabNavigator();
    const BibleBooks=Object.keys(kikuyubibledb);
    function Bk() {
        return (
            <View>
                <Text>Bookmarks</Text>
            </View>)
    }
    function Fav() {
        
        const favorites = [{ id: 1, book: 1, chapter: 2, verse: 4 }, { id: 2, book: 39, chapter: 17, verse: 21 }, { id: 3, book: 38, chapter: 3, verse: 10 }, { id: 4, book: 10, chapter: 2, verse: 4 }];
        const Verse = ({ item}) => (
            <View style={styles.item}>
                <Text style={styles.verseText}>{kikuyubibledb[BibleBooks[item.book]][0][item.chapter][item.verse-1].t}</Text>
                <Text style={styles.verseRef}>{BibleBooks[item.book]} {item.chapter}:{item.verse}</Text>
            </View>
        );
        return (
            <View>
                <FlatList
                    data={favorites}
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
        borderRadius:1,
        borderWidth:0.4,
        borderColor:'#d2d2d2',
        marginVertical: 8,
        marginHorizontal: 8,
        padding:5,
    },
    verseText:{
        fontSize:17,
        fontFamily:'RegularFont',
        maxHeight:40,
    },
    verseRef:{
        marginTop: 3,
        fontSize:16,
        fontFamily:'RegularFont'
    }
});