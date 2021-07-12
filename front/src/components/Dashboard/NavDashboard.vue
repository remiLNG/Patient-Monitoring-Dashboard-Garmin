<template>
  <nav>
    <v-app-bar color="#F5F5F5" class="black--text" app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase">
        <span class="font-weight-light">Dashboard</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="disconnect" text>
        <span>Exit</span>
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app class="blue">
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-icon v-if="this.user.premium" color="yellow darken-1" small
            >mdi-star</v-icon
          >
          <span class="white--text subheading mt-1 text-center">
            {{ this.user.firstname }} {{ this.user.lastname }}
          </span>
        </v-flex>
        <v-flex class="mt-4 mb-4">
          <PopupPremium v-bind:user="user" />
        </v-flex>
        <v-flex class="mt-4 mb-4">
          <PopupRelative v-bind:links="links" v-bind:user="user" />
        </v-flex>
      </v-layout>
      <p class="white--text subheading mt-1 text-center">
        Liste de vos proches :
      </p>
      <v-list flat>
        <v-list-item
          v-for="link in links"
          :key="link.text[0]"
          router
          :to="link.route"
          active-class="blue"
          @click="
            showData(link);
            setDemarrage();
            keyArray(link);
          "
        >
          <v-list-item-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-tooltip bottom>
              <template #activator="{ on }">
                <v-list-item-title v-on="on">
                  {{ link.text[0] }} {{ link.text[1] }}
                </v-list-item-title>
              </template>
              <span>{{ link.text[0] }} {{ link.text[1] }} </span>
            </v-tooltip>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import PopupRelative from "../Relative/PopupRelative.vue";
import PopupPremium from "./PopupPremium.vue";
export default {
  data: () => ({
    user: {},
    drawer: true,
    links: [],
    key: null,
  }),
  components: {
    PopupRelative,
    PopupPremium,
  },
  props: {
    relative: {
      type: Object,
    },
    demarrage: {
      type: Boolean,
      required: true,
    },
    events: {
      type: Array,
    }
  },
  methods: {
    disconnect() {
      this.$session.destroy();
      this.$router.replace({ name: "HomePage" });
    },
    async getInfos() {
      let token = this.$session.get("token");
      const header = new Headers();
      header.append("Authorization", token);
      return fetch("https://ter-garmin.herokuapp.com/api/users/Dashboard", {
        method: "GET",
        headers: header,
      })
        .then((response) => {
          response.json().then((response) => {
            this.user = response.user;
          });
        })
        .catch((error) => {
          console.error(error);
        });
    },
    showData(tab) {
      this.relative.prenom = tab.text[0];
      this.relative.nom = tab.text[1];
      this.relative.age = tab.text[2];
      this.relative.sexe = tab.text[3];
      this.relative.poids = tab.text[4];
      this.relative.taille = tab.text[5];
      this.relative.stress = tab.text[6];
      this.relative.sleep = tab.text[7];
      this.relative.activities = tab.text[8];
      this.relative.dailies = tab.text[9];
      this.relative.id = tab.text[10];
      this.relative.doctors = tab.text[11];
      this.relative.events = tab.text[12];

    },
    getRelatives: async function() {
      let url2 = `https://ter-garmin.herokuapp.com/api/users/${localStorage.email}`;
      await fetch(url2)
        .then((responseJSON) => {
          responseJSON.json().then((user) => {
            user.relatives.forEach((rel) => {
              let newRelative = {
                icon: "mdi-account",
                text: [
                  rel.firstname,
                  rel.lastname,
                  rel.age,
                  rel.gender,
                  rel.weight,
                  rel.height,
                  rel.stress,
                  rel.sleep,
                  rel.activities,
                  rel.dailies,
                  rel._id,
                  rel.doctors,
                  rel.events,
                ],
                route: "Dashboard",
              };
              this.links.push(newRelative);
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    setDemarrage() {
      let mydemarrage = this.demarrage;
      mydemarrage = true;
      this.$emit("update-demarrage", mydemarrage);
    },
    keyArray(link){
        for (let index = 0; index < this.links.length; index++) {
          if(link == this.links[index]){
            this.key = index
            let mykey = this.key
            this.$emit("update-key", mykey);
          }
        }
    }
  },
  mounted() {
    this.getInfos();
    this.getRelatives();
  },
};
</script>
