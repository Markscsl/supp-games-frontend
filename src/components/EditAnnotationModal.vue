<template>
    <transition name="fade">
        <div v-if="show" class="fixed inset-0 retro-frame z-50 flex items-center justify-center" @click.self="closeModal">

            <transition name="pop">
                <div v-if="show" class="bg-opacity-20 retro-frame border-2 border-purple-700 text-white text-sm font-medium px-30 rounded-2xl py-4">

                    <h3 class="text-2xl font-bold text-white mb-4 neon-text-pink">Editar Anotação</h3>

                    <textarea v-model="editableText" rows="6" class="w-full p-4  rounded text-white focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Digite sua anotação sobre o jogo..."></textarea>

                    <div class="mt-6 flex justify-center space-x-4">
                        <button @click="closeModal" class="px-4 py-2 bg-red-700 rounded-md text-white">Cancelar</button>
                        <button @click="saveAnnotation" class="px-4 py-2 bg-purple-600 rounded-md text-white">Salvar</button>
                    </div>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script>
export default{
    name: 'EditAnnotationModal',
    props: {
        show: {
            type: Boolean,
            required: true
        },

        existingAnnotations: {
            type: Array,
            default: () =>[]
        }
    },
    
    emits: ['close', 'save'],
    data(){
        return{
            editableText: '',
        }
    },

    watch:{
        show(newValue){
            if(newValue){
                this.editableText = this.existingAnnotations.map(a => a.text).join('\n')
            }
        }
    },

    methods:{
        closeModal(){
            this.$emit('close')
        },
        saveAnnotation(){
            this.$emit('save', this.editableText)
        }
    }
}
</script>

<style scoped>
/* Animações de transição para o modal */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.pop-enter-active, .pop-leave-active {
  transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s ease;
}
.pop-enter-from, .pop-leave-to {
  opacity: 0;
  transform: scale(0.3) translateY(-50%);
}
</style>