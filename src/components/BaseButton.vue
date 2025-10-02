<template>
    <button :type="type" :class="buttonClasses" :disabled="disabled">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: "BaseButton",
    props: {
        type: {
            type: String,
            default: "button"
        },

        variant: {
            type: String,
            default: "primary"
        },

        disabled: {
            type: Boolean,
            default: false
        }
    },

    computed: {
        buttonClasses() {
            let baseClasses = 'w-full cursor-pointer h-12 py-3 px-6 mt-6 font-bold rounded-lg transition-all duration-300 focus:outline-none uppercase tracking-wider'

            if (this.disabled) {
                return `${baseClasses} bg-gray-700 text-gray-500 cursor-not-allowed border-2 border-gray-600`
            }

            switch (this.variant) {
                case "secondary":
                    return `${baseClasses} neon-button-cyan hover:scale-105`
                case 'danger':
                    return `${baseClasses} bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white border-2 border-red-500/30 hover:scale-105`
                default:
                    return `${baseClasses} neon-button-pink hover:scale-105`
            }
        }
    }
}
</script>