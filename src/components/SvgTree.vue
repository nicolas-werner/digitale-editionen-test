<template>
  <svg :width="width" :height="height">
    <g v-if="!layered">
      <g v-if="!imageView">
        <g v-for="node in nodes" :key="node.id">
          <circle :cx="node.x" :cy="node.y" r="10" stroke="black" stroke-width="1" fill="white" />
          <text :x="node.x" :y="node.y - 15" text-anchor="middle" fill="black">{{ node.name }}</text>
          <line
            v-for="link in node.links"
            :key="link"
            :x1="node.x"
            :y1="node.y"
            :x2="findNode(link)?.x || node.x"
            :y2="findNode(link)?.y || node.y"
            stroke="black"
          />
        </g>
      </g>
      <g v-else>
        <g v-for="node in nodes" :key="node.id">
          <image :x="node.x - 50" :y="node.y - 50" :width="100" :height="100" :href="getImageUrl(node.img)" />
        </g>
      </g>
    </g>
    <g v-else>
      <transition-group name="fade" tag="g">
        <g v-if="!imageView">
          <g v-for="node in nodes1" :key="'nodes1-' + node.id">
            <circle :cx="node.x" :cy="node.y" r="10" stroke="blue" stroke-width="1" fill="white" />
            <text :x="node.x" :y="node.y - 15" text-anchor="middle" fill="blue">{{ node.name }}</text>
            <line
              v-for="link in node.links"
              :key="link"
              :x1="node.x"
              :y1="node.y"
              :x2="findNode(link, nodes1)?.x || node.x"
              :y2="findNode(link, nodes1)?.y || node.y"
              stroke="blue"
            />
          </g>
        </g>
        <g v-else>
          <g v-for="node in nodes1" :key="'nodes1-' + node.id">
            <image :x="node.x - 50" :y="node.y - 50" :width="100" :height="100" :href="getImageUrl(node.img)" />
          </g>
        </g>
      </transition-group>
      <transition-group name="fade" tag="g">
        <g v-if="!imageView">
          <g v-for="node in nodes2" :key="'nodes2-' + node.id">
            <circle :cx="node.x" :cy="node.y" r="10" stroke="red" stroke-width="1" fill="white" />
            <text :x="node.x" :y="node.y - 15" text-anchor="middle" fill="red">{{ node.name }}</text>
            <line
              v-for="link in node.links"
              :key="link"
              :x1="node.x"
              :y1="node.y"
              :x2="findNode(link, nodes2)?.x || node.x"
              :y2="findNode(link, nodes2)?.y || node.y"
              stroke="red"
            />
          </g>
        </g>
        <g v-else>
          <g v-for="node in nodes2" :key="'nodes2-' + node.id">
            <image :x="node.x - 50" :y="node.y - 50" :width="100" :height="100" :href="getImageUrl(node.img)" />
          </g>
        </g>
      </transition-group>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'SvgTree',
  props: {
    nodes: {
      type: Array,
      required: false,
    },
    nodes1: {
      type: Array,
      required: false,
    },
    nodes2: {
      type: Array,
      required: false,
    },
    width: {
      type: Number,
      default: 500,
    },
    height: {
      type: Number,
      default: 600,
    },
    layered: {
      type: Boolean,
      default: false,
    },
    imageView: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    findNode(id, nodes = this.nodes) {
      return nodes.find(node => node.id === id);
    },
    getImageUrl(img) {
      return require(`../assets/images/${img}`);
    },
  },
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
