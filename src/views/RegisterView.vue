<template>
    <div class="min-h-screen flex items-center justify-center relative overflow-hidden py-12">
        <div class="absolute inset-0 vaporwave-gradient" />
        <div class="absolute inset-0 grid-bg opacity-30" />
        <div class="absolute inset-0 scan-line" />

        <div class=" relative z-10 retro-frame rounded-2xl p-12 w-full max-w-md mx-4">
            <h2 class="text-4xl font-black text-center mb-8 chrome-text">CRIAR CONTA</h2>

            <form @submit.prevent="register">
                <BaseInput label="Nome" type="text" v-model="form.name" placeholder="Digite seu nome" />
                <BaseInput label="Email" type="email" v-model="form.email" placeholder="Digite seu e-mail" />
                <BaseInput label="Senha" :type="showPassword ? 'text' : 'password'" v-model="form.password" placeholder="Digite sua senha" />

                <button type="button" @click="showPassword = !showPassword"
                    class="text-sm text-gray-400 hover:text-white -mt-2 mb-4">
                    {{ showPassword ? 'Esconder' : 'Mostrar' }} senha
                </button>


                <div v-if="errorMessage"
                    class="bg-red-600/20 border border-red-500/50 text-red-300 p-4 rounded-lg text-center mb-4 backdrop-blur-sm">
                    {{ errorMessage }}
                </div>


                <BaseButton :disabled="isLoading" type="submit" variant="primary">
                    {{ isLoading ? 'PROCESSANDO...' : 'CADASTRAR' }}
                </BaseButton>
            </form>

            <div class="mt-6 text-center">
                <RouterLink to="/login" class="text-[#00ffff] hover:text-[#ff00ff] font-bold transition-colors">
                    Já tem conta? Faça login
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<script>
import { authService } from '@/services/apiService'
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'
import { notificationStore } from '@/services/notificationStore'

export default {
    name: 'RegisterView',
    components: {
        BaseInput,
        BaseButton
    },
    data() {
        return {
            form: {
                name: '',
                email: '',
                password: ''
            },

            isLoading: false,
            errorMessage: null,
            showPassword: false
        }
    },
    methods: {
        async register() {

            this.errorMessage = null
            this.isLoading = true

            try {
                const response = await authService.register(this.form);

                notificationStore.show("Cadastro realizado com sucesso!", 'success');

                setTimeout(() => {
                    this.$router.push('/login');
                }, 1500);

            } catch (error) {
                if (error.response && error.response.data) {

                    const errors = error.response.data.errors;

                    if (errors && errors.Password) {

                        this.errorMessage = errors.Password[0];

                    } else {

                        this.errorMessage = error.response.data;
                    }

                } else {

                    this.errorMessage = "Não foi possível conectar ao servidor.";
                }

                notificationStore.show(this.errorMessage, 'error');

            } finally {

                this.isLoading = false;
            }
        }
    }
}
</script>
