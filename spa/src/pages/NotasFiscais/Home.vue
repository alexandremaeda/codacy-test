<template>
  <div class="content">
    <div class="container-fluid">
      <b-row>
        <b-col cols="12">
          <b-breadcrumb :items="breadCrumbItems"></b-breadcrumb>
          <card>
            <h2 slot="header" class="card-title mb-3">Notas Fiscais</h2>
            <div class="mb-5">
              <b-button
                variant="primary"
                :to="{ name: 'Adicionar Nota Fiscal' }"
                >Lançar Nota Fiscal</b-button
              >
            </div>
            <div class="table-responsive">
              <b-table hover :items="items" :fields="fields"></b-table>
            </div>
          </card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
const tableData = [
  {
    id: 1,
    numero: 'Dakota Rice',
    valor: 'R$36.738',
    mes: '09',
    dataRecebimento: '12/10/2021',
  },
  {
    id: 2,
    numero: 'Dakota Rice',
    valor: 'R$36.738',
    mes: '09',
    dataRecebimento: '12/10/2021',
  },
];

export default {
  components: {
    // LTable,
  },
  data() {
    return {
      breadCrumbItems: [
        {
          text: 'Dashboard',
          to: { name: 'Home' },
        },
        {
          text: 'Notas Fiscais',
          active: true,
        },
      ],
      fields: [
        {
          key: 'id',
          label: 'Id',
        },
        {
          key: 'numero',
          label: 'Número',
        },
        {
          key: 'valor',
          label: 'Valor',
        },
        {
          key: 'mes',
          label: 'Mês',
        },
        {
          key: 'dataRecebimento',
          label: 'Data de Recebimento',
        },
      ],
      items: tableData,
    };
  },
};
</script>

<style></style>
