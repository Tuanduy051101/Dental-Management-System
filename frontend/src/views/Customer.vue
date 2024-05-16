<template>
    <div class="bg-white" @dblclick="activeAction = !activeAction">
        <div class="flex flex-row justify-between items-center py-5 mx-2">
            <div class="flex flex-row items-center">
                <div class="pr-2">Entries</div>
                <select v-model="perPage"
                    class="form-select rounded-md w-20 border border-solid border-1 border-sky-500">
                    <option disable>{{ perPage }}</option>
                    <option v-for="(per_page, index) in perPageList" :key="index">{{ per_page }}</option>
                </select>
            </div>
            <Search class="flex-1 mx-40 w-96" v-model="searchText" />
            <div class="flex items-center">
                <Button @click="activeAdd = true">
                    <i class="bi bi-plus-lg mr-2 text-sm"></i>
                    <span>Add Customer</span>
                </Button>
            </div>
        </div>
        <Table :items="setPages" :fields="fields" :labels="labels" :actionList="actionList"
            v-model:activeIndex="activeAction" @deleteItem="id => idDeleteItem = id" />
        <Pagination :numberOfPages="numberOfPages" :totalRow="totalRow" :startRow="startRow" :endRow="endRow"
            v-model:currentPage="currentPage" />
    </div>

    <!-- add -->
    <div v-if="activeAdd"
        class="absolute top-0 right-0 w-96 h-screen bg-white z-50 overflow-auto shadow-xl opacity-100">
        <div class="flex flex-row justify-between items-center p-3 bg-sky-900 text-white text-lg">
            <span>Add New Customer</span>
            <span @click="activeAdd = false" class="cursor-pointer"><i class="bi bi-x-lg"></i></span>
        </div>
        <div class="mx-3 my-4">
            <Form :customers="customers" @cancel="value => activeAdd = value"
                @submit:form="value => newCustomer = value" />
        </div>
    </div>
</template>

<script>
import Search from "../components/Search.vue";
import Button from "../components/Button.vue";
import Table from "../components/Table.vue";
import Pagination from "../components/Pagination.vue";
import Customer from "../services/customer.service";
import Form from "../components/FormCustomer.vue";
import Swal from "sweetalert2";

export default {
    components: {
        Search,
        Button,
        Table,
        Pagination,
        Form
    },
    data() {
        return {
            perPage: 5,
            perPageList: [10, 20, 30],
            searchText: "",
            customers: [],
            customer: {},
            fields: ['name', 'gender', 'phone number', 'email'],
            labels: ['name', 'gender', 'phone', 'email'],
            activeAction: -1,
            totalRow: 0,
            currentPage: 1,
            startRow: 0,
            endRow: 0,
            numberOfPages: 1,
            idDeleteItem: "",
            // add
            activeAdd: false,
            newCustomer: {},
            actionList: ['Customer.view', 'Customer.edit']
        }
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
            await this.getCustomer(this.idDeleteItem);
            await this.deleteCustomer();
            this.activeAction = -1;
        },
        newCustomer() {
            this.createCustomer();
        }
    },
    computed: {
        customerString() {
            return this.customers.map(
                (customer) => {
                    const { name, gender, phone, email } = customer;
                    return [name, gender, phone, email].join("");
                }
            )
        },
        filteredCustomer() {
            if (!this.searchText) {
                this.totalRow = this.customers.length;
                return this.customers;
            } else {
                this.totalRow = this.customers.filter(
                    (customer, index) => {
                        return this.customerString[index].includes(this.searchText.toUpperCase());
                    }).length;
            }
            return this.customers.filter(
                (customer, index) => {
                    return this.customerString[index].includes(this.searchText.toUpperCase());
                }
            )
        },
        setNumberOfPages() {
            return Math.ceil(this.filteredCustomer.length / this.perPage);
        },
        setPages() {
            this.numberOfPages = this.setNumberOfPages;
            this.startRow = ((this.currentPage - 1) * this.perPage) + 1;
            this.endRow = ((this.currentPage) * this.perPage);
            return this.filteredCustomer.filter(
                (customer, index) => {
                    return ((index + 1) > ((this.currentPage - 1) * this.perPage)) && ((index + 1) <= (this.currentPage * this.perPage));
                }
            )
        },
    },
    methods: {
        async retrieveCustomer() {
            try {
                this.customers = await Customer.getAll();
            } catch (err) {
                console.log(err);
            }
        },
        refreshList() {
            this.retrieveCustomer();
            this.activeAction = -1;
        },
        async getCustomer(id) {
            try {
                this.customer = await Customer.get(id);
            } catch (err) {
                console.log(err);
            }
        },

        async deleteCustomer() {
            // if(confirm("I want to remove this customer ?")) {
            //     try{
            //         await Customer.delete(this.idDeleteItem);
            //         this.refreshList();
            //         this.$router.push({name: "Customer"});
            //     }catch(err) {
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
                    this.customer.name +
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
                    await Customer.delete(this.idDeleteItem);
                    Swal.fire({
                        background: "white",
                        icon: "success",
                        color: "black",
                        text: "Successfully deleted",
                        timer: "2000",
                    });
                    this.refreshList();
                } catch (err) {
                    console.log(err);
                }
            }
        },
        async createCustomer() {
            try {
                await Customer.create(this.newCustomer);
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
                // this.$router.push({name: 'Customer'});
            } catch (err) {
                console.log(err);
            }
        }
    },
    mounted() {
        this.refreshList();
    }
}
</script>