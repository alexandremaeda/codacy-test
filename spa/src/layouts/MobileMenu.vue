<template>
  <ul class="nav nav-mobile-menu">
    <base-dropdown title="Mock">
      <a class="dropdown-item" href="#" @click.prevent="getNotasFiscais"
        >Carregar Notas Fiscais</a
      >
      <a class="dropdown-item" href="#" @click.prevent="clearNotasFiscais"
        >Limpar Notas Fiscais</a
      >
    </base-dropdown>

    <li class="nav-item">
      <a class="nav-link" href="#pablo">
        <span class="no-icon">Sair</span>
      </a>
    </li>
  </ul>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("notasFiscais");

export default {
  name: "mobile-menu",
  methods: {
    ...mapActions(["getNotasFiscais", "clearNotasFiscais"]),
  },
};
</script>
<style></style>
