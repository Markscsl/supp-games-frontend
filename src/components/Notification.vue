<template>
    <transition name="slide-fade">
        <div v-if="notification.visible"
            class="fixed bottom-5 right-5 z-[100] max-w-sm rounded-lg shadow-lg text-white overflow-hidden"
            :class="notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'">
            <div class="p-4">
                {{ notification.message }}
            </div>

            <div class="h-1 bg-black/30">
                <div class="h-full bg-white/70 timer-bar" :style="{ animationDuration: notification.duration + 'ms' }">
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import { notificationStore } from '@/services/notificationStore.js';
export default {
    name: 'Notification',
    data() {
        return {
            notification: notificationStore
        }
    }
}
</script>

<style scoped>
/* Animação da barra de tempo */
.timer-bar {
    animation-name: shrink-width;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
}

@keyframes shrink-width {
    from {
        width: 100%;
    }

    to {
        width: 0%;
    }
}

/* Animações de entrada e saída do componente (slide) */
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.4s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}
</style>