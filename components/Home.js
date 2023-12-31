import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import HomeScreen from "./HomeScreen";
import ScriptureReading from "./sub/ScriptureReading";
import SearchPage from "./sub/SearchPage";
import Ionic from 'react-native-vector-icons/Ionicons';
import { useContext } from "react";
import { BibleContext } from "../contexts/BibleContext";
import colors from "../config/colors";

export default function Home() {
    const { book, chapter, verse,darkThemeOn } = useContext(BibleContext);
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={({ route }) => ({ statusBarStyle:darkThemeOn?'light':'dark',
        headerStyle: { backgroundColor: darkThemeOn?colors.dark:colors.light }, 
        headerTitleStyle:{color:darkThemeOn?colors.light:colors.dark},
        headerTintColor:darkThemeOn?colors.light:colors.dark,
        })}>
            <Stack.Screen options={({navigation})=>({ headerRight: (props) => (
                    <TouchableOpacity onPress={()=>navigation.navigate('Search')}>
                        <Ionic name="search-sharp" color={darkThemeOn?colors.light:colors.black} size={22} style={{ paddingRight: 10 }} />
                    </TouchableOpacity>
                ), title: 'Kikuyu Bible' })} name="Home2" component={HomeScreen} />
            <Stack.Screen options={({navigation})=>({
                headerRight: (props) => (
                    <TouchableOpacity onPress={()=>navigation.navigate('Search')}>
                        <Ionic name="search-sharp" color={darkThemeOn?colors.light:colors.black} size={22} style={{ paddingRight: 10 }} />
                    </TouchableOpacity>
                ), title: book + " " + chapter
            })} name="ScriptureReading" component={ScriptureReading} />
            <Stack.Screen name='Search' component={SearchPage}/>

        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex:1,
    },
});