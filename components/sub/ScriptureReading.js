import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import kikuyubibledb from "../../assets/kikuyubibledb";
import { useContext, useState } from "react";
import { useFonts } from 'expo-font';
import { BibleContext } from "../../contexts/BibleContext";
import AppLoading from "expo-app-loading";
import Ionic from "react-native-vector-icons/Ionicons";
import GestureRecognizer from "react-native-swipe-gestures";
import Swiper from "react-native-swiper";
import BookSelection from '../BookSelection';
import SettingsScreen from '../SettingsScreen';


const getFonts = {
    'BoldFont': require('../.././assets/fonts/Barlow-Bold.ttf'),
    'SemiBoldFont': require('../.././assets/fonts/Barlow-SemiBold.ttf'),
    'MediumFont': require('../.././assets/fonts/Barlow-Medium.ttf'),
    'RegularFont': require('../.././assets/fonts/Barlow-Regular.ttf')
};
export default function ScriptureReading() {
    const { book, chapter, verse,setBible } = useContext(BibleContext);
    const DAT = kikuyubibledb[book][0][chapter];
    const n = kikuyubibledb[book][0].length;
    const [fontsLoaded] = useFonts(getFonts);
    const [selectedVerse, setSelectedVerse] = useState();
    const i=chapter;
    const Verse = ({ item,b ,c }) => (
        <TouchableOpacity style={styles.item}>
            <View style={styles.verseHeader}>
                <Text style={styles.verseHeaderText}>{b} {c}:{item.v}</Text>
                <TouchableOpacity style={styles.verseOptions}><Ionic name="ellipsis-horizontal" color={'#BB5C04'} size={20} /></TouchableOpacity>
            </View>
            <Text style={styles.title}>{item.t}</Text>
        </TouchableOpacity>
    );

    if (!fontsLoaded) {
        return <AppLoading />
    } else {
        return (
            <SafeAreaView style={styles.container}>
                {/* <GestureRecognizer config={{ velocityThreshold: 0.3, directionalOffsetThreshold: 80}}
                onSwipeLeft={()=>{console.log('Next Chapter')}}
                onSwipeRight={()=>{console.log('Previous Chapter')}}></GestureRecognizer> */}
                <Swiper showPagination={false} showsButtons={false} loop={false} index={i-1}>
                    {
                        Object.keys(kikuyubibledb[book][0]).map(function(element, key) {
                            //setBible({book:book,chapter:element,verse:1});
                            return ( 
                                <FlatList key={key}
                                    data={kikuyubibledb[book][0][element]} 
                                    renderItem={({ item }) => <Verse item={item} b={book} c={element} />}
                                    keyExtractor={item => item.v}
                                />)
                        })

                    }
                </Swiper>

            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
    },
    item: {
        //backgroundColor: '#f9c2ff',
        marginVertical: 8,
        marginHorizontal: 8,
    },
    title: {
        fontSize: 20,
        fontFamily: 'RegularFont',
    },
    verseHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    verseHeaderText: {
        color: '#BB5C04',
        fontFamily: 'MediumFont',
        fontSize: 16,
    },
    verseOptions: {
    },
    verseOptionsText: {
        color: '#BB5C04',
    }
});