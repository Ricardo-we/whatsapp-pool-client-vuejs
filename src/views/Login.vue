<template>
	<div class="container-sm">
		<form @submit.prevent class="form w-75 mx-auto mt-5">
			<h2>{{ signUpOpen ? "Sign up" : "Login" }}</h2>

			<input 
				v-model="username" 
				class="form-control" 
				type="text"
				:placeholder="signUpOpen ? 'Username' : 'Username or email'" 
			/>
			<input 
				v-model="password" 
				class="form-control" 
				type="password" 
				placeholder="Password" 
			/>
			<input 
				v-model="email" 
				v-if="signUpOpen" 
				class="form-control" 
				type="email"
				placeholder="Email" 
			/>
			<input 
				v-model="phoneNumber" 
				v-if="signUpOpen" 
				class="form-control" 
				type="tel" 
				placeholder="Phone number" 
			/>

			<button @click="login" class="btn btn-secondary w-100" :disabled="signUpOpen">
				Login
			</button>
			<button @click="createUser" class="btn btn-primary w-100" :disabled="!signUpOpen">
				Sign up
			</button>
			<button @click="signUpOpen = !signUpOpen" class="btn btn-link">
				{{ signUpOpen ? "Already have an account" : "Not have an account?" }}
			</button>
		</form>
	</div>
	<router-view />
</template>

<script setup>
	import { ref, onMounted } from "vue";
	import {
		getLocalStorage,
		setLocalStorageItem,
	} from "../utils/handleLocalStorage.js";
	import { useRouter } from "vue-router";
	import { loginRequest, createUserRequest } from "../services/user-requests.js";
	import { useToast } from "vue-toastification";
	
	const toast = useToast()

	const user = getLocalStorage("user");
	const router = useRouter();
	const signUpOpen = ref(false);
	const username = ref("");
	const password = ref("");
	const email = ref("");
	const phoneNumber = ref("");

	const login = () => {
		return loginRequest(username.value, password.value)
			.then((res) => {
				if (res.error || !res.username || !res.id) throw new Error(res.error || 'Opss.. something went wrong')
				setLocalStorageItem("user", res);
				router.push("/home");
			})
			.catch(error => toast.error(error.toString()));
	};

	const createUser = () => {
		return createUserRequest(username.value, password.value, email.value,phoneNumber.value)
			.then((res) => {
				if (res.error || !res.username || !res.id)throw new Error(res.error || 'Opss.. something went wrong')
				setLocalStorageItem("user", res);
				router.push("/home");
			})
			.catch(error => toast.error(error.toString()));
	};

	onMounted(() => {
		if (user.username && user.auth_token) router.push("/home");
	});
</script>
