<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="image-container">
          <img ref="image" src="/images/wurzel.png" alt="Wurzel Ring" class="responsive-image" @load="onImageLoad">
          <v-hover v-for="polygon in imagePolygons" :key="polygon.id">
            <template v-slot:default="{ isHovering, props }">
              <div
                class="polygon"
                :style="{
                  left: polygon.left,
                  top: polygon.top,
                  width: polygon.width,
                  height: polygon.height,
                  backgroundColor: highlightedWord === polygon.word.toLowerCase() ? 'rgba(255, 255, 0, 0.3)' : 'transparent',
                  border: highlightedWord === polygon.word.toLowerCase() ? '2px solid yellow' : 'transparent',
                }"
                v-bind="props"
              >
                <!-- <span class="polygon-word">{{ polygon.word }}</span> -->
                <v-card
                  v-if="isHovering"
                  class="tooltip-card"
                >
                  <v-card-text>
                    <strong>Term:</strong> {{ polygon.word }}<br>
                    <strong>Definition:</strong> {{ getWordInfo(polygon.word).definition }}<br>
                    <strong>Etymology:</strong> {{ getWordInfo(polygon.word).etymology }}<br>
                    <strong>Usage:</strong> {{ getWordInfo(polygon.word).usage }}
                  </v-card-text>
                </v-card>
              </div>
            </template>
          </v-hover>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <h3 class="text-h5 mb-2">Glossary</h3>
        <v-chip-group>
          <v-chip
            v-for="word in glossaryWords"
            :key="word.id"
            @click="toggleHighlight(word.term)"
          >
            {{ word.term }}
          </v-chip>
        </v-chip-group>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <h3 class="text-h5 mb-2">Transcription</h3>
        <p>
          <span 
            v-for="(word, index) in transcriptionWords" 
            :key="index"
            @click="toggleHighlight(word)"
            :class="{ 'highlighted': highlightedWord === word.toLowerCase() }"
            class="clickable-word"
          >
            {{ word + " " }}
          </span>
        </p>
      </v-col>
      </v-row>
      <v-row>
      <v-col cols="12" md="6">
        <h3 class="text-h5 mb-2">Translation</h3>
        <p>
          <span 
            v-for="(word, index) in translationWords" 
            :key="index"
            @click="toggleHighlight(word)"
            :class="{ 'highlighted': highlightedWord === word.toLowerCase() }"
            class="clickable-word"
          >
            {{ word + " "}}
          </span>
        </p>
      </v-col>
    </v-row>
    <v-row v-if="selectedWord">
      <v-col cols="12">
        <v-card>
          <v-card-title>{{ selectedWord.term }}</v-card-title>
          <v-card-text>
            <p><strong>Definition:</strong> {{ selectedWord.definition }}</p>
            <p><strong>Etymology:</strong> {{ selectedWord.etymology }}</p>
            <p><strong>Usage:</strong> {{ selectedWord.usage }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'TextUnderstanding',
  props: {
    transcription: String,
    translation: String,
    glossaryWords: Array,
    imagePolygons: Array,
  },
  setup(props) {
    const highlightedWord = ref('');
    const image = ref(null);

    const transcriptionWords = computed(() => props.transcription.split(/\s+/));
    const translationWords = computed(() => props.translation.split(/\s+/));

    const toggleHighlight = (word) => {
      const lowercaseWord = word.toLowerCase().replace(/[^a-z]/g, '');
      highlightedWord.value = highlightedWord.value === lowercaseWord ? '' : lowercaseWord;
    };

    const selectedWord = computed(() => 
      props.glossaryWords.find(word => 
        highlightedWord.value === word.term.toLowerCase()
      )
    );

    const getWordInfo = (word) => {
      const lowercaseWord = word.toLowerCase().replace(/[^a-z]/g, '');
      return props.glossaryWords.find(w => w.term.toLowerCase() === lowercaseWord) || {};
    };



    return {
      highlightedWord,
      transcriptionWords,
      translationWords,
      toggleHighlight,
      selectedWord,
      getWordInfo,
      image,
    };
  },
};
</script>

<style scoped>
.image-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.responsive-image {
  max-width: 100%;
  height: auto;
}
.polygon {
  position: absolute;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black; 
  font-size:
   14px; 
}
.clickable-word {
  cursor: pointer;
}
.highlighted {
  background-color: yellow;
}
.tooltip-card {
  position: absolute;
  z-index: 10;
  max-width: 200px;
  width: 200px; 
}
</style>
