<template>
  <div class="pokedex">
    <div class="nbpokemon">
      Nombre de pokémon à afficher :<input type="text" v-model="numberOfPokemon" @change="fetchPokemons" />
    </div>
    <div v-for="(pokemon, index) in displayedPokemons" :key="index" class="pokemon-card">
      <router-link :to="{ name: 'DetailsPokemon', params: { id: index + 1 } }">
        <h2>{{ pokemon.name }}</h2>
        <img :src="pokemon.image" alt="Pokemon image" />
        <div class="pokemon-types">
          <span v-for="(type, i) in pokemon.types" :key="i" :style="{ backgroundColor: getTypeColor(type.type.name.toLowerCase()) }" class="type">
            {{ type.type.name }}
          </span>
        </div>
      </router-link>
    </div>
  </div>
</template>
  
  <script>
  export default {
    name: 'Pokedex',
    data() {
      return {
        displayedPokemons: [],
        loading: true
      };
    },
    methods: {
      getTypeColor(type) {
        const typeColors = {
          grass: '#78C850',
          poison: '#A040A0',
          fire: '#F08030',
          water: '#6890F0',
          bug: '#A8B820',
          flying: '#A890F0',
          normal: '#A8A878',
          ground: '#E0C068',
          electric: '#F8D030',
          fairy: '#EE99AC',
        };
        return typeColors[type] || '#A8A878';
      },
      async fetchPokemons() {
        try {
          const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=2');
          const data = await response.json();
          const pokemonList = await Promise.all(
            data.results.map(async (result) => {
              const pokemonData = await this.fetchPokemonData(result.url);
              return pokemonData;
            })
          );
          this.displayedPokemons = pokemonList;
          this.loading = false;
        } catch (error) {
          console.error('Error fetching data:', error);
          this.loading = false;
        }
      },
      async fetchPokemonData(url) {
        try {
          const response = await fetch(url);
          const data = await response.json();
          return {
            name: data.name,
            image: data.sprites.front_default,
            types: data.types
          };
        } catch (error) {
          console.error('Error fetching Pokémon data:', error);
          return null;
        }
      }
    },
    created() {
      this.fetchPokemons();
    }
  };
  </script>
  
  <style>
  .pokedex {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    padding: 20px;
  }
  
  .pokemon-card {
    width: 100%;
    max-width: 200px;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
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
  