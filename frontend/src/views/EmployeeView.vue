<template>
    <div class="">
        <div class="flex flex-row justify-between items-start w-full">
            <div class="bg-white w-auto my-2 mr-2 flex items-start rounded-md">
                <img src="https://cdn.pixabay.com/photo/2022/05/15/13/38/woman-7198072__340.jpg" alt=""
                    class="w-40 rounded-md m-2">
                <div class="flex flex-col m-2">
                    <span>{{employee.name}}</span>
                    <span class="lowercase text-slate-700">{{employee.email}}</span>
                    <div class="flex flex-row mt-4">
                        <button
                            class="flex items-center py-2 px-3 rounded-lg text-white bg-sky-500 hover:bg-sky-700 shadow-lg shadow-sky-500/50 mr-4">
                            <i class="bi bi-pencil-square mr-2"></i>
                            <span class="">Edit</span>
                            <slot></slot>
                        </button>
                        <button
                            class="flex items-center py-2 px-3 rounded-lg text-white bg-red-500 hover:bg-red-700 shadow-lg shadow-red-500/50">
                            <i class="bi bi-trash mr-2"></i>
                            <span class="">Delete</span>
                            <slot></slot>
                        </button>
                    </div>
                </div>
                <div class="flex flex-row ml-5 pl-5 mt-2 border border-solid border-sky-200 border-t-0 border-b-0 border-r-0">
                    <div class="flex flex-col text-lg text-slate-900">
                        <span>Username</span>
                        <span>Gender</span>
                        <span>Contact</span>
                        <span>Role</span>

                    </div>
                    <div class="flex flex-col ml-5 pl-5 mr-2 lowercase text-slate-600 text-lg border border-solid border-sky-100 border-t-0 border-b-0 border-r-0">
                        <span>{{employee.account}}</span>
                        <span>{{employee.gender ? 'male' : 'female'}}</span>
                        <span>{{employee.phone}}</span>
                        <span>{{position}}</span>
                    </div>
                </div>
            </div>
            <div class="bg-white w-auto my-2 ml-2 flex-1 rounded-md border border-solid border-sky-200 border-1">
                <div class="flex m-2 justify-center text-slate-900 text-lg border border-solid border-1 border-t-0 border-l-0 border-r-0 border-sky-200">
                    <span class="float-left mr-5">Diplomas</span>
                    <span class="float-right mb-2">{{totalDiploma}}</span>
                </div>
                <div class="flex flex-row m-2 items-center text-slate-800" v-for="(diploma, index) in employee.diplomas" :key="index">
                    <span class="text-md">{{diploma.name}}</span>
                    <span class="text-xs ml-5">{{diploma.institution.name}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import EmployeeService from "../services/employee.service";
export default {
    props: {
        id: {
            type: String, required: true
        }
    },
    data() {
        return {
            employee: {},
            position: "",
            totalDiploma: 0
        }
    },
    methods: {
        async getInfo(id) {
            try {
                this.employee = await EmployeeService.get(id);
                this.position = this.employee.position.name;
                this.totalDiploma = this.employee.diplomas.length;
            } catch (err) {
                console.log(err)
            }
        },
    },
    mounted() {
        this.getInfo(this.id);
    }
}
</script>