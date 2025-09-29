<template>

    <div class="min-h-screen bg-[url(@/assets/img/bg-site.png)] flex items-center justify-center">
        <div
            class=" py-[40px] px-[140px] bg-white-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xs border-solid border-0 border-[#5993CD] shadow-[0_0_5px_0_rgba(59,130,246,0.8),0_0_15px_5px_rgba(59,130,246,0.6)] bg-opacity-10 ">

            <h2 class="text-3xl font-bold text-center text-white mb-8">Criar Conta</h2>

            <form @submit.prevent="register">
                <BaseInput label="Nome" type="text" v-model="form.name" placeholder="Digite seu nome de usuário" />

                <BaseInput label="Email" type="email" v-model="form.email" placeholder="Digite o seu e-mail" />

                <BaseInput label="Senha" type="password" v-model="form.password" placeholder="Digite a sua senha" />

                <div v-if="errorMessage" class="bg-red-600 bg-opacity-20 text-red-300 p-3 rounded-md text-center mb-4">{{ errorMessage }}</div>
                <div v-else-if="sucessMessage" class="bg-green-600 bg-opacity-20 text-green-300 p-3 rounded-md text-center mb-4">{{ sucessMessage }}</div>

                <BaseButton :disabled="isLoading" type="submit" variant="primary">
                    {{isLoading ? 'Cadastrando...' : 'Cadastrar'}}
                </BaseButton>

            </form>

            <RouterLink class="text-white font-bold" to="/login"><span>Ja tem uma conta?</span></RouterLink>

        </div>
    </div>

</template>

<script>
import { authService } from '@/services/apiService'
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'


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
            sucessMessage: null
        }
    },
    methods: {
        async register() {
            
            this.errorMessage = null
            this.sucessMessage = null
            this.isLoading = true

            try{

                const response = await authService.register(this.form)

                console.log("Usuário cadastrado: ", response.data)
                this.sucessMessage = "Cadastro realizado com sucesso"

                this.$router.push('/login')

            } catch (error){
                
                console.error("Erro no cadastro: ", error.response.data)
                this.errorMessage = "Erro desconhecido. Tente novamente."
            } finally {

                this.isLoading = false;

            }
        }
    }
}
</script>
