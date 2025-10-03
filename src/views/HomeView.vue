<template>
    <div>
        <section v-if="!authStore.isLoggedIn"
            class="relative h-[70vh] mt-30 flex items-center justify-center neon-text-pink overflow-hidden animate-fade-in">

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
                        <h1 class="text-4xl pb-10 font-bold neon-text-pink mb-4">Jogo em Destaque do Dia</h1>

                        <div
                            class="flex flex-col md:flex-row retro-frame items-start gap-8 bg-0 p-10 rounded-lg max-w-6xl mx-auto">

                            <div class="md:w-3/6">
                                <img :src="randomGame.background_image" alt="Capa do Jogo"
                                    class="w-full mt-8 h-auto object-cover rounded-lg">
                            </div>

                            <div class="md:w-2/3 text-left">
                                <h3 class="text-4xl font-bold neon-text-pink">{{ randomGame.name }}</h3>
                                <div class="mt-4 flex flex-wrap gap-2">
                                    <p class="mt-4 text-gray-300">{{ randomGame.description_raw }}</p>
                                    <span v-for="p in randomGame.platforms" :key="p.platform.id"
                                        class="bg-opacity-20 bg-purple-700 text-white text-sm font-medium px-3 py-1 rounded-full">
                                        {{ p.platform.name }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div class="m-20 flex flex-col animate-fade-in rounded-lg items-center bg-transparent border-b-0 text-5xl font-bold text-white retro-frame">
                    <h1 class="my-20 neon-text-pink">Minha Lista de Jogos Favoritos</h1>
                    
                    <div v-if="isLoading">Carregando sua lista...</div>

                    <div v-else-if="myFavoriteGames.length > 0"
                        class="grid  grid-cols-1 mx-8 md:grid-cols-2 lg:grid-cols-3  pb-20 gap-8">
                        <div v-for="fav in myFavoriteGames" :key="fav.id"
                            class="bg-gray-800 relative vaporwave-card rounded-lg overflow-hidden hover:border-[#ff00ff] retro-frame transition-all duration-300 card-hover shadow-lg">
                            <img :src="fav.game.imageUrl" :alt="fav.game.name" class="w-full h-48 object-cover">
                            <div class="p-4">
                                <h3 class="text-xl font-bold text-white">{{ fav.game.name }}</h3>
                            </div>
                        </div>
                    </div>

                    <div v-else
                        class="text-center mb-20 text-gray-400 border-2 border-dashed border-gray-600 rounded-lg p-16">
                        <p class="text-2xl">Nenhum jogo adicionado</p>
                        <p class="mt-2">Que tal adicionar alguns jogos à sua lista?</p>
                    </div>
                </div>

                <section class="mt-16">
                    <h2 class="text-3xl font-bold mb-6">Listas da Comunidade</h2>

                    <div v-if="isLoading" class="text-center">Carregando listas da Comunidade</div>

                    <div v-else-if="publicLists.length > 0" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        <PublicUserCard v-for="user in publicLists" :key="user.userId" :user="user"/>
                    </div>

                    <div v-else>Nenhuma outra lista pública para mostrar no momento</div>
                </section>


            </div>


            <div v-else-if="!authStore.isLoggedIn">
                <div v-if="isLoading" class="text-center text-2xl font-light text-gray-400 mt-20">
                    Buscando o jogo do dia...
                </div>

                <div v-else-if="randomGame" class="text-center animate-fade-in">
                    <h1 class="text-4xl pt-8 pb-10 neon-text-pink font-bold mb-4">Jogo em Destaque do Dia</h1>

                    <div class="max-w-4xl mx-auto mt-8">

                        <img :src="randomGame.background_image" alt="Capa do Jogo"
                            class="w-full h-auto object-cover rounded-lg retro-frame mb-6">



                        <div class="mt-30 flex flex-wrap justify-center gap-16">

                            <h2 class="text-5xl neon-text-pink font-bold">{{ randomGame.name }}</h2>
                            <p class="mt-4 text-lg font-medium text-gray-300">{{ randomGame.description_raw }}</p>
                            <span v-for="platformContainer in randomGame.platforms" :key="platformContainer.platform.id"
                                class="bg-purple-700 bg-opacity-20 text-white text-sm font-medium px-3 py-1 rounded-full">
                                {{ platformContainer.platform.name }}
                            </span>
                        </div>
                    </div>
                </div>

                <div v-else class="text-center text-2xl text-red-500 mt-20">
                    Não foi possível carregar o jogo do dia. Tente novamente mais tarde.
                </div>

                <section class="mt-16 text-center">
                    <h2 class="text-3xl font-bold mb-6">Listas da Comunidade</h2>

                    <div v-if="isLoading" class="text-center">Carregando listas da Comunidade</div>

                    <div v-else-if="publicLists.length > 0" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        <PublicUserCard v-for="user in publicLists" :key="user.userId" :user="user"/>
                    </div>

                    <div v-else>Nenhuma outra lista pública para mostrar no momento</div>
                </section>

            </div>

        </div>

    </div>
</template>

<script>
import { userService } from '@/services/apiService.js';
import { authStore } from '@/services/authStore';
import { rawgService } from '@/services/apiService.js';
import { favoriteGamesService } from '@/services/apiService.js';
import Typewriter from 'typewriter-effect/dist/core';
import PublicUserCard from '@/components/PublicUserCard.vue';

export default {
    name: 'HomeView',
    components: { 
        PublicUserCard
    },
    data() {
        return {
            authStore: authStore,
            myFavoriteGames: [],
            randomGame: null,
            isLoading: true, // Um loading para a lista
            publicLists: []
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
            this.fetchPublicLists()
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

                this.randomGame = response.data;
            } catch (error) {
                console.error("Erro ao buscar jogo aleatório:", error);
            } finally {
                this.isLoading = false;
            }
        },

        async fetchPublicLists() {
            this.isLoading = true

            try {
                const response = await userService.getPublicLists(1, 5)

                this.publicLists = response.data

            } catch {
                console.error("Erro ao buscar listas públicas:", error)

            } finally {
                this.isLoading = false
            }
        },

        async fetchMyList() {
            this.isLoading = true;
            try {
                const response = await favoriteGamesService.getMyList();
                this.myFavoriteGames = response.data;
            } catch (error) {
                console.error("Erro ao buscar a lista de favoritos:", error);
                if (error.response && error.response.status === 401) {
                    authStore.logout();
                }
            } finally {
                this.isLoading = false;
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

.animate-border-spin {
    animation: borderSpin 4s linear infinite;
}

@keyframes borderSpin {
    from {
        opacity: 0%;
        transform: rotate(0deg);
    }

    to {
        opacity: 100%;
        transform: rotate(360deg);
    }
}
</style>