<template>
  <div class="wrapper">
    <side-bar>
      <mobile-menu slot="content" @logout="logout"></mobile-menu>
      <sidebar-link :to="{ name: 'Home' }">
        <i class="nc-icon nc-chart-pie-35"></i>
        <p>Dashboard</p>
      </sidebar-link>
      <sidebar-link :to="{ name: 'Notas Fiscais' }">
        <i class="nc-icon nc-notes"></i>
        <p>Notas Fiscais</p>
      </sidebar-link>
      <sidebar-link to="/admin/table-list">
        <i class="nc-icon nc-notes"></i>
        <p>Despesas</p>
      </sidebar-link>
      <sidebar-link to="/admin/user">
        <i class="nc-icon nc-preferences-circle-rotate"></i>
        <p>Preferências</p>
      </sidebar-link>
    </side-bar>
    <div class="main-panel">
      <top-navbar @logout="logoutClick"></top-navbar>

      <dashboard-content @click="toggleSidebar"> </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import TopNavbar from './TopNavbar.vue';
import ContentFooter from './ContentFooter.vue';
import DashboardContent from './Content.vue';
import MobileMenu from './MobileMenu.vue';

import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('auth');

export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu,
  },
  methods: {
    ...mapActions(['logout']),
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    logoutClick() {
      this.$swal
        .fire({
          title: 'Você tem certeza?',
          icon: 'warning',
          showCancelButton: true,
          // confirmButtonColor: '#3085d6',
          // cancelButtonColor: '#d33',
          confirmButtonText: 'Sim',
          cancelButtonText: 'Não',
        })
        .then((result) => {
          if (result.isConfirmed) {
            const Toast = this.$swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', this.$swal.stopTimer);
                toast.addEventListener('mouseleave', this.$swal.resumeTimer);
              },
            });

            Toast.fire({
              icon: 'success',
              title: 'Você se desconectou',
            });

            this.logout();
            this.$router.push('/login');
          }
        });
    },
  },
};
</script>
