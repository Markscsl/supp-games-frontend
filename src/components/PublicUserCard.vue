<template>
  <div class="vaporwave-card rounded-lg p-6 h-full flex flex-col hover:border-[#00ffff] transition-all duration-300 card-hover">
    <h3 class="font-bold text-xl mb-4 border-b border-[#2d1b4e] pb-3 truncate">
      Lista de {{ user.userName }}
    </h3>

    <ul v-if="user.favoriteGames.length > 0" class="space-y-3 flex-grow">
      <li v-for="game in user.favoriteGames" :key="game.id"
          class="flex items-center bg-[#0f0f2e]/50 p-3 rounded-md border border-[#2d1b4e] hover:border-[#ff00ff]/40 transition-all">
        <img :src="game.imageUrl" :alt="game.name"
             class="w-12 h-12 object-cover rounded-md mr-3 flex-shrink-0 border-2 border-[#ff00ff]/20">
        <span class="text-sm text-gray-300 truncate">{{ game.name }}</span>
      </li>
    </ul>

    <div v-else class="text-center text-white text-semibold flex-grow flex items-center justify-center">
      <p class="neon-text-pink opacity-50">Esta lista está vazia.</p>
    </div>
  </div>
</template>


<script>
export default {
    name: "PublicUserCard",
    props: {
        user: {
            type: Object,
            required: true
        }
    }
}
</script>