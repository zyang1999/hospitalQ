import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { globalStyles } from '../styles';

export default function History({ navigation }) {

    const data = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            created_at: '19-1-2021 11:00 pm',
            location: 'CONSULTATION'
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            created_at: '19-1-2021 11:00 pm',
            location: 'CONSULTATION'
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            created_at: '19-1-2021 11:00 pm',
            location: 'CONSULTATION'
        }
    ];

    const renderItem = ({ item }) => (
        <TouchableWithoutFeedback onPress={() => navigation.navigate('QueueDetails', { details: item })}>
            <View style={styles.itemContainer}>
                <View>
                    <Text style={globalStyles.h5}>{item.created_at}</Text>
                    <Text style={globalStyles.h4}>{item.location}</Text>
                </View>
                <View>
                    <TouchableOpacity
                        style={styles.ratingButton}
                    >
                        <Text>Rate</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );

    const History = () => {
        return (
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        );
    }

    return (
        <View style={globalStyles.container_2}>
            <History />
        </View>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    ratingButton: {
        backgroundColor: '#42A5F5',
        padding: 10,
        borderRadius: 10
    }
});