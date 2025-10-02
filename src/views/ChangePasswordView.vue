<template>
  <div class="container mx-auto p-8 text-white">
    <h1 class="text-4xl flex justify-center font-bold mb-8">Alterar Senha</h1>

    <div class="w-150 mx-auto flex justify-center bg-purple-0 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 border retro-frame
 p-8 shadow-lg">
      <form @submit.prevent="submitChangePassword">

        <BaseInput 
          label="Senha Atual"
          :type="showCurrentPassword ? 'text' : 'password'"
          v-model="form.currentPassword"
          placeholder="Digite sua senha atual"
        />
        <button type="button" @click="showCurrentPassword = !showCurrentPassword" class="text-sm text-gray-400 hover:text-white -mt-2 mb-4">
          {{ showCurrentPassword ? 'Esconder' : 'Mostrar' }} senha
        </button>

        <BaseInput 
          label="Nova Senha"
          :type="showNewPassword ? 'text' : 'password'"
          v-model="form.newPassword"
          placeholder="••••••••"
        />
        <button type="button" @click="showNewPassword = !showNewPassword" class="text-sm text-gray-400 hover:text-white -mt-2 mb-4">
          {{ showNewPassword ? 'Esconder' : 'Mostrar' }} senha
        </button>

        <BaseInput 
          label="Confirmar Nova Senha"
          :type="showNewPassword ? 'text' : 'password'"
          v-model="form.confirmNewPassword"
          placeholder="••••••••"
        />

        <div v-if="feedbackMessage" 
          :class="isError ? 'bg-red-500/20 text-red-300' : 'bg-green-500/20 text-green-300'"
          class="p-3 rounded-md text-center mt-4"
        >
          {{ feedbackMessage }}
        </div>

        <BaseButton type="submit" variant="primary" :disabled="isSaving">
          {{ isSaving ? 'Salvando...' : 'Alterar Senha' }}
        </BaseButton>

        <div class="flex mt-8 items-center justify-center">
            <RouterLink to="/profile">Atualizar perfil</RouterLink>
        </div>
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
        confirmNewPassword: ''
      },
      showCurrentPassword: false, // Controla a visibilidade da senha atual
      showNewPassword: false,     // Controla a visibilidade da nova senha
      isSaving: false,
      feedbackMessage: null,
      isError: false,
    }
  },
  methods: {
    async submitChangePassword() {
      this.isSaving = true;
      this.feedbackMessage = null;
      this.isError = false;

      // Validação extra no front-end para a confirmação de senha
      if (this.form.newPassword !== this.form.confirmNewPassword) {
        this.feedbackMessage = "A nova senha e a confirmação não são iguais.";
        this.isError = true;
        this.isSaving = false;
        return; // Para a execução
      }

      try {
        await authService.changePassword(this.form);
        this.feedbackMessage = "Senha alterada com sucesso!";

        // Limpa os campos após o sucesso
        this.form.currentPassword = '';
        this.form.newPassword = '';
        this.form.confirmNewPassword = '';

      } catch (error) {
        console.error("Erro ao alterar senha:", error);
        this.feedbackMessage = error.response?.data || "Erro ao alterar a senha. Verifique sua senha atual.";
        this.isError = true;
      } finally {
        this.isSaving = false;
      }
    }
  }
}
</script>