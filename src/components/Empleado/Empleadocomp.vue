<template>
<div>
    <v-card-text></v-card-text>
    <v-card>
        <v-card-title class="primary white--text">ACTUALIZAR</v-card-title>
        <v-card-text></v-card-text>
        <v-card-text>
            <v-layout wrap>
                <v-flex md2>
                    <v-btn class="primary" @click="prepararActualizarEmpleado()">
                        <v-icon>add</v-icon>
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-card-text>

    </v-card>

    <v-dialog v-model="dialogoActualizarEmpleado" width="900">
        <v-card width="900">
            <v-card-title class="primary white--text">ACTUALIZAR</v-card-title>
            <v-card-text></v-card-text>
            <v-card-text>
                <v-layout wrap>
                    <v-flex md4>
                        <v-text-field disabled class="ml-2" outlined dense v-model="editarElementosEmpleado.cedulaEmpleado" label="Cédula.."></v-text-field>
                    </v-flex>
                    <v-flex md4>
                        <v-text-field disabled class="ml-2" outlined dense v-model="editarElementosEmpleado.nombresEmpleado" label="Nombres.."></v-text-field>
                    </v-flex>
                    <v-flex md4>
                        <v-text-field disabled class="ml-2" outlined dense v-model="editarElementosEmpleado.apellidosEmpleado" label="Apellidos.."></v-text-field>
                    </v-flex>
                    <v-flex md4>
                        <v-text-field disabled class="ml-2" outlined dense v-model="editarElementosEmpleado.correoElectronicoEmpleado" label="Correo electrónico.."></v-text-field>
                    </v-flex>
                    <v-flex md4>
                        <v-dialog ref="dialogoFechaInicial" v-model="modalFechaInicio" :return-value.sync="editarElementosEmpleado.fechaNacimientoEmpleado" persistent width="290px">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field class=" ml-2" dense outlined v-model="editarElementosEmpleado.fechaNacimientoEmpleado" label="Fecha resultado inicial.." append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="editarElementosEmpleado.fechaNacimientoEmpleado" scrollable :first-day-of-week="1" locale="es" color="secondary">
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="modalFechaInicio = false">
                                    Cancelar
                                </v-btn>
                                <v-btn text color="primary" @click="$refs.dialogoFechaInicial.save(editarElementosEmpleado.fechaNacimientoEmpleado)">
                                    OK
                                </v-btn>
                            </v-date-picker>
                        </v-dialog>
                    </v-flex>
                    <v-flex md4>
                        <v-text-field class="ml-2" outlined dense v-model="editarElementosEmpleado.direccionDomicilioEmpleado" label="Direccion.."></v-text-field>
                    </v-flex>
                    <v-flex md4>
                        <v-text-field class="ml-2" outlined dense v-model="editarElementosEmpleado.telefonoMovilEmpleado" label="Teléfono.."></v-text-field>
                    </v-flex>
                    <v-flex md4>
                        <v-select label="Estado vacuna.." class="ml-2" :items="elementosEstadoVacuna" item-value="estadoVacunacionEmpleado" item-text="texto" dense outlined v-model="editarElementosEmpleado.estadoVacunacionEmpleado"></v-select>
                    </v-flex>
                    <v-flex md4></v-flex>

                    <v-flex md4 v-if="editarElementosEmpleado.estadoVacunacionEmpleado == true">
                        <v-select class="ml-2" outlined dense :items="elementosTipoVacuna" item-value="idTipoVacunaCertificadoEmpleado" item-text="nombreTipoVacunaCertificadoEmpleado" v-model="editarElementosTipoVacuna.idTipoVacunaCertificadoEmpleado"></v-select>
                    </v-flex>

                    <v-flex md4 v-if="editarElementosEmpleado.estadoVacunacionEmpleado == true">
                        <v-dialog ref="dialogoFechaVacuna" v-model="modalFechaVacuna" :return-value.sync="editarElementosCertificadoVacuna.fechaVacunacionCertificadoVacunacionEmpleado" persistent width="290px">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field class=" ml-2" dense outlined v-model="editarElementosCertificadoVacuna.fechaVacunacionCertificadoVacunacionEmpleado" label="Fecha de vacunación.." append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="editarElementosCertificadoVacuna.fechaVacunacionCertificadoVacunacionEmpleado" scrollable :first-day-of-week="1" locale="es" color="secondary">
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="modalFechaVacuna = false">
                                    Cancelar
                                </v-btn>
                                <v-btn text color="primary" @click="$refs.dialogoFechaVacuna.save(editarElementosCertificadoVacuna.fechaVacunacionCertificadoVacunacionEmpleado)">
                                    OK
                                </v-btn>
                            </v-date-picker>
                        </v-dialog>
                    </v-flex>
                    <v-flex md4 v-if="editarElementosEmpleado.estadoVacunacionEmpleado == true">
                        <v-text-field type="number" class="ml-2" outlined dense v-model="editarElementosCertificadoVacuna.numDosisCertificadoVacunacionEmpleado" label="Número dosis.."></v-text-field>
                    </v-flex>

                </v-layout>

            </v-card-text>
            <v-card-actions>
                <v-btn class="error" @click="cerrarDialogoActualizar()">
                    <v-icon>close</v-icon>
                </v-btn>
                <v-btn class="primary" @click="actualizarEmpleado(editarElementosEmpleado, editarElementosCertificadoVacuna, editarElementosTipoVacuna)">
                    <v-icon>save</v-icon>
                </v-btn>
            </v-card-actions>

        </v-card>
    </v-dialog>

    <v-snackbar v-model="respuestaEmpleado">
        {{ textoRespuesta }}

        <template v-slot:action="{ attrs }">
            <v-btn color="primary" text v-bind="attrs" @click="respuestaEmpleado = false">
                Close
            </v-btn>
        </template>
    </v-snackbar>

