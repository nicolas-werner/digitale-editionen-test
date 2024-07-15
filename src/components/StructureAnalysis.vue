<template>
  <v-container>
    <h2 class="text-h4 mb-6 blue--text">Strukuranalyse</h2>

    <v-row>
      <v-col cols="12">
        <v-slider
          v-model="visibleLayers"
          :min="1"
          :max="5"
          thumb-label
          class="mb-6"
          label="Anzahl der sichtbaren Schichten"
        ></v-slider>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6">
        <v-btn @click="layeredView = !layeredView" class="mb-6">
          {{ layeredView ? 'Separate View' : 'Layered View' }}
        </v-btn>
      </v-col>
      <v-col cols="6">
        <v-btn @click="imageView = !imageView" class="mb-6">
          {{ imageView ? 'Show Nodes' : 'Show Images' }}
        </v-btn>
      </v-col>
    </v-row>

    <v-row v-if="!layeredView">
      <v-col cols="12" md="6">
        <h3 class="text-h5">Manuskript 1</h3>
        <svg-tree
          :nodes="getVisibleNodes(manuscripts[0].structure.combinedTree, visibleLayers)"
          :width="500"
          :height="600"
          :image-view="imageView"
        ></svg-tree>
      </v-col>
      <v-col cols="12" md="6">
        <h3 class="text-h5">Cambridge Manuskript</h3>
        <svg-tree
          :nodes="getVisibleNodes(manuscripts[1].structure.combinedTree, Math.min(visibleLayers, 3))"
          :width="500"
          :height="600"
          :image-view="imageView"
        ></svg-tree>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col cols="12">
        <h3 class="text-h5 text-center">Layered View</h3>
        <svg-tree
          :nodes1="getVisibleNodes(manuscripts[0].structure.combinedTree, visibleLayers)"
          :nodes2="getVisibleNodes(manuscripts[1].structure.combinedTree, Math.min(visibleLayers, 3))"
          :width="1000"
          :height="600"
          :layered="true"
          :image-view="imageView"
        ></svg-tree>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SvgTree from './SvgTree.vue';

export default {
  name: 'StructureAnalysis',
  components: {
    SvgTree,
  },
  data() {
    return {
      visibleLayers: 1,
      layeredView: false,
      imageView: false,
      manuscripts: [
        {
          id: 1,
          name: 'Manuscript 1',
          structure: {
            combinedTree: [
              { id: 1, name: 'Frage 1', x: 250, y: 50, links: [2, 3], img: 'page1.jpg' },
              { id: 2, name: 'Antwort 1.1', x: 150, y: 150, links: [4, 5], img: 'page2.jpg' },
              { id: 3, name: 'Antwort 1.2', x: 350, y: 150, links: [6], img: 'page3.jpg' },
              { id: 4, name: 'Frage 2', x: 100, y: 250, links: [], img: 'page4.jpg' },
              { id: 5, name: 'Frage 3', x: 200, y: 250, links: [], img: 'page5.jpg' },
              { id: 6, name: 'Frage 4', x: 350, y: 250, links: [7], img: 'page6.jpg' },
              { id: 7, name: 'Antwort 4.1', x: 350, y: 350, links: [], img: 'page7.jpg' },
              // Add more nodes as needed to complete 5 layers
            ],
          },
        },
        {
          id: 2,
          name: 'Manuscript 2',
          structure: {
            combinedTree: [
              { id: 1, name: 'Question A', x: 250, y: 50, links: [2, 3], img: 'pageA.jpg' },
              { id: 2, name: 'Answer A.1', x: 150, y: 150, links: [4], img: 'pageB.jpg' },
              { id: 3, name: 'Answer A.2', x: 350, y: 150, links: [], img: 'pageC.jpg' },
              { id: 4, name: 'Question B', x: 150, y: 250, links: [5], img: 'pageD.jpg' },
              { id: 5, name: 'Answer B.1', x: 150, y: 350, links: [], img: 'pageE.jpg' },
              // Cambridge Manuscript ends at 3 layers
            ],
          },
        },
      ],
    };
  },
  methods: {
    getVisibleNodes(tree, maxLayers) {
      const visibleNodes = [];
      const queue = [{ node: tree[0], depth: 1 }];
      while (queue.length > 0) {
        const { node, depth } = queue.shift();
        if (depth <= maxLayers) {
          visibleNodes.push(node);
          const linkedNodes = node.links.map(linkId => tree.find(n => n.id === linkId));
          linkedNodes.forEach(linkedNode => {
            if (linkedNode) queue.push({ node: linkedNode, depth: depth + 1 });
          });
        }
      }
      return visibleNodes;
    },
  },
};
</script>

<style scoped>
</style>
