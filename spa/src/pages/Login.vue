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
              <b-alert dismissible show variant="info">
                <p class="font-italic m-0">Para acessar, utilizar:</p>
                <p class="font-italic m-0">E-mail: admin@test.com</p>
                <p class="font-italic m-0">Senha: 123</p>
              </b-alert>
              <validation-observer ref="observer" v-slot="{ invalid }">
                <b-form @submit.prevent="submit">
                  <validation-provider
                    name="E-mail"
                    rules="required|email"
                    v-slot="{ valid, errors }"
                  >
                    <b-form-group
                      id="input-group-1"
                      label="E-mail"
                      label-for="mail"
                    >
                      <b-form-input
                        id="mail"
                        placeholder="E-mail"
                        v-model="userLogin"
                        :state="errors[0] ? false : valid ? true : null"
                      ></b-form-input>
                      <b-form-invalid-feedback :state="valid">
                        {{ errors[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                  <validation-provider
                    name="Senha"
                    rules="required"
                    v-slot="{ valid, errors }"
                  >
                    <b-form-group
                      id="input-group-2"
                      label="Senha"
                      label-for="password"
                    >
                      <b-form-input
                        type="password"
                        id="passowrd"
                        placeholder="Senha"
                        v-model="userPassword"
                        :state="errors[0] ? false : valid ? true : null"
                      ></b-form-input>
                      <b-form-invalid-feedback :state="valid">
                        {{ errors[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                  <b-button
                    variant="primary"
                    size="lg"
                    @click="submit"
                    :disabled="invalid"
                    >Entrar</b-button
                  >
                </b-form>
              </validation-observer>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("auth");

export default {
  data() {
    return {
      userLogin: null,
      userPassword: undefined,
    };
  },
  computed: {
    ...mapState(["token", "status"]),
  },
  methods: {
    ...mapActions(["login"]),
    async submit() {
      try {
        const isValid = await this.$refs.observer.validate();
        if (isValid) {
          await this.login({
            login: this.userLogin,
            password: this.userPassword,
          });
          if (this.token) {
            const Toast = this.$swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", this.$swal.stopTimer);
                toast.addEventListener("mouseleave", this.$swal.resumeTimer);
              },
            });
            Toast.fire({
              icon: "success",
              title: "Você conectou",
            });
            if (this.$route.query && this.$route.query.redirect)
              this.$router.push(this.$route.query.redirect);
            else this.$router.push("/");
          } else {
            requestAnimationFrame(() => {
              this.$refs.observer.reset();
            });
            throw new Error("E-mail ou senha incorretos.");
          }
        }
      } catch (err) {
        this.$swal.fire({
          title: "Erro!",
          text: "E-mail ou senha incorretos.",
          icon: "error",
          confirmButtonText: "Fechar",
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
