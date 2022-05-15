<template>
    <div>
        
    </div>
</template>   

<script setup>
    import { onBeforeMount, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import { setLocalStorageItem } from '@/utils/handleLocalStorage';

    const router = useRouter();

    onMounted(() => {
        setLocalStorageItem('user', {});
        router.push('/')
    })
</script>