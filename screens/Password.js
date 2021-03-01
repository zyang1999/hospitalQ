import React, { useState } from "react";
import { ScrollView, Text, TextInput, StyleSheet } from "react-native";
import { PrimaryButton } from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import api from "../services/Api";
import { globalStyles } from "../styles";

export default function Password() {
    const [oldPassword, setOldPassword] = useState(null);
    const [newPassword, setNewPassword] = useState(null);
    const [passwordConfirmation, setPasswordConfirmation] = useState(null);
    const [error, setError] = useState([]);

    const changePassword = () => {
        api.request("changePassword", "POST", {
            oldPassword: oldPassword,
            newPassword: newPassword,
            newPassword_confirmation: passwordConfirmation,
        }).then((response) => {
            if (response.success) {
                alert(response.message);
                setOldPassword(null);
                setNewPassword(null);
                setPasswordConfirmation(null);
                setError({});
            } else {
                if (typeof response.message == "object") {
                    setError(response.message);
                } else {
                    alert(response.message);
                    setError([]);
                }
            }
        });
    };

    return (
        <ScrollView style={globalStyles.container_2}>
            <Text style={styles.title}>Old Password</Text>
            <TextInput
                style={globalStyles.input}
                secureTextEntry={true}
                value={oldPassword}
                onChangeText={(text) => setOldPassword(text)}
            />
            {error.oldPassword && <ErrorMessage message={error.oldPassword} />}
            <Text style={styles.title}>New Password</Text>
            <TextInput
                style={globalStyles.input}
                secureTextEntry={true}
                value={newPassword}
                onChangeText={(text) => setNewPassword(text)}
            />
            {error.newPassword && <ErrorMessage message={error.newPassword} />}
            <Text style={styles.title}>Comfirm New Password</Text>
            <TextInput
                style={globalStyles.input}
                secureTextEntry={true}
                value={passwordConfirmation}
                onChangeText={(text) => setPasswordConfirmation(text)}
            />
            {error.newPassword_confirmation && (
                <ErrorMessage message={error.newPassword_confirmation} />
            )}
            <Text>The Password should contains:</Text>
            <Text>- Minimum 8 characters</Text>
            <Text>- at least 1 Uppercase and lowercase letter (A-Z, a-z)</Text>
            <Text>- at least 1 Base 10 digits (0-9)</Text>
            <Text>- at least 1 special case characters (ex: !, @, # ) </Text>
            <PrimaryButton title="CHANGE PASSWORD" action={changePassword} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    title: {
        fontFamily: "RobotoBold",
    },
});
