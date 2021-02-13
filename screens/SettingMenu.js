import React, { useContext } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DangerButton } from "../components/Button";
import { globalStyles } from "../styles";
import { AuthContext } from "../services/Context";

export default function SettingMenu({ navigation }) {
    const { signOut } = useContext(AuthContext);

    const Setting = () => {
        return (
            <View style={globalStyles.container_2}>
                <TouchableOpacity
                    style={style.setting}
                    onPress={() => navigation.navigate("Account")}
                >
                    <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                    >
                        <MaterialIcons
                            name="account-circle"
                            size={25}
                            color="black"
                            style={{ marginRight: 10 }}
                        />
                        <Text style={style.title}>Account</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={style.setting}
                    onPress={() => navigation.navigate("Password")}
                >
                    <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                    >
                        <MaterialCommunityIcons
                            name="onepassword"
                            size={25}
                            color="black"
                            style={{ marginRight: 10 }}
                        />
                        <Text style={style.title}>Password</Text>
                    </View>
                </TouchableOpacity>
                <View
                    style={{
                        marginTop: 10,
                        borderWidth: 1,
                        opacity: 0.1,
                    }}
                />
                <DangerButton title="LOG OUT" action={signOut} />
            </View>
        );
    };

    return <Setting />;
}

const style = StyleSheet.create({
    title: {
        fontSize: 15,
        fontFamily: "RobotoRegular",
    },
    setting: {
        marginVertical: 10,
    },
});
