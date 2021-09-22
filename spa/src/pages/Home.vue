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
              <h4 class="card-title">0</h4>
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
    </div>
  </div>
</template>

<script>
import StatsCard from 'src/components/Cards/StatsCard.vue';

export default {
  components: {
    StatsCard,
  },
  data() {
    return {
      breadCrumbItems: [
        {
          text: 'Dashboard',
          active: true,
        },
      ],
    };
  },
};
</script>
