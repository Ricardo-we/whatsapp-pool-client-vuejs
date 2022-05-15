<template>
<nav :class="sidebarOpen ? 'sidebar sidebar-open' : 'sidebar'">
    <button 
        :class="sidebarOpen ? 'toggle-sidebar-btn toggle-sidebar-btn-turned' : 'toggle-sidebar-btn'" 
        @click="toggleSidebar"
    >
        <div class="material-icons">chevron_right</div>
    </button>
    <div class="routes-container" v-for="data in SideBarData">
        <router-link class="route-link" :to="data.to">
            <div class="material-icons">{{data.icon}}</div>
            <span style="margin-left: 5px;" v-if="sidebarOpen">{{data.name}}</span>
        </router-link>    
    </div>
</nav>
</template>

<script setup>
    import { ref } from 'vue';
    import SideBarData from './components-data/SidebarData.js';

    const sidebarOpen = ref(false);
    const toggleSidebar = () => sidebarOpen.value = !sidebarOpen.value;

</script>


<style>
    .sidebar {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-around;
        height: 100vh;
        position: sticky;
        top: 0px;
        left: 0px;
        width: 50px;
        min-width: 50px;
        overflow-x: hidden;
        background-color:#27DE82;
        transition: 500ms;
    }
    
    .sidebar-open {
        width: min(50vw, 250px);
        transition: 500ms;
    }

    .toggle-sidebar-btn {
        position: absolute;
        right: 0px;
        top: 0px;
        width: 50px;
        height: 50px;
        background-color: transparent;
        outline: none;
        border: none;
        transition: 500ms;
        color: white;
    }
    
    .toggle-sidebar-btn-turned {
        transform: rotate(180deg);
    }

    .routes-container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: center;
        overflow-x: hidden;
    }

    .route-link {
        width: 100%;
        overflow-x: hidden;
        transition: 500ms;
        color: white;
        display: flex;
        align-items: center;
        text-align: left;
        justify-content: flex-start;
        text-decoration: none;
        padding: 10px;
        border-radius: 5px;
    }

    .route-link:hover {
        background-color: rgba(156, 196, 176, 0.73);  
        border-right: 6px solid #00B7FC;
    }

    @media screen and (max-width: 300px){
        .sidebar-open {
            position: fixed;
            width: 100%;
            height: 100vh;
        }

    }

</style>