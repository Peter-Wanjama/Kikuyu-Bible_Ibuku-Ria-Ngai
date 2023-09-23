import { FlatList, RefreshControl, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import kikuyubibledb from "../../assets/kikuyubibledb";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useFonts } from 'expo-font';
import { BibleContext } from "../../contexts/BibleContext";
import AppLoading from "expo-app-loading";
import Ionic from "react-native-vector-icons/Ionicons";
import Swiper from "react-native-swiper";


const getFonts = {
    'BoldFont': require('../.././assets/fonts/Barlow-Bold.ttf'),
    'SemiBoldFont': require('../.././assets/fonts/Barlow-SemiBold.ttf'),
    'MediumFont': require('../.././assets/fonts/Barlow-Medium.ttf'),
    'RegularFont': require('../.././assets/fonts/Barlow-Regular.ttf')
};
export default function ScriptureReading({ navigation }) {
    myRef = React.useRef(null);
    const { book, chapter, verse, setBible } = useContext(BibleContext);
    const [fontsLoaded] = useFonts(getFonts);
    const Verse = ({ item, b, c }) => (
        <View style={styles.item}>
            <View style={styles.verseHeader}>
                <Text style={styles.verseHeaderText}>{b} {c}:{item.v}</Text>
                <TouchableOpacity style={styles.verseOptions}><Ionic name="ellipsis-horizontal" color={'#BB5C04'} size={20} /></TouchableOpacity>
            </View>
            <Text style={styles.title}>{item.t}</Text>
        </View>
    );

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);
    if (!fontsLoaded) {

        return <AppLoading />
    } else {
        return (
            <SafeAreaView style={styles.container}>
                <Swiper showPagination={true} showsButtons={false} loop={false} index={chapter - 1} dot={<View></View>} activeDot={<View></View>} onIndexChanged={(i) => { navigation.setOptions({ title: book + ' ' + (i + 1), }); }} loadMinimal={true} loadMinimalSize={1}>
                    {
                        Object.keys(kikuyubibledb[book][0]).map(function (element, key) {
                            return (<View key={key}>
                                <FlatList
                                    ref={(ref) => myRef = ref}
                                    key={key}
                                    data={kikuyubibledb[book][0][element]}
                                    initialScrollIndex={(chapter - 1) === key ? verse - 1 : 0}
                                    renderItem={({ item }) => <Verse item={item} b={book} c={element} />}
                                    keyExtractor={item => item.v}
                                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                                />
                            </View>)
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