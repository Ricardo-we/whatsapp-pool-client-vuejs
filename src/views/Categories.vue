<template>
    <div class="d-flex flex-row">

        <NavBar/>
            <!-- ADD CATEGORIE -->
        <Modal :visible="addCategorieModalVisible" :onClose="() => addCategorieModalVisible = false">
            <CategorieForm title="Add a categorie" :onSubmit="addCategorie"/>
        </Modal>
        <!-- UPDATE CATEGORIE -->
        <Modal :visible="updateCategorieModalVisible" :onClose="() => updateCategorieModalVisible = false">
            <CategorieForm 
                :defaults="selectedCategorie" 
                title="Update a categorie" 
                :onSubmit="name => updateCategorie(name,selectedCategorie)"
            />
        </Modal>
        <!-- DELETE CATEGORIE -->
        <Alert
            :visible="alertVisible"
            :onClose="() => alertVisible = false"
            :title="`Are you sure you want to delete categorie: ${selectedCategorie.name}`"
            :onConfirm="() => deleteCategorie(selectedCategorie)"
        />
        <div class="container d-flex align-items-center justify-content-start flex-wrap" style="height: fit-content;">
            <FloatingButton 
                iconName="add" 
                xposition="right" 
                yposition="bottom" 
                styles="right: 20px; bottom: 20px"
                :click="() => addCategorieModalVisible = true"
            />
            <Loader v-if="userCategories.length <= 0"/>
            <CategorieCard
                v-else
                v-for="(categorie, index) in userCategories"
                :key="index"
                :categorie="categorie"
                :onUpdate="() => {
                    selectedCategorie = categorie;
                    updateCategorieModalVisible = true;
                }"
                :onDelete="() => {
                    selectedCategorie = categorie;
                    alertVisible = true;
                }"
            />
        </div>
    </div>
</template>

<script setup>
    import { onBeforeMount, ref } from 'vue';
    import NavBar from '@/components/NavBar.vue';
    import Modal from '@/components/Modal.vue';
    import FloatingButton from '@/components/FloatingButton.vue';
    import CategorieForm from '@/components/forms/CategorieForm.vue';
    import CategorieCard from '@/components/cards/CategorieCard.vue';
    import Loader from '@/components/Loader.vue';
    import Alert from '@/components/Alert.vue';
    import { getUserCategoriesRequest } from '@/services/user-requests';
    import { getLocalStorage } from '@/utils/handleLocalStorage';
    import { addCategorieRequest, updateCategorieRequest, deleteCategorieRequest } from '@/services/categories-requests';
    import { useToast } from 'vue-toastification';

    const toast = useToast();
    const user = getLocalStorage('user');

    const userCategories = ref([]);
    const addCategorieModalVisible = ref(false);
    const updateCategorieModalVisible = ref(false);
    const alertVisible = ref(false);
    const selectedCategorie = ref({});

    const getUserCategories = () => {   
        return getUserCategoriesRequest(user)
            .then(res => userCategories.value = [...res])
            .catch(error => toast.error(error.toString()));
    }

    const addCategorie = (name) => {
        return addCategorieRequest(user, { name })
            .then(getUserCategories)
            .catch(error => toast.error(error.toString()));
    }

    const updateCategorie = (name,categorie) => {
        return updateCategorieRequest(user, categorie.id, name)
            .then(getUserCategories)
            .catch(error => toast.error(error.toString()));
    }

    const deleteCategorie = (categorie) => {
        return deleteCategorieRequest(user, categorie.id)
            .then(getUserCategories)
            .catch(error => toast.error(error.toString()));
    }

    onBeforeMount(() => {
        getUserCategories()   
    })


</script>

<style>

</style>