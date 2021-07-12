<template>
  <v-app id="about">
    <v-container>
      <v-row class="justify-center">
        <v-col cols="8">
          <v-card color="#EFE5DB ">
            <v-card-title class="justify-center blue--text"> PROJET TER </v-card-title>
            <v-row>
              <v-col align="center">
                Ce projet consiste à mettre en place un service d'aide à la surveillance de personnes âgées, isolées... en utilisant des produits et un framework de Garmin<br>
                Il vous suffira alors d'avoir une montre garmin et de créer un compte sur le site afin de suivre l'état de santé du porteur de la montre et de visualiser ses différentes activités,
                tout cela à distance.

                </v-col>
            </v-row>
            <v-carousel
              cycle
              height="450"
              hide-delimiter-background
              show-arrows-on-hover
            >
              <v-carousel-item
                v-for="(item, i) in items"
                :key="i"
                :src="item.src"
              >
              </v-carousel-item>
            </v-carousel>
            <v-card-title class="justify-center blue--text"> Encadrant </v-card-title>
            <v-row>
              <v-col align="center">
                Monsieur Gilles MENEZ
              </v-col>
            </v-row>
            <v-card-title class="justify-center blue--text"> Éleves </v-card-title>
            <v-row>
              <v-col align="center">
                Raphael BOLIER - Guilhem FABRE--SAUTEREY - Corentin GARNIER -
                Rémi LONGIN
              </v-col>
            </v-row>
            <v-row>
              <v-col align="center">
                <v-img
                  src="../assets/miage_logo.png"
                  max-height="300"
                  max-width="300"
                ></v-img>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          src: "https://i.ibb.co/Kwdvtgv/Best-GPS-for-Seniors.jpg",
        },
        {
          src: "https://i.ibb.co/dMS8Znn/Seniors-at-Laptop.jpg",
        },
        {
          src: "https://i.ibb.co/r5jmb2T/Young-physician-wearing-white-coat-explaining-senior-patients-how-to-use-mobile-application-in-order.jpg",
        },
      ],
    };
  },
};
</script>

<style scoped>
#about {
  background-color: #add8e6;
}
</style>
