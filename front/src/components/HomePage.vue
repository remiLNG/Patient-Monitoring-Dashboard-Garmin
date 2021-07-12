<template>
  <v-app id="accueil">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12" color="#F5F5F5">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1
                          class="text-center display-2 blue--text text--blue darken-1"
                        >
                          Connexion
                        </h1>
                        <v-form>
                          <v-text-field
                            v-model="Connection.email"
                            label="Email"
                            name="Email"
                            :rules="[rules.email, rules.space]"
                            type="text"
                            color="blue darken-1"
                            prepend-icon="mdi-email"
                          />
                          <v-text-field
                            v-model="Connection.password"
                            :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:append="() => (value = !value)"
                            :type="value ? 'password' : 'text'"
                            id="password"
                            label="Mot de passe"
                            name="password"
                            color="blue darken-1"
                            prepend-icon="mdi-lock"
                          />
                        </v-form>
                      </v-card-text>
                      <div class="text-center mt-3">
                        <v-btn
                          rounded
                          color="blue darken-1"
                          dark
                          v-on:click="loginUser"
                        >
                          Connexion
                        </v-btn>
                      </div>
                    </v-col>
                    <v-col cols="12" md="4" class="blue darken-1">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center mt-3 display-1">
                          Commencez votre journée avec nous
                        </h1>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step++"
                          >Créer un compte</v-btn
                        >
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row class="fill-height">
                    <v-col cols="12" md="4" class="blue darken-1">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">
                          Retour à la connexion
                        </h1>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step--"
                          >Connexion</v-btn
                        >
                      </div>
                    </v-col>

                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1
                          class="text-center display-2 blue--text text--blue darken-1"
                        >
                          S'inscrire
                        </h1>
                        <h4 class="text-center grey--text mt-3">
                          C'est rapide et facile.
                        </h4>
                        <v-form ref="form" v-model="form" class="pa-4 pt-6">
                          <v-text-field
                            v-model="User.prenom"
                            label="Prénom"
                            name="Name"
                            type="text"
                            color="blue darken-1"
                            :rules="[rules.required, rules.space, rules.letter]"
                            prepend-icon="mdi-account"
                          />
                          <v-text-field
                            v-model="User.nom"
                            label="Nom"
                            name="Name"
                            type="text"
                            color="blue darken-1"
                            :rules="[rules.required, rules.space, rules.letter]"
                            prepend-icon="mdi-account"
                          />
                          <v-text-field
                            v-model="User.telephone"
                            :rules="[rules.phoneNumber(10), rules.space]"
                            label="Téléphone"
                            name="Name"
                            type="number"
                            min="0"
                            max="99"
                            color="blue darken-1"
                            prepend-icon="mdi-phone"
                          />
                          <v-text-field
                            v-model="User.email"
                            :rules="[rules.email, rules.required, rules.space]"
                            label="Email"
                            name="Email"
                            type="text"
                            color="blue darken-1"
                            prepend-icon="mdi-email"
                          />

                          <v-text-field
                            v-model="User.password"
                            :rules="[
                              rules.password,
                              rules.length(6),
                              rules.required,
                              rules.space,
                            ]"
                            id="password"
                            label="Mot de passe"
                            name="password"
                            :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:append="() => (value = !value)"
                            :type="value ? 'password' : 'text'"
                            color="blue darken-1"
                            prepend-icon="mdi-lock"
                          />
                        </v-form>
                      </v-card-text>
                      <div class="text-center mt-n5">
                        <v-btn
                          rounded
                          color="blue darken-1"
                          :disabled="!form"
                          :loading="isLoading"
                          @click="createUser"
                          >Inscription</v-btn
                        >
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    step: 1,
    rules: {
      email: (v) =>
        !!(v || "").match(/@/) || "Veuillez entrer une adresse email valide",
      length: (len) => (v) =>
        (v || "").length >= len ||
        `Longueur de caractères non valable, obligatoire ${len}`,
      letter: (v) => isNaN(v) || "chiffres interdits",
      space: (v) => (v || "").indexOf(" ") < 0 || "espaces interdits",
      phoneNumber: (taille) => (v) =>
        (v || "").toString().length == taille.toString() ||
        `Veuillez rentrer un nombre correct`,
      password: (v) =>
        !!(v || "").match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/) ||
        "Le mot de passe doit contenir au moins 6 caracteres, une majuscule, une minuscule et un caractère numérique",
      required: (v) => !!v || "Ce champ est requis",
    },
    value: true,
    body: {},
    form: false,
    isLoading: false,
    BASEURL: "https://ter-garmin.herokuapp.com/api/users",
    User: { prenom: "", nom: "", email: "", password: "", telephone: "" },
    Connection: { email: "", password: "" },
    token: undefined,
  }),
  props: {
    source: String,
  },
  methods: {
    createUser: async function() {
      this.body = {
        firstname: this.User.prenom,
        lastname: this.User.nom,
        email: this.User.email,
        telephone: this.User.telephone,
        password: this.User.password,
      };

      const result = await fetch(this.BASEURL + "/register", {
        method: "POST",
        body: JSON.stringify(this.body),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (result.ok) {
        alert(
          "Inscription réussie : Bienvenue à vous M(me) " + this.body.lastname
        );
        this.step--;
      }
    },
    loginUser: async function() {
      this.body = {
        email: this.Connection.email,
        password: this.Connection.password,
      };

      await fetch(this.BASEURL + "/login", {
        method: "POST",
        body: JSON.stringify(this.body),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            this.$session.start();
            this.$session.set("token", data.token);
            this.$router.replace({ name: "Dashboard" });
          });
        } else {
          alert("Bad credentials");
        }
      });

      localStorage.email = this.body.email;
    },
  },
};
</script>

<style scoped>
#accueil {
  background-color: lightblue;
}
</style>
