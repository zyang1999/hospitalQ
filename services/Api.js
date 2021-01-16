import AsyncStorage from '@react-native-async-storage/async-storage';

class Api {
    
    request = async (url, method, data) => {
        try {
            let userToken = 'Bearer ' + await AsyncStorage.getItem('userToken');
            let baseUrl = 'http://192.168.0.197/HospitalQ/public/api/';
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
            return json;

        } catch (error) {
            console.error(error);
        }
    };
}

const api = new Api();

export default api;
