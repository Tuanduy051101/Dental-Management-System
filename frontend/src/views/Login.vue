<template>
    <div class="w-screen h-screen flex">
        <div class="flex-1">
            <img src="https://images.pexels.com/photos/208474/pexels-photo-208474.jpeg" alt="" class="h-screen">
        </div>
        <div class="flex flex-col w-4/12 justify-center items-center">
            <div class="flex justify-start">
                <img class="w-60" src="../assets/images/logo.png" alt="" />
            </div>
            <span class="mt-5 ml-4 text-xl font-black"><span>Welcome to</span></span>
            <span class="text-blue-500 text-3xl mt-5">DENTAL MANAGERMENT SYSTEM</span>
            <!-- <span class="material-symbols-outlined animate-bounce mt-5 text-3xl">
                front_hand
            </span> -->
            <!-- <span class="ml-4 mt-2">Please sign-in to your account and start the adventure</span> -->
            <Form class="flex flex-col mx-4" @submit="onSubmit()" :validation-schema="formSchema">
                <div class="flex flex-col mt-10 mb-5">
                    <label for="email" class="mb-2 font-black text-lg">Email</label>
                    <Field v-model="user.email" name="email" type="text" placeholder="Enter your email address"
                        class="w-96 border border-solid border-slate-400 rounded-md focus:border-blue-500" />
                    <ErrorMessage class="ml-2 mt-2 text-red-500" name="email" />
                </div>
                <div class="flex flex-col">
                    <label for="password" class="mb-2 font-black text-lg">Password</label>
                    <Field v-model="user.password" name="password" type="password" placeholder="Enter your password"
                        class="w-96 border border-solid border-slate-400 rounded-md focus:border-blue-500" />
                    <ErrorMessage class="ml-2 mt-2 text-red-500" name="password" />
                </div>
                <div class="flex flex-col mt-10">
                    <input type="submit" value="Login"
                        class="w-96 border border-solid rounded-md py-2 border-violet-500 text-violet-500 text-xl hover:bg-violet-500 hover:text-white cursor-pointer">
                </div>
            </Form>
        </div>
    </div>
</template>
<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        const formSchema = yup.object().shape({
            email: yup
                .string()
                .required('E-mail needs to have value !')
                .email('Incorrect e-mail address !'),
            password: yup
                .string()
                .required('Password needs to have value !')
                .min(8, 'Password needs at least 8 characters !')
        })
        return {
            formSchema,
            user: {
                email: "",
                password: "",
            }
        }
    },
    methods: {
        onSubmit() {
            this.$emit('submit', this.user);
        }
    }
}
</script>