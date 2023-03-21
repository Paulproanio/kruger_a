<template>
<v-app>

    <v-app-bar app color="primary" dark>
        <v-app-bar-nav-icon @click="aparece_menu = !aparece_menu" v-if="usuarioActual"></v-app-bar-nav-icon>
        <div class="d-flex align-center">
        </div>
        <v-spacer></v-spacer>
        <div>
            <template v-if="usuarioActual">
                <div class="text-center" primary>
                    <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn small icon color="" dark v-bind="attrs" v-on="on" fab>
                                <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                        </template>
                        <v-list color="primary">
                            <v-list-item v-for="(item, index) in items" :key="index">
                                <v-list-item-title>
                                    <span class=" white--text">
                                        {{ usuarioActual.tipoUsuarioSesion }}
                                    </span>
                                    <br>
                                    <v-btn href="" text color="accent" small depressed class="mb-3 mt-3">
                                        <v-icon left size="25">account_circle</v-icon>
                                        <span class="white--text">{{ usuarioActual.usuarioSesion }}
                                        </span>
                                    </v-btn>
                                    <br>
                                    <v-divider class="white"></v-divider>
                                    <v-btn href="" text @click="logOut()" color="secondary" small depressed>

                                        <v-icon left size="25">logout</v-icon>
                                        <span class="mr-2">Salir</span>

                                    </v-btn>

                                </v-list-item-title>

                            </v-list-item>

                        </v-list>
                    </v-menu>
                </div>
            </template>

        </div>
    </v-app-bar>

    <v-navigation-drawer v-model="aparece_menu" app dense nav class="white black--text">

        <v-layout mt-4 column align-center no-gutters>
            <v-flex>
                <!--<v-badge color="secondary" overlap bordered >     </v-badge>-->
                <v-avatar color="primary" size="40">
                    <img src="@/assets/logo.png" alt="" x-small>
                </v-avatar>
            </v-flex>
            <v-flex class="">
                <!--  <p class=" mt-3 "> <strong> {{ usuarioActual.userName}} </strong> </p>-->

            </v-flex>
        </v-layout>

        <v-divider></v-divider>

        <!-- menu -->
        <v-list dense nav color="">
            <v-card>
                <v-list-item v-for="item in inicio" :key="item.title" :to="item.link" link>
                    <v-list-item-icon>
                        <v-icon :v-text="icon" color="primary">{{item.icon}} </v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>{{item.title}} </v-list-item-title>
                </v-list-item>
            </v-card>
            <!--/////////////////////////// -->
            <v-card class="mt-1">
                <v-card class="mb-1">
                    <v-list-group :value="false" prepend-icon="admin_panel_settings" v-if="mostrarPanelAdministrador">
                        <template v-slot:activator>
                            <v-list-item-title>MENU I</v-list-item-title>
                        </template>
                        <v-list-group no-action sub-group>
                            <template v-slot:activator>
                                <v-list-item-content>
                                    <v-list-item-title>Usuario</v-list-item-title>
                                </v-list-item-content>
                            </template>
                            <v-list-item v-for="item in menuAdministrador" :key="item.title" :to="item.link" link>
                                <v-list-item-icon>
                                    <v-icon :v-text="icon">{{item.icon}} </v-icon>
                                </v-list-item-icon>
                                <v-list-item-title>{{item.title}} </v-list-item-title>
                            </v-list-item>
                        </v-list-group>

                    </v-list-group>
                </v-card>
                <v-card class="mb-1">
                    <v-list-group :value="false" prepend-icon="inventory_2" v-if="mostrarPanelEmpleado">
                        <template v-slot:activator>
                            <v-list-item-title>MENU II</v-list-item-title>
                        </template>
                        <v-list-group no-action sub-group>
                            <template v-slot:activator>
                                <v-list-item-content>
                                    <v-list-item-title>Empleado</v-list-item-title>
                                </v-list-item-content>
                            </template>
                            <v-list-item v-for="item in menuEmpleado" :key="item.title" :to="item.link" link>
                                <v-list-item-icon>
                                    <v-icon :v-text="icon">{{item.icon}} </v-icon>
                                </v-list-item-icon>
                                <v-list-item-title>{{item.title}} </v-list-item-title>
                            </v-list-item>
                        </v-list-group>

                    </v-list-group>
                </v-card>

            </v-card>

        </v-list>

    </v-navigation-drawer>

    <v-main class="image-box">
        <v-container>
            <router-view />

        </v-container>
    </v-main>

</v-app>
</template>

<script>
export default {
    name: 'KrugerFrApp',

    data() {
        return {
            aparece_menu: false,
            icon: null,
            btns: [
                ['Large', 'lg'],
            ],
            items: [{
                title: 'Click Me'
            }],
            inicio: [{
                icon: 'home',
                title: 'Inicio',
                link: '/home'

            }, ],
            menuAdministrador: [{
                    icon: 'radio_button_checked',
                    title: 'Empleado',
                    link: '/usuario/nuevoempleado'
                }, {
                    icon: 'person',
                    title: 'Usuarios',
                    link: '/usuario/nuevousuario'
                },
                {
                    icon: 'radio_button_checked',
                    title: 'Tipo (rOL)',
                    link: '/usuario/tipousuario'
                },
                {
                    icon: 'vaccines',
                    title: 'Tipo vacuna',
                    link: '/usuario/tipovacuna'
                },
                {
                    icon: 'list',
                    title: 'Reportes',
                    link: '/usuario/reportes'
                },
               
            ],
            menuEmpleado: [{
                icon: 'cached',
                title: 'Actualizar',
                link: '/empleado/actualizar'
            }, ],
        };
    },

    created() {
        /*  if (!this.usuarioActual) {
              console.clear();
                this.$router.push("/");
                console.clear();
            }*/
    },

    mounted() {

        /*   this.$store.dispatch("auth/checkTokenExpired").then(
              () => {},
              (error) => {
                  this.loading = false;
                  if ((error.response && error.response.data && error.response.data.message) || error.message || error.toString()) {
                      console.clear();
                      this.$store.dispatch("auth/logout");
                  }
              }
          );*/
    },

    methods: {
        logOut() {
            this.$store.dispatch('auth/logout');
            this.$router.push('/');
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
