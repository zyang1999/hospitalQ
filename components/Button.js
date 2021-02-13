import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { globalStyles } from "../styles";

export const PrimaryButton = (props) => {
    return (
        <TouchableOpacity onPress={props.action}>
            <Text style={globalStyles.primaryButton}>{props.title}</Text>
        </TouchableOpacity>
    );
};
export const SecondaryButton = (props) => {
    return (
        <TouchableOpacity onPress={props.action}>
            <Text style={globalStyles.secondaryButton}>{props.title}</Text>
        </TouchableOpacity>
    );
};

export const DangerButton = (props) => {
    return (
        <TouchableOpacity onPress={props.action}>
            <Text style={globalStyles.dangerButton}>{props.title}</Text>
        </TouchableOpacity>
    );
};
