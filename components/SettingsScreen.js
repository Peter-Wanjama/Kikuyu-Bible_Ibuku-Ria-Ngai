import { useState } from "react";
import { StyleSheet, View, Text, Pressable, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SettingsScreen({navigation}){
    const [darkThemeOn, setdarkThemeOn] = useState(false);
    const [easyLaunchOn, seteasyLaunchOn] = useState(true);
    
return(
    <View style={styles.container}>
        <View style={styles.settingItem}>
            <View style={styles.item}>
                <Text style={styles.itemHeader}>Enable Easy Launch</Text>
                <Text style={styles.itemText}>Pin app to notification area</Text>
            </View>
            {
            easyLaunchOn?<TouchableOpacity onPress={()=>seteasyLaunchOn(false)}><Icon name="toggle-switch-outline" size={24} color={'#BB5C04'} /></TouchableOpacity>
            :<TouchableOpacity onPress={()=>seteasyLaunchOn(true)}><Icon name="toggle-switch-off-outline" size={24} color={'#555'} /></TouchableOpacity>
            }
        </View>
        <View style={styles.settingItem}>
            <View style={styles.item}>
                <Text style={styles.itemHeader}>Turn on/off Dark Theme</Text>
                <Text style={styles.itemText}>Toggle between light and dark themes</Text>
            </View>
            {
            darkThemeOn?<TouchableOpacity onPress={()=>setdarkThemeOn(false)}><Icon name="toggle-switch-outline" size={24} color={'#BB5C04'} /></TouchableOpacity>
            :<TouchableOpacity onPress={()=>setdarkThemeOn(true)}><Icon name="toggle-switch-off-outline" size={24} color={'#555'} /></TouchableOpacity>
            }
        </View>
        <Pressable onPress={()=>console.log("font size")} style={styles.settingItem}>
            <View style={styles.item}>
                <Text style={styles.itemHeader}>Adjust Font Size</Text>
                <Text style={styles.itemText}>Increase or reduce the Bible font size</Text>
            </View>
        </Pressable>
        <Pressable onPress={()=>console.log("restoring")} style={styles.settingItem}>
            <View style={styles.item}>
                <Text style={styles.itemHeader}>Restore Defaults</Text>
                <Text style={styles.itemText}>Change current settings to the original settings</Text>
            </View>
        </Pressable>
    </View>
    );
}
const styles=StyleSheet.create({
    container:{
    flex:1,
    },
    settingItem:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderColor:'#d3d3d3',
        borderWidth:0.3,
        borderRadius:2,
        padding:15,
        width:'100%',
    },
    itemHeader:{
        fontFamily:'SemiBoldFont',
        marginBottom:5,
    },
    itemText:{
        fontFamily:'RegularFont',
    }
});