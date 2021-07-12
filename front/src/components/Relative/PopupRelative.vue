<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="800px">
      <template v-slot:activator="{ on }">
        <v-btn outlined color="white" dark v-on="on">Ajouter un proche</v-btn>
      </template>
      <v-card v-if="this.user.premium || this.links.length < 2">
        <v-card-title class="justify-center">
          <h3>Choisissez comment ajouter votre proche :</h3>
          <v-chip-group v-model="selec" class="ma-8" mandatory>
            <v-chip @click="setNouveau()">Nouveau proche</v-chip>
            <v-chip @click="setExist()">Proche deja existant</v-chip>
          </v-chip-group>
        </v-card-title>
        <v-divider class="mt-4"></v-divider>
        <v-form class="px-3" ref="form" v-model="form">
          <div v-if="this.nouveau">
            <v-row>
              <v-col>
                <v-text-field
                  v-model="relatives.nom"
                  label="Nom"
                  name="lastname"
                  type="text"
                  color="blue darken-1"
                  prepend-icon="mdi-account"
                  :rules="[rules.required, rules.space, rules.letter]"
                />
              </v-col>
              <v-col>
                <v-text-field
                  v-model="relatives.prenom"
                  label="Prenom"
                  name="firstname"
                  type="text"
                  color="blue darken-1"
                  prepend-icon="mdi-account"
                  :rules="[rules.required, rules.space, rules.letter]"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="relatives.age"
                  label="Age"
                  name="age"
                  type="number"
                  min="0"
                  color="blue darken-1"
                  prepend-icon="mdi-calendar"
                  :rules="[rules.required, rules.length(3)]"
                />
              </v-col>
              <v-col>
                <v-select
                  v-model="relatives.sexe"
                  label="Sexe"
                  name="sexe"
                  :items="sexe"
                  color="blue darken-1"
                  prepend-icon="mdi-gender-transgender"
                  :rules="[rules.required]"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="relatives.poids"
                  label="Poids"
                  name="weight"
                  type="number"
                  color="blue darken-1"
                  prepend-icon="mdi-weight-kilogram"
                  suffix="kg"
                  min="0"
                  :rules="[rules.required, rules.poids(3)]"
                />
              </v-col>
              <v-col>
                <v-text-field
                  v-model="relatives.taille"
                  label="Taille"
                  name="height"
                  type="number"
                  min="0"
                  color="blue darken-1"
                  prepend-icon="mdi-human-male-height"
                  suffix="cm"
                  :rules="[rules.required, rules.taille(3)]"
                />
              </v-col>
            </v-row>
            <v-divider class="mt-12"></v-divider>
            <v-card-actions>
              <v-btn color="red" text @click="$refs.form.reset()">
                Reset
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false"
                >Fermer</v-btn
              >
              <v-btn
                color="green"
                text
                outlined
                @click="createRelative"
                :disabled="!form"
                >Valider</v-btn
              >
            </v-card-actions>
          </div>
          <div v-if="this.exist">
            <v-col>
              <v-text-field
                v-model="existR.id"
                label="ID"
                name="id"
                type="text"
                color="blue darken-1"
                prepend-icon="mdi-account"
                append-outer-icon="mdi-help-circle"
                @click:append-outer="dialogbis = true"
                :rules="[rules.required, rules.space]"
              />
              <v-dialog v-model="dialogbis" max-width="380">
                <v-card>
                  <v-card-title class="headline">
                    Où trouver l'ID du proche ?
                  </v-card-title>
                  <v-card-text>
                    Demandez à votre proche ayant deja ajouté la personne à
                    surveiller en question, de vous donner l'ID de ce
                    dernier.<br />
                    Pour cela il devra selectionner la personne voulue dans son
                    dashboard et cliquer sur le bouton rouge avec l'icône
                    partager.<br />
                    Il pourra alors copier l'ID et vous le transmettre.
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="green darken-1"
                      text
                      @click="dialogbis = false"
                    >
                      Ok
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-col>
            <v-card-actions>
              <v-btn color="red" text @click="$refs.form.reset()">
                Reset
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="
                  setNouveau();
                  dialog = false;
                "
                >Fermer</v-btn
              >
              <v-btn
                color="green"
                text
                outlined
                @click="addExistRelative"
                :disabled="!form"
                >Valider</v-btn
              >
            </v-card-actions>
          </div>
        </v-form>
      </v-card>
      <v-card v-else>
        <v-card-title class="justify-center">
          <h3>Passez Premium !</h3>
        </v-card-title>
        <v-card-text class="text-center">
          Pour ajouter plus de <b>2</b> proches a votre Dashboard passez Premium
          !
        </v-card-text>
        <v-card-actions class="text-center">
          <v-btn
            class="red--text"
            id="retour"
            outlined
            text
            @click="dialog = false"
          >
            Retour
          </v-btn>
          <v-flex class="justify-center">
            <PopupPremium v-bind:user="user" />
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import PopupPremium from "../Dashboard/PopupPremium.vue";
// import Crypto from "./Sha1Encode";
// const pack = require("locutus/php/misc/pack");

