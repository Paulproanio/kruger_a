import axios from "axios";
import generalHeader from "./general-header";
const API_URL = 'http://localhost:7700/api/kru/';

class certificadoService {

    listarTipoCertificado() {
        var configuracion = {
            method: "get",
            url: API_URL + 'nomTipoVacunaCertificadoEmpleado',
            headers: generalHeader(),
        };
        return axios(configuracion);
    }

    crearCertificado(certificado) {
        var configuracion = {
            method: "post",
            url: API_URL + 'nomCertificadoVacunacionEmpleado',
            headers: generalHeader(),
            data: certificado
        };
        return axios(configuracion);
    }
//////////// nom tipo vacuna ////////////
    crearTipoVacuna(tipoVacuna) {
        var configuracion = {
            method: "post",
            url: API_URL + 'nomTipoVacunaCertificadoEmpleado',
            headers: generalHeader(),
            data: tipoVacuna
        };
        return axios(configuracion);
    }

    editarTipoVacuna(tipoVacuna) {
        var configuracion = {
            method: "put",
            url: API_URL + 'nomTipoVacunaCertificadoEmpleado',
            headers: generalHeader(),
            data: tipoVacuna
        };
        return axios(configuracion);
    }

    listarTipoVacuna() {
        var configuracion = {
            method: "get",
            url: API_URL + 'nomTipoVacunaCertificadoEmpleado',
            headers: generalHeader(),
        };
        return axios(configuracion);
    }

}
export default new certificadoService();