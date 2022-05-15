<template>
    <form @submit.prevent="handleSubmit" class="form container-sm bg-white p-4">
        <h3>{{ title || 'Add a categorie' }}</h3>
        <Input v-model:vmodel="name" placeholder=""/>
        <Loader v-if="loading"/>
        <button v-else type="submit" class="btn btn-primary w-100">SUBMIT</button>
    </form>
</template>

<script setup>
    import { ref, toRefs, watch } from 'vue';
    import Input from '../Input.vue';
    import Loader from '../Loader.vue';
    const props = defineProps(['defaults', 'onSubmit', 'title'])
    const { defaults } = toRefs(props);
    
    const loading = ref(false);
    const name = ref('')

    const handleSubmit = () => {
        loading.value = true;
        props.onSubmit(name.value)
            .then(() => loading.value = false)
            .catch(() => loading.value = false);
    }

    watch(defaults, (defaults, prevDefaults) => {
        name.value = defaults.name
    });

</script>
