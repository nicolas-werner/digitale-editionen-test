<template>
    <v-container>
      <h1 class="text-h4 text-center mb-8 blue--text">Digitale Edition Viewer</h1>
      <v-btn @click="$router.push('/')" class="mb-4">Zurück zur Startseite</v-btn>
      
      <v-tabs v-model="tab" grow>
        <v-tab value="compare">Compare Editions</v-tab>
        <v-tab value="understand">Understand Text</v-tab>
      </v-tabs>
  
      <v-window v-model="tab">
        <v-window-item value="compare">
          <manuscript-comparison :manuscripts="selectedManuscripts" />
        </v-window-item>
        <v-window-item value="understand">
          <text-understanding 
            :transcription="transcription"
            :translation="translation"
            :glossaryWords="glossaryWords"
            :imagePolygons="imagePolygons"
          />
        </v-window-item>
      </v-window>
    </v-container>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  import ManuscriptComparison from './ManuscriptComparison.vue';
  import TextUnderstanding from './TextUnderstanding.vue';
  
  export default {
    name: 'ManuscriptViewer',
    components: {
      ManuscriptComparison,
      TextUnderstanding,
    },
    setup() {
      const tab = ref('understand');
      const manuscripts = ref([
        { 
          id: 1, 
          name: 'Ellesmere', 
          transcription: 'Whan that Aprille with his shoures soote...',
          selected: false,
          children: [
            { id: 2, name: 'Hengwrt', selected: false },
            { id: 3, name: 'Corpus', selected: false }
          ]
        },
        { 
          id: 4, 
          name: 'Cambridge', 
          transcription: 'Whan that Auerell wt his shouris soote...',
          selected: false,
          children: [
            { id: 5, name: 'Lansdowne', selected: false }
          ]
        }
      ]);
  
      const transcription = "Der Wurzel Rink Lorem Ambra dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,";
      const translation = "Der Wurzel Rink Lorem ipsum dolor sit amet, Ambra sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,";
      
      const glossaryWords = [
        { id: 1, term: 'Der Wurzel Rink', definition: '', etymology: 'Kommt von ..', usage: 'Beschreibt Ringe' },
        { id: 2, term: 'Ambra', definition: 'Gewürz', etymology: 'Kommt von ...', usage: '' },
        { id: 3, term: 'Bild', definition: 'Sack Getreide', etymology: '', usage: '' },
      ];
  
      const imagePolygons = [
        { id: 1, word: 'Der Wurzel Rink', left: '20%', top: '1%', width: '40%', height: '10%' },
        { id: 2, word: 'Ambra', left: '20%', top: '20%', width: '20%', height: '10%' },
        { id: 3, word: 'Bild', left: '32%', top: '42%', width: '18%', height: '12%' },
      ];
  
      const selectedManuscripts = computed(() => 
        manuscripts.value.filter(m => m.selected)
      );
  
      return {
        tab,
        manuscripts,
        selectedManuscripts,
        transcription,
        translation,
        glossaryWords,
        imagePolygons,
      };
    },
  };
  </script>