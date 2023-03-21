<template>
<div>
    <v-card-text></v-card-text>
    <v-card>
        <v-card-title class="primary white--text">USUARIOS</v-card-title>
        <v-card-text></v-card-text>
     
        <v-card-text>
            <v-data-table :items="elementosUsuario" :headers="cabecerasUsuario" dense></v-data-table>
        </v-card-text>
    </v-card>

    <v-dialog v-model="dialogoNuevoUsuario">

    </v-dialog>
</div>
</template>

<script>
import usuarioService from '@/services/usuario.service.js'
export default {
    name: 'KrugerFrNuevoUsuarioComp',

    data() {
        return {
            dialogoNuevoUsuario: false,
            elementosUsuario: [{
                idUsuarioSistema: '',
                nombreUsuarioSistema: '',
                contraseniaUsuarioSistema: '',
                genTipoUsuarioSistema: {
                    idTipoUsuarioSistema: ''
                }
            }],
            cabecerasUsuario: [{
                    text: 'Id',
                    value: 'idUsuarioSistema'
                },
                {
                    text: 'Usuario',
                    value: 'nombreUsuarioSistema'
                },
                {
                    text: 'Contraseña',
                    value: 'contraseniaUsuarioSistema'
                },
                {
                    text: 'Rol',
                    value: 'genTipoUsuarioSistema.nombreTipoUsuarioSistema'
                }
            ]

        };
    },

    mounted() {
        this.traerUsuarios()
    },

    methods: {

        traerUsuarios() {
            usuarioService.listarUsuarioSistema().then((result) => {
                this.elementosUsuario = result.data
            }).catch((err) => {});
        }

    },
};
</script>
