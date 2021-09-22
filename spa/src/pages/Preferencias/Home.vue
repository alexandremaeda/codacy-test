<template>
  <div class="content">
    <div class="container-fluid">
      <b-row>
        <b-col cols="12">
          <b-breadcrumb :items="breadCrumbItems"></b-breadcrumb>
          <card>
            <h2 slot="header" class="card-title mb-3">Preferências</h2>
            <p>em breve</p>
            <b-card>
              <b-skeleton animation="wave" width="85%"></b-skeleton>
              <b-skeleton animation="wave" width="55%"></b-skeleton>
              <b-skeleton animation="wave" width="70%"></b-skeleton>
            </b-card>
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
          text: "Dashboard",
          to: { name: "Home" },
        },
        {
          text: "Preferências",
          active: true,
        },
      ],
    };
  },
};
</script>

<style></style>
