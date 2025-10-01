<template>
    <div class="container mx-auto p-8 text-white">


        
        <div class="mb-8">
            <input type="text" v-model="searchQuery" placeholder="Buscar novo jogo para adicionar..."
                class="w-full p-3 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-green-500">
        </div>

        <div v-if="feedbackMessage"></div>

        <div v-if="searchResults.length > 0" class="bg-gray-800 rounded-lg p-4 mt-4">
            <h3 class="text-xl font-bold mb-4">Resultados da Busca:</h3>
            <ul class="space-y-3">
                <li v-for="game in searchResults" :key="game.id"
                    class="flex items-center justify-between p-2 rounded-md hover:bg-gray-700">
                    <span>{{ game.name }}</span>
                    <button @click="addGame(game.slug)"
                        class="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded text-lg">+</button>
                </li>
            </ul>
        </div>

        <div class="flex justify-between items-center mb-8">
            <h1 class="text-4xl font-bold">Gerenciar Minha Lista</h1>
        </div>

        <div v-if="isLoading" class="text-center text-gray-400">Carregando sua lista...</div>

        <div v-if="isLoading && myFavoriteGames.length === 0" class="text-center text-gray-400">Carregando sua lista...
        </div>

        <div v-else-if="myFavoriteGames.length > 0"
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <GameCard v-for="fav in myFavoriteGames" @edit-annotations="openAnnotationModal" :key="fav.id" :favorite="fav" @delete-game="handleDeleteGame" />
        </div>

        <div v-else class="text-center text-gray-400 border-2 border-dashed border-gray-600 rounded-lg p-16">
            <p class="text-2xl">Sua lista de favoritos está vazia.</p>
        </div>

        <div v-if="canLoadMore && myFavoriteGames.length > 0 && !isLoading" class="text-center mt-8">
            <button @click="fetchMyList(true)"
                class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded">
                Carregar Mais
            </button>
        </div>

        <EditAnnotationModal :show="isAnnotationModalVisible" :existing-annotations="editingFavoriteGame ? editingFavoriteGame.annotations : []" @close="closeAnnotationsModal" @save="handleSaveAnnotation"/>
    </div>
</template>

<script>
import EditAnnotationModal from '@/components/EditAnnotationModal.vue';
import { annotationService } from '@/services/apiService.js';
import { rawgService } from '@/services/apiService.js';
import { favoriteGamesService } from '@/services/apiService.js';
import GameCard from '@/components/GameCard.vue';

export default {
    name: 'MyListView',
    components: { 
        GameCard,
        EditAnnotationModal
     },
    data() {
        return {
            myFavoriteGames: [],
            isLoading: true,
            searchQuery: '',
            searchResults: [],
            debounceTimer: null,
            feedbackMessage: null,
            isError: false,
            currentPage: 1,
            canLoadMore: true,
            isAnnotationModalVisible: false,
            editingFavoriteGame: null
        }
    },
    watch: {
        // Este "watcher" observa a variável searchQuery
        searchQuery(newQuery) {
            // Limpa o timer anterior para reiniciar a contagem
            clearTimeout(this.debounceTimer);

            if (newQuery.length < 3) {
                this.searchResults = [];
                return;
            }

            // Cria um novo timer. A busca só acontecerá depois de 500ms.
            this.debounceTimer = setTimeout(() => {
                this.performSearch(newQuery);
            }, 200); // 500ms de espera
        }
    },
    async mounted() {
        await this.fetchMyList();
    },
    methods: {
        async fetchMyList(loadMore = false) {
            if (!loadMore) {
                this.myFavoriteGames = []
                this.currentPage = 1
                this.canLoadMore = true
            }

            this.isLoading = true

            try {
                const response = await favoriteGamesService.getMyList(this.currentPage, 12)

                this.myFavoriteGames.push(...response.data)

                if (response.data.length < 12) {
                    this.canLoadMore = false
                }

                this.canLoadMore++

                this.myFavoriteGames = response.data


            } catch (error) {
                console.error("Erro ao buscar a lista de favoritos: ", error)

            } finally {
                this.isLoading = false
            }
        },

        openAnnotationModal(favoriteGame){
            this.editingFavoriteGame = favoriteGame
            this.isAnnotationModalVisible = true
        },

        closeAnnotationsModal(){
            this.isAnnotationModalVisible = false
            this.editingFavoriteGame = null
        },

        async handleSaveAnnotation(newText){
            if(!this.editingFavoriteGame) 
            
            return

            try {
                const existingAnnotations = this.editingFavoriteGame.annotations[0]

                if(existingAnnotations){

                    const updateDto = {id: existingAnnotations.id, text: newText}
                    await annotationService.update(existingAnnotations.id, updateDto)

                } else {

                    const createDto = {text: newText, favoriteGameId: this.editingFavoriteGame.id}
                    await annotationService.create(createDto)

                }

                this.closeAnnotationsModal()
                await this.fetchMyList(false)

            } catch (error) {
                console.error("Erro ao salvar anotação: ", error)
                alert("Não foi possível salvar a anotação.")
            }
        },

        async performSearch(query) {
            try {
                const response = await rawgService.searchGames(query); // <-- Precisamos criar esta função
                this.searchResults = response.data.results;
            } catch (error) {
                console.error("Erro na busca:", error);
            }
        },
        async addGame(gameSlug) {
            try {
                const response = await favoriteGamesService.addFavorite(gameSlug)

                await this.fetchMyList()

                this.searchQuery = ''
                this.searchResults = []

                alert(`'${response.data.name}' foi adicionado à sua lista com sucesso!`)
            } catch (error) {
                console.error("Erro ao adicionar jogo:", error.rep)

                if (error.response && error.response.status === 409) {
                    alert("Esse jogo já está na sua lista de favoritos")
                } else {
                    alert("Ocorreu um erro ao adicionar o jogo.")
                }
            }
        },
        async handleDeleteGame(gameId) {
            if (confirm('Tem certeza que quer remover este jogo da sua lista?')) {
                try {
                    
                    // await favoriteGamesService.deleteFavorite(gameId)

                    this.myFavoriteGames = this.myFavoriteGames.filter(game => game.id !== gameId)
                    alert('Jogo removido!')


                } catch (error) {
                    console.error("Erro ao remover jogo: ", error)
                    alert("Não foi possível remover o jogo. Tente novamente.")
                }
            }
        }
    }
}
</script>