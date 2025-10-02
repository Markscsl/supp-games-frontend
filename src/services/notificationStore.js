import { reactive } from 'vue';

export const notificationStore = reactive({
    visible: false,
    message: '',
    type: 'success', // 'success' ou 'error'
    duration: 3000,
    timerId: null,

    show(message, type = 'success', duration = 3000) {
        clearTimeout(this.timerId)

        this.message = message;
        this.type = type;
        this.visible = true;
        this.duration = duration;

        this.timerId = setTimeout(() => {
           this.hide() 
        }, duration);
    },

    hide() {
        this.visible = false;
        clearTimeout(this.timerId)
        this.timerId = null
    }
});