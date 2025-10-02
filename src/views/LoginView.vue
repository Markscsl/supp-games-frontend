<template>
    <div class="min-h-screen flex items-center justify-center relative overflow-hidden py-12">
        <div class="absolute inset-0 vaporwave-gradient" />
        <div class="absolute inset-0 grid-bg opacity-30" />
        <div class="absolute inset-0 scan-line" />

        <div class="relative z-10 retro-frame rounded-2xl p-12 w-full max-w-md mx-4">
            <h2 class="text-4xl font-black text-center mb-8 chrome-text">FAZER LOGIN</h2>

            <form @submit.prevent="login">
                <BaseInput label="Email" type="email" v-model="form.email" placeholder="Digite seu e-mail" />
                <BaseInput label="Senha" type="password" v-model="form.password" placeholder="Digite sua senha" />
                <div v-if="errorMessage"
                    class="bg-red-600/20 border border-red-500/50 text-red-300 p-4 rounded-lg text-center mb-4 backdrop-blur-sm">
                    {{ errorMessage }}
                </div>

                <BaseButton :disabled="isLoading" type="submit" variant="primary">
                    {{ isLoading ? 'PROCESSANDO...' : 'ENTRAR' }}
                </BaseButton>
            </form>

            <div class="mt-6 text-center">
                <RouterLink to="/register" class="text-[#00ffff] hover:text-[#ff00ff] font-bold transition-colors">
                    Não possui conta? Cadastre-se
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<script>
import { authStore } from '@/services/authStore';
import { authService } from '@/services/apiService';
import BaseButton from '@/components/BaseButton.vue'
import BaseInput from '@/components/BaseInput.vue';
import { notificationStore } from '@/services/notificationStore';

export default {

    name: "LoginView",

    components: {
        BaseButton,
        BaseInput
    },

    data() {
        return {
            form: {
                email: '',
                password: ''
            },

            isLoading: false,
            errorMessage: null
        }
    },

    methods: {
        async login() {

            this.errorMessage = null,
                this.isLoading = true

            try {
                const response = await authService.login(this.form)

                const token = response.data.token

                authStore.login(token)

                notificationStore.show("Login realizado com sucesso!", 'success', 5000);

                setTimeout(() => {
                    this.$router.push('/')
                }, 1000);


            } catch (error) {

                console.error("Erro ao tentar logar: ", error.response.data)
                this.errorMessage = "Email ou senha incorretos. Tente novamente."


            } finally {

                this.isLoading = false

            }
        }
    }
}
</script>