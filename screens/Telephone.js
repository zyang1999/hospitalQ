import React from "react";
import { View, Text, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react/cjs/react.development";
import { PrimaryButton } from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import api from "../services/Api";
import { globalStyles } from "../styles";

export default function Telephone({ navigation }) {
    const [telephone, setTelephone] = useState(null);
    const [error, setError] = useState([]);

    const changePhoneNumber = () => {
        api.request("changePhoneNumber", "POST", { telephone: telephone }).then(
            (response) => {
                if (response.success) {
                    alert(response.message);
                    navigation.navigate("Account", { refresh: telephone });
                } else {
                    setError(response.message);
                }
            }
        );
    };

    return (
        <View style={globalStyles.container_2}>
            <Text style={{ fontFamily: "RobotoBold" }}>
                New Telephone Number
            </Text>
            <TextInput
                keyboardType="numeric"
                style={globalStyles.input}
                onChangeText={(text) => setTelephone(text)}
            />
            {error.telephone && <ErrorMessage message={error.telephone} />}
            <PrimaryButton
                title="CHANGE PHONE NUMBER"
                action={changePhoneNumber}
            />
        </View>
    );
}
