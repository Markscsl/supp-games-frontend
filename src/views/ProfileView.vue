<template>
  <div class="container mx-auto my-30 p-8 text-white">

    <h1 class="text-4xl text-center font-bold mb-8">Editar Perfil</h1>

    <div v-if="isLoading" class="text-center">Carregando perfil...</div>

    <div v-else class="w-150 mx-auto flex justify-center bg-purple-0 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 border retro-frame
 p-8 shadow-lg">
      <form @submit.prevent="updateProfile">
        <BaseInput 
          label="Nome" 
          type="text"
          v-model="form.name" 
          placeholder="Seu nome de usuário" 
        />
        
        <BaseInput 
          label="Email" 
          type="email" 
          v-model="form.email" 
          placeholder="seu@email.com" 
        />

        
        
        <div v-if="feedbackMessage" :class="isError ? 'text-red-400' : 'text-green-400'" class="text-center mt-4">
          {{ feedbackMessage }}
        </div>

        <BaseButton type="submit" variant="primary" :disabled="isSaving">
          {{ isSaving ? 'Salvando...' : 'Salvar Alterações' }}
        </BaseButton>

        <div class="flex mt-8 items-center justify-center">
            <RouterLink to="/change-password">Atualizar senha</RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { authStore } from '@/services/authStore';
import { userService } from '@/services/apiService.js';
import BaseInput from '@/components/BaseInput.vue';
import BaseButton from '@/components/BaseButton.vue';

export default {
  name: 'ProfileView',
  components: { BaseInput, BaseButton },
  data() {
    return {
      form: {
        name: '',
        email: ''
      },
      isLoading: true,
      isSaving: false,
      feedbackMessage: null,
      isError: false,
    }
  },
  async mounted() {
    // Busca os dados do usuário atual para preencher o formulário
    if (authStore.user?.id) {
      try {
        const response = await userService.getUser(authStore.user.id);
        this.form.name = response.data.name;
        this.form.email = response.data.email;
      } catch (error) {
        console.error("Erro ao buscar dados do perfil:", error);
        this.feedbackMessage = "Não foi possível carregar seus dados.";
        this.isError = true;
      } finally {
        this.isLoading = false;
      }
    }
  },
  methods: {
    async updateProfile() {
      this.isSaving = true;
      this.feedbackMessage = null;
      this.isError = false;

      try {
        await userService.updateUser(authStore.user.id, this.form);
        this.feedbackMessage = "Perfil atualizado com sucesso!";
        // Opcional: Atualizar o nome no authStore se ele mudou
        if (authStore.user.name !== this.form.name) {
            authStore.user.name = this.form.name;
        }
      } catch (error) {
        console.error("Erro ao atualizar perfil:", error);
        this.feedbackMessage = "Erro ao salvar. Verifique os dados e tente novamente.";
        this.isError = true;
      } finally {
        this.isSaving = false;
      }
    }
  }
}
</script>