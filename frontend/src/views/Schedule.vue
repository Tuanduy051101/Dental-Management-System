<template>
    <div class="bg-white">
        <div class="flex flex-row justify-between items-center py-5 mx-2">
            <div class="flex flex-row items-start">
                <!-- !Entry -->
                <div class="flex">
                    <div class="pr-2 flex items-center">Entries</div>
                    <select v-model="perPage"
                        class="form-select rounded-md w-20 border border-solid border-1 border-sky-500">
                        <option disable>{{ perPage }}</option>
                        <option v-for="(per_page, index) in perPageList" :key="index">{{ per_page }}</option>
                    </select>
                </div>
                <!-- !Date -->
                <div class="flex ml-10">
                    <div class="pr-2 flex items-center">Date</div>
                    <input v-model="dateValue" type="date" name="dateValue"
                        class="form-input lowercase rounded-md w-34 border border-solid border-1 border-sky-500">
                </div>
                <!-- !Shift -->
                <div class="flex ml-10">
                    <div class="pr-2 flex items-center">Shifts</div>
                    <select v-model="shiftValue"
                        class="form-select lowercase rounded-md w-32 border border-solid border-1 border-sky-500">
                        <option>All</option>
                        <option v-for="(shift, index) in shifts" :key="index" :value="`${shift._id}`">{{ shift.name }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="flex items-center">
                <Search class="mx-2 w-96" v-model="searchText"></Search>
                <!-- !Add -->
                <Button>
                    <router-link :to="{ name: 'Schedule.add' }">
                        <i class="bi bi-plus-lg mr-2 text-md"></i>
                        <span>Assign</span>
                    </router-link>
                </Button>
                <!-- !Add -->
            </div>
        </div>
        <!-- !Table -->
        <table class="border-collapse table-auto bg-white" style="width: 100%">
            <thead class="">
                <tr class="bg__light text-slate-900 text-base uppercase">
                    <th class="border border-solid border-l-0 border-r-0 border-slate-500 py-2 pl-2 pr-2 relative">
                        <span class="float-left">
                            Date
                        </span>
                        <Sort />
                    </th>
                    <th class="border border-solid border-l-0 border-r-0 border-slate-500 py-2 pl-2 pr-2 relative">
                        <span class="float-left">
                            Shift
                        </span>
                        <Sort />
                    </th>
                    <th class="border border-solid border-l-0 border-r-0 border-slate-500 py-2 pl-2 pr-2 relative">
                        <span class="float-left">
                            Dentist
                        </span>
                        <Sort />
                    </th>
                    <th class="border border-solid border-l-0 border-r-0 border-slate-500 py-2 pl-2 pr-2 relative">
                        <span class="float-left">
                            Phone
                        </span>
                        <Sort />
                    </th>
                    <th class="border border-solid border-l-0 border-r-0 border-slate-500 py-2 pl-2 pr-2 relative">
                        <span class="float-left">
                            Email
                        </span>
                        <Sort />
                    </th>
                    <th class="border border-solid border-l-0 border-r-0 border-slate-500 py-2 pl-2 pr-2 relative">
                        <span class="float-left">
                            Note
                        </span>
                        <Sort />
                    </th>
                    <th class="border border-solid border-l-0 border-r-0 border-slate-500 py-2 pl-2 pr-2 relative w-28">
                        <span class="float-left">
                            Actions
                        </span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="text-slate-700 text-lg lowercase" v-for="(value, index) in setPages" :key="index">
                    <td class="border border-solid border-l-0 border-r-0 border-slate-300 p-2">
                        {{ value.date }}
                    </td>
                    <td v-if="value.shift.length != 0" class="border border-solid border-l-0 border-r-0 border-slate-300 p-2">
                        <span v-for="(shift, index) in value.shift" class="flex flex-col">
                            <span v-if="index == 0" class="text-blue-500">{{ shift.name }} {{ formatTime(shift.start) }}
                                -
                                {{ formatTime(shift.end) }}</span>
                            <span v-if="index == 1" class="text-violet-500">{{ shift.name }} {{ formatTime(shift.start)
                            }} -
                                {{ formatTime(shift.end) }}</span>
                            <span v-if="index == 2" class="text-green-500">{{ shift.name }} {{ formatTime(shift.start)
                            }} -
                                {{ formatTime(shift.end) }}</span>
                        </span>
                    </td>
                    <td v-if="value.shift.length == 0" class="border border-solid border-l-0 border-r-0 border-slate-300 p-2">
                        <span class="bg-yellow-500 px-16">&emsp;</span>
                    </td>
                    <td class="border border-solid border-l-0 border-r-0 border-slate-300 p-2">
                        {{ value.dentist }}
                    </td>
                    <td class="border border-solid border-l-0 border-r-0 border-slate-300 p-2">
                        {{ value.phone }}
                    </td>
                    <td class="border border-solid border-l-0 border-r-0 border-slate-300 p-2">
                        {{ value.email }}
                    </td>
                    <td class="border border-solid border-l-0 border-r-0 border-slate-300 p-2"
                    :class="[compareString(value.note, 'no') ? '' : 'text-yellow-500']"
                    >
                        {{ value.note }}
                    </td>
                    <td class="border border-solid border-l-0 border-r-0 border-slate-300 p-2">
                        <span class="material-symbols-outlined text-xl hover:text-blue-500 cursor-pointer">
                            visibility
                        </span>
                        <span class="material-symbols-outlined text-xl mx-4 hover:text-yellow-500 cursor-pointer">
                            edit
                        </span>
                        <span @click="deleteSchedule(value.id, value.dentistId)"
                            class="material-symbols-outlined text-xl hover:text-red-500 cursor-pointer">
                            delete
                        </span>
                    </td>
                </tr>
                <p></p>
            </tbody>
        </table>
        <span v-if="setPages.length == 0" class="flex justify-center py-4 text-slate-700">No matching
            records found</span>
        <!-- !Table -->
        <!-- !Pagination -->
        <Pagination :numberOfPages="numberOfPages" :totalRow="totalRow" :startRow="startRow" :endRow="endRow"
            v-model:currentPage="currentPage"></Pagination>
        <!-- !Pagination -->
    </div>
</template>

<script>
import Select from '../components/Select.vue';
import Shift from '../services/shift.service';
import Search from "../components/Search.vue";
import Button from "../components/Button.vue";
import Pagination from "../components/Pagination.vue";
import Schedule from "../services/schedule-work.service";
import Sort from "../components/Sort.vue";
import Swal from "sweetalert2";
import Employee from "../services/employee.service";

export default {
    components: {
        Select,
        Search,
        Button,
        Pagination,
        Sort
    },
    data() {
        return {
            perPage: 5,
            perPageList: [5, 10, 20, 30],
            shifts: [],
            shiftValue: "All",
            dateValue: null,
            schedules: [],
            scheduleList: [],
            totalRow: 0,
            currentPage: 1,
            startRow: 0,
            endRow: 0,
            numberOfPages: 1,
            idDeleteItem: "",
            searchText: "",
            employee: {},

        }
    },
    watch: {
        searchText() {
            this.currentPage = 1;
        },
        async dateValue() {
            await this.getAllSchedule();
            await this.formatSchedule();
        },
        async idDeleteItem() {
        },
        newCustomer() {
            this.createCustomer();
        }
    },
    computed: {
        toString() {
            return this.scheduleList.map(
                (value) => {
                    return [value.dentist, value.phone, value.email].join("");
                }
            )
        },
        filter() {
            return this.scheduleList.filter(
                (value, index) => {
                    return this.toString[index].includes(this.searchText.toUpperCase());
                }
            )
        },
        filtered() {
            if (!this.searchText) {
                this.totalRow = this.scheduleList.length;
                return this.scheduleList;
            } else {
                this.totalRow = this.filter.length;
            }
            return this.filter;
        },
        setNumberOfPages() {
            return Math.ceil(this.filtered.length / this.perPage);
        },
        setPages() {
            this.numberOfPages = this.setNumberOfPages;
            this.startRow = ((this.currentPage - 1) * this.perPage) + 1;
            this.endRow = ((this.currentPage) * this.perPage);
            return this.filtered.filter(
                (value, index) => {
                    return ((index + 1) > ((this.currentPage - 1) * this.perPage)) && ((index + 1) <= (this.currentPage * this.perPage));
                }
            )
        },
    },
    methods: {
        async getAllShifts() {
            try {
                this.shifts = await Shift.getAll();
            } catch (error) {
                console.log(error);
            };
        },
        formatDate(date) {
            const temp = new Date(date);
            return temp.getDate() + '/' + (Math.ceil(temp.getMonth()) + 1) + '/' + temp.getFullYear();
        },
        formatTime(date) {
            const temp = new Date(date);
            return temp.getUTCHours() + ':' + temp.getMinutes();
        },
        formatSchedule() {
            var temp = this.schedules.map(
                (value, index) => {
                    if (this.dateValue != null) {
                        if (this.formatDate(this.dateValue) == this.formatDate(value.date.date)) {
                            return {
                                date: this.formatDate(value.date.date),
                                shift: value.shifts,
                                dentist: value.employee.name,
                                phone: value.employee.phone,
                                dentistId: value.employee._id,
                                id: value._id,
                                email: value.employee.email,
                                note: value.note,
                            }
                        }
                        return 0;
                    }
                    return {
                        date: this.formatDate(value.date.date),
                        shift: value.shifts,
                        dentist: value.employee.name,
                        dentistId: value.employee._id,
                        phone: value.employee.phone,
                        id: value._id,
                        email: value.employee.email,
                        note: value.note,
                    }
                }
            )

            temp = temp.filter(
                (value) => value != 0
            );

            this.scheduleList = temp;

            console.log(temp);
            return temp;
        },
        async getAllSchedule() {
            try {
                this.schedules = await Schedule.getAll();
            } catch (error) {
                console.log(error);
            };
        },

        async getEmployee(id) {
            try {
                this.employee = await Employee.get(id);
            } catch (error) {
                console.log(error);
            }
        },

        async deleteSchedule(id, idE) {
            await this.getEmployee(idE);
            const option = Swal.fire({
                background: "white",
                color: "black",
                icon: "warning",
                text: "You want to delete " + this.employee.name + "'s " + "work schedule",
                showCancelButton: true,
                showCancelButton: true,
                cancelButtonText: "Cancel",
                confirmButtonText: "Delete",
                confirmButtonColor: "red",
                reverseButtons: true,
            });
            if ((await option).isConfirmed) {
                try {
                    await Schedule.delete(id);
                    Swal.fire({
                        background: "white",
                        color: "black",
                        icon: "success",
                        text: "Successfully deleted"
                    });
                    await this.getAllSchedule();
                    await this.formatSchedule();
                } catch (error) {
                    console.log(error);
                };
            }
        },

        

        compareString(a, b) {
            return a.toLowerCase().includes(b);
        }

    },
    async created() {
        await this.getAllShifts();
        await this.getAllSchedule();
        await this.formatSchedule();
    }
}
</script>