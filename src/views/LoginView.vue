<template>
    <div class="min-h-screen bg-[url(@/assets/img/bg-site.png)] flex items-center justify-center">
        <div class="py-[40px] px-[140px] bg-white-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xs border-solid border-0 border-[#5993CD] shadow-[0_0_5px_0_rgba(59,130,246,0.8),0_0_15px_5px_rgba(59,130,246,0.6)] bg-opacity-10 ">

            <h2 class="text-3xl font-bold text-center text-white mb-8">Fazer login</h2>

            <form @submit.prevent="login">

                <BaseInput label="Email" type="email" v-model="form.email" placeholder="Digite o seu e-mail" />

                <BaseInput label="Senha" type="password" v-model="form.password" placeholder="Digite a sua senha" />

                <div v-if="errorMessage" class="bg-red-600 bg-opacity-20 text-red-300 p-3 mt-8 rounded-md text-center mb-2">{{ errorMessage }}</div>

                <BaseButton :disabled="isLoading" type="submit" variant="primary">
                    {{ isLoading ? 'Entrando...' : 'Entrar' }}
                </BaseButton>
            </form>
            <RouterLink class="text-white font-bold" to="/register"><span>Não possui conta?</span></RouterLink>
        </div>
    </div>
</template>

<script>
import { authStore } from '@/services/authStore';
import { authService } from '@/services/apiService';
import BaseButton from '@/components/BaseButton.vue'
import BaseInput from '@/components/BaseInput.vue';

export default{

    name: "LoginView",

    components:{
        BaseButton,
        BaseInput
    },

    data(){
        return{
            form: {
                email: '',
                password: ''
            },
            
            isLoading: false,
            errorMessage: null
        }
    },

    methods:{
        async login(){

            this.errorMessage = null,
            this.isLoading = true

            try {
                const response = await authService.login(this.form)

                const token = response.data.token

                authStore.login(token)

                alert("Login realizado com sucesso! Você será redirecionado...")

                window.location.href= '/'

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