<template>
  <v-container>
    <h1 class="text-h3 text-center mb-8 blue--text">"Aberglaube im Mittelalter"</h1>
    <v-row align="center" justify="space-between" class="mb-8">
      <v-col cols="12" md="6" class="d-flex justify-center">
        <v-sheet color="grey-lighten-2" width="256" height="256" class="rounded-circle"></v-sheet>
      </v-col>
      <v-col cols="12" md="6" class="d-flex flex-column align-center">
        <v-btn 
          variant="outlined" 
          class="mb-4" 
          block
          @click="$router.push('/introduction')"
        >
          Hintergrund & Funktionsweise
        </v-btn>
        <v-btn 
          @click="$router.push('/manuscript-viewer')" 
          block
        >
          Zur Edition
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="column in 3" :key="column" cols="12" md="4">
        <v-sheet v-for="i in 4" :key="i" color="grey-lighten-2" height="16" class="mb-2"></v-sheet>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'LandingPage',
}
</script>