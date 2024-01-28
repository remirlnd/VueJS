<template>
    <div class="pokemon-card">
      <h2>{{ pokemon.name }}</h2>
      <img :src="pokemon.image" alt="Pokemon image" />
      <div class="pokemon-types">
        <span v-for="(type, i) in pokemon.types" :key="i" :style="{ backgroundColor: getTypeColor(type.type.name.toLowerCase()) }" class="type">
          {{ type.type.name }}
        </span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Pokemon',
    props: {
      pokemon: {
        type: Object,
        required: true
      }
    },
    methods: {
      getTypeColor(type) {
        const typeColors = {
          plante: '#78C850',
          poison: '#A040A0',
          feu: '#F08030',
          eau: '#6890F0',
          insecte: '#A8B820',
          vol: '#A890F0',
          normal: '#A8A878',
        };
        return typeColors[type] || '#A8A878';
      }
    }
  };
  </script>
  
  <style>
  .pokemon-card {
    width: 200px;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    margin: 20px;
  }
  
  .pokemon-types {
    margin-top: 10px;
  }
  
  .type {
    display: inline-block;
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: bold;
    margin-right: 4px;
  }
  </style>