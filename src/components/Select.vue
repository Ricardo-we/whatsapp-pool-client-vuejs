<template>
    <select
        class="form-control"
        :value="vmodel"
        @input="$emit('update:vmodel', $event.target.value)"
        :placeholder="placeholder"
    >
        <option selected>{{placeholder || 'Select '}}</option>
        <option 
            v-for="(option, index) in options" 
            :value="option.value"
        >
            {{ option.name }}
        </option>
    </select>
</template>

<script setup>
    import { onMounted } from 'vue';
    const props = defineProps({
        vmodel: Object,
        placeholder:String,
        options: Array
    })
    onMounted(() => {
        console.log(props.options)
    })
    defineEmits(['update:vmodel'])
</script>