</div>
</template>

<script>
import empleadoService from '@/services/empleado.service';
import certificadoService from '@/services/certificado.service.js'
export default {
    name: 'KrugerFrEmpleadocomp',

    data() {
        return {
            respuestaEmpleado:false,
            textoRespuesta:'',
            modalFechaVacuna: false,
            estadoVacunacionEmpleado: false,
            elementosEstadoVacuna: [{
                id: 1,
                estadoVacunacionEmpleado: true,
                texto: 'Vacunado'
            }, {
                id: 2,
                estadoVacunacionEmpleado: false,
                texto: 'NO Vacunado'
            }],
            dialogoActualizarEmpleado: false,
            modalFechaInicio: false,
            editarElementosEmpleado: [],
            defaultElementosEmpleado: [],
            elementosEmpleado: [{
                idEmpleado: '',
                cedulaEmpleado: '',
                nombresEmpleado: '',
                apellidosEmpleado: '',
                correoElectronicoEmpleado: '',
                fechaNacimientoEmpleado: '',
                direccionDomicilioEmpleado: '',
                telefonoMovilEmpleado: '',
                estadoVacunacionEmpleado: '',

            }],
            cabecerasEmpleado: [],
            elementosTipoVacuna: [{
                idTipoVacunaCertificadoEmpleado: '',
                nombreTipoVacunaCertificadoEmpleado: ''
            }],
            editarElementosTipoVacuna: [{
                idTipoVacunaCertificadoEmpleado: '',
                nombreTipoVacunaCertificadoEmpleado: ''
            }],
            defaultElementosTipoVacuna: [{
                idTipoVacunaCertificadoEmpleado: '',
                nombreTipoVacunaCertificadoEmpleado: ''
            }],
            elementosCertificadoVacuna: [{
                idCertificadoVacunacionEmpleado: '',
                fechaVacunacionCertificadoVacunacionEmpleado: '',
                numDosisCertificadoVacunacionEmpleado: '',
                nomTipoVacunaCertificadoEmpleado: {
                    idTipoVacunaCertificadoEmpleado: ''
                }

            }],
            editarElementosCertificadoVacuna: [{
                idCertificadoVacunacionEmpleado: '',
                fechaVacunacionCertificadoVacunacionEmpleado: '',
                numDosisCertificadoVacunacionEmpleado: '',
                nomTipoVacunaCertificadoEmpleado: {
                    idTipoVacunaCertificadoEmpleado: ''
                }

            }],
            defaultElementosCertificadoVacuna: [{
                idCertificadoVacunacionEmpleado: '',
                fechaVacunacionCertificadoVacunacionEmpleado: '',
                numDosisCertificadoVacunacionEmpleado: '',
                nomTipoVacunaCertificadoEmpleado: {
                    idTipoVacunaCertificadoEmpleado: ''
                }

            }],

        };
    },

    mounted() {
        this.traerTipoVacuna()
    },

    methods: {

        actualizarEmpleado(editarElementosEmpleado, editarElementosCertificadoVacuna, editarElementosTipoVacuna) {

            let empleado = {
                apellidosEmpleado: editarElementosEmpleado.apellidosEmpleado,
                cedulaEmpleado: editarElementosEmpleado.cedulaEmpleado,
                correoElectronicoEmpleado: editarElementosEmpleado.correoElectronicoEmpleado,
                direccionDomicilioEmpleado: editarElementosEmpleado.direccionDomicilioEmpleado,
                estadoVacunacionEmpleado: editarElementosEmpleado.estadoVacunacionEmpleado,
                fechaNacimientoEmpleado: editarElementosEmpleado.fechaNacimientoEmpleado,
                idEmpleado: editarElementosEmpleado.idEmpleado,
                nombresEmpleado: editarElementosEmpleado.nombresEmpleado,
                telefonoMovilEmpleado: editarElementosEmpleado.telefonoMovilEmpleado,
            }
            empleadoService.editarEmpleados(empleado).then((result) => {
                this.dialogoActualizarEmpleado = false;
                this.respuestaEmpleado = true;
                this.textoRespuesta = 'Empleado Editado correctamente';
            }).catch((err) => {});

            let certtificado = {
                idCertificadoVacunacionEmpleado: '',
                fechaVacunacionCertificadoVacunacionEmpleado: editarElementosCertificadoVacuna.fechaVacunacionCertificadoVacunacionEmpleado,
                numDosisCertificadoVacunacionEmpleado: editarElementosCertificadoVacuna.numDosisCertificadoVacunacionEmpleado,
                nomEmpleado: {
                    idEmpleado: editarElementosEmpleado.idEmpleado,
                },
                nomTipoVacunaCertificadoEmpleado: {
                    idTipoVacunaCertificadoEmpleado: editarElementosTipoVacuna.idTipoVacunaCertificadoEmpleado,
                }
            }
            certificadoService.crearCertificado(certtificado).then((result) => {

            }).catch((err) => {});
        },

        traerTipoVacuna() {
            this.elementosTipoVacuna = []
            certificadoService.listarTipoCertificado().then((result) => {
                this.elementosTipoVacuna = result.data;
            }).catch((err) => {});
        },

        cerrarDialogoActualizar() {
            this.dialogoActualizarEmpleado = false;
        },

        prepararActualizarEmpleado() {
            this.dialogoActualizarEmpleado = true
            empleadoService.traerEmpleadoXCorreoElectronico(this.usuarioActual.usuarioSesion).then((result) => {

                this.editarElementosEmpleado = result.data;

                /*  apellidosEmpleado: "PROAÑO"
                  cedulaEmpleado: "1002712857"
                  correoElectronicoEmpleado: "paul@gmail.com"
                  direccionDomicilioEmpleado: null
                  estadoVacunacionEmpleado: null
                  fechaNacimientoEmpleado: null
                  idEmpleado: 3
                  nombresEmpleado: "VICTOR PAUL"
                  telefonoMovilEmpleado: null*/

            }).catch((err) => {});
        }

    },
    computed: {

        usuarioActual() {
            return this.$store.state.auth.user;
        },
        mostrarPanelAdministrador() {
            if (this.usuarioActual && this.usuarioActual["tipoUsuarioSesion"]) {
                return this.usuarioActual["tipoUsuarioSesion"].includes("Administrador");
            }
            return false;
        },
        mostrarPanelEmpleado() {
            if (this.usuarioActual && this.usuarioActual["tipoUsuarioSesion"]) {
                return this.usuarioActual["tipoUsuarioSesion"].includes("Empleado");
            }
            return false;
        },

    },
};
</script>
