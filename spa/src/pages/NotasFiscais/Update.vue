<template>
  <div class="content">
    <div class="container-fluid">
      <b-row>
        <b-col cols="12">
          <b-breadcrumb :items="breadCrumbItems"></b-breadcrumb>
          <card>
            <h2 slot="header" class="card-title mb-3">Atualizar Nota Fiscal</h2>
            <b-alert v-model="alert" variant="success" dismissible fade>
              {{ alertMessage }}
            </b-alert>
            <validation-observer ref="observer" v-slot="{ invalid, validate }">
              <b-form
                @submit.prevent="validate().then(submit)"
                @reset.prevent="reset"
              >
                <b-row>
                  <b-col cols="12" lg="3">
                    <validation-provider
                      name="Número"
                      rules="required"
                      v-slot="{ valid, errors }"
                    >
                      <b-form-group
                        id="input-group-1"
                        label="Número"
                        label-for="input-1"
                      >
                        <b-form-input
                          id="numero"
                          type="number"
                          placeholder="Número da Nota Fiscal"
                          v-model="notaFiscal.numero"
                          :state="valid"
                        ></b-form-input>
                        <b-form-invalid-feedback :state="valid">
                          {{ errors[0] }}
                        </b-form-invalid-feedback>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                  <b-col cols="12" lg="3">
                    <validation-provider
                      name="Valor"
                      rules="required"
                      v-slot="{ valid, errors }"
                    >
                      <b-form-group
                        id="input-group-2"
                        label="Valor"
                        label-for="valor"
                      >
                        <money
                          v-bind="moneyMask"
                          v-model="notaFiscal.valor"
                          id="valor"
                          :class="{
                            'form-control': true,
                            'is-invalid': !valid,
                            'is-valid': valid,
                          }"
                        ></money>
                        <b-form-invalid-feedback :state="valid">
                          {{ errors[0] }}
                        </b-form-invalid-feedback>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="12" lg="3">
                    <validation-provider
                      name="Mês"
                      rules="required"
                      v-slot="{ valid, errors }"
                    >
                      <b-form-group
                        id="input-group-3"
                        label="Mês"
                        label-for="mes"
                        description="Mês a que se refere o serviço prestado"
                      >
                        <b-form-select
                          id="mes"
                          v-model="notaFiscal.mes"
                          :options="meses"
                          :state="valid"
                        ></b-form-select>
                        <b-form-invalid-feedback :state="valid">
                          {{ errors[0] }}
                        </b-form-invalid-feedback>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                  <b-col cols="12" lg="3">
                    <validation-provider
                      name="Data de Recebimento"
                      rules="required"
                      v-slot="{ valid, errors }"
                    >
                      <b-form-group
                        id="input-group-4"
                        label="Data de Recebimento"
                        label-for="dataRecebimento"
                      >
                        <b-form-input
                          type="date"
                          id="dataRecebimento"
                          v-model="notaFiscal.dataRecebimento"
                          :state="valid"
                          placeholder="Data de Recebimento"
                        ></b-form-input>
                        <b-form-invalid-feedback :state="valid">
                          {{ errors[0] }}
                        </b-form-invalid-feedback>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="12" lg="6">
                    <b-form-group
                      id="input-group-5"
                      label="Descrição do serviço prestado"
                      label-for="descricaoServico"
                    >
                      <b-form-textarea
                        id="descricaoServico"
                        v-model="notaFiscal.descricaoServico"
                        placeholder="Descrição do serviço prestado..."
                        rows="3"
                        max-rows="6"
                      ></b-form-textarea>
                    </b-form-group>
                  </b-col>
                </b-row>

                <b-button
                  :disabled="invalid"
                  type="submit"
                  variant="primary"
                  class="mr-1"
                  >Atualizar</b-button
                >
                <b-button variant="warning" @click.prevent="remove"
                  >Remover</b-button
                >
              </b-form>
            </validation-observer>
          </card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { Money } from "v-money";

import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("notasFiscais");

export default {
  components: { Money },
  data() {
    return {
      breadCrumbItems: [
        {
          text: "Dashboard",
          to: { name: "Home" },
        },
        {
          text: "Notas Fiscais",
          to: { name: "Notas Fiscais" },
        },
        {
          text: "Atualizar Nota Fiscal",
          active: true,
        },
      ],
      moneyMask: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        precision: 2,
        masked: this.masked || false,
      },
      notaFiscal: {},
      meses: [
        { value: 1, text: "01 - Janeiro" },
        { value: 2, text: "02 - Fevereiro" },
        { value: 3, text: "03 - Março" },
        { value: 4, text: "04 - Abril" },
        { value: 5, text: "05 - Maio" },
        { value: 6, text: "06 - Junho" },
        { value: 7, text: "07 - Julho" },
        { value: 8, text: "08 - Agosto" },
        { value: 9, text: "09 - Setembro" },
        { value: 10, text: "10 - Outubro" },
        { value: 11, text: "11 - Novembro" },
        { value: 12, text: "12 - Dezembro" },
      ],
      alert: false,
      alertMessage: "",
    };
  },
  methods: {
    ...mapActions(["updateNotaFiscal", "removeNotaFiscal"]),
    async submit(e) {
      this.updateNotaFiscal(this.notaFiscal);

      this.alert = true;
      this.alertMessage = `Nota Fiscal número ${this.notaFiscal.numero} atualizada.`;
    },
    async remove() {
      const isConfirm = await this.$swal({
        title: "Atenção!",
        text: `Deseja realmente Remover a Nota Fiscal número: ${this.notaFiscal.numero}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Sim",
        cancelButtonText: "Não",
      });

      if (!isConfirm.value) return;

      this.removeNotaFiscal(this.notaFiscal.id);

      await this.$swal({
        title: "Atenção!",
        text: `Nota Fiscal número: ${this.notaFiscal.numero}, removida`,
        icon: "success",
      });

      this.$router.push({
        name: "Notas Fiscais",
      });
    },
  },
  async created() {
    const id = this.$route.params.id;
    const foundNF = this.$store.getters["notasFiscais/getNotaFiscal"](id);

    if (foundNF) this.notaFiscal = { ...foundNF };
    else {
      await this.$swal({
        title: "Atenção!",
        text: `Nota Fiscal id: ${id}, não encontrada.`,
        icon: "warning",
      });

      this.$router.push({
        name: "Notas Fiscais",
      });
    }
  },
};
</script>

<style></style>
