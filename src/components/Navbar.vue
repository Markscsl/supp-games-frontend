<template>

<nav class="text-white">
    <div :class="{'flex justify-between items-center':!isAuthPage, 'flex justify-center': isAuthPage}" class="mx-auto px-8 h-[80px] py-3 r">
      
      <RouterLink  to="/" class="flex items-center">
        <img src="@/assets/img/icon-ws.png" alt="Logo" class="h-10 mr-3">
        <span class="font-bold text-xl">SuppGames</span>
      </RouterLink>

      <div v-if="!isAuthPage">
        <div v-if="isLoggedIn" class="flex items-center space-x-6">
            <RouterLink to="/" class="hover:text-green-400">Home</RouterLink>
            <RouterLink to="/my-list" class="hover:text-green-400">Minha Lista</RouterLink>
            <RouterLink to="/profile" class="hover:text-blue-400">Perfil</RouterLink>
            <span class="text-gray-500">|</span>
            <span v-if="user">Olá, {{user.name}}!</span>
            <button @click="logout" class="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-sm font-medium">Sair</button>
        </div>

        <div v-else class="flex items-center space-x-4">
            <RouterLink to="/login" class=" hover:bg-green-500 border-1 border-green-500 px-4 py-2 rounded-md text-sm font-medium">Entrar</RouterLink>
            <RouterLink to="/register" class=" hover:bg-blue-500 border-1 border-blue-500 px-4 py-2 rounded-md text-sm font-medium">Cadastro</RouterLink>
        </div>
      </div>
    </div>
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