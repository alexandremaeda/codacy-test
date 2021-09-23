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
            <b-alert v-model="alert" variant="success" dismissible fade>
              {{ alertMessage }}
            </b-alert>
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
                <template v-slot:cell(actions)="row">
                  <b-button
                    size="sm"
                    variant="info"
                    @click="update(row.item)"
                    class="mr-1"
                  >
                    Editar
                  </b-button>
                  <b-button
                    size="sm"
                    variant="warning"
                    @click="remove(row.item)"
                  >
                    Remover
                  </b-button>
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
const { mapState, mapActions } = createNamespacedHelpers("notasFiscais");

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
      alert: false,
      alertMessage: "",
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
          formatter(value) {
            try {
              return new Date(value).toLocaleDateString("pt-BR", {
                timeZone: "UTC",
              });
            } catch (err) {
              console.error(err);
              return value;
            }
          },
        },
        {
          key: "descricaoServico",
          label: "Descrição do Serviço Prestado",
        },
        {
          excludeFilter: true,
          key: "actions",
          label: "",
          class: "action",
        },
      ],
    };
  },
  computed: {
    ...mapState(["notasFiscais"]),
  },
  methods: {
    ...mapActions(["removeNotaFiscal", "updateNotaFiscal"]),
    longTextChecker(text) {
      if (text && text.length > 100) return `${text.slice(0, 60)}...`;
      else return text;
    },
    update(nf) {
      this.$router.push({
        name: "Atualizar Nota Fiscal",
        params: { id: nf.id },
      });
    },
    async remove(nf) {
      const isConfirm = await this.$swal({
        title: "Atenção!",
        text: `Deseja realmente Remover a Nota Fiscal número: ${nf.numero}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Sim",
        cancelButtonText: "Não",
      });

      if (!isConfirm.value) return;

      this.removeNotaFiscal(nf.id);

      this.alert = true;
      this.alertMessage = `Nota Fiscal número: ${nf.numero}, removida.`;
    },
  },
};
</script>

<style></style>
