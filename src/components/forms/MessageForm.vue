<template>
    <form class="form container-sm bg-white p-4" @submit.prevent="handleSubmit">
        <h3>{{title || 'Add a message'}}</h3>
        <Input v-model:vmodel="message" type="textarea" placeholder="Message"/>
        <Input v-model:vmodel="messageTo" type="text" placeholder="Message to"/>
        <Input v-model:vmodel="phoneNumber" type="tel" placeholder="Phone number"/>
        <CategorieSelect 
            v-model:vmodel="selectedCategorie"
            defaultOption="Select a categorie"
            :categories="categories"
        />
        <Loader v-if="loading"/>
        <button v-else type="submit" class="btn btn-primary w-100">SUBMIT</button>
    </form>
</template>

<script setup>
    import { ref, toRefs, watch } from 'vue';
    import Input from '../Input.vue';
    import CategorieSelect from '../CategorieSelect.vue';
    import Loader from '../Loader.vue';
    
    const props = defineProps(['categories', 'defaults', 'onSubmit', 'title'])
    const { defaults } = toRefs(props);

    const loading = ref(false);
    const message = ref(defaults.message || '');
    const phoneNumber = ref(defaults.message_to_number || '');
    const messageTo = ref(defaults.message_to || '');
    const selectedCategorie = ref(defaults.categorie || '0');

    const handleSubmit = () => {
        loading.value = true
        props.onSubmit(message.value, messageTo.value, phoneNumber.value, selectedCategorie.value)
            .then(() => loading.value = false)
            .catch(() => loading.value = false);
    }
    watch(defaults, (defaults, prevDefaults) => {
        message.value = defaults.message;
        phoneNumber.value = defaults.message_to_number;
        messageTo.value = defaults.message_to;
        selectedCategorie.value = defaults.categorie;
    })

</script>