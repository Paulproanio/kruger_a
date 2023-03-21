import axios from "axios";
import generalHeader from "./general-header";

const API_URL = 'http://localhost:7700/api/kru/';

class usuarioService {

    ///////////////////////// TIPO USUARIO ///////////////

    listarTipoUsuarioSistema() {

      var configuracion = {
        method: "get",
        url: API_URL+'genTipoUsuarioSistema',
        headers: generalHeader(),
      };
      return axios(configuracion);
    }

    editarTipoUsuarioSistema(tipoUsuario) {

        var configuracion = {
          method: "put",
          url: API_URL+'genTipoUsuarioSistema',
          headers: generalHeader(),
          data: tipoUsuario
        };
        return axios(configuracion);
      }

    crearTipoUsuarioSistema(tipoUsuario) {
        var configuracion = {
          method: "post",
          url: API_URL+'genTipoUsuarioSistema',
          headers: generalHeader(),
          data: tipoUsuario
        };
        return axios(configuracion);
      }

      /////////////////////////  USUARIO ///////////////

      crearUsuarioSistema(usuarioSistema) {
        var configuracion = {
          method: "post",
          url: API_URL+'genUsuarioSistema',
          headers: generalHeader(),
          data: usuarioSistema
        };
        return axios(configuracion);
      }

      editarUsuarioSistema(usuarioSistema) {
        var configuracion = {
          method: "put",
          url: API_URL+'genUsuarioSistema',
          headers: generalHeader(),
          data: usuarioSistema
        };
        return axios(configuracion);
      }

      listarUsuarioSistema() {
        var configuracion = {
          method: "get",
          url: API_URL+'genUsuarioSistema',
          headers: generalHeader(),
        };
        return axios(configuracion);
      }

}
export default new usuarioService();