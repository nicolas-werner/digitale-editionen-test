<template>
    <v-container>
        <v-btn @click="$router.push('/')" class="mb-4">Back to Landing Page</v-btn>

      <h1 class="text-h3 mb-6 blue--text">Hintergrund & Funktionsweise</h1>
      
      <h2 class="text-h4 mb-4 blue--text">Hintergrund</h2>
      <v-row>
        <v-col v-for="n in 3" :key="n" cols="12" md="4">
          <p v-for="i in 3" :key="i" class="text-body-1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </v-col>
      </v-row>
  
      <h2 class="text-h4 mb-4 mt-8 blue--text">Funktionsweise</h2>
      <v-row>
        <v-col v-for="n in 3" :key="n" cols="12" md="4">
          <p v-for="i in 3" :key="i" class="text-body-1">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.
          </p>
        </v-col>
      </v-row>
  
      <h2 class="text-h4 mb-4 mt-8 blue--text">Ablauf des Losmechanismus</h2>
      <v-row justify="space-between" align="center" class="mt-4">
        <v-col v-for="n in 5" :key="n" cols="12" sm="2" class="text-center">
          <div class="text-h2 blue--text mb-2">{{ n }}</div>
          <v-img :src="`/images/manuscript-${n}.jpg`" height="100" contain class="mb-2"></v-img>
          <v-icon large class="mb-2">{{ icons[n-1] }}</v-icon>
          <div class="text-body-2">{{ steps[n-1] }}</div>
        </v-col>
      </v-row>
      <v-row justify="end" class="mt-4">

      </v-row>
    </v-container>
  </template>
  
  <script>
  import { mdiRotateLeft, mdiCommentQuestion, mdiMagnify, mdiCog, mdiLightbulb } from '@mdi/js';
  
  export default {
    name: 'ManuscriptIntroduction',
    data() {
      return {
        icons: [mdiRotateLeft, mdiCommentQuestion, mdiMagnify, mdiCog, mdiLightbulb],
        steps: [
          'Drehen der Drehscheibe',
          'Stellen der Frage',
          'Abgleich Frage-ID mit Apostel',
          'Mechanismus arbeitet',
          'Ergebnis'
        ]
      };
    }
  };
  </script>