export default {
  name: "Test",
  data: () => ({
    dialog: false,
    dialogbis: false,
    title: "",
    content: "",
    form: false,
    exist: false,
    nouveau: true,
    selec: 0,
    relative1: [],
    relatives: {
      prenom: "",
      nom: "",
      age: "",
      sexe: "",
      poids: "",
      taille: "",
    },
    existR: {
      id: "",
    },
    inputRules: [(v) => v.length >= 3 || "Minimum lenght is 3 charachters"],
    sexe: ["Homme", "Femme", "Autre"],
    rules: {
      required: (v) => !!v || "Ce champ est requis",
      letter: (v) => isNaN(v) || "chiffres interdits",
      space: (v) => (v || "").indexOf(" ") < 0 || "espaces interdits",
      length: (taille) => (v) =>
        ((v || "").toString().length <= taille.toString() &&
          (v || "").toString() >= 20 &&
          (v || "").toString() <= 125) ||
        `Veuillez rentrer un nombre correct`,
      taille: (taille) => (v) =>
        ((v || "").toString().length <= taille.toString() &&
          (v || "").toString() >= 110 &&
          (v || "").toString() <= 250) ||
        `Veuillez rentrer un nombre correct`,
      poids: (taille) => (v) =>
        ((v || "").toString().length <= taille.toString() &&
          (v || "").toString() >= 40 &&
          (v || "").toString() <= 200) ||
        `Veuillez rentrer un nombre correct`,
    },
    BASEURL: "https://ter-garmin.herokuapp.com/api/relatives",
  }),
  components: {
    PopupPremium,
  },
  props: {
    links: {
      type: Array,
    },
    user: {},
  },
  methods: {
    makeid(length) {
      var result = [];
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result.push(
          characters.charAt(Math.floor(Math.random() * charactersLength))
        );
      }
      return result.join("");
    },

    // confirmRelativeRequest: async function() {
    //   await fetch("http://localhost:5000/api/relatives/confirmRequest", {
    //     method: "POST",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //   });
    // },

    requestOauthBack: async function() {
      let backURL = "http://localhost:5000/api/relatives/confirmRequest";

      let xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
          console.log(this.response);
        }
      });

      xhr.open("GET", backURL);

      xhr.setRequestHeader(
        "Accept",  "application/json",
          "Content-Type" , "application/json",
      )
      console.log("requête envoyée");
      xhr.send();
    },

    // confirmRelative: async function() {
    //   let requestOptions = {
    //     method: "POST",
    //     mode: "cors",
    //     Accept: "application/text",
    //   };

    //   let currentURL =
    //     "https://connectapi.garmin.com/oauth-service/oauth/request_token?";
    //   let oauth_consumer_key = "50658631-7f95-428e-995a-1d4a84f81255";
    //   let oauth_consumer_secret = "qs6QrMQtQW0W2nOo08ipzlL9sZwupmRJyjF";
    //   let oauth_nonce = this.makeid(15);
    //   let oauth_timestamp = Math.round(Date.now() / 1000);
    //   let baseString =
    //     "POST&" +
    //     encodeURIComponent(
    //       "https://connectapi.garmin.com/oauth-service/oauth/request_token"
    //     ) +
    //     "&" +
    //     encodeURIComponent(
    //       "oauth_consumer_key=" +
    //         oauth_consumer_key +
    //         "&oauth_nonce=" +
    //         oauth_nonce +
    //         "&oauth_signature_method=HMAC-SHA1" +
    //         "&oauth_timestamp=" +
    //         oauth_timestamp +
    //         "&oauth_version=1.0"
    //     );
    //   let oauth_signature_base = Crypto.sha1_hmac(
    //     baseString,
    //     oauth_consumer_secret + "&"
    //   );
    //   let oauth_signature = encodeURIComponent(
    //     btoa(pack("H*", oauth_signature_base))
    //   );

    //   fetch(
    //     currentURL +
    //       "oauth_consumer_key=" +
    //       oauth_consumer_key +
    //       "&oauth_nonce=" +
    //       oauth_nonce +
    //       "&oauth_signature_method=HMAC-SHA1" +
    //       "&oauth_timestamp=" +
    //       oauth_timestamp +
    //       "&oauth_version=1.0" +
    //       "&oauth_signature=" +
    //       oauth_signature,
    //     requestOptions
    //   )
    //     .then((response) => response.text())
    //     .then((response) => console.log(response.type));
    // },

    createRelative: async function() {
      this.body = {
        userEmail: localStorage.email,
        firstname: this.relatives.prenom,
        lastname: this.relatives.nom,
        age: this.relatives.age,
        gender: this.relatives.sexe,
        weight: this.relatives.poids,
        height: this.relatives.taille,
        stress: [],
        sleep: [],
        activites: [],
        dailies: [],
        _id: [], //a changer pour la suppression
        doctors: [],
      };

      const result = await fetch(this.BASEURL + "/addOne", {
        method: "POST",
        body: JSON.stringify(this.body),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (result.ok) {
        this.dialog = false;
        let newRelative = {
          icon: "mdi-account",
          text: [
            this.body.firstname,
            this.body.lastname,
            this.body.age,
            this.body.gender,
            this.body.weight,
            this.body.height,
            this.body.stress,
            this.body.sleep,
            this.body.activites,
            this.body.dailies,
            this.body._id,
            this.body.doctors,
          ],
          route: "Dashboard",
        };
        this.links.push(newRelative);
        alert("Ajout de : " + this.body.firstname + " reussi");
        location.reload();
      }
    },
    setNouveau() {
      this.exist = false;
      this.nouveau = true;
    },
    setExist() {
      this.exist = true;
      this.nouveau = false;
    },
    addExistRelative: async function() {
      let url = `https://ter-garmin.herokuapp.com/api/relatives/${this.existR.id}`;
      await fetch(url)
        .then((response) => {
          response.json().then((relative) => {
            let newRelative = {
              icon: "mdi-account",
              text: [
                relative.firstname,
                relative.lastname,
                relative.age,
                relative.gender,
                relative.weight,
                relative.height,
                relative.stress,
                relative.sleep,
                relative.activites,
                relative.dailies,
                relative._id,
                relative.doctors
              ],
              route: "Dashboard",
            };
            this.links.push(newRelative);
            this.dialog = false;
            this.updateUserRelative();
          });
        })
        .catch(function(err) {
          console.log(err);
        });
    },

    updateUserRelative: async function() {
      await fetch("https://ter-garmin.herokuapp.com/api/users/updateRelative", {
        method: "POST",
        body: JSON.stringify({
          email: localStorage.email,
          id: this.existR.id,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    },
  },
};
</script>

<style>
#retour {
  margin-left: 25%;
}
</style>
