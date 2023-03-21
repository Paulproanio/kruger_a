<template>
<div>
    <v-card-text></v-card-text>
    <v-card width="800" class="mx-auto">
        <v-card-title class="primary white--text">EMPLEADO</v-card-title>
        <v-card-text></v-card-text>
        <v-card-text>
            <v-layout wrap>
                <v-flex md2>
                    <v-btn class="primary" @click="prepararNuevoEmpleado()">
                        <v-icon>add</v-icon>
                    </v-btn>
                </v-flex>
                <v-flex md2></v-flex>
                <v-flex md2></v-flex>
            </v-layout>
        </v-card-text>
        <v-card-text>
            <v-data-table :items="elementosEmpleado" :headers="cabecerasEmpleado" dense>
                <template v-slot:item="{ item }">
                    <tr>
                        <td> {{item.cedulaEmpleado}} </td>
                        <td> {{item.nombresEmpleado}} </td>
                        <td> {{item.apellidosEmpleado}} </td>
                        <td> {{item.correoElectronicoEmpleado}} </td>
                        <td>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn icon v-bind="attrs" v-on="on" small @click="editarEmpleado(item)">
                                        <v-icon color="primary">edit</v-icon>
                                    </v-btn>
                                </template>
                                <span>Editar empleado</span>
                            </v-tooltip>

                        </td>
                    </tr>
                </template>
            </v-data-table>
        </v-card-text>
    </v-card>
    <v-dialog v-model="dialogoNuevoEmpleado" width="800" persistent>
        <v-card width="800">
            <v-card-title class="primary white--text"> {{tituloFormulario}}</v-card-title>
            <v-card-text></v-card-text>
            <v-card-text>
                <v-layout wrap>
                    <v-flex md2>
                        <v-text-field class="mr-1" outlined dense v-model="editarElementosEmpleado.cedulaEmpleado" label="Cédula.."></v-text-field>
                    </v-flex>
                    <v-flex md5>
                        <v-text-field class="mr-1" outlined dense v-model="editarElementosEmpleado.nombresEmpleado" label="Nombres.."></v-text-field>
                    </v-flex>
                    <v-flex md5>
                        <v-text-field class="mr-1" outlined dense v-model="editarElementosEmpleado.apellidosEmpleado" label="Apellidos.."></v-text-field>
                    </v-flex>
                    <v-flex md2></v-flex>
                    <v-flex md5>
                        <v-text-field class="mr-1" outlined dense v-model="editarElementosEmpleado.correoElectronicoEmpleado" type="email" label="Correo electrónico.."></v-text-field>
                    </v-flex>
                </v-layout>
            </v-card-text>
            <v-card-actions>
                <v-btn class="error" @click="cerrarEmpleado()">
                    <v-icon>close</v-icon>
                </v-btn>
                <v-btn class="primary" @click="guardarEmpelado(editarElementosEmpleado)">
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
import empleadoService from '@/services/empleado.service.js'
import usuarioService from '@/services/usuario.service';
export default {
    name: 'KrugerFrNuevoEmpleadoComp',

    data() {
        return {
            indiceEditarEmpleado: -1,
            respuestaEmpleado: false,
            textoRespuesta: '',
            dialogoNuevoEmpleado: false,
            defaultElementosEmpleado: [],
            editarElementosEmpleado: [],
            elementosEmpleado: [{
                cedulaEmpleado: '',
                nombresEmpleado: '',
                apellidosEmpleado: '',
                correoElectronicoEmpleado: '',
                /*  fechaNacimientoEmpleado: '',
                  direccionDomicilioEmpleado: '',
                  telefonoMovilEmpleado: '',
                  estadoVacunacionEmpleado: '',*/
            }],
            cabecerasEmpleado: [{
                    text: 'Cédula',
                    value: 'cedulaEmpleado'
                },
                {
                    text: 'Nombres',
                    value: 'nombresEmpleado'
                },
                {
                    text: 'Apellidos',
                    value: 'apellidosEmpleado'
                },
                {
                    text: 'Correo electrónico',
                    value: 'correoElectronicoEmpleado'
                },
                {
                    text: 'Acciones',
                    value: ''
                }
            ]

        };
    },

    mounted() {
        this.traerEmpleados()
    },
    computed: {
        tituloFormulario() {
            return this.indiceEditarEmpleado === -1 ? 'CREAR EMPLEADO' : 'EDITAR EMPLEADO'
        },
    },

    methods: {
        isValidCI(ci) {
            var isNumeric = true;
            var total = 0,
                individual;

            for (var position = 0; position < 10; position++) {
                // Obtiene cada posición del número de cédula
                // Se convierte a string en caso de que 'ci' sea un valor numérico
                individual = ci.toString().substring(position, position + 1)

                if (isNaN(individual)) {
                    console.log(ci, position, individual, isNaN(individual))
                    isNumeric = false;
                    break;
                } else {
                    // Si la posición es menor a 9
                    if (position < 9) {
                        // Si la posición es par, osea 0, 2, 4, 6, 8.
                        if (position % 2 == 0) {
                            // Si el número individual de la cédula es mayor a 5
                            if (parseInt(individual) * 2 > 9) {
                                // Se duplica el valor, se obtiene la parte decimal y se aumenta uno 
                                // y se lo suma al total
                                total += 1 + ((parseInt(individual) * 2) % 10);
                            } else {
                                // Si el número individual de la cédula es menor que 5 solo se lo duplica
                                // y se lo suma al total
                                total += parseInt(individual) * 2;
                            }
                            // Si la posición es impar (1, 3, 5, 7)
                        } else {
                            // Se suma el número individual de la cédula al total
                            total += parseInt(individual);
                        }
                    }
                }
            }

            if ((total % 10) != 0) {
                total = (total - (total % 10) + 10) - total;
            } else {
                total = 0;
            }

            if (isNumeric) {
                // El total debe ser igual al último número de la cédula
                //  console.log(ci, total, individual);
                // console.log(ci, typeof ci, ci.length)
                // La cédula debe contener al menos 10 dígitos
                if (ci.toString().length != 10) {
                    //  alert("La c\u00E9dula debe ser de: 10 d\u00EDgitos.");
                    return false;
                }

                // El número de cédula no debe ser cero
                if (parseInt(ci, 10) == 0) {
                    //  alert("La c\u00E9dula ingresada no puede ser cero.");
                    return false;
                }

                // El total debe ser igual al último número de la cédula
                if (total != parseInt(individual)) {
                    //  alert("La c\u00E9dula ingresada no es v\u00E1lida.");
                    return false;
                }

                // console.log('cédula válida', ci);
                return true;
            }
        },

        async guardarEmpelado(empleado) {
            
            if (empleado.cedulaEmpleado == undefined || empleado.nombresEmpleado == undefined || empleado.apellidosEmpleado == undefined || empleado.correoElectronicoEmpleado == undefined) {
                alert("Los campos no pueden quedar vacios!!")
            } else if (!/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(empleado.correoElectronicoEmpleado)) {
                alert("Correo electrónico no válido!");
            } else if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/.test(empleado.nombresEmpleado)) {
                alert("El nombre no puede contener Números!");
            } else if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/.test(empleado.apellidosEmpleado)) {
                alert("El apellido no puede contener Números!");
            } else if (!this.isValidCI(empleado.cedulaEmpleado)) {
                alert("Cédula no válida!!")
            } else {

                if (this.indiceEditarEmpleado > -1) {
                    let empleadoNuevo = {
                        cedulaEmpleado: this.indiceEditarEmpleado,
                        nombresEmpleado: empleado.nombresEmpleado,
                        apellidosEmpleado: empleado.apellidosEmpleado,
                        correoElectronicoEmpleado: empleado.correoElectronicoEmpleado.toLowerCase(),
                    }

                    await empleadoService.editarEmpleados(empleadoNuevo).then((result) => {
                        this.traerEmpleados();
                        this.dialogoNuevoEmpleado = false;
                        this.respuestaEmpleado = true;
                        this.textoRespuesta = 'Empleado editado correctamente!';
                    }).catch((err) => {});

                } else {
                    let empleadoNuevo = {
                        cedulaEmpleado: empleado.cedulaEmpleado,
                        nombresEmpleado: empleado.nombresEmpleado,
                        apellidosEmpleado: empleado.apellidosEmpleado,
                        correoElectronicoEmpleado: empleado.correoElectronicoEmpleado,
                    }

                    await empleadoService.crearEmpleados(empleadoNuevo).then((result) => {

                        if (result.status == 200) {
                            this.crearUsuario(result.data);
                            this.traerEmpleados();
                            this.dialogoNuevoEmpleado = false;
                            this.respuestaEmpleado = true;
                            this.textoRespuesta = 'Empleado creado correctamente';
                        }

                    }).catch((err) => {
                        alert("No se puedo guardar el registro!")
                    });

                }

            }

        },

        prepararNuevoEmpleado() {
            this.dialogoNuevoEmpleado = true
        },

        crearUsuario(item) {
            console.log(item)
            let tipoUsuarioEmpleado = 2;

            let usuario = {
                idUsuarioSistema: '',
                nombreUsuarioSistema: item.correoElectronicoEmpleado,
                contraseniaUsuarioSistema: this.crearContraseniaUsuario(item.apellidosEmpleado, item.cedulaEmpleado),
                nomEmpleado: {
                    idEmpleado: item.idEmpleado,
                },
                genTipoUsuarioSistema: {
                    idTipoUsuarioSistema: tipoUsuarioEmpleado
                }
            }

            usuarioService.crearUsuarioSistema(usuario).then((result) => {

            }).catch((err) => {});

        },

        crearContraseniaUsuario(apellidosEmpleado, cedulaEmpleado) {

            if (apellidosEmpleado === "" || cedulaEmpleado === "") {

            } else {
                // console.log(this.user.nombres.split());
                let caracteres = apellidosEmpleado.split(" ").join("").toUpperCase();
                // let apell = this.user.apellidos.split(" ").join("").toUpperCase();
                let cedu = cedulaEmpleado.split(" ").join("");
                let caracterEcu = "kr".toUpperCase();
                let caracterEspecial = "@/#$"
                var userna = '';
                var password = '';
                var userape = '';
                var ced = '';
                var passfinal = '';
                const charactersLength = caracterEspecial.length;
                var carEsp = '';
                /*  for (var i = 0; i < 2; i++) {
                      userape += apell[i];
                  }*/
                for (var i = 0; i < 5; i++) {
                    userna += caracteres[i];
                }
                for (var i = 0; i < 2; i++) {
                    ced += cedu.charAt(Math.floor(Math.random() * charactersLength));
                }
                for (var i = 0; i < 1; i++) {
                    carEsp += caracterEspecial.charAt(Math.floor(Math.random() * charactersLength))
                }

                password = ced + userna + caracterEcu + carEsp;
                // this.user.password = password;
                // console.log(this.user.username = username);
                return password;

            }

        },

        cerrarEmpleado() {
            this.dialogoNuevoEmpleado = false;
            this.$nextTick(() => {
                this.editarElementosEmpleado = Object.assign({}, this.defaultElementosEmpleado)
                this.indiceEditarEmpleado = -1;
            })
        },

        editarEmpleado(item) {
            this.indiceEditarEmpleado = item.cedulaEmpleado;
            this.editarElementosEmpleado = Object.assign({}, item);
            this.dialogoNuevoEmpleado = true;
        },

        traerEmpleados() {
            empleadoService.listarEmpleados().then((result) => {
                this.elementosEmpleado = result.data
            }).catch((err) => {});
        }

    },
};
</script>
