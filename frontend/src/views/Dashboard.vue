<template>
    <div class="" @dblclick="resetActiveIndex">
        <div class="flex flex-row justify-between items-center py-5 mx-2">
            <div class="flex flex-row items-center">
                <div class="pr-2">Entries</div>
                <select v-model="selected" class="form-select rounded-md w-20 border border-solid border-1 border-sky-600">
                    <option class="bg-white" disabled value="">{{perPage}}</option>
                    <option
                    v-for="(entry, index) in entries" :key="index"
                    >{{entry}}</option>
                </select>
            </div>
            <div class="flex justify-between items-center">
                <Search class="mx-2 w-96" v-model="searchText" />
                <Button>
                    <i class="bi bi-plus mr-2 text-lg"></i>
                    <span>Add</span>
                </Button>
            </div>
        </div>
        <Table :items="abc" :fields="fields" :labels="labels" :totalPage="filteredItemsCount"
            v-model:activeIndex="activeIndex">
        </Table>
        <Pagination v-model:currentPage="currentPage" :numberOfPages="e"></Pagination>
    </div>
</template>
<script>
import Pagination from "../components/Pagination.vue";
import Table from "../components/Table.vue";
import Button from "../components/Button.vue";
import Search from "../components/Search.vue";
import InstitutionService from "../services/institution.service";

export default {
    components: {
        Pagination,
        Table,
        Button,
        Search,
    },
    data() {
        return {
            items: [],
            searchText: "",
            fields: ['name', 'province'],
            labels: ['name', 'province'],
            activeIndex: -1,
            currentPage: 1,
            perPage: 10,
            selected: "",
            entries: [5, 10, 15]
        }
    },
    watch: {
        searchText() {
            this.activeIndex = -1;
        },
        currentPage() {
            this.activeIndex = -1;
        },
        selected() {
            this.perPage = this.selected
        }
    },
    computed: {
        //convert object to string
        itemString() {
            return this.items.map(
                (item) => {
                    const { name, province } = item;
                    return [name, province].join("");
                }
            );
        },

        // return items have contain 
        filteredItems() {
            if (!this.searchText) return this.items;
            return this.items.filter(
                (_item, index) => {
                    return this.itemString[index].includes(this.searchText.toUpperCase());
                }
            );
        },

        activeItem() {
            if (this.activeIndex < 0) return null;
            return this.filteredItems[this.activeIndex];
        },

        filteredItemsCount() {
            return this.filteredItems.length;
        },

        abc() {
            return this.filteredItems.filter(
                (item, index) => {
                    return (index + 1) == this.currentPage;
                }
            )
        },
        e() {
            return this.filteredItems.length;
        }


    },
    methods: {
        async retrieveContacts() {
            try {
                this.items = await InstitutionService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveContacts();
            this.activeIndex = -1;
        },
        resetActiveIndex() {
            if (this.activeIndex != -1) {
                this.activeIndex = -1;
            }
        }
    },
    mounted() {
        this.refreshList();
    },
}
</script>

