<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <!-- <a class="navbar-brand" href="#">Dashboard</a> -->
      <button
        type="button"
        class="navbar-toggler navbar-toggler-right"
        :class="{ toggled: $sidebar.showSidebar }"
        aria-controls="navigation-index"
        aria-expanded="false"
        aria-label="Toggle navigation"
        @click="toggleSidebar"
      >
        <span class="navbar-toggler-bar burger-lines"></span>
        <span class="navbar-toggler-bar burger-lines"></span>
        <span class="navbar-toggler-bar burger-lines"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end">
        <ul class="nav navbar-nav mr-auto">
          <base-dropdown title="Mock">
            <a class="dropdown-item" href="#" @click.prevent="getNotasFiscais"
              >Carregar Notas Fiscais</a
            >
            <a class="dropdown-item" href="#" @click.prevent="clearNotasFiscais"
              >Limpar Notas Fiscais</a
            >
          </base-dropdown>
        </ul>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a href="#" class="nav-link" @click.prevent="logout"> Sair </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("notasFiscais");

export default {
  computed: {
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    },
  },
  data() {
    return {
      activeNotifications: false,
    };
  },
  methods: {
    ...mapActions(["getNotasFiscais", "clearNotasFiscais"]),
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    logout() {
      this.$emit("logout");
    },
  },
};
</script>
<style></style>
