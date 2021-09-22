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
              <b-table
                hover
                :items="notasFiscais"
                :fields="fields"
                show-empty
                empty-text="nenhum dado encontrado"
              >
                <template #empty="scope">
                  <h4>{{ scope.emptyText }}</h4>
                </template>
                <template v-slot:cell(descricaoServico)="row">
                  <div :title="row.item.descricaoServico">
                    {{ longTextChecker(row.item.descricaoServico) }}
                  </div>
                </template>
              </b-table>
            </div>
          </card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("notasFiscais");

export default {
  data() {
    return {
      breadCrumbItems: [
        {
          text: "Dashboard",
          to: { name: "Home" },
        },
        {
          text: "Notas Fiscais",
          active: true,
        },
      ],
      fields: [
        {
          key: "numero",
          label: "Número",
        },
        {
          key: "valor",
          label: "Valor",
          formatter(value) {
            return parseFloat(value || 0).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            });
          },
        },
        {
          key: "mes",
          label: "Mês",
        },
        {
          key: "dataRecebimento",
          label: "Data de Recebimento",
        },
        {
          key: "descricaoServico",
          label: "Descrição do Serviço Prestado",
        },
      ],
    };
  },
  computed: {
    ...mapState(["notasFiscais"]),
  },
  methods: {
    longTextChecker(text) {
      if (text.length > 100) return `${text.slice(0, 60)}...`;
      else return text;
    },
  },
};
</script>

<style></style>
