<template>
    <div class="details-pokemon">
      <h2>{{ pokemon.name }}</h2>
      <img :src="pokemon.image" :alt="`Image of ${pokemon.name}`" />
      <div class="pokemon-details">
        <div v-for="(detail, key) in pokemonDetails" :key="key" class="detail-item">
          <strong>{{ key }}:</strong> {{ detail }}
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        pokemon: {},
        pokemonDetails: {},
      };
    },
    async created() {
      const pokemonId = this.$route.params.id;
      await this.fetchPokemonDetails(pokemonId);
    },
    methods: {
      async fetchPokemonDetails(id) {
        try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
          const data = await response.json();
          this.pokemon = {
            name: data.name,
            image: data.sprites.front_default,
          };
          this.pokemonDetails = {
            'Base Experience': data.base_experience,
            Height: data.height,
            Weight: data.weight,
            Types: data.types.map((type) => type.type.name).join(', '),
            // Ajoutez d'autres détails si nécessaire
          };
        } catch (error) {
          console.error('Error fetching Pokémon details:', error);
        }
      },
    },
  };
  </script>
  
  <style>
  .details-pokemon {
    text-align: center;
    padding: 20px;
  }
  
  .details-pokemon img {
    max-width: 200px;
    margin: 20px 0;
  }
  
  .detail-item {
    margin: 10px 0;
  }
  </style>
  