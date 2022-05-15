<template>
    <div class="grid-container w-100 bg-light my-3" style="height: auto;">
        <div class="d-flex flex-column flex-wrap align-items-start justify-content-evenly ">
            <span class="text-info">
                To: {{message.message_to}}
            </span>
            <span class="text-info">
                {{message.message_to_number}}
            </span>
            <strong class="text-success">
                Categorie: {{message.categorie_name}}
            </strong>
        </div>

        <div class="container-xxl d-flex  align-items-start justify-content-start text-left">
            <p style="word-wrap: break-word;">
                {{message.message}}
            </p> 
        </div>

        <div class="container-sm d-flex align-items-center justify-content-around flex-wrap" style="max-width: 200px">
            <button class="btn btn-success m-2" @click="onUpdate">
                <Icon iconName="edit"/>
            </button>
            <button class="btn btn-danger m-2" @click="onDelete">
                <Icon iconName="delete"/>
            </button>
            <button class="btn btn-info m-2" @click="uploadMessage">
                <Icon iconName="sms"/>
            </button>
            <button class="btn btn-primary m-2" @click="copyToClipBoard">
               <Icon v-if="!copied" iconName="content_copy"/>
               <span v-else>Copied!</span>
            </button>
        </div>
    </div>

</template>

<script setup>
    import { ref, toRefs } from 'vue';
    import Icon from '../Icon.vue';
    import { useToast } from "vue-toastification";

    const toast = useToast();
    const copied = ref(false);
    const props = defineProps(['message', 'onUpdate', 'onDelete'])
    const { message } = toRefs(props);

    const uploadMessage = () => {
        if(!message.value.message_to_number) return toast.warning(`${message.value.message_to} number, not registered`)
        window.open(`https://wa.me/${message.value.message_to_number}?text=${message.value.message}`)
    }
    
    const copyToClipBoard = () => {
        copied.value = true;
        navigator.clipboard.writeText(message.value.message)
            .then(() => setTimeout(() => copied.value = false, 1000))
            .catch(error => toast.error(error.toString()));
    }
</script>


<style>
    .grid-container {
        width: 100%;
        display: grid;
        row-gap: 5px;
        grid-template-columns: repeat(auto-fit, 306px);
        justify-content: space-evenly;
        align-content: center;
    }
</style>