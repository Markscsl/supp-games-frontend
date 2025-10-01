<template>
    <transition name="fade">
        <div v-if="show" class="fixed inset-0 bg-black/60 z-50 flex items-center justify-center" @click.self="closeModal">

            <transition name="pop">
                <div v-if="show" class="bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-lg">

                    <h3 class="text-2xl font-bold text-white mb-4">Editar Anotação</h3>

                    <textarea v-model="editableText" rows="6" class="w-full p-4 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Digite sua anotação sobre o jogo..."></textarea>

                    <div class="mt-6 flex justify-end space-x-4">
                        <button @click="closeModal" class="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md text-white">Cancelar</button>
                        <button @click="saveAnnotation" class="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-md text-white">Salvar</button>
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