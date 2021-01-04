import Api from './api'

class User {
    login(data){
        return Api.request('/login', 'POST', data);
    }

    register(data){
        return Api.request('/register', 'POST', data);
    }
}

const user = new User();

export default user;