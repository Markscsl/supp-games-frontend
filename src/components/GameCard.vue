<template>
  <div
    class="bg-gray-800 rounded-lg overflow-hidden shadow-lg group transition-transform duration-300 hover:scale-105 hover:shadow-green-500/30">
    <div class="relative">
      <img :src="favorite.game.imageUrl" :alt="favorite.game.name" class="w-full h-48 object-cover">

      <button @click="$emit('delete-game', favorite.id)"
        class="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-red-500">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z"
            clip-rule="evenodd" />
        </svg>
      </button>
    </div>

    <div class="p-4">
      <h3 class="text-xl font-bold text-green-400 truncate">{{ favorite.game.name }}</h3>
      <button @click="$emit('edit-annotations', favorite)" class="text-gray-400 hover:text-white">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
          <path fill-rule="evenodd"
            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
            clip-rule="evenodd" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameCard',
  props: {
    // O componente espera receber um objeto 'game' do seu pai (a MyListView)
    favorite: {
      type: Object,
      required: true
    }
  },
  // O componente "avisa" (emite) ao pai que o botão de deletar foi clicado
  emits: ['delete-game', 'edit-annotations']
}
</script>