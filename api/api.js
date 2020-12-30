import {useState} from 'react';
class Api{
    request(url, method, data) {
        return fetch('http://192.168.0.197/HospitalQ/public/api' + url, {
            method: method,
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            // 'Authorization': ''
            },
            body: JSON.stringify(data)
        }).then((response) => response.json())
        .then((json) => {
            return json;
        })
        .catch((error) => {
            console.error(error);
        });
    }
}
 
const api = new Api();

export default api;
