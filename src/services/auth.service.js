import axios from 'axios';
const API_URL = 'http://localhost:7700/api/kru/';
import authHeader from './auth-header';
import generalHeader from './general-header';
class AuthService {
  login(user) {
    return axios
      .post(API_URL 
        + 'genSesion/tokenSesion?usuario=' + 
        user.username + 
        '&contrasenia=' + 
        user.password, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true
        }
      })
      .then(function (response) {
        if (response.data.tokenSesion) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem('user');
  }
/*  register(user) {
    return axios.post(API_URL + 'registrar', {
      username: user.usuario,
      email: user.email,
      password: user.contraUsuario
    });
  }

  checkTokenExpired() {
    var config = {
      method: 'get',
      url: API_URL + 'genSesion/token-expired',
      headers: generalHeader(),
    };
    return axios(config);
  }*/
}
export default new AuthService();