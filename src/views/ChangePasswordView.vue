<template>
  <div class="container mx-auto p-8 text-white">
    <h1 class="text-4xl text-center mt-30 font-bold mb-8">Alterar Senha</h1>

    <div class="max-w-md mx-auto flex justify-center bg-gray-800 p-8 rounded-lg shadow-lg">
      <form @submit.prevent="submitChangePassword">
        
        <div class="mb-4">
          <label class="block text-white mb-2 font-semibold">Senha Atual</label>
          <div class="relative">
            <input 
              v-model="form.currentPassword"
              :type="currentPasswordType"
              placeholder="Digite sua senha atual"
              class="w-full p-3 pr-10 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
            <button type="button" @click="toggleVisibility('current')" class="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-white">
              <svg v-if="currentPasswordType === 'password'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fill-rule="evenodd" d="M.458 10C3.732 4.943 9.522 3 10 3s6.268 1.943 9.542 7c-3.274 5.057-9.064 7-9.542 7S3.732 15.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" /></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fill-rule="evenodd" d="M.458 10C3.732 4.943 9.522 3 10 3s6.268 1.943 9.542 7c-3.274 5.057-9.064 7-9.542 7S3.732 15.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" /></svg>
            </button>
          </div>
        </div>

        <div class="mb-4">
          <label class="block text-white mb-2 font-semibold">Nova Senha</label>
          <div class="relative">
            <input 
              v-model="form.newPassword"
              :type="newPasswordType"
              placeholder="••••••••"
              class="w-full p-3 pr-10 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
            <button type="button" @click="toggleVisibility('new')" class="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-white">
               <svg v-if="newPasswordType === 'password'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fill-rule="evenodd" d="M.458 10C3.732 4.943 9.522 3 10 3s6.268 1.943 9.542 7c-3.274 5.057-9.064 7-9.542 7S3.732 15.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" /></svg>
               <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fill-rule="evenodd" d="M.458 10C3.732 4.943 9.522 3 10 3s6.268 1.943 9.542 7c-3.274 5.057-9.064 7-9.542 7S3.732 15.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" /></svg>
            </button>
          </div>
        </div>
        
        <div v-if="feedbackMessage" :class="isError ? 'text-red-400' : 'text-green-400'" class="text-center mt-4">
          {{ feedbackMessage }}
        </div>

        <BaseButton type="submit" variant="primary" :disabled="isSaving">
          {{ isSaving ? 'Salvando...' : 'Alterar Senha' }}
        </BaseButton>
      </form>
    </div>
  </div>
</template>

<script>
import { authService } from '@/services/apiService';
import BaseInput from '@/components/BaseInput.vue';
import BaseButton from '@/components/BaseButton.vue';

export default {
  name: 'ChangePasswordView',
  components: { BaseInput, BaseButton },
  data() {
    return {
      form: {
        currentPassword: '',
        newPassword: '',
        // Adicione confirmNewPassword se o seu DTO de back-end o exigir
      },
      currentPasswordType: 'password',
      newPasswordType: 'password',
      isSaving: false,
      feedbackMessage: null,
      isError: false,
    }
  },
  methods: {
    toggleVisibility(field) {
      if (field === 'current') {
        this.currentPasswordType = this.currentPasswordType === 'password' ? 'text' : 'password';
      } else if (field === 'new') {
        this.newPasswordType = this.newPasswordType === 'password' ? 'text' : 'password';
      }
    },
    async submitChangePassword() {
      this.isSaving = true;
      this.feedbackMessage = null;
      this.isError = false;

      try {
        await authService.changePassword(this.form);
        this.feedbackMessage = "Senha alterada com sucesso!";
        this.form.currentPassword = '';
        this.form.newPassword = '';
      } catch (error) {
        console.error("Erro ao alterar senha:", error);
        this.feedbackMessage = error.response?.data || "Erro ao alterar a senha.";
        this.isError = true;
      } finally {
        this.isSaving = false;
      }
    }
  }
}
</script>