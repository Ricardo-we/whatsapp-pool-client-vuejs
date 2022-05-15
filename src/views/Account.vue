<template>
    <div class="d-flex flex-row">

        <NavBar/>
        <form class="form container" @submit.prevent="updateUser">
            <Input type="text" placeholder="Username" v-model:vmodel="username"/>
            <Input type="password" placeholder="Password" v-model:vmodel="password"/>
            <Input type="tel" placeholder="Phone number" v-model:vmodel="phoneNumber"/>
            <button class="btn btn-outline-primary w-100">Save changes</button>
        </form>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import Input from '@/components/Input.vue';
    import NavBar from '@/components/NavBar.vue';
    import { getLocalStorage } from '@/utils/handleLocalStorage';
    import { updateUserRequest } from '@/services/user-requests';
    import { useToast } from 'vue-toastification';
    const toast = useToast();

    const user = getLocalStorage('user');
    const username = ref(user.username || "");
    const password = ref(user.password || "");
    const phoneNumber = ref(user.phone_number || "");

    const updateUser = () => {
        const data = { username: username.value, password: password.value, phone_number: phoneNumber.value };
        return updateUserRequest(user, data)
            .then(res => toast.success('User data updated!'))
            .catch(error => toast.error(error.toString()));
    }

</script>