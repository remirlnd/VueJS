<template>
    <div class="liste-types-pokemon">
      <h3>Occurrences des types :</h3>
      <div v-for="(count, type) in typesCount" :key="type" class="type-count">
        {{ type }} : {{ count }}
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      pokemons: Array,
    },
    computed: {
      typesCount() {
        const countMap = {};
        this.pokemons.forEach((pokemon) => {
          const type = pokemon.types[0].type.name; // Utilisation du type principal uniquement
          countMap[type] = (countMap[type] || 0) + 1;
        });
        return countMap;
      },
    },
  };
  </script>
  
  <style>
  .liste-types-pokemon {
    margin-bottom: 20px;
  }
  
  .type-count {
    margin-right: 10px;
    display: inline-block;
  }
  </style>
  