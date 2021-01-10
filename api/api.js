import AsyncStorage from '@react-native-async-storage/async-storage';

class Api {

    request = async (url, method, data) => {
        let baseUrl = 'http://192.168.0.197/HospitalQ/public/api/';
        
        try {
            let userToken = 'Bearer ' + await AsyncStorage.getItem('userToken');
            if (method == 'POST') {
                let response = await fetch(baseUrl + url, {
                    method: method,
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': userToken
                    },
                    body: JSON.stringify(data)

                });
                let json = await response.json();
                return json;
            } else {
                let response = await fetch(baseUrl + url, {
                    method: method,
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': userToken
                    }
                });
                let json = await response.json();
                return json;
            }


        } catch (error) {
            console.error(error);
        }
    };
}

const api = new Api();

export default api;
