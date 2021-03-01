import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useState } from "react/cjs/react.development";
import { PrimaryButton } from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import api from "../services/Api";
import { globalStyles } from "../styles";

export default function HomeAddress({ navigation }) {
    const [homeAddress, setHomeAddress] = useState(null);
    const [error, setError] = useState([]);

    const changeHomeAddress = () => {
        api.request("changeHomeAddress", "POST", {
            homeAddress: homeAddress,
        }).then((response) => {
            if (response.success) {
                alert(response.message);
                navigation.navigate("Account", { refresh: homeAddress });
            } else {
                setError(response.message);
            }
        });
    };

    return (
        <View style={globalStyles.container_2}>
            <Text style={{ fontFamily: "RobotoBold" }}>New Home Address</Text>
            <TextInput
                multiline
                numberOfLines={4}
                style={styles.input}
                onChangeText={(text) => setHomeAddress(text)}
            />
            {error.homeAddress && <ErrorMessage message={error.homeAddress} />}
            <PrimaryButton
                title="CHANGE HOME ADDRESS"
                action={changeHomeAddress}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        borderRadius: 10,
        borderWidth: 1,
        padding: 10,
        textAlignVertical: "top",
    },
});
