import AsyncStorage from '@react-native-async-storage/async-storage';

class Api {

    request = async (url, method, data) => {
        try {
            let response = await fetch('http://192.168.0.197/HospitalQ/public/api/' + url, {
                method: method,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': await AsyncStorage.getItem('userToken')
                },
                body: JSON.stringify(data)
            });
            let json = await response.json();
            return json;
        } catch (error) {
            console.error(error);
        }
    };
}

const api = new Api();

export default api;
