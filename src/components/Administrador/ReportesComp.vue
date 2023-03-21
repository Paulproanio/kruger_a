<template>
<div>
    <v-card-text></v-card-text>
    <v-card>
        <v-card-title class="primary white--text">REPORTES</v-card-title>
        <v-card-text></v-card-text>
        <v-card-text>
            <v-layout wrap>
                <v-flex md2>
                    <v-select :items="elementosEstadoVacuna" item-text="texto" item-value="estadoVacunacionEmpleado" outlined dense v-model="estadoVacunacionEmpleado"></v-select>
                </v-flex>
                <v-flex md2>
                    <v-btn class="primary" @click="listarEmpleadosEstadoVacuna(estadoVacunacionEmpleado)">
                        <v-icon>radio_button_checked</v-icon>
                    </v-btn>
                </v-flex>
                <v-flex md2>
                    <v-select :items="elementosTipoVacuna" item-text="nombreTipoVacunaCertificadoEmpleado" item-value="idTipoVacunaCertificadoEmpleado" outlined dense v-model="idTipoVacunaCertificadoEmpleado"></v-select>
                </v-flex>
                <v-flex md1>
                    <v-btn class="primary" @click="listarTipoVacuna(idTipoVacunaCertificadoEmpleado)">
                        <v-icon>vaccines</v-icon>
                    </v-btn>
                </v-flex>
                <v-flex md2>
                    <v-dialog ref="dialogoFechaInicial" v-model="modalFechaInicio" :return-value.sync="fechaInicial" persistent width="290px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field class=" ml-2" dense outlined v-model="fechaInicial" label="Fecha inicial.." append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-model="fechaInicial" scrollable :first-day-of-week="1" locale="es" color="secondary">
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="modalFechaInicio = false">
                                Cancelar
                            </v-btn>
                            <v-btn text color="primary" @click="$refs.dialogoFechaInicial.save(fechaInicial)">
                                OK
                            </v-btn>
                        </v-date-picker>
                    </v-dialog>
                </v-flex>
                <v-flex md2>
                    <v-dialog ref="dialogoFechaFinal" v-model="modalFechaFinal" :return-value.sync="fechaFinal" persistent width="290px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field class=" ml-2" dense outlined v-model="fechaFinal" label="Fecha final.." append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-model="fechaFinal" scrollable :first-day-of-week="1" locale="es" color="secondary">
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="modalFechaFinal = false">
                                Cancelar
                            </v-btn>
                            <v-btn text color="primary" @click="$refs.dialogoFechaFinal.save(fechaFinal)">
                                OK
                            </v-btn>
                        </v-date-picker>
                    </v-dialog>
                </v-flex>
                <v-flex md1>
                    <v-btn class="primary" @click="buscarPorRangoFechas(fechaInicial,fechaFinal)">
                        <v-icon>list</v-icon>
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-card-text>
        <v-card-text>
            <v-data-table dense :headers="cabecerasEmpleado" :items="elementosEmpleado">
                <template v-slot:item="{ item }">
                    <tr>
                        <td> {{item.cedulaEmpleado}} </td>
                        <td> {{item.nombresEmpleado}} </td>
                        <td> {{item.apellidosEmpleado}} </td>
                        <td v-if="item.idEmpleado > 0">
                            <v-chip label v-if="item.estadoVacunacionEmpleado == true" class="primary" small>
                                <v-icon color="white" small>check</v-icon>
                            </v-chip>
                            <v-chip label v-else-if="item.estadoVacunacionEmpleado == false" class="error" small>
                                <v-icon color="white" small>close</v-icon>
                            </v-chip>
                            <v-chip v-else>
                            </v-chip>

                        </td>
                    </tr>
                </template>
            </v-data-table>
        </v-card-text>

    </v-card>

</div>
</template>

<script>
import certificadoService from '@/services/certificado.service';
import empleadoService from '@/services/empleado.service'
export default {
    name: 'KrugerFrReportesComp',

    data() {
        return {
            modalFechaInicio: false,
            modalFechaFinal: false,
            fechaInicial: '',
            fechaFinal: '',
            idTipoVacunaCertificadoEmpleado: '',
            estadoVacunacionEmpleado: '',
            elementosEstadoVacuna: [{
                id: 1,
                estadoVacunacionEmpleado: true,
                texto: 'Vacunado'
            }, {
                id: 2,
                estadoVacunacionEmpleado: false,
                texto: 'NO Vacunado'
            }],
            elementosEmpleado: [{
                cedulaEmpleado: '',
                nombresEmpleado: '',
                apellidosEmpleado: '',
                correoElectronicoEmpleado: '',
                fechaNacimientoEmpleado: '',
                direccionDomicilioEmpleado: '',
                telefonoMovilEmpleado: '',
                estadoVacunacionEmpleado: '',
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
                    text: 'Estado vacunación',
                    value: 'estadoVacunacionEmpleado'
                }
            ],
            elementosTipoVacuna: [{
                idTipoVacunaCertificadoEmpleado: '',
                nombreTipoVacunaCertificadoEmpleado: ''
            }],

        };
    },

    mounted() {
        this.traerTipoVacuna()

    },

    methods: {

        sumarDiasAux(fe, dias) {
            let fecha;
            fecha = new Date(fe);
            fecha.setDate(fecha.getDate() + dias);
            this.formatearFechaSigDotacion(fecha.setDate(fecha.getDate() + dias))
        },
        formatearFechaSigDotacion(fecha) {
            let dia, mes, anio;
            fecha = new Date(fecha);
            anio = fecha.getFullYear();
            mes = fecha.getMonth() + 1;
            dia = fecha.getDate();
            if (dia < 10) {
                dia = '0' + dia;
            }
            if (mes < 10) {
                mes = '0' + mes;
            }
            return anio + '-' + mes + '-' + dia;
        },

        buscarPorRangoFechas(fechaInicial, fechaFinal) {
            this.elementosEmpleado = []
            this.estadoVacunacionEmpleado = '';
            this.idTipoVacunaCertificadoEmpleado = '';
            empleadoService.empleadosPorRangoFechas(fechaInicial, this.sumarDiasAux(fechaFinal, 1)).then((result) => {
                this.elementosEmpleado = result.data
            }).catch((err) => {});
        },
        listarTipoVacuna(tipoVacuna) {
            this.elementosEmpleado = []
            this.estadoVacunacionEmpleado = '';
            this.fechaInicial = '';
            this.fechaFinal = '';
            empleadoService.empleadosPorTipoVacuna(tipoVacuna).then((result) => {
                this.elementosEmpleado = result.data
            }).catch((err) => {});
        },

        listarEmpleadosEstadoVacuna(estadoVacunacion) {
            this.elementosEmpleado = []
            this.idTipoVacunaCertificadoEmpleado = '';
            this.fechaInicial = '';
            this.fechaFinal = '';
            empleadoService.empleadosPorEstadoVacuna(estadoVacunacion).then((result) => {
                this.elementosEmpleado = result.data
            }).catch((err) => {});
        },

        traerTipoVacuna() {
            certificadoService.listarTipoVacuna().then((result) => {
                this.elementosTipoVacuna = result.data
            }).catch((err) => {});
        }

    },
};
</script>
