<template>
    <div class="mb-4">
    
    <label class="block text-white mb-2 font-semibold">{{label}}</label>

    <input :placeholder="placeholder" class="text-white w-[400px] placeholder:text-white font-po rounded-md h-10 font-normal px-4 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border-solid  border-blue-400
    shadow-[0_0_5px_0_rgba(59,130,246,0.8),0_0_15px_5px_rgba(59,130,246,0.6)]" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :type="type">
  </div>
</template>

<script>
export default{
    name: "BaseInput",
    props: {
        label:{
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
        
        placeholder:{
            type: String,
            required: false,
            default: ""
        }
    },

    emits: ['update:modelValue']
}
</script>