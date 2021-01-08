class Api {
    request(url, method, data) {

        let userToken;
        try {
            userToken = await AsyncStorage.getItem('userToken');
            return fetch('http://192.168.0.197/HospitalQ/public/api' + url, {
                method: method,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': userToken
                },
                body: JSON.stringify(data)
            }).then((response) => response.json())
                .then((json) => {
                    return json;
                })
                .catch((error) => {
                    console.error(error);
                });
        } catch (e) {
            console.log(e);
        }


    }
}

const api = new Api();

export default api;
