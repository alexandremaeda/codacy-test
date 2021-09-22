<template>
  <div class="content">
    <div class="container-fluid">
      <b-row>
        <b-col cols="12">
          <b-breadcrumb :items="breadCrumbItems"></b-breadcrumb>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6" xl="3">
          <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-notes"></i>
            </div>
            <div slot="content">
              <p class="card-category">Notas Fiscais</p>
              <h4 class="card-title">{{ notasFiscaisLenght }}</h4>
            </div>
            <div slot="footer">
              <b-link :to="{ name: 'Adicionar Nota Fiscal' }">Adicionar</b-link>
            </div>
          </stats-card>
        </b-col>
        <b-col md="6" xl="3">
          <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-money-coins text-warning"></i>
            </div>
            <div slot="content">
              <p class="card-category">Despesas</p>
              <h4 class="card-title">0</h4>
            </div>
            <div slot="footer">
              <b-link :to="{ name: 'Adicionar Despesa' }" disabled
                >em breve</b-link
              >
            </div>
          </stats-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" lg="4">
          <chart-card
            :key="componentKey"
            :chart-data="chartDataNotasFiscais"
            chart-type="Pie"
          >
            <template slot="header">
              <h4 class="card-title">Faturamento</h4>
              <p class="card-category">
                Disponível de faturamento para emissão de Nota Fiscal sem que
                haja desenquadramento como MEI(R$
                {{ moneyFormat(dataNotasFiscais.faturamentoMei) }} anual)
              </p>
            </template>
            <template slot="footer">
              <div class="legend">
                <p class="m-0">
                  <b-badge variant="primary"
                    >faturamento:
                    {{ moneyFormat(dataNotasFiscais.faturamento) }}</b-badge
                  >
                </p>
                <p class="m-0">
                  <b-badge variant="success"
                    >restante:
                    {{
                      moneyFormat(dataNotasFiscais.faturamentoRemaining)
                    }}</b-badge
                  >
                </p>
              </div>
            </template>
          </chart-card>
        </b-col>
        <b-col cols="12" lg="8">
          <chart-card
            :key="componentKey"
            :chart-data="barChartNotasFiscaisByMonth.data"
            :chart-options="barChartNotasFiscaisByMonth.options"
            :chart-responsive-options="
              barChartNotasFiscaisByMonth.responsiveOptions
            "
            chart-type="Bar"
          >
            <template slot="header">
              <h4 class="card-title">Nota Fiscal por Mês</h4>
              <p class="card-category">Emissão de Notas Fiscais mês a mês</p>
            </template>
          </chart-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import StatsCard from 'src/components/Cards/StatsCard.vue';
import ChartCard from 'src/components/Cards/ChartCard.vue';

export default {
  components: {
    StatsCard,
    ChartCard,
  },
  data() {
    return {
      breadCrumbItems: [
        {
          text: 'Dashboard',
          active: true,
        },
      ],
      // necessary to reload chartist
      componentKey: 0,
    };
  },
  computed: {
    notasFiscaisLenght() {
      return this.$store.getters['notasFiscais/length'];
    },
    faturamentoNotasFiscais() {
      return this.$store.getters['notasFiscais/getFaturamento'](2021);
    },
    dataNotasFiscais() {
      const faturamentoMei = 81000;
      const faturamento = this.faturamentoNotasFiscais;
      const faturamentoRemaining = faturamentoMei - faturamento;
      const faturamentoPor = ((faturamento / faturamentoMei) * 100).toFixed(2);
      const restantePor = (100 - faturamentoPor).toFixed(2);

      return {
        faturamentoMei,
        faturamento,
        faturamentoRemaining,
        faturamentoPor,
        restantePor,
      };
    },
    chartDataNotasFiscais() {
      const { faturamento, faturamentoPor, restantePor } =
        this.dataNotasFiscais;

      if (faturamento === 0) {
        return {
          labels: [`${restantePor}%`],
          series: [restantePor],
        };
      } else {
        return {
          labels: [`${faturamentoPor}%`, `${restantePor}%`],
          series: [faturamentoPor, restantePor],
        };
      }
    },
    notasFiscaisByMonth() {
      const notasFiscais = this.$store.getters['notasFiscais/getNotasFiscais'];
      let lengthByMonth = [];

      for (let i = 1; i <= 12; i++) {
        const currentMonth = notasFiscais.filter((nota) => nota.mes === i);
        lengthByMonth.push(currentMonth.length);
      }

      return lengthByMonth;
    },
    barChartNotasFiscaisByMonth() {
      return {
        data: {
          labels: [
            'Jan',
            'Fev',
            'Mar',
            'Abr',
            'Mai',
            'Jun',
            'Jul',
            'Ago',
            'Set',
            'Out',
            'Nov',
            'Dez',
          ],
          series: [this.notasFiscaisByMonth],
        },
        options: {
          onlyInteger: true,
          referenceValue: 5,
          seriesBarDistance: 1,
          axisX: {
            showGrid: false,
          },
          height: '245px',
        },
        responsiveOptions: [
          [
            'screen and (max-width: 640px)',
            {
              seriesBarDistance: 1,
              axisX: {
                labelInterpolationFnc(value) {
                  return value[0];
                },
              },
            },
          ],
        ],
      };
    },
  },
  methods: {
    moneyFormat(value) {
      return parseFloat(value || 0).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });
    },
  },
  watch: {
    // on get data, update chartlist component
    // REVIEW THIS
    dataNotasFiscais() {
      this.componentKey++;
    },
  },
};
</script>

<style lang="scss">
.ct-series-a .ct-slice-pie {
  fill: #007bff;
}
.ct-series-b .ct-slice-pie {
  fill: #28a745;
}
</style>
