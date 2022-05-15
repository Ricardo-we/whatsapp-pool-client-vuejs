
<template>
    <div class="d-flex flex-row">
        <NavBar/>

        <Alert
            :visible="alertVisible"
            :onClose="() => alertVisible = false"
            :title="`Are you sure you want to delete message to: ${selectedMessage.message_to}`"
            :content="`Message: ${selectedMessage.message_to}`"
            :onConfirm="() => deleteMessage(selectedMessage)"
        />

        <!-- ADD FORM -->
        <Modal :visible="modalVisible" :onClose="() => modalVisible = false">
            <MessageForm :onSubmit="addMessage" :categories="userCategories"/>
        </Modal>
        
        <!-- UPDATE FORM -->
        <Modal :visible="updateModalVisible" :onClose="() => updateModalVisible = false">
            <MessageForm 
                :onSubmit="updateMessage"
                :defaults="selectedMessage" 
                :categories="userCategories"
            />
        </Modal>
        
        <!-- CARDS, SEARCH AND FILTER -->
        <div class="container">
            <h2>Home</h2>
            <input class="form-control" placeholder="search" v-model="search">
            <CategorieSelect
                v-model:vmodel="filterByCategorie"
                :categories="userCategories"
                defaultOption="Filter categories"
            />
            
            <FloatingButton 
                iconName="add" 
                xposition="right" 
                yposition="bottom" 
                :click="() => modalVisible = true"
                styles="right: 20px; bottom: 20px"
            />
            <Loader v-if="userMessages.length <= 0"/>

            <MessageCard 
                v-else
                v-for="(message, index) in userMessages
                    .filter(message => filterByCategorie && filterByCategorie >= 0 ? message.categorie === filterByCategorie : true)
                    .filter(message => message.message.toLowerCase().includes(search))
                " 
                :message="message"
                :onUpdate="() => onOpenUpdateModal(message)"
                :onDelete="() => {
                    selectedMessage = message
                    alertVisible = true;
                }"
                :key="index"
            />
        </div>
    </div>
    <router-view />

</template>

<script setup>
    import { ref,  onBeforeMount } from 'vue';
    import { getUserCategoriesRequest, getUserMessagesRequest } from '../services/user-requests.js';
    import { addMessageRequest, deleteMessageRequest, updateMessageRequest } from '../services/messages-requests.js';
    import Alert from '../components/Alert.vue';
    import NavBar from '../components/NavBar.vue';
    import MessageForm from '../components/forms/MessageForm.vue'
    import MessageCard from '../components/cards/MessageCard.vue';
    import Modal from '@/components/Modal.vue';
    import Icon from '../components/Icon.vue';
    import CategorieSelect from '@/components/CategorieSelect.vue';
    import FloatingButton from '@/components/FloatingButton.vue';
    import { useToast } from "vue-toastification";
    import { getLocalStorage } from '@/utils/handleLocalStorage';
    import Loader from '@/components/Loader.vue';

    const toast = useToast();
    const user = getLocalStorage('user');
    const userCategories = ref([]);
    const userMessages = ref([]);
    const modalVisible = ref(false);
    const updateModalVisible = ref(false);
    const alertVisible = ref(false);
    const selectedMessage = ref({});
    const search = ref('');
    const filterByCategorie = ref(0);
    
    const onOpenUpdateModal = (message) => {
        updateModalVisible.value = true
        selectedMessage.value = message
    }

    const deleteMessage = (message) => {
        return deleteMessageRequest(user, message.id)
            .then(getUserMessages)
            .catch(error => toast.error(error.toString()))
        ;
    }

    const getUserCategories = () => {
        return getUserCategoriesRequest(user)
            .then(res => userCategories.value = [...res])
            .catch(error => toast.error(error.toString()));
    }

    const getUserMessages = () => {
        return getUserMessagesRequest(user)
            .then(res => userMessages.value = res)
            .catch(error => toast.error(error.toString()));
    }

    const addMessage = (message, message_to, message_to_number, categorie_id) => {
        return addMessageRequest(user,{ message_to, categorie_id, message, message_to_number })
            .then(getUserMessages)
            .catch(error => toast.error(error.toString()));
    }

    const updateMessage = (message, message_to, message_to_number, categorie_id) => {
        return updateMessageRequest(user, selectedMessage.value.id, { message_to, categorie_id, message, message_to_number })
            .then(getUserMessages)
            .catch(error => toast.error(error.toString()));
    }

    onBeforeMount(() => {   
        getUserCategories();
        getUserMessages();
    })

</script>

<style>
    .add-message-btn {
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
        border-radius: 100%;
    }

    .close-modal-btn {
        color: white;
    }
</style>