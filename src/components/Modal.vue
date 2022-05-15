<template>
    <vue-final-modal v-model="visible">
        <button class="btn" style="color: white;" @click="onClose">
            <Icon iconName="close"/>
        </button>
        <slot/>
    </vue-final-modal>
</template>

<script setup>
    import { toRefs } from 'vue';
    import { VueFinalModal } from 'vue-final-modal'
    import Icon from './Icon.vue';
    
    const props = defineProps(['visible', 'onClose'])
    const { visible } = toRefs(props);

</script>   

<style>
    .content-container {
        max-height: 250px;
        overflow: hidden;
    }
</style>