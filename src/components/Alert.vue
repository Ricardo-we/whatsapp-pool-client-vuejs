<template>
    <vue-final-modal v-model="visible">
        <button class="btn" style="color: white;" @click="onClose">
            <Icon iconName="close"/>
        </button>
        <form @submit.prevent class="bg-white w-75 p-5 container d-flex flex-row flex-wrap align-items-center justify-content-center">
            <h4 class="w-100">{{ title || 'Alert!'}}</h4>
            <small class="w-100 content-container">{{ content || '' }}</small>
            <div class="w-100 mt-3">
                <button class="btn btn-danger px-3" style="color: white;" @click="onClose">
                    Cancel
                </button>
                <button class="btn btn-outline-success px-3" @click="() => {
                    onConfirm()
                    onClose()
                }">
                    Confirm
                </button>
            </div>
        </form>
    </vue-final-modal>
</template>

<script setup>
    import { toRefs } from 'vue';
    import { VueFinalModal } from 'vue-final-modal'
    import Icon from './Icon.vue';
    
    const props = defineProps(['visible', 'onClose', 'onConfirm', 'title', 'content'])
    const { title, visible } = toRefs(props);

</script>   

<style>
    .content-container {
        max-height: 250px;
        overflow: hidden;
    }
</style>