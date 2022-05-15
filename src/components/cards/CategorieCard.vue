<template>
    <div class="main-card bg-light">
        <h5 class="w-100 text-center">{{ categorie.name }}</h5>
        <div class="container d-flex align-items-center justify-content-evenly">
            <button class="btn btn-outline-success" @click="onUpdate">
                <Icon iconName="edit"/>
            </button>
            <button class="btn btn-outline-danger" @click="onDelete">
                <Icon iconName="delete"/>
            </button>
        </div>    
    </div>
</template>


<script setup>
    import { toRefs } from 'vue';
    import Icon from '../Icon.vue';
    const props = defineProps(['categorie', 'onDelete', 'onUpdate'])
    const { categorie } = toRefs(props);

</script>

<style>
    .main-card {
        width: 400px;
        padding: 20px;
        border-radius: 4px;
        margin-inline: 10px;
        margin-top: 10px;
        min-width: 150px;
        /* max-height: auto; */
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }


</style>

