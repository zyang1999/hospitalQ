import Api from './api'

class User {
    login(data){
        return Api.request('/login', 'POST', data);
    }
}

const user = new User();

export default user;