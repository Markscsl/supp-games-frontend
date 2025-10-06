<template>
  <nav class="sticky top-0 z-50 backdrop-blur-lg bg-[#0a0a1f]/80 border-b-2 border-[#2d1b4e]">
    <div :class="{'flex justify-between items-center': !isAuthPage, 'flex justify-center': isAuthPage}"
         class="max-w-7xl mx-auto px-8 h-20">

      <RouterLink to="/" class="flex items-center gap-3">
        <div class="relative">
          <img src="@/assets/img/icon-ws.png" alt="Logo" class="h-10">
          <div class="absolute inset-0 bg-[#ff00ff] opacity-30 blur-lg rounded-full" />
        </div>
        <span class="font-black text-2xl chrome-text tracking-tight">SUPPGAMES</span>
      </RouterLink>

      <div v-if="!isAuthPage">
        <div v-if="isLoggedIn" class="flex items-center space-x-6">
          <RouterLink to="/" class="text-gray-300 hover:text-[#ff00ff] transition-colors font-medium uppercase">
            Home
          </RouterLink>
          <RouterLink to="/my-list" class="text-gray-300 hover:text-[#00ffff] transition-colors font-medium uppercase">
            Minha Lista
          </RouterLink>
          <RouterLink to="/profile" class="text-gray-300 hover:text-[#00ffff] transition-colors font-medium uppercase">Perfil</RouterLink>
          <span class="text-[#2d1b4e]">|</span>
          <span v-if="user" class="text-white">Olá, <RouterLink to="/profile" class="font-bold neon-text-pink">{{ user.name }}</RouterLink></span>
          <button @click="logout"
                  class="neon-button-pink px-4 py-2 rounded-lg text-sm font-bold text-white transition-all duration-300 hover:scale-105 border border-red-500/30">
            Sair
          </button>
        </div>

        <div v-else class="flex items-center space-x-4">
          <RouterLink to="/login"
                      class="px-6 py-2 neon-button-pink rounded-lg text-sm font-bold border-2 transition-all">
            Entrar
          </RouterLink>
          <RouterLink to="/register"
                      class="neon-button-pink px-4 py-2 text-sm">
            Cadastro
          </RouterLink>
        </div>
      </div>
    </div>

    <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#ff00ff] to-transparent opacity-50" />
  </nav>
</template>

<script>
import { authStore } from '@/services/authStore';
import { RouterLink } from 'vue-router';

export default{
    name: "Navbar",
    components:{
        RouterLink
    },
 
    computed:{
        isLoggedIn(){
            return authStore.isLoggedIn
        },
        
        user(){
            return authStore.user;
        },
        
        isAuthPage(){
            const authRoutes = ['/login', '/register']
            return authRoutes.includes(this.$route.path)
        }
    },

    methods:{
        logout(){
            authStore.logout()
        }
    }
}
</script>