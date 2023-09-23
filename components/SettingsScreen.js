import { Text, ToastAndroid, View } from "react-native";

export default function SettingsScreen(){
    ToastAndroid.show('In development',ToastAndroid.SHORT);
return(
    <View styles={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text>Settings Screen</Text>
    </View>
    );
}