//import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StyleSheet, Text, TextInput, ToastAndroid, View } from "react-native";
import Ionic from "react-native-vector-icons/Ionicons";
import VList from "./VList";


function BibleSearch() {
    return (
        <View><Text>This is for Bible Search</Text></View>
    )
}
function NotesSearch() {
    return (
        <View><Text>This is for Note Search</Text></View>
    )
}
export default function SearchPage() {

    //const Tab2 = createMaterialTopTabNavigator();
    return (
        <View styles={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={styles.searchBox}>
                <Ionic style={styles.seachIcon} name={'search-outline'} color={'#a5a5a5'} size={18} />
                <TextInput style={styles.searchInput} placeholder="Type text here to search" />
            </View>
            <View style={styles.searchResults}>
                <VList />
                {/* <Tab.Navigator>
                    <Tab.Screen name='Bible' component={BibleSearch} />
                    <Tab.Screen name='Notes' component={NotesSearch} />
                </Tab.Navigator> */}
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
        flexDirection: 'row',
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
        marginLeft: 10,
    }
});