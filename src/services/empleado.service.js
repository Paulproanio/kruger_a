import axios from "axios";
import generalHeader from "./general-header";
const API_URL = 'http://localhost:7700/api/kru/';

class empleadoService {
    ///////////////////////// EMPLEADO ///////////////
    listarEmpleados() {
        var configuracion = {
            method: "get",
            url: API_URL + 'nomEmpleado',
            headers: generalHeader(),
        };
        return axios(configuracion);
    }

    editarEmpleados(empleado) {
        var configuracion = {
            method: "put",
            url: API_URL + 'nomEmpleado',
            headers: generalHeader(),
            data: empleado
        };
        return axios(configuracion);
    }

    crearEmpleados(empleado) {
        var configuracion = {
            method: "post",
            url: API_URL + 'nomEmpleado',
            headers: generalHeader(),
            data: empleado
        };
        return axios(configuracion);
    }

    traerEmpleadoXCorreoElectronico(correoElectronico) {
        var configuracion = {
            method: "get",
            url: API_URL + 'nomEmpleado/templxcorreo/' + correoElectronico,
            headers: generalHeader(),
        };
        return axios(configuracion);
    }

    /////////////// POR ESTADO DE VACUNA //////

    empleadosPorEstadoVacuna(estadoVacunacion) {
        var configuracion = {
            method: "get",
            url: API_URL + 'nomEmpleado/bexsv/' + estadoVacunacion,
            headers: generalHeader(),
        };
        return axios(configuracion);
    }

    /////////////// POR TIPO DE VACUNA //////

    empleadosPorTipoVacuna(tipoVacuna) {
        var configuracion = {
            method: "get",
            url: API_URL + 'nomEmpleado/bextpv/' + tipoVacuna,
            headers: generalHeader(),
        };
        return axios(configuracion);
    }

    /////////////// RANGO DE FECHAS //////

    empleadosPorRangoFechas(fechaInicial, fechaFinal) {
        var configuracion = {
            method: "get",
            url: API_URL + 'nomEmpleado/bemxrfe/' + fechaInicial + '/' + fechaFinal,
            headers: generalHeader(),
        };
        return axios(configuracion);
    }

}
export default new empleadoService();