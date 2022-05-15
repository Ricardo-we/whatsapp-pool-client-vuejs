<template>
    <select
        class="form-control"
        :value="vmodel"
        @input="$emit('update:vmodel', parseInt($event.target.value))"
        
    >
        <option value="0">{{defaultOption}}</option>
        <option 
            v-for="(option, index) in categories" 
            :value="option.id"
        >
            {{ option.name }}
        </option>
    </select>
</template>

<script setup>
    defineProps(['categories', 'vmodel', 'defaultOption'])
    defineEmits(['update:vmodel'])
</script>