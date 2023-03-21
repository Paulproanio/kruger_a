export default function generalHeader() {

    let user = JSON.parse(localStorage.getItem('user'));
    if (user && user.tokenSesion) {
      return { 
          Authorization: user.tokenSesion,
          Accept : "application/json",
          'Content-Type' : "application/json",
          'Access-Control-Allow-Credentials': true
        };
    } else {
      return {};
    }
  }