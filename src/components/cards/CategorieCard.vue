<template>
    <div class="main-card bg-light">
        <h5 class="w-100 ">{{ categorie.name }}</h5>
        <div class="w-100 d-flex align-items-center justify-content-end">
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
        min-width: 150px;
        padding: 20px;
        border-radius: 4px;
        margin-inline: 10px;
        height: auto;
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    }

    @media screen and (max-width: 300px) {
        .main-card {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;  
        }
/* 
        .main-card > div {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;  
        } */

        .main-card > h5 {
            text-align: left!important;
        }
    }

</style>

