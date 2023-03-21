<template>
<div>
    <v-card-text></v-card-text>
    <v-card width="400" class="mx-auto">
        <v-card-title class="primary white--text">TIPO VACUNA</v-card-title>
        <v-card-text></v-card-text>
        <v-card-text>
            <v-layout wrap>
                <v-flex md2>
                    <v-btn class="primary" @click="prepararNuevoTipoVacuna()">
                        <v-icon>add</v-icon>
                    </v-btn>
                </v-flex>
                <v-flex md2></v-flex>
                <v-flex md2></v-flex>
            </v-layout>
        </v-card-text>
        <v-card-text>
            <v-data-table :items="elementosTipoVacuna" :headers="cabecerasTipoVacuna" dense>
                <template v-slot:item="{ item }">
                    <tr>
                        <td> {{item.idTipoVacunaCertificadoEmpleado}} </td>
                        <td> {{item.nombreTipoVacunaCertificadoEmpleado}} </td>
                        <td>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn icon v-bind="attrs" v-on="on" small @click="editarTipoVacuna(item)">
                                        <v-icon color="primary">edit</v-icon>
                                    </v-btn>
                                </template>
                                <span>Editar tipo usuario</span>
                            </v-tooltip>

                        </td>
                    </tr>
                </template>
            </v-data-table>
        </v-card-text>
    </v-card>
    <v-dialog v-model="dialogoNuevoTipoVacuna" width="400" persistent>
        <v-card width="400">
            <v-card-title class="primary white--text"> {{tituloFormulario}}</v-card-title>
            <v-card-text></v-card-text>
            <v-card-text>
                <v-layout wrap>
                    <v-flex md2></v-flex>
                    <v-flex md8>
                        <v-text-field outlined dense v-model="editarElementosTipoVacuna.nombreTipoVacunaCertificadoEmpleado"></v-text-field>
                    </v-flex>
                    <v-flex md2></v-flex>
                </v-layout>
            </v-card-text>
            <v-card-actions>
                <v-btn class="error" @click="cerrarTipoVacuna()">
                    <v-icon>close</v-icon>
                </v-btn>
                <v-btn class="primary" @click="guardarTipoVacuna(editarElementosTipoVacuna.nombreTipoVacunaCertificadoEmpleado)">
                    <v-icon>save</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-snackbar v-model="respuestaTipoVacuna">
        {{ textoRespuesta }}

        <template v-slot:action="{ attrs }">
            <v-btn color="pink" text v-bind="attrs" @click="respuestaTipoVacuna = false">
                Close
            </v-btn>
        </template>
    </v-snackbar>
</div>
</template>

<script>
import certificadoService from '@/services/certificado.service';
import usuarioService from '@/services/usuario.service.js'
export default {
    name: 'KrugerFrTipoUsuarioComp',

    data() {
        return {
            respuestaTipoVacuna: false,
            textoRespuesta: '',
            dialogoNuevoTipoVacuna: false,
            indiceEditadoTipoVacuna: -1,
            nombreTipoVacunaCertificadoEmpleado: '',
            cabecerasTipoVacuna: [{
                text: 'Id',
                value: 'idTipoVacunaCertificadoEmpleado'
            }, {
                text: 'Nombre tipo vacuna',
                value: 'nombreTipoVacunaCertificadoEmpleado'
            }, {
                text: 'Acciones',
                value: ''
            }],
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

        };
    },

    mounted() {
        this.listarTipoVacuna()
    },

    computed: {
        tituloFormulario() {
            return this.indiceEditadoTipoVacuna === -1 ? 'CREAR TIPO VACUNA' : 'EDITAR TIPO VACUNA'
        },
    },

    methods: {

        guardarTipoVacuna(nombreTipoVacuna) {

            if (nombreTipoVacuna == undefined) {
                alert("Los campos no puede quedar vacíos!!");

            } else {

                if (this.indiceEditadoTipoVacuna > -1) {

                    let tipo = {
                        idTipoVacunaCertificadoEmpleado: this.indiceEditadoTipoVacuna,
                        nombreTipoVacunaCertificadoEmpleado: nombreTipoVacuna
                    }

                    certificadoService.editarTipoVacuna(tipo).then((result) => {
                        this.cerrarTipoVacuna()
                        this.listarTipoVacuna()
                        this.respuestaTipoVacuna = true;
                        this.textoRespuesta = 'Tipo vacuna editado correctamante!';
                    }).catch((err) => {});

                } else {

                    let tipoVac = {
                        idTipoVacunaCertificadoEmpleado: '',
                        nombreTipoVacunaCertificadoEmpleado: nombreTipoVacuna
                    }

                    certificadoService.crearTipoVacuna(tipoVac).then((result) => {
                        this.cerrarTipoVacuna()
                        this.listarTipoVacuna()
                        this.respuestaTipoVacuna = true;
                        this.textoRespuesta = 'Tipo vacuna creado correctamante!';
                    }).catch((err) => {});

                }

            }

        },

        prepararNuevoTipoVacuna() {
            this.dialogoNuevoTipoVacuna = true;
        },

        cerrarTipoVacuna() {
            this.dialogoNuevoTipoVacuna = false;
            this.$nextTick(() => {
                this.editarElementosTipoVacuna = Object.assign({}, this.defaultElementosTipoVacuna )
                this.indiceEditadoTipoVacuna = -1;
            })
        },

        editarTipoVacuna(item) {

            this.indiceEditadoTipoVacuna = item.idTipoVacunaCertificadoEmpleado;
            this.editarElementosTipoVacuna = Object.assign({}, item);
            this.dialogoNuevoTipoVacuna = true;
        },

        listarTipoVacuna() {
            certificadoService.listarTipoVacuna().then((result) => {
                this.elementosTipoVacuna = result.data;
            }).catch((err) => {});
        }

    },
};
</script>
