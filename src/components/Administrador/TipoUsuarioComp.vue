<template>
<div>
    <v-card-text></v-card-text>
    <v-card width="400" class="mx-auto">
        <v-card-title class="primary white--text">TIPO USUARIO (ROL)</v-card-title>
        <v-card-text></v-card-text>
        <v-card-text>
            <v-layout wrap>
                <v-flex md2>
                    <v-btn class="primary" @click="prepararNuevoTipoUsuario()">
                        <v-icon>add</v-icon>
                    </v-btn>
                </v-flex>
                <v-flex md2></v-flex>
                <v-flex md2></v-flex>
            </v-layout>
        </v-card-text>
        <v-card-text>
            <v-data-table :items="elementosTipoUsuario" :headers="cabecerasTipoUsuario" dense>
                <template v-slot:item="{ item }">
                    <tr>
                        <td> {{item.idTipoUsuarioSistema}} </td>
                        <td> {{item.nombreTipoUsuarioSistema}} </td>
                        <td>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn icon v-bind="attrs" v-on="on" small @click="editarTipoUsuario(item)">
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
    <v-dialog v-model="dialogoNuevoTipoUsuario" width="400" persistent>
        <v-card width="400">
            <v-card-title class="primary white--text"> {{tituloFormulario}} (ROL)</v-card-title>
            <v-card-text></v-card-text>
            <v-card-text>
                <v-layout wrap>
                    <v-flex md2></v-flex>
                    <v-flex md8>
                        <v-text-field outlined dense v-model="editarElementosTipoUsuario.nombreTipoUsuarioSistema"></v-text-field>
                    </v-flex>
                    <v-flex md2></v-flex>
                </v-layout>
            </v-card-text>
            <v-card-actions>
                <v-btn class="error" @click="cerrarTipoUsuario()">
                    <v-icon>close</v-icon>
                </v-btn>
                <v-btn class="primary" @click="guardarTIpoProducto(editarElementosTipoUsuario.nombreTipoUsuarioSistema)">
                    <v-icon>save</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-snackbar v-model="respuestaTipoUsuario">
        {{ textoRespuesta }}

        <template v-slot:action="{ attrs }">
            <v-btn color="pink" text v-bind="attrs" @click="respuestaTipoUsuario = false">
                Close
            </v-btn>
        </template>
    </v-snackbar>
</div>
</template>

<script>
import usuarioService from '@/services/usuario.service.js'
export default {
    name: 'KrugerFrTipoUsuarioComp',

    data() {
        return {
            respuestaTipoUsuario: false,
            textoRespuesta: '',
            dialogoNuevoTipoUsuario: false,
            indiceEditadoTipoUsuario: -1,
            nombreTipoUsuarioSistema: '',
            cabecerasTipoUsuario: [{
                text: 'Id',
                value: 'idTipoUsuarioSistema'
            }, {
                text: 'Nombre tipo usuario',
                value: 'nombreTipoUsuarioSistema'
            }, {
                text: 'Acciones',
                value: ''
            }],
            elementosTipoUsuario: [{
                idTipoUsuarioSistema: '',
                nombreTipoUsuarioSistema: ''
            }],
            editarElementosTipoUsuario: [{
                idTipoUsuarioSistema: '',
                nombreTipoUsuarioSistema: ''
            }],
            defaultElementosTipoUsuario: [{
                idTipoUsuarioSistema: '',
                nombreTipoUsuarioSistema: ''
            }],

        };
    },

    mounted() {
        this.listarTipoUsuario()
    },

    computed: {
        tituloFormulario() {
            return this.indiceEditadoTipoUsuario === -1 ? 'CREAR TIPO USUARIO' : 'EDITAR TIPO USUARIO'
        },
    },

    methods: {

        guardarTIpoProducto(nombreTipoUsuarioSistema) {

            if (nombreTipoUsuarioSistema == undefined) {
                alert("Los campos no puede quedar vacíos!!");

            } else {

                if (this.indiceEditadoTipoUsuario > -1) {

                    let usuario = {
                        idTipoUsuarioSistema: this.indiceEditadoTipoUsuario,
                        nombreTipoUsuarioSistema: nombreTipoUsuarioSistema
                    }

                    usuarioService.editarTipoUsuarioSistema(usuario).then((result) => {
                        this.cerrarTipoUsuario()
                        this.listarTipoUsuario()
                        this.respuestaTipoUsuario = true;
                        this.textoRespuesta = 'Tipo usuario editado correctamante!';
                    }).catch((err) => {});

                } else {

                    let usuario = {
                        idTipoUsuarioSistema: '',
                        nombreTipoUsuarioSistema: nombreTipoUsuarioSistema
                    }

                    usuarioService.crearTipoUsuarioSistema(usuario).then((result) => {
                        this.cerrarTipoUsuario()
                        this.listarTipoUsuario()
                        this.respuestaTipoUsuario = true;
                        this.textoRespuesta = 'Tipo usuario creado correctamante!';
                    }).catch((err) => {});

                }

            }

        },

        prepararNuevoTipoUsuario() {
            this.dialogoNuevoTipoUsuario = true;
        },

        cerrarTipoUsuario() {
            this.dialogoNuevoTipoUsuario = false;
            this.$nextTick(() => {
                this.editarElementosTipoUsuario = Object.assign({}, this.defaultElementosTipoUsuario)
                this.indiceEditadoTipoUsuario = -1;
            })
        },

        editarTipoUsuario(item) {

            this.indiceEditadoTipoUsuario = item.idTipoUsuarioSistema;
            this.editarElementosTipoUsuario = Object.assign({}, item);
            this.dialogoNuevoTipoUsuario = true;
        },

        listarTipoUsuario() {
            usuarioService.listarTipoUsuarioSistema().then((result) => {
                this.elementosTipoUsuario = result.data;
            }).catch((err) => {});
        }

    },
};
</script>
