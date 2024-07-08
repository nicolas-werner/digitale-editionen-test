<template>
    <svg :width="width" :height="height">
      <g v-for="(node, index) in nodes" :key="index">
        <circle
          :cx="node.x"
          :cy="node.y"
          :r="nodeRadius"
          :fill="nodeColor"
        />
        <text
          :x="node.x"
          :y="node.y - nodeRadius - 5"
          text-anchor="middle"
          :fill="textColor"
        >
          {{ node.name }}
        </text>
        <line
          v-for="(link, linkIndex) in node.links"
          :key="linkIndex"
          :x1="node.x"
          :y1="node.y"
          :x2="getNodeById(link).x"
          :y2="getNodeById(link).y"
          :stroke="linkColor"
        />
      </g>
    </svg>
  </template>
  
  <script>
  export default {
    name: 'SvgTree',
    props: {
      nodes: {
        type: Array,
        required: true,
      },
      width: {
        type: Number,
        default: 500,
      },
      height: {
        type: Number,
        default: 500,
      },
      nodeRadius: {
        type: Number,
        default: 10,
      },
      nodeColor: {
        type: String,
        default: '#3498db',
      },
      textColor: {
        type: String,
        default: '#2c3e50',
      },
      linkColor: {
        type: String,
        default: '#34495e',
      },
    },
    methods: {
      getNodeById(id) {
        return this.nodes.find(node => node.id === id);
      },
    },
  };
  </script>
  
  <style scoped>
  text {
    font-size: 12px;
  }
  </style>