<template>
    <button :class="`floating-btn bg-info ${xposition} ${yposition}`" :style="styles" @click="click">
        <Icon :iconName="iconName"/>
    </button>
</template>

<script setup>
    import Icon from "./Icon.vue";

    defineProps(['iconName', 'click', 'xposition', 'yposition', 'styles'])
</script>

<style>
    .floating-btn {
        position: fixed;
        bottom: 10px;
        right: 10px;
        width: 50px;
        height: 50px;   
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        border: none; 
        transition: 500ms;
        border-radius: 100%;
    }

    .material-icons {
        transition: 500ms;
    }

    .floating-btn:hover > .material-icons {
        transform: rotate(180deg);
    }

    .left {
        left: 0px;
    }

    .right {
        right: 0px;
    }

    .top {
        top: 0px;
    }

    .bottom {
        bottom: 0px;
    }
</style>