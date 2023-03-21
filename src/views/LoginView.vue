<template>
<div>

    <v-card-text></v-card-text>
    <v-card width="400" elevation="15" class="mx-auto">
        <v-card-title class="primary white--text">LOGIN</v-card-title>
        <v-card-text></v-card-text>
        <v-card-text>
            <v-text-field outlined dense label="Usuario.." append-icon="person" v-model="usuario"></v-text-field>
            <v-text-field outlined dense label="Contraseña.." append-icon="password" v-model="contrasenia"></v-text-field>
        </v-card-text>
        <v-alert v-if="this.mensaje" dense outlined type="error">
            {{ this.mensaje }}
        </v-alert>
        <v-card-actions>
            <v-btn block class="primary" @click="revisarUsuario(usuario, contrasenia)">ingresar</v-btn>
        </v-card-actions>
    </v-card>

</div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'KrugerFrHomeView',

    data() {
        return {
            usuario: '',
            contrasenia: '',
            mensaje:'',

        };
    },

    mounted() {

    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        },
    },
    methods: {

        revisarUsuario(usuario, contrasenia) {
            const user = {
                username: usuario,
                password: contrasenia,
            };
            this.ingresarSistema(user);
        },

        ingresarSistema(user) {
            this.$store.dispatch("auth/login", user).then((result) => {
                this.mensaje = "Correct credentials!";
                this.$router.replace("/home");
            },
            (error) => {
                        if ((error.response && error.response.data && error.response.data.message) || error.message || error.toString()) {
                            console.clear();
                            this.alerta = false;
                            this.mensaje = "Usuario o contraseña incorrectos!!";
                        }
                    })
        },
    },
};
</script>
