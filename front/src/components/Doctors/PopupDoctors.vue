<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="800px">
      <template v-slot:activator="{ on }">
        <v-btn outlined color="teal" dark v-on="on" class="mb-2"
          >Ajouter un Médecin</v-btn
        >
      </template>
      <v-card>
        <v-card-title class="justify-center">
          Ajouter un nouveau médecin</v-card-title
        >
        <v-form class="px-3" ref="form" v-model="form">
          <div>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="doctors.prenom"
                  label="Prenom"
                  name="prenom"
                  type="text"
                  color="blue darken-1"
                  prepend-icon="mdi-account"
                  :rules="[rules.required, rules.space, rules.letter]"
                />
              </v-col>
              <v-col>
                <v-text-field
                  v-model="doctors.nom"
                  label="Nom"
                  name="nom"
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
                  v-model="doctors.telephone"
                  label="Téléphone"
                  name="telephone"
                  type="number"
                  color="blue darken-1"
                  prepend-icon="mdi-phone"
                  :rules="[rules.required, rules.phoneNumber(10), rules.space]"
                />
              </v-col>
              <v-col>
                <v-select
                  v-model="doctors.specialite"
                  label="Spécialité"
                  name="specialite"
                  :items="specialite"
                  color="blue darken-1"
                  prepend-icon="mdi-doctor"
                  :rules="[rules.required]"
                ></v-select>
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
                @click="createDoctors"
                :disabled="!form"
                >Valider</v-btn
              >
            </v-card-actions>
          </div>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "Test",
  data: () => ({
    dialog: false,
    form: false,
    relativeID: "",
    doctors: {
      prenom: "",
      nom: "",
      specialite: "",
      telephone: "",
    },
    specialite: [
      "Allergologie",
      "Andrologie",
      "Cardiologie",
      "Chirurgie",
      "Anesthésiologie",
      "Dermatologie",
      "Généraliste",
      "Neurologie",
      "Radiologie",
      "Urologie",
      "Ophtalmologie",
      "Infectiologie",
      "Pneumologie",
      "Podologie",
      "Rhumatologie",
      "Gynécologie",
      "Gastro-entérologie",
      "Hématologie",
      "Hépatologie",
      "Autres",
    ],
    rules: {
      required: (v) => !!v || "Ce champ est requis",
      letter: (v) => isNaN(v) || "chiffres interdits",
      space: (v) => (v || "").indexOf(" ") < 0 || "espaces interdits",
      phoneNumber: (taille) => (v) =>
        (v || "").toString().length == taille.toString() ||
        `Veuillez rentrer un nombre correct`,
    },
    BASEURL: "https://ter-garmin.herokuapp.com/api/relatives",
  }),
  props: {
    listDoctors: {
      type: Array,
    },
    relative: {
      type: Object,
    },
  },
  methods: {
    getFuckingId: async function() {
      let url = `https://ter-garmin.herokuapp.com/api/users/${localStorage.email}`;
      await fetch(url).then((responseJSON) => {
        responseJSON.json().then((user) => {
          user.relatives.forEach((rel) => {
            if (
              this.relative.prenom == rel.firstname &&
              this.relative.nom == rel.lastname
            ) {
              console.log("houhouu")
            }
          });
        });
      });
    },
    createDoctors: async function() {
      this.getFuckingId();

      this.body = {
        relativeId: this.relativeID,
        firstname: this.doctors.prenom,
        lastname: this.doctors.nom,
        specialities: this.doctors.specialite,
        phone: this.doctors.telephone,
      };
      const result = await fetch(this.BASEURL + "/addDoctor", {
        method: "POST",
        body: JSON.stringify(this.body),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (result.ok) {
        this.dialog = false;
        let newDoctor = {
          icon: "mdi-doctor",
          text: [
            this.body.firstname,
            this.body.lastname,
            this.body.phone,
            this.body.specialities,
          ],
        };
        this.listDoctors.push(newDoctor);
        alert("Ajout du docteur : " + this.body.lastname + " reussi");
      }
    },
  },
  mounted() {
    this.getFuckingId();
  },

};
</script>
