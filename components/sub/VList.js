import React, { useRef } from 'react';
import {
    SafeAreaView,
    View,
    VirtualizedList,
    StyleSheet,
    Text,
    StatusBar,
} from 'react-native';
import kikuyubibledb from "../../assets/kikuyubibledb";


const getItem = (_data, index) => ({
    id:kikuyubibledb['Mathayo'][0][17][index].v,title:(index+1)+" "+kikuyubibledb['Mathayo'][0][17][index].t
});
console.log(kikuyubibledb['Mathayo'][0][17]);

const getItemCount = _data => 27;

const Item = ({ title }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
);
const VList = () => {
    myRef=useRef(null);

    return (
        <SafeAreaView style={styles.container}>

            <VirtualizedList
            ref={myRef}
                initialNumToRender={14}
                renderItem={({ item }) => <Item title={item.title} />}
                keyExtractor={item => item.id}
                getItemCount={getItemCount}
                getItem={getItem}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
    },
    item: {
        backgroundColor: '#f9c2ff',
        height: 150,
        justifyContent: 'center',
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 20,
    },
    title: {
        fontSize: 22,
    },
});

export default VList;