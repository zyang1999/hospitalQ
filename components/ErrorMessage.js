import React from 'react';
import {Text} from 'react-native';
import {globalStyles} from '../styles';

export default function ErrorMessage(props){
    return(
        <Text style={globalStyles.errorMessage}>{props.message}</Text>
    );
}