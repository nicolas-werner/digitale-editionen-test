<template>
  <v-container>
    <h1 class="text-h3 mb-6 blue--text">Manuskriptvergleich</h1>
    
    <v-btn @click="drawer = !drawer" class="mb-4">
      {{ drawer ? 'Auswahlmenü schließen' : 'Manuskripte auswählen' }}
    </v-btn>

    <v-navigation-drawer v-model="drawer" temporary>
      <v-list-item>
        <v-list-item-title>Manuskriptauswahl</v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-group
          v-for="manuscript in manuscripts"
          :key="manuscript.id"
          :value="manuscript.id"
          no-action
        >
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              :title="manuscript.name"
            >
              <template v-slot:prepend>
                <v-checkbox
                  v-model="selectedManuscripts"
                  :value="manuscript"
                  :disabled="selectedManuscripts.length >= 2 && !selectedManuscripts.includes(manuscript)"
                ></v-checkbox>
              </template>
            </v-list-item>
          </template>

          <v-list-item
            v-for="edition in manuscript.editions"
            :key="edition.id"
            :title="edition.name"
          >
            <template v-slot:prepend>
              <v-checkbox
                v-model="selectedManuscripts"
                :value="edition"
                :disabled="selectedManuscripts.length >= 2 && !selectedManuscripts.includes(edition)"
              ></v-checkbox>
            </template>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-row v-if="selectedManuscripts.length === 2">
      <v-col v-for="(manuscript, index) in selectedManuscripts" :key="index" cols="12" md="6">
        <v-card>
          <v-card-title>{{ manuscript.name }}</v-card-title>
          <v-card-text>
            <div class="text-body-1">
              <span
                v-for="(word, wordIndex) in manuscript.transcription.split(' ')"
                :key="wordIndex"
                :class="{ 'highlighted': isDifferent(word, index) }"
                @click="showWordGenealogy(word)"
              >
                {{ word + ' ' }}
              </span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-card v-else>
      <v-card-text>
        Bitte wählen Sie zwei Manuskripte oder Editionen zum Vergleich aus.
      </v-card-text>
    </v-card>

    <v-dialog v-model="showGenealogyDialog" max-width="500">
      <v-card>
        <v-card-title>Wortgenalogie: {{ selectedWord }}</v-card-title>
        <v-card-text>
          <svg-tree :nodes="wordGenealogy" :width="500" :height="400"></svg-tree>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="showGenealogyDialog = false">Schließen</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import SvgTree from './SvgTree.vue';

export default {
  name: 'ManuscriptComparison',
  components: {
    SvgTree,
  },
  data() {
    return {
      drawer: false,
      selectedManuscripts: [],
      showGenealogyDialog: false,
      selectedWord: '',
      wordGenealogy: [],
      manuscripts: [
        {
          id: 1,
          name: 'Manuscript 1',
          transcription: 'Lorem ipsum dolor sit amet, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore.',
        },
        {
          id: 2,
          name: 'Cambridge Manuscript',
          transcription: 'Lorem ipsum dolor sit amet, sed diam berada. At vero eos et accusam et justo duo accordio et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore.',
        },
      ],
    };
  },
  methods: {
    isDifferent(word, index) {
      if (this.selectedManuscripts.length !== 2) return false;
      const otherIndex = index === 0 ? 1 : 0;
      const otherWords = this.selectedManuscripts[otherIndex].transcription.split(' ');
      return !otherWords.includes(word);
    },
    showWordGenealogy(word) {
      console.log('Clicked word:', word); // Debugging line
      this.selectedWord = word;
      this.wordGenealogy = this.generateWordGenealogy(word);
      this.showGenealogyDialog = true;
    },
    generateWordGenealogy(word) {
      console.log('Generating genealogy for:', word); // Debugging line
      if (word.toLowerCase() === 'accordio') {
        return [
          { id: 1, name: 'Acordias (root)', x: 250, y: 50, links: [2, 5] },
          { id: 2, name: 'Accordia', x: 150, y: 150, links: [3, 4] },
          { id: 3, name: 'Accordio', x: 100, y: 250, links: [] },
          { id: 4, name: 'Acordio', x: 200, y: 250, links: [] },
          { id: 5, name: 'Accordo', x: 350, y: 150, links: [6] },
          { id: 6, name: 'Accordio', x: 350, y: 250, links: [] },
        ];
      } else if (word.toLowerCase() === 'dolores') {
        return [
          { id: 1, name: 'Doloria (root)', x: 250, y: 50, links: [2, 5] },
          { id: 2, name: 'Doloris', x: 150, y: 150, links: [3, 4] },
          { id: 3, name: 'Dolores', x: 100, y: 250, links: [] },
          { id: 4, name: 'Dolors', x: 200, y: 250, links: [] },
          { id: 5, name: 'Dolor', x: 350, y: 150, links: [6] },
          { id: 6, name: 'Dolores', x: 350, y: 250, links: [] },
        ];
      } else {
        return [
          { id: 1, name: `${word} (Original)`, x: 250, y: 50, links: [2, 5, 7] },
          { id: 2, name: `${word} (Babarossa)`, x: 150, y: 150, links: [3, 4] },
          { id: 3, name: `${word} (Babarossa Edition 1)`, x: 100, y: 250, links: [] },
          { id: 4, name: `${word} (Barbarossa Edition 2)`, x: 200, y: 250, links: [] },
          { id: 5, name: `${word} (Helmut)`, x: 350, y: 150, links: [6] },
          { id: 6, name: `${word} (Helmut Edition 1)`, x: 350, y: 250, links: [] },
          { id: 7, name: `${word} (Erwin)`, x: 250, y: 150, links: [8, 9] },
          { id: 8, name: `${word} (Erwin Edition 1)`, x: 200, y: 250, links: [] },
          { id: 9, name: `${word} (Erwin Edition 2)`, x: 300, y: 250, links: [] },
        ];
      }
    },
  },
};
</script>

<style scoped>
.highlighted {
  background-color: yellow;
  cursor: pointer;
}
</style>