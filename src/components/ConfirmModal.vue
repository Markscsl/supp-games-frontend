<template>
    <transition name="fade">
        <div v-if="show" class="fixed inset-0 retro-frame z-50 flex items-center justify-center" @click.self="cancel">

            <transition name="pop">
                <div v-if="show" class="bg-opacity-20 bg-purple-400 text-white text-sm font-medium px-20 rounded-2xl py-20">

                    <div class="bg-">
                        <h3 class="text-3xl font-bold mb-4 text-red-700">{{ title }}</h3>
                    </div>
                    
                    <h3 class="text-2xl font-semibold border-y-2 text-white p-6">{{ message }}</h3>

                    <div class="mt-6 flex justify-end space-x-4">
                        <button @click="cancel" class="px-4 py-2 font-bold bg-green-700 rounded-md text-white">{{ cancelButton }}</button>
                        <button @click="confirm" class="px-4 py-2 font-bold bg-red-700 rounded-md text-white">{{ confirmButton }}</button>
                    </div>

                </div>

            </transition>            
        </div>
    </transition>
</template>

<script>
export default {
    name: "DeleteGameModal",
    emits: ['confirm', 'cancel'],
    props:{
        show:{
            type: Boolean,
            required: true
        },

        title: {
            type: String,
            required: true
        },

        message: {
            type: String,
            required: true
        },

        cancelButton:{
            type: String,
            required: true
        },

        confirmButton:{
            type: String,
            required: true
        }
    },

    methods:{
        cancel(){
            this.$emit('cancel')
        },
        confirm(){
            this.$emit('confirm')
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