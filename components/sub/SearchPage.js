import Checkbox from "expo-checkbox";
import { ActivityIndicator, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";
import Ionic from "react-native-vector-icons/Ionicons";
import VList from "./VList";
import { useState } from "react";

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
export default function SearchPage() {

    const [loading, setLoading] = useState(false);
    const [selectOT, setSelectOT] = useState(true);
    const [selectNT, setSelectNT] = useState(true);

    onSelectionsChange = (items) => {
        setSelectedTestament(items);
    }
    return (
        <View styles={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.searchBox}>
                    <TextInput style={styles.searchInput} placeholder="Type text here to search" />
                    <TouchableOpacity onPress={()=>setLoading(!loading)}><Ionic style={styles.searchIcon} name={'search-outline'} color={'#a5a5a5'} size={20} /></TouchableOpacity>
                </View>
                <View style={styles.searchScope}>
                    <View style={styles.OT}><Checkbox color={'#BB5C04'} disabled={false} value={selectOT} onValueChange={(i) => setSelectOT(!selectOT)} /><Text style={{marginLeft:5}}>OT</Text></View>
                    <View style={styles.NT}><Checkbox color={'#BB5C04'} disabled={false} value={selectNT} onValueChange={(i) => setSelectNT(!selectNT)} /><Text style={{marginLeft:5}}>NT</Text></View>
                </View>
                {loading?<ActivityIndicator color={'#BB5C04'} />:null}
            </View>
            <View style={styles.searchResults}>
                <Text>Search results</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    searchResults: {

    },
    container: {

    },
    searchBox: {
        flex:4,
        flexDirection: 'row',
        justifyContent:'space-between',
        padding: 10,
        height: 40,
        margin: 8,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: '#d3d3d3',
    },
    searchIcon: {
    },
    searchInput: {
        marginLeft: -5,
    },
    searchResults: {
        padding: 5,
    },
    searchScope: {
        flexDirection: 'row',
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