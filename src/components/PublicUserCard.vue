<template>
    <div
        class="bg-gray-800 rounded-lg p-4 h-full flex flex-col border border-gray-700 hover:border-green-500 transition-colors">
        <h3 class="font-bold text-lg text-green-400 mb-4 border-b border-gray-700 pb-2 truncate">
            Lista de {{ user.userName }}
        </h3>

        <ul v-if="user.favoriteGames.length > 0" class="space-y-3 flex-grow">
            <li v-for="game in user.favoriteGames" :key="game.id"
                class="flex items-center bg-gray-900/50 p-2 rounded-md">
                <img :src="game.imageUrl" :alt="game.name" class="w-10 h-10 object-cover rounded-md mr-3 flex-shrink-0">
                <span class="text-sm text-gray-300 truncate">{{ game.name }}</span>
            </li>
        </ul>
        <div v-else class="text-center text-gray-500 text-sm flex-grow flex items-center justify-center">
            <p>Esta lista está vazia.</p>
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