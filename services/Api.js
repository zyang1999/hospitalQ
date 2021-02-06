import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from "../services/baseUrl";

class Api {
    
    request = async (url, method, data) => {
        try {
            let userToken = 'Bearer ' + await AsyncStorage.getItem('userToken');
            let second_argument = {
                method: method,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': userToken
                }, 
            };
            if (method == 'POST') {
                second_argument.body = JSON.stringify(data);
            }
            let response = await fetch(baseUrl + url, second_argument);
            let json = await response.json();
            console.log(json);
            return json;

        } catch (error) {
            console.error(error);
        }
    };
}

const api = new Api();

export default api;
