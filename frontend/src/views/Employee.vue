<template>
    <div class="bg-white rounded-md" @dblclick="activeAction = !activeAction">
        <div class="flex flex-row justify-between items-center py-5 mx-2">
            <div class="flex flex-row items-center">
                <div class="pr-2">Entries</div>
                <select v-model="perPage"
                    class="form-select rounded-md w-20 border border-solid border-1 border-sky-500">
                    <option disabled>
                        {{ perPage }}
                    </option>
                    <option v-for="(per_page, index) in perPageList" :key="index">
                        {{ per_page }}
                    </option>
                </select>
            </div>
            <div class="flex items-center mx-20">
                <div class="pr-2">Position</div>
                <select v-model="positionValue"
                    class="form-select rounded-md w-40 border border-solid border-1 border-sky-500">
                    <option value="All">All</option>
                    <option :value="`${value._id}`" v-for="(value, index) in positions">
                        {{ value.name }}
                    </option>
                </select>
            </div>
            <Search class="flex-1 mr-20" v-model="searchText"></Search>
            <div class="flex items-center">

                <Button @click="activeAdd = true">
                    <i class="bi bi-plus-lg mr-2 text-md"></i>
                    <span>Add Employee</span>
                </Button>
            </div>
        </div>
        <Table :items="formatList(setPages)" :fields="fields" :labels="labels" :actionList="actionList"
            v-model:activeIndex="activeAction" @deleteItem="(id) => (idDeleteItem = id)">
        </Table>
        <Pagination :numberOfPages="numberOfPages" :totalRow="totalRow" :startRow="startRow" :endRow="endRow"
            v-model:currentPage="currentPage"></Pagination>
    </div>
    <!-- add employee -->
    <div v-if="activeAdd"
        class="absolute top-0 right-0 min-w-screen min-h-screen z-50 overflow-auto shadow-xl opacity-100 flex">
        <div class="flex-1 bg-slate-900 opacity-25"></div>
        <div class="flex flex-col bg-white w-96">
            <div class="flex flex-row justify-between items-center px-3 py-3 bg-sky-900 text-white text-lg">
                <span>Add New Employee</span>
                <span @click="activeAdd = false" class="cursor-pointer"><i class="bi bi-x-lg"></i></span>
            </div>
            <div class="mx-3 my-4">
                <Form :positions="positions" :diplomas="diplomas" :employees="employees"
                    @cancel="(value) => (activeAdd = value)" @submit:form="(value) => (newEmployee = value)"></Form>
            </div>
        </div>
    </div>
</template>

