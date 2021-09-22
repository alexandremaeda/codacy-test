<template>
  <div class="content">
    <div class="container-fluid">
      <b-row>
        <b-col cols="12">
          <b-breadcrumb :items="breadCrumbItems"></b-breadcrumb>
          <card>
            <h2 slot="header" class="card-title mb-3">Despesas</h2>
            <p>em breve</p>
            <b-skeleton-table
              :rows="5"
              :columns="4"
              :table-props="{ bordered: true, striped: true }"
            ></b-skeleton-table>
          </card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      breadCrumbItems: [
        {
          text: 'Dashboard',
          to: { name: 'Home' },
        },
        {
          text: 'Despesas',
          active: true,
        },
      ],
    };
  },
};
</script>

<style></style>
