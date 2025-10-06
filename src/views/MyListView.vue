<template>

    <div class="container mx-auto p-8 min-h-screen">
        <div class="mb-8 max-w-2xl mx-auto">
            <div class="relative">
                <div
                    class="absolute -inset-1 bg-gradient-to-r from-[#ff00ff] via-[#00ffff] to-[#ff00ff] rounded-lg blur opacity-50" />
                <input type="text" v-model="searchQuery" placeholder="Buscar novo jogo para adicionar..."
                    class="relative neon-input w-full text-lg">
            </div>
        </div>

        <div v-if="searchResults.length > 0" class="vaporwave-card rounded-lg p-6 mb-8 max-w-2xl mx-auto">
            <h3 class="text-xl font-bold mb-4 neon-text-cyan">RESULTADOS DA BUSCA:</h3>
            <ul class="space-y-3">
                <li v-for="game in searchResults" :key="game.id"
                    class="flex items-center justify-between p-3 rounded-lg bg-[#0f0f2e]/50 hover:bg-[#2d1b4e] transition-all border border-[#2d1b4e]">
                    <span class="text-white">{{ game.name }}</span>
                    <button @click="addGame(game.slug)"
                        class="neon-button-pink w-10 h-10 flex items-center justify-center text-xl">+</button>
                </li>
            </ul>
        </div>

        <div class="text-center mb-12">
            <h1 class="text-5xl md:text-6xl font-black text-white">GERENCIAR <span class="neon-text-pink">MINHA
                    LISTA</span></h1>
        </div>

        <div v-if="isLoading && myFavoriteGames.length === 0" class="text-center text-gray-400">Carregando sua lista...
        </div>

        <div v-else-if="myFavoriteGames.length > 0"
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <GameCard v-for="fav in myFavoriteGames" @edit-annotations="openAnnotationModal" :key="fav.id"
                :favorite="fav" @delete-game="handleDeleteGame" />
        </div>

        <div v-else class="text-center text-gray-400 border-2 border-dashed border-gray-600 rounded-lg p-16">
            <p class="text-2xl">Sua lista de favoritos está vazia.</p>
        </div>

        <div v-if="canLoadMore && myFavoriteGames.length > 0 && !isLoading" class="text-center mt-8">
            <button @click="fetchMyList(true)"
                class="px-6 py-2 neon-button-pink rounded-lg text-sm font-bold border-2 transition-all">
                Carregar Mais
            </button>
        </div>

        <ConfirmModal :show="isConfirmModalVisible" 
        title="Confirmar exclusão" 
        message="Tem certeza que quer remover este jogo da sua lista?" 
        confirmButton="Sim, Remover" 
        cancelButton="Cancelar" 
        @confirm="confirmDelete" 
        @cancel="closeConfirmModal"/>

        <EditAnnotationModal :show="isAnnotationModalVisible"
            :existing-annotations="editingFavoriteGame ? editingFavoriteGame.annotations : []"
            @close="closeAnnotationsModal" @save="handleSaveAnnotation" />
    </div>
</template>

<script>
import ConfirmModal from '@/components/ConfirmModal.vue';
import EditAnnotationModal from '@/components/EditAnnotationModal.vue';
import { annotationService } from '@/services/apiService.js';
import { rawgService } from '@/services/apiService.js';
import { favoriteGamesService } from '@/services/apiService.js';
import GameCard from '@/components/GameCard.vue';
import { notificationStore } from '@/services/notificationStore';

export default {
    name: 'MyListView',
    components: {
        GameCard,
        EditAnnotationModal,
        ConfirmModal
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
            editingFavoriteGame: null,
            gameIdToDelete: null,
            isConfirmModalVisible: false
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
            }, 100);
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
                const pageSize = 8
                const response = await favoriteGamesService.getMyList(this.currentPage, pageSize)

                this.myFavoriteGames.push(...response.data)

                if (response.data.length < pageSize) {
                    this.canLoadMore = false
                }

                this.currentPage++

                // this.myFavoriteGames = response.data


            } catch (error) {
                console.error("Erro ao buscar a lista de favoritos: ", error)

            } finally {
                this.isLoading = false
            }
        },

        openAnnotationModal(favoriteGame) {
            this.editingFavoriteGame = favoriteGame
            this.isAnnotationModalVisible = true
        },

        closeAnnotationsModal() {
            this.isAnnotationModalVisible = false
            this.editingFavoriteGame = null
        },

        async handleSaveAnnotation(newText) {
            if (!this.editingFavoriteGame)

                return

            try {
                const existingAnnotations = this.editingFavoriteGame.annotations[0]

                if (existingAnnotations) {

                    const updateDto = { id: existingAnnotations.id, text: newText }
                    await annotationService.update(existingAnnotations.id, updateDto)

                } else {

                    const createDto = { text: newText, favoriteGameId: this.editingFavoriteGame.id }
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

                notificationStore.show(`${response.data.name} adicionado com sucesso!`);

                location.reload()
            } catch (error) {
                console.error("Erro ao adicionar jogo:", error.rep)

                if (error.response && error.response.status === 409) {
                    alert("Esse jogo já está na sua lista de favoritos")
                } else {
                    alert("Ocorreu um erro ao adicionar o jogo.")
                }
            }
        },

        openConfirmModal(gameId){
            this.gameIdToDelete = gameId
            this.isConfirmModalVisible = true
        },

        closeConfirmModal(){
            this.isConfirmModalVisible = false
        },

        async handleDeleteGame(gameId) {
            this.gameIdToDelete = gameId
            this.isConfirmModalVisible = true
        },

        async confirmDelete(){
            if(!this.gameIdToDelete){
                return
            }

            try {
                await favoriteGamesService.deleteFavorite(this.gameIdToDelete)

                this.myFavoriteGames = this.myFavoriteGames.filter(fav => fav.game.id !== this.gameIdToDelete)

                notificationStore.show('Jogo removido com sucesso!')

            } catch (error) {
                console.error("Erro ao remover jogo:", error)
                notificationStore.show('Não foi possível remover o jogo', 'error')

            } finally {
                this.closeConfirmModal()
            }
        },

        async closeModal(){
            this.isConfirmModalVisible = false
            this.gameIdToDelete = null
        }
    }
}
</script>