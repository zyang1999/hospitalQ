import React, { useState } from "react";
import {
    Text,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
    StyleSheet,
} from "react-native";
import { globalStyles } from "../styles";
import { AuthContext } from "../services/Context";
import { PrimaryButton } from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";

export default function SignUp() {
    const { signUp } = React.useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setConfirmedPassword] = useState("");
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);

    const createAccount = () => {
        setLoading(true);
        setError({});
        signUp(email, password, password_confirmation).then((response) => {
            if (response.success) {
                alert(response.message);
                setEmail("");
                setPassword("");
                setConfirmedPassword("");
                setLoading(false);
            } else {
                let message = response.message;
                setError(message);
                setLoading(false);
            }
        });
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <ScrollView style={styles.container}>
                <Text style={globalStyles.appTitle}>Registration</Text>
                <Text>Email Address</Text>
                <TextInput
                    keyboardType="email-address"
                    style={globalStyles.input}
                    placeholder="Email"
                    onChangeText={(email) => setEmail(email)}
                />
                {error.email && <ErrorMessage message={error.email} />}

                <Text>Password</Text>
                <TextInput
                    style={globalStyles.input}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
                {error.password && <ErrorMessage message={error.password} />}

                <Text>Confirm Password</Text>
                <TextInput
                    style={globalStyles.input}
                    placeholder="Confirm Password"
                    secureTextEntry={true}
                    onChangeText={(password_confirmation) =>
                        setConfirmedPassword(password_confirmation)
                    }
                />
                {error.password_confirmation && (
                    <ErrorMessage message={error.password_confirmation} />
                )}
                <Text style={{ fontFamily: "RobotoBold" }}>
                    Password Requirement:
                </Text>
                <Text>
                    Minimum eight characters, at least one uppercase letter, one
                    lowercase letter, one number and one special character
                </Text>
                {loading ? (
                    <Loading />
                ) : (
                    <PrimaryButton
                        title="CREATE A NEW ACCOUNT"
                        action={createAccount}
                    />
                )}
            </ScrollView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 30,
    },
});
