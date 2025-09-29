<template>
    <div>
        <section v-if="!authStore.isLoggedIn"
            class="bg-transparent border-b-0 border-b-[#5993CD] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0
    shadow-[0_0_5px_0_rgba(59,130,246,0.8),0_0_15px_5px_rgba(59,130,246,0.6)] relative h-[70vh] flex items-center justify-center text-white overflow-hidden animate-fade-in">

            <div
                class="absolute top-1/2 left-1/2 w-[160vw] h-[90vw] min-w-full min-h-full -translate-x-1/2 -translate-y-1/2">
                <iframe class="w-full h-full"
                    src="https://www.youtube.com/embed/XBIaqOm0RKQ?autoplay=1&mute=1&loop=1&playlist=XBIaqOm0RKQ&controls=0&showinfo=0&autohide=1&modestbranding=1"
                    frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            </div>

            <div class="absolute inset-0 bg-black/50 backdrop-blur-sm z-10"></div>

            <div class="text-center absolute z-20 inset-0 py-60">
                <div class="text-6xl text-white-400 font-bold h-8" ref="typewriter"></div>
            </div>

        </section>

        <div class="container py-30 mx-auto p-8 text-white">
            <div v-if="authStore.isLoggedIn">
                <section>
                    <div v-if="isLoading" class="text-center text-2xl font-light text-gray-400 mt-20">
                        Buscando o jogo do dia...
                    </div>

                    <div v-else-if="randomGame" class="text-center animate-fade-in">
                        <h1 class="text-4xl pb-10 font-bold mb-4">Jogo em Destaque do Dia</h1>

                        <div
                            class="flex flex-col md:flex-row bg-transparent border-b-0 border-green-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0
    shadow-[0_0_5px_0_rgba(1,130,246,0.8),0_0_15px_5px_rgba(1,3046,0.6)] items-start gap-8 bg-0 p-10 rounded-lg max-w-6xl mx-auto">

                            <div class="md:w-3/6">
                                <img :src="randomGame.background_image" alt="Capa do Jogo"
                                    class="w-full mt-8 h-auto object-cover rounded-lg">
                            </div>

                            <div class="md:w-2/3 text-left">
                                <h3 class="text-4xl font-bold text-green-400">{{ randomGame.name }}</h3>
                                <div class="mt-4 flex flex-wrap gap-2">
                                    <p class="mt-4 text-gray-300">{{ randomGame.description_raw }}</p>
                                    <span v-for="p in randomGame.platforms" :key="p.platform.id"
                                        class="bg-green-500 bg-opacity-20 text-green-white text-sm font-medium px-3 py-1 rounded-full">
                                        {{ p.platform.name }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div class="m-20 py-16  flex flex-col rounded-lg items-center bg-transparent border-b-0 text-5xl font-bold text-white border-green-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0
    shadow-[0_0_5px_0_rgba(1,130,246,0.8),0_0_15px_5px_rgba(1,3046,0.6)]">
                    <h1 class="my-20">Minha Lista de Jogos Favoritos</h1>

                    <div v-if="isLoading">Carregando sua lista...</div>

                    <div v-else-if="myFavoriteGames.length > 0"
                        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  pb-20 gap-8">
                        <div clas v-for="game in myFavoriteGames" :key="game.id"
                            class="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                            <img :src="game.imageUrl" :alt="game.name" class="w-full h-48 object-cover">
                            <div class="p-4">
                                <h3 class="text-xl font-bold text-green-400">{{ game.name }}</h3>
                            </div>
                        </div>
                    </div>

                    <div v-else
                        class="text-center text-gray-400 border-2 border-dashed border-gray-600 rounded-lg p-16">
                        <p class="text-2xl">Nenhum jogo adicionado</p>
                        <p class="mt-2">Que tal adicionar alguns jogos à sua lista?</p>
                    </div>
                </div>



            </div>


            <div v-else-if="!authStore.isLoggedIn">
                <div v-if="isLoading" class="text-center text-2xl font-light text-gray-400 mt-20">
                    Buscando o jogo do dia...
                </div>

                <div v-else-if="randomGame" class="text-center animate-fade-in">
                    <h1 class="text-4xl pt-8 pb-10 font-bold mb-4">Jogo em Destaque do Dia</h1>

                    <div class="max-w-4xl mx-auto mt-8">

                        <img :src="randomGame.background_image" alt="Capa do Jogo"
                            class="w-full h-auto object-cover rounded-lg  border-solid border-0 border-[#5993CD] shadow-[0_0_5px_0_rgba(59,130,246,0.8),0_0_15px_5px_rgba(59,130,246,0.6)] bg-opacity-10 mb-6">



                        <div class="mt-40 flex flex-wrap justify-center gap-16">

                            <h2 class="text-5xl text-green-500 font-bold">{{ randomGame.name }}</h2>
                            <p class="mt-4 text-lg font-medium text-gray-300">{{ randomGame.description_raw }}</p>
                            <span v-for="platformContainer in randomGame.platforms" :key="platformContainer.platform.id"
                                class="bg-green-500 bg-opacity-20 text-white text-sm font-medium px-3 py-1 rounded-full">
                                {{ platformContainer.platform.name }}
                            </span>
                        </div>
                    </div>
                </div>

                <div v-else class="text-center text-2xl text-red-500 mt-20">
                    Não foi possível carregar o jogo do dia. Tente novamente mais tarde.
                </div>

            </div>

        </div>

    </div>
</template>

<script>
import { userService } from '@/services/apiService.js';
import { authStore } from '@/services/apiService.js';
import { rawgService } from '@/services/apiService.js';
import { favoriteGamesService } from '@/services/apiService.js';
import Typewriter from 'typewriter-effect/dist/core';

export default {
    name: 'HomeView',
    data() {
        return {
            authStore: authStore,
            myFavoriteGames: [],
            randomGame: null,
            isLoadingList: true, // Um loading para a lista
            isLoadingRandom: true,
            publicLists: [],
            isLoadingPublicLists: true // Outro loading para o jogo do dia
        }
    },
    mounted() {
        if (this.authStore.isLoggedIn) {
            // Se estiver logado, busca as duas coisas
            this.fetchMyList();
            this.fetchRandomGame();
            this.fetchPublicLists()
        } else {
            // Se for visitante, inicia a experiência de visitante
            this.initVisitorExperience();
        }
    },
    methods: {
        initVisitorExperience() {
            this.fetchRandomGame();
            this.$nextTick(() => {
                if (this.$refs.typewriter) {
                    new Typewriter(this.$refs.typewriter, {
                        strings: ['Seja bem-vindo à SuppGames', 'Organize sua lista.', 'Descubra novos jogos.'],
                        autoStart: true,
                        loop: true,
                        delay: 75,
                    });
                }
            });
        },
        async fetchRandomGame() {
            this.isLoadingRandom = true;
            try {
                const response = await rawgService.getRandomGame();

                console.log("DADOS RECEBIDOS: ", response.data)

                this.randomGame = response.data;
            } catch (error) {
                console.error("Erro ao buscar jogo aleatório:", error);
            } finally {
                this.isLoadingRandom = false;
            }
        },

        async fetchPublicLists() {
            this.isLoadingPublicLists = true

            try {
                const response = await userService.getPublicLists(1, 5)

                console.log("Resposta das Listas Públicas: ", response.data)

                this.publicLists = response.data

            } catch {
                console.error("Erro ao buscar listas públicas:", error)

            } finally {
                this.isLoadingPublicLists = false
            }
        },

        async fetchMyList() {
            this.isLoadingList = true;
            try {
                const response = await favoriteGamesService.getMyList();
                this.myFavoriteGames = response.data;
            } catch (error) {
                console.error("Erro ao buscar a lista de favoritos:", error);
                if (error.response && error.response.status === 401) {
                    authStore.logout();
                }
            } finally {
                this.isLoadingList = false;
            }
        }
    }
}
</script>

<style scoped>
/* Animação de fade-in para uma entrada suave */
.animate-fade-in {
    animation: fadeIn 1s ease-in-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>