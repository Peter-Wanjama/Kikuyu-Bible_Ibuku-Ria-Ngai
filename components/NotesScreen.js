import { FlatList, RefreshControl, SafeAreaView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";
import Ionic from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useCallback, useLayoutEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

function Notebook({ route, navigation }) {
    var mynotes = new Object();
    var { heading, content, speaker, location } = route.params;
    const [x, setX] = useState({
        'id': '',
        'heading': heading,
        'content': content,
        'speaker': speaker,
        'location': location
    })
    // storing data
    const storeUser = async (value) => {
        if (x.heading !== '' && x.content !== '' && x.speaker !== '' && x.location !== '') {
            console.log('Storing...')
            const obj = new Object();
            // obj.id = (uuid.v4().slice(-9));
            obj.id = (x.heading).replace(/\s/g, '');
            obj.heading = x.heading;
            obj.content = x.content;
            obj.speaker = x.speaker;
            obj.location = x.location;
            var d = new Date, dformat = [d.getMonth() + 1, d.getDate(), d.getFullYear()].join('/') + ' ' + [d.getHours(), d.getMinutes(), d.getSeconds()].join(':')
            let l = dformat.concat(' ' + d.getHours() < 12 ? ' PM' : ' AM');
            obj.date = l;
            // console.log("Saving...\n" + JSON.stringify(obj))
            await AsyncStorage.setItem(obj.id, JSON.stringify(obj), (err) => {
                if (err) {
                    console.log("an error");
                    throw err;
                }
                console.log("success saving");
                navigation.navigate('notes')
            }).catch((err) => {
                console.log("saving error is: " + err);
            });
        } else {
            console.log("ERROR: Invalid name or age")
        }
    };

    // getting data
    const getUser = async (i) => {
        try {
            const userData = JSON.parse(await AsyncStorage.getItem(i))
            return userData;
        } catch (error) {
            console.log(error);
        }
    };
    // console.log("segdhserhthj\n" + getUser('3'))
    const saveNote = (id) => {
        let not = [];
        not.id = (id == '') ? '3' : '';
        not.heading = heading;
        not.content = content;
        not.speaker = speaker;
        not.location = location;
        var d = new Date, dformat = [d.getMonth() + 1, d.getDate(), d.getFullYear()].join('/') + ' ' + [d.getHours(),d.getMinutes()<10?"0"+d.getMinutes() :d.getMinutes(), d.getSeconds()].join(':')
        let l = dformat.concat(' ' + d.getHours() < 12 ? ' PM' : ' AM');
        not.date = l; mynotes.push(not);
        storeUser(not, id);
        console.log("Note saved\n" + not + "\n" + mynotes);
        ToastAndroid.show("Saved", ToastAndroid.SHORT);

    }
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: (props) => (
                <TouchableOpacity onPress={storeUser}>
                    <FontAwesome name="save" color={'#BB5C04'} size={22} style={{ paddingRight: 10 }} />
                </TouchableOpacity>
            ), title: 'Notes'
        })
    });
    return (
        <View style={[styles.container, { alignItems: 'left' }]}>
            <TextInput style={{ fontSize: 18, padding: 5, fontFamily: 'SemiBoldFont' }} maxLength={25} defaultValue={x.heading} onChangeText={(text) => setX({ ...x, heading: text })} placeholder="Enter heading here" />
            <View style={[styles.row, { justifyContent: 'space-between', flexWrap: 'wrap' }]}>
                <TextInput style={{ fontSize: 18, padding: 5, fontFamily: 'SemiBoldFont' }} maxLength={25} defaultValue={x.speaker} onChangeText={(text) => setX({ ...x, speaker: text })} placeholder="Enter speaker here" />
                <TextInput style={{ fontSize: 18, padding: 5, fontFamily: 'SemiBoldFont' }} maxLength={25} defaultValue={x.location} onChangeText={(text) => setX({ ...x, location: text })} placeholder="Enter location here" />
            </View>
            <TextInput style={{ fontSize: 18, margin: 5, marginTop: 10, padding: 5, borderRadius: 1, borderWidth: 1, height: '90%' }} onChangeText={(text) => setX({ ...x, content: text })} textAlignVertical="top"
                defaultValue={x.content} maxLength={200} multiline={true} placeholder="Enter text here" />
        </View>
    );
}
function Notes({ navigation }) {
    const [arr, setArr] = useState([]);
    var myR = [];
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
                    if(!key.startsWith('favorites'))
                    myR.push(v);
                });
            });
        });
    }
    const deleteNote = async ({ item }) => {
        console.log("Deleting..." + item.id + " " + item.content)
        await AsyncStorage.removeItem(item.id)
        onRefresh()
    }
    const NoteItem = ({ item }) => (
        <View style={styles.noteBody}>
            <View style={[styles.row, { justifyContent: 'space-between' }]} onLongPress={() => ToastAndroid.show('Long press', ToastAndroid.SHORT)}>
                <Text style={styles.noteHead}>{item.heading}</Text>
                <View style={[styles.row, { justifyContent: 'space-between', paddingRight: 15 }]}>
                    <TouchableOpacity style={{ marginRight: 25 }} onPress={() => navigation.navigate('notebook', item)}><FontAwesome name="edit" size={20} color={'#d3d3d3'} /></TouchableOpacity>
                    <TouchableOpacity style={{ marginRight: 25 }} onPress={() => deleteNote({ item })}><FontAwesome name="trash" size={20} color={'#d3d3d3'} /></TouchableOpacity>
                </View>
            </View>
            <Text style={styles.noteContent}>{item.content} </Text>

            <View style={styles.noteFooter}>
                <View style={[styles.row, { marginRight: 10 }]}><Ionic name="person-sharp" size={20} color={'#d3d3d3'} /><Text style={styles.speaker}>{item.speaker}</Text></View>
                <View style={[styles.row, { marginRight: 10 }]}><Ionic name="location-sharp" size={20} color={'#d3d3d3'} /><Text style={styles.location}>{item.location}</Text></View>
                <View style={[styles.row]}><Ionic name="time" size={20} color={'#d3d3d3'} /><Text style={styles.date}>{item.date}</Text></View>
            </View>
        </View>
    );
    const [refreshing, setRefreshing] = useState(false);
    useFocusEffect(() => {
      console.log("note view")
    })
    
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            myR=[]
            fetchAllItems()
            setArr(myR)
            setRefreshing(false);
        }, 1000);
    }, []);
    useLayoutEffect(() => {
        fetchAllItems();
        setArr(myR)
    }, []);
    return (
        <View style={styles.container}>
            <View style={styles.addNote}>
                <TouchableOpacity onPress={() => { console.log(arr); navigation.navigate('notebook', { id: '', heading: '', content: '', speaker: '', location: '' }) }}>
                    <Ionic name='add-circle-sharp' size={25} color={'#BB5C04'} />
                </TouchableOpacity>
                <Text style={styles.addNoteText}>Add Note</Text>
            </View>
            <View style={{ height: 500, alignItems: 'center',paddingBottom:20 }}>
                <FlatList
                    data={arr}
                    renderItem={({ item }) => <NoteItem item={item} />}
                    keyExtractor={item => item.id}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                />
            </View>

        </View>
    );
}
export default function NotesScreen() {
    const Stack = createNativeStackNavigator();
    return (
        <SafeAreaView style={styles.wrapper}>
            <Stack.Navigator>
                <Stack.Screen options={({ navigation }) => ({
                    headerRight: (props) => (
                        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                            <Ionic name="search-sharp" size={22} style={{ paddingRight: 10 }} />
                        </TouchableOpacity>
                    ), title: 'Notes'
                })} name='notes' component={Notes} />
                <Stack.Screen name='notebook' component={Notebook} />

            </Stack.Navigator>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 1,
    },
    addNote: {
        margin: 10,
        width: '96%',
        height: 25,
        flexDirection: 'row',
    },
    addNoteText: {
        fontSize: 22,
        marginLeft: 10,
    },
    noteBody: {
        margin: 4,
        marginBottom: 10,
        borderWidth: 0.2,
        borderRadius: 1,
        shadowColor: '#1717171',
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10,
        elevation: 1,
        justifyContent: 'space-between'
    },
    noteHead: {
        fontSize: 18,
        fontFamily: 'SemiBoldFont',
        marginBottom: 10,
    },
    noteContent: {
        fontSize: 16,
        fontFamily: 'RegularFont',
        marginBottom: 20,
        maxHeight: 42,
    },
    noteFooter: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    speaker: {
        fontSize: 15,
        marginTop: 2,
        marginLeft: 5,
        color: '#c2c2c2',
        fontFamily: 'RegularFont',
        maxWidth: 100,
    },
    location: {
        fontSize: 15,
        marginTop: 2,
        marginLeft: 5,
        color: '#c2c2c2',
        fontFamily: 'RegularFont',
        maxWidth: 100,
    },
    date: {
        fontSize: 15,
        marginTop: 2,
        marginLeft: 5,
        color: '#c2c2c2',
        fontFamily: 'RegularFont',
        maxWidth: 100,
    },
});