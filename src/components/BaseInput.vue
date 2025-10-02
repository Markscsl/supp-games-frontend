<template>
    <div class="mb-3">
        <label class="block text-white mb-2 font-semibold uppercase text-sm tracking-wider neon-text-pink">
            {{ label }}
        </label>
        <input :placeholder="placeholder" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
            :type="type" class="neon-input w-full">
    </div>
</template>

<script>
export default {
    name: "BaseInput",
    props: {
        label: {
            type: String,
            required: true
        },

        type: {
            type: String,
            required: true
        },

        modelValue: {
            type: String,
            required: true
        },

        placeholder: {
            type: String,
            required: false,
            default: ""
        }
    },

    emits: ['update:modelValue']
}
</script>