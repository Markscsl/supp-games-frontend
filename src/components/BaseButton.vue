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
            let baseClasses = 'w-[400px] cursor-pointer text-white h-12 py-2 mt-6 font-bold rounded-md transition-colors focus:outline-none focus:ring-opacity-50'

            if (this.disabled) {
                return `${baseClasses} bg-gray-400 cursor-not-allowed`
            }

            switch (this.variant) {
                case "secondary":
                    return `${baseClasses} bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500`

                case 'danger':
                    return `${baseClasses} bg-red-600 hover:bg-red-700 text-white focus:ring-red-500`

                default:
                    return `${baseClasses} bg-[#5993CD] hover:bg-[#4877A6] text-white `
            }
        }
    }
}
</script>