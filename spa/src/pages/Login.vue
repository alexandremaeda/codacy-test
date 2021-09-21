<template>
  <section class="vh-100" style="background-color: #508bfc">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div class="card border-0 shadow rounded-3 my-5">
            <div class="card-body p-4 p-sm-5">
              <h5 class="card-title text-center mb-5 fw-light fs-5">
                Vibbraneo NF
              </h5>
              <form>
                <div class="form-floating mb-3">
                  <input
                    type="email"
                    class="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    v-model="userLogin"
                  />
                  <label for="floatingInput">Email address</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="password"
                    class="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    v-model="userPassword"
                  />
                  <label for="floatingPassword">Password</label>
                </div>
                <div class="d-grid">
                  <b-button variant="primary" size="lg" @click="submit"
                    >Entrar</b-button
                  >
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('auth');

export default {
  data() {
    return {
      userLogin: undefined,
      userPassword: undefined,
    };
  },
  computed: {
    ...mapState(['token', 'status']),
  },
  methods: {
    ...mapActions(['login']),
    async submit() {
      try {
        await this.login({
          login: this.userLogin,
          password: this.userPassword,
        });

        if (this.token) this.$router.push('/');
      } catch (err) {
        this.$swal.fire({
          title: 'Erro!',
          text: 'E-mail ou senha incorretos.',
          icon: 'error',
          confirmButtonText: 'Fechar',
        });
      }
    },
  },
};
</script>

<style lang="scss">
.bg {
  background: #007bff;
  background: linear-gradient(to right, #0062e6, #33aeff);
}
</style>
