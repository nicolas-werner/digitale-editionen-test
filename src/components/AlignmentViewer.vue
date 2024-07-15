<template>
    <v-container>
      <v-row>
        <v-col v-for="(manuscript, index) in manuscripts" :key="index" cols="12" md="6" lg="3">
          <v-card>
            <v-card-title>{{ manuscript.name }}</v-card-title>
            <v-card-text>
              <div class="text-body-1">
                <span
                  v-for="(word, wordIndex) in manuscript.transcription.split(' ')"
                  :key="wordIndex"
                  :class="{ 'highlighted': isDifferent(word, index) }"
                >
                  {{ word + ' ' }}
                </span>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    name: 'AlignmentViewer',
    props: {
      manuscripts: {
        type: Array,
        required: true,
      },
    },
    methods: {
      isDifferent(word, index) {
        if (this.manuscripts.length < 2) return false;
        const otherManuscripts = this.manuscripts.filter((_, i) => i !== index);
        return otherManuscripts.some((manuscript) =>
          !manuscript.transcription.split(' ').includes(word)
        );
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
  