<template>
  <v-footer
    dark
    padless
    app
    inset
    
  >
    <v-card
      class="flex"
      flat
      tile
      color="#F5F5F5"
      :elevation="10"
    >

      <v-card-text class="py-2 black--text text-center">
        {{ new Date().getFullYear() }} — <strong>Projet TER</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>
