<template>
    <div class="form-group">
        <label>{{placeholder}}</label>
        <textarea
            v-if="type === 'textarea'"
            class="form-control"
            :value="vmodel"
            @input="$emit('update:vmodel', $event.target.value)"
            :placeholder="placeholder"
        ></textarea>
        <input
            v-else
            class="form-control"
            :value="vmodel"
            @input="$emit('update:vmodel', $event.target.value)"
            :placeholder="placeholder"
            :type="type || 'text'"
        />
    </div>
</template>
<script setup>
    defineProps(['type', 'placeholder', 'vmodel'])
    defineEmits(['update:vmodel'])
</script>