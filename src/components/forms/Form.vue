<template>
    <form @submit.prevent="submitForm" v-for="(field, index) in fields" :key="index">
        <div class="form-group">
            <label>{{field.name}}</label>
            <select
                v-if="field.type === 'select'" 
                class="form-control"
                :defaultValue="field.value"
                @input="field.onChange"
                v-for="option in field.options"
            >
                <option :value="option.value">option.name</option>
            </select>
            <textarea
                v-if="field.type === 'textarea'"
                class="form-control"
                :defaultValue="field.value"
                @input="field.onChange"
                :placeholder="field.name"
            ></textarea>
            <input
                v-else
                class="form-control"
                :defaultValue="field.value"
                :placeholder="field.name"
                :type="field.type || 'text'"
                @input="field.onChange"
            />
        </div>
    </form> 
</template>

<script setup>
import { onUpdated } from 'vue';
const props = defineProps(['fields', 'onSubmit']);
</script>