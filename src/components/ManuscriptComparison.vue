<template>
  <v-container>
    <h1 class="text-h3 mb-6 blue--text">Manuskriptvergleich</h1>

    <v-row>
      <v-col cols="12" md="3" v-for="(manuscript, index) in manuscripts" :key="index">
        <v-checkbox
          v-model="selectedManuscripts"
          :value="manuscript"
          :disabled="selectedManuscripts.length >= 4 && !selectedManuscripts.includes(manuscript)"
          :label="manuscript.name"
        ></v-checkbox>
      </v-col>
    </v-row>

    <v-row v-if="selectedManuscripts.length > 1">
      <v-col v-for="(manuscript, index) in selectedManuscripts" :key="index" cols="12" md="6" lg="3">
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
        Bitte wählen Sie mindestens zwei Manuskripte oder Editionen zum Vergleich aus.
      </v-card-text>
    </v-card>

    <structure-analysis v-if="selectedManuscripts.length > 1" :manuscripts="selectedManuscripts"></structure-analysis>

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
import StructureAnalysis from './StructureAnalysis.vue';

export default {
  name: 'ManuscriptComparison',
  components: {
    SvgTree,
    StructureAnalysis,
  },
  data() {
    return {
      selectedManuscripts: [],
      showGenealogyDialog: false,
      selectedWord: '',
      wordGenealogy: [],
      manuscripts: [
        {
          id: 1,
          name: 'Manuscript 1',
          transcription: 'Lorem ipsum dolor sit amet, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore.',
          structure: {
            questionsTree: [
              { id: 1, name: 'Frage 1', x: 250, y: 50, links: [2, 3] },
              { id: 2, name: 'Frage 1.1', x: 150, y: 150, links: [4, 5] },
              { id: 3, name: 'Frage 1.2', x: 350, y: 150, links: [6] },
              { id: 4, name: 'Frage 1.1.1', x: 100, y: 250, links: [] },
              { id: 5, name: 'Frage 1.1.2', x: 200, y: 250, links: [] },
              { id: 6, name: 'Frage 1.2.1', x: 350, y: 250, links: [] },
              // Additional structure items...
            ],
            answersTree: [
              { id: 1, name: 'Antwort 1', x: 250, y: 50, links: [2, 3] },
              { id: 2, name: 'Antwort 1.1', x: 150, y: 150, links: [4, 5] },
              { id: 3, name: 'Antwort 1.2', x: 350, y: 150, links: [6] },
              { id: 4, name: 'Antwort 1.1.1', x: 100, y: 250, links: [] },
              { id: 5, name: 'Antwort 1.1.2', x: 200, y: 250, links: [] },
              { id: 6, name: 'Antwort 1.2.1', x: 350, y: 250, links: [] },
              // Additional structure items...
            ],
          },
        },
        {
          id: 2,
          name: 'Cambridge Manuscript',
          transcription: 'Lorem ipsum dolor sit amet, sed diam berada. At vero eos et accusam et justo duo accordio et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore.',
          structure: {
            questionsTree: [
              { id: 1, name: 'Question A', x: 250, y: 50, links: [2, 3] },
              { id: 2, name: 'Question A.1', x: 150, y: 150, links: [4, 5] },
              { id: 3, name: 'Question A.2', x: 350, y: 150, links: [6] },
              { id: 4, name: 'Question A.1.1', x: 100, y: 250, links: [] },
              { id: 5, name: 'Question A.1.2', x: 200, y: 250, links: [] },
              { id: 6, name: 'Question A.2.1', x: 350, y: 250, links: [] },
              // Additional structure items...
            ],
            answersTree: [
              { id: 1, name: 'Answer A', x: 250, y: 50, links: [2, 3] },
              { id: 2, name: 'Answer A.1', x: 150, y: 150, links: [4, 5] },
              { id: 3, name: 'Answer A.2', x: 350, y: 150, links: [6] },
              { id: 4, name: 'Answer A.1.1', x: 100, y: 250, links: [] },
              { id: 5, name: 'Answer A.1.2', x: 200, y: 250, links: [] },
              { id: 6, name: 'Answer A.2.1', x: 350, y: 250, links: [] },
              // Additional structure items...
            ],
          },
        },
        {
          id: 3,
          name: 'Berlin Manuscript',
          transcription: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
          structure: {
            questionsTree: [
              { id: 1, name: 'Frage B', x: 250, y: 50, links: [2, 3] },
              { id: 2, name: 'Frage B.1', x: 150, y: 150, links: [4, 5] },
              { id: 3, name: 'Frage B.2', x: 350, y: 150, links: [6] },
              { id: 4, name: 'Frage B.1.1', x: 100, y: 250, links: [] },
              { id: 5, name: 'Frage B.1.2', x: 200, y: 250, links: [] },
              { id: 6, name: 'Frage B.2.1', x: 350, y: 250, links: [] },
              // Additional structure items...
            ],
            answersTree: [
              { id: 1, name: 'Antwort B', x: 250, y: 50, links: [2, 3] },
              { id: 2, name: 'Antwort B.1', x: 150, y: 150, links: [4, 5] },
              { id: 3, name: 'Antwort B.2', x: 350, y: 150, links: [6] },
              { id: 4, name: 'Antwort B.1.1', x: 100, y: 250, links: [] },
              { id: 5, name: 'Antwort B.1.2', x: 200, y: 250, links: [] },
              { id: 6, name: 'Antwort B.2.1', x: 350, y: 250, links: [] },
              // Additional structure items...
            ],
          },
        },
        {
          id: 4,
          name: 'Vienna Manuscript',
          transcription: 'Lorem ipsum dolor sit amet, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.',
          structure: {
            questionsTree: [
              { id: 1, name: 'Frage C', x: 250, y: 50, links: [2, 3] },
              { id: 2, name: 'Frage C.1', x: 150, y: 150, links: [4, 5] },
              { id: 3, name: 'Frage C.2', x: 350, y: 150, links: [6] },
              { id: 4, name: 'Frage C.1.1', x: 100, y: 250, links: [] },
              { id: 5, name: 'Frage C.1.2', x: 200, y: 250, links: [] },
              { id: 6, name: 'Frage C.2.1', x: 350, y: 250, links: [] },
              // Additional structure items...
            ],
            answersTree: [
              { id: 1, name: 'Antwort C', x: 250, y: 50, links: [2, 3] },
              { id: 2, name: 'Antwort C.1', x: 150, y: 150, links: [4, 5] },
              { id: 3, name: 'Antwort C.2', x: 350, y: 150, links: [6] },
              { id: 4, name: 'Antwort C.1.1', x: 100, y: 250, links: [] },
              { id: 5, name: 'Antwort C.1.2', x: 200, y: 250, links: [] },
              { id: 6, name: 'Antwort C.2.1', x: 350, y: 250, links: [] },
              // Additional structure items...
            ],
          },
        },
      ],
    };
  },
  methods: {
    isDifferent(word, index) {
      if (this.selectedManuscripts.length < 2) return false;
      const otherManuscripts = this.selectedManuscripts.filter((_, i) => i !== index);
      return otherManuscripts.some((manuscript) =>
        !manuscript.transcription.split(' ').includes(word)
      );
    },
    showWordGenealogy(word) {
      this.selectedWord = word;
      this.wordGenealogy = this.generateWordGenealogy(word);
      this.showGenealogyDialog = true;
    },
    generateWordGenealogy(word) {
      // Dummy data for demonstration
      return [
        { id: 1, name: `${word} (Root)`, x: 250, y: 50, links: [2, 3, 4] },
        { id: 2, name: `${word} (Variation 1)`, x: 150, y: 150, links: [] },
        { id: 3, name: `${word} (Variation 2)`, x: 250, y: 150, links: [] },
        { id: 4, name: `${word} (Variation 3)`, x: 350, y: 150, links: [] },
      ];
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