<script >
import Search from "../components/Search.vue";
import Select from "../components/Select.vue";
import Button from "../components/Button.vue";
import Table from "../components/Table.vue";
import Pagination from "../components/Pagination.vue";
import EmployeeService from "../services/employee.service";
import Form from "../components/FormEmployee.vue";
import Position from "../services/position.service";
import Diploma from "../services/diploma.service";
import Swal from "sweetalert2";
export default {
    components: {
        Search,
        Button,
        Table,
        Pagination,
        Form,
        Select,
    },
    data() {
        return {
            perPage: 5,
            perPageList: [10, 20, 30],
            searchText: "",
            employees: [],
            employee: {},
            fields: ["name", "gender", "phone number", "email", "position"],
            labels: ["name", "gender", "phone", "email", "position"],
            activeAction: -1,
            totalRow: 0,
            currentPage: 1,
            startRow: 0,
            endRow: 0,
            numberOfPages: 1,
            idDeleteItem: "",
            // add employee
            activeAdd: false,
            positions: [],
            diplomas: [],
            newEmployee: {},
            actionList: ["Employee.view", "Employee.edit"],
            positionValue: "All",
        };
    },
    watch: {
        searchText() {
            this.activeAction = -1;
            this.currentPage = 1;
        },
        perPage() {
            this.activeAction = -1;
        },
        async idDeleteItem() {
            await this.getEmployee(this.idDeleteItem);
            await this.deleteEmployee();
            this.activeAction = -1;
            await this.refreshList();
        },
        async newEmployee() {
            await this.createEmployee();
        },
        async positionValue() {
            await this.refreshList();
        }
    },
    computed: {
        //return
        employeeString() {
            return this.employees.map((employee) => {
                const { name, gender, phone, email } = employee;
                return [name, gender, phone, email].join(" ");
            });
        },

        filteredEmployees() {
            if (!this.searchText) {
                this.totalRow = this.employees.length;
                return this.employees;
            } else {
                this.totalRow = this.employees.filter((employee, index) => {
                    return this.employeeString[index].includes(
                        this.searchText.toUpperCase()
                    );
                }).length;
            }
            return this.employees.filter((employee, index) => {
                return this.employeeString[index].includes(
                    this.searchText.toUpperCase()
                );
            });
        },

        setNumberOfPages() {
            return Math.ceil(this.filteredEmployees.length / this.perPage);
        },

        setPages() {
            this.numberOfPages = this.setNumberOfPages;
            this.startRow = (this.currentPage - 1) * this.perPage + 1;
            this.endRow = this.currentPage * this.perPage;
            return this.filteredEmployees.filter((employee, index) => {
                return (
                    index + 1 > (this.currentPage - 1) * this.perPage &&
                    index + 1 <= this.currentPage * this.perPage
                );
            });
        },
    },
    methods: {
        async retrieveEmployees() {
            try {
                this.employees = await EmployeeService.getAll();
                if (this.positionValue != "All") {
                    this.employees = this.employees.filter(
                        (value, index) => {
                            return value.position._id == this.positionValue;
                        }
                    )
                }
            } catch (err) {
                console.log(err);
            }
        },
        refreshList() {
            this.retrieveEmployees();
            this.activeAction = -1;
        },

        async getEmployee(id) {
            try {
                this.employee = await EmployeeService.get(id);
            } catch (err) {
                console.log(err);
            }
        },

        async deleteEmployee() {
            // if(confirm("I want to remove this employee ?")) {
            //     try{
            //         await EmployeeService.delete(this.idDeleteItem);
            //         this.refreshList();
            //         this.$router.push({name: "Employee"});
            //     }catch (err){
            //         console.log(err);
            //     }
            // }

            const option = Swal.fire({
                background: "white",
                icon: "warning",
                color: "black",
                html:
                    "<p>I want to remove this" +
                    ' "' +
                    '<span class="text-blue-500 text-lg">' +
                    this.employee.name +
                    "</span>" +
                    '"' +
                    "</p>",
                showCancelButton: true,
                showConfirmButton: true,
                confirmButtonText: "Yes, delete it!",
                confirmButtonColor: "red",
                reverseButtons: true,
            });

            if ((await option).isConfirmed) {
                try {
                    await EmployeeService.delete(this.idDeleteItem);
                    Swal.fire({
                        background: "white",
                        icon: "success",
                        color: "black",
                        text: "Successfully deleted",
                        timer: "2000",
                    });
                } catch (err) {
                    console.log(err);
                }
            }
        },
        async getPositions() {
            try {
                this.positions = await Position.getAll();
            } catch (err) {
                console.log(err);
            }
        },
        async getDiplomas() {
            try {
                this.diplomas = await Diploma.getAll();
            } catch (err) {
                console.log(err);
            }
        },
        async createEmployee() {
            try {
                await EmployeeService.create(this.newEmployee);
                Swal.fire({
                    background: "white",
                    icon: "success",
                    color: "black",
                    text: "Successfully created employee",
                    timer: "2000",
                });
                this.activeAdd = false;
                this.refreshList();
                this.currentPage = this.numberOfPages;
                // this.$router.push({ name: "Employee" });
            } catch (err) {
                console.log(err);
            }
        },
        formatList(list) {
            const temp = [];
            for (var value of list) {
                temp.push(
                    {
                        _id: value._id,
                        name: value.name,
                        gender: value.gender,
                        phone: value.phone,
                        email: value.email,
                        position: value.position.name
                    }
                );
            }
            return temp;
        }
    },
    mounted() {
        this.refreshList();
        this.getPositions();
        this.getDiplomas();
    },
};
</script>

