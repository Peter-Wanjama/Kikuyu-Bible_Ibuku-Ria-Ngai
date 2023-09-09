import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import HomeScreen from "./HomeScreen";
import ScriptureReading from "./sub/ScriptureReading";
import Ionic from 'react-native-vector-icons/Ionicons';
import BookSelection from "./BookSelection";
import { useContext } from "react";
import { BibleContext } from "../contexts/BibleContext";

export default function Home() {
    const {book, chapter, verse}=useContext(BibleContext);
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="Home2" component={HomeScreen} />
            <Stack.Screen options={{headerRight:(props)=>(
                <TouchableOpacity>
                    <Ionic name="search-sharp" size={22} style={{paddingRight: 10}} />
                    </TouchableOpacity>
                    ),title:book+" "+chapter}} name="ScriptureReading" component={ScriptureReading} />
                
        </Stack.Navigator>
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
        justifyContent: 'center',
        alignItems: 'center'
    }
});