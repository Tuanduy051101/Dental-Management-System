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
                    <input v-model="dateValue" type="date" name="dateValue" :min="`${currentValue}`"
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
            </div>
        </div>
        <!-- !Table -->
        <table class="border-collapse table-auto bg-white" style="width: 100%">
            <thead class="">
                <tr class="bg__light text-slate-900 text-base uppercase">
                    <th class="border border-solid border-l-0 border-r-0 border-slate-500 py-2 pl-2 pr-2 relative w-10">
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
                    <th v-for="(value, index) in shifts"
                        class="border border-solid border-l-0 border-r-0 border-slate-500 py-2 pl-2 pr-2 relative">
                        <span v-if="index == 0" class="float-left text-blue-500">
                            {{ value.name }}
                        </span>
                        <span v-if="index == 1" class="float-left text-yellow-500">
                            {{ value.name }}
                        </span>
                        <span v-if="index == 2" class="float-left text-green-500">
                            {{ value.name }}
                        </span>
                        <span v-if="index == 3" class="float-left text-violet-500">
                            {{ value.name }}
                        </span>
                        <Sort />
                    </th>
                    <th class="border border-solid border-l-0 border-r-0 border-slate-500 py-2 pl-2 pr-2 relative">
                        <span class="float-left">
                            Note
                        </span>
                        <Sort />
                    </th>
                    <th class="border border-solid border-l-0 border-r-0 border-slate-500 py-2 pl-2 pr-2 relative w-18">
                        <span class="float-left">
                            Add
                        </span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="text-slate-700 text-lg lowercase" v-for="(value, index1) in setPages" :key="index1">
                    <td class="border border-solid border-l-0 border-r-0 border-slate-300 p-2">
                        <input v-model="value.status" class="border border-solid border-pink-500 checked:bg-pink-500"
                            type="checkbox" name="" id="">
                    </td>
                    <td class="border border-solid border-l-0 border-r-0 border-slate-300 p-2">
                        {{ value.dentistName }}
                    </td>
                    <td class="border border-solid border-l-0 border-r-0 border-slate-300 p-2">
                        {{ value.phone }}
                    </td>
                    <td class="border border-solid border-l-0 border-r-0 border-slate-300 p-2">
                        {{ value.email }}
                    </td>
                    <td v-for="(shift, index) in shifts"
                        class="border border-solid border-l-0 border-r-0 border-slate-300 p-2">
                        <span class="float-left">
                            <input v-if="index == 0" :value="`${shift._id}`" v-model="value.shifts[index]"
                                class="form-checkbox border border-solid border-blue-500 ml-1 checked:bg-blue-500"
                                type="checkbox" name="" id="">
                            <input v-if="index == 1" :value="`${shift._id}`" v-model="value.shifts[index]"
                                class="form-checkbox border border-solid border-yellow-500 ml-1 checked:bg-yellow-500"
                                type="checkbox" name="" id="">
                            <input v-if="index == 2" :value="`${shift._id}`" v-model="value.shifts[index]"
                                class="form-checkbox border border-solid border-green-500 ml-1 checked:bg-green-500"
                                type="checkbox" name="" id="">
                            <input v-if="index == 3" :value="`${shift._id}`" v-model="value.shifts[index]"
                                class="form-checkbox border border-solid border-violet-500 ml-1 checked:bg-violet-500"
                                type="checkbox" name="" id="">
                        </span>
                    </td>
                    <td class="border border-solid border-l-0 border-r-0 border-slate-300 p-2">
                        <input type="text" name="" id="" v-model="value.note" placeholder="enter note">
                    </td>
                    <td class="border border-solid border-l-0 border-r-0 border-slate-300 p-2">
                        <span @click="onSubmit()"
                            class="material-symbols-outlined text-xl cursor-pointer px-2 py-1 border border-solid border-blue-500 hover:bg-blue-500 hover:text-white">
                            add
                        </span>
                    </td>
                </tr>
                <p></p>
            </tbody>
        </table>
        <!-- <span v-if="formatSchedule(setPages)[0] == 0" class="flex justify-center py-4 text-slate-700">No matching
            records found</span> -->
        <!-- !Table -->
        <!-- !Pagination -->
        <Pagination :numberOfPages="numberOfPages" :totalRow="totalRow" :startRow="startRow" :endRow="endRow"
            v-model:currentPage="currentPage"></Pagination>
        <!-- !Pagination -->
        <Button
            class="bg-inherit text-black border border-solid border-blue-500 rounded-none ml-2 shadow-none hover:text-white cursor-pointer">
            <router-link :to="{ name: 'Schedule' }"><span class="mx-4">Schedules</span></router-link>
        </Button>
        <div class="mt-4">&emsp;</div>
    </div>
</template>

<script>
import Select from '../components/Select.vue';
import Shift from '../services/shift.service';
import Search from "../components/Search.vue";
import Button from "../components/Button.vue";
import Pagination from "../components/Pagination.vue";
import Schedule from "../services/schedule-work.service";
import Employee from "../services/employee.service";
import Datee from "../services/date.service";
import Swal from "sweetalert2";

export default {
    components: {
        Select,
        Search,
        Button,
        Pagination,
    },
    data() {
        return {
            perPage: 5,
            perPageList: [5, 10, 20, 30],
            shifts: [],
            shiftValue: "All",
            dateValue: this.formatDateNow(),
            currentValue: this.formatDateNow(),
            schedules: [],
            totalRow: 0,
            currentPage: 1,
            startRow: 0,
            endRow: 0,
            numberOfPages: 1,
            idDeleteItem: "",
            searchText: "",
            employees: [],
            newSchedule: [],
            dateList: [],
        }
    },
    watch: {
        searchText() {
            this.currentPage = 1;
        },
        async dateValue() {
            await this.getAllSchedule();
            await this.getNewSchedule();
        },
        async idDeleteItem() {
        },
        // newCustomer() {
        //     this.createCustomer();
        // }
    },
    computed: {
        toString() {
            return this.newSchedule.map(
                (value) => {
                    return [value.dentistName, value.phone, value.email].join("");
                }
            )
        },
        filter() {
            return this.newSchedule.filter(
                (value, index) => {
                    return this.toString[index].includes(this.searchText.toUpperCase());
                }
            )
        },
        filtered() {
            if (!this.searchText) {
                this.totalRow = this.newSchedule.length;
                return this.newSchedule;
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
        formatDateNow() {
            const date = new Date();
            return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        },
        formatDate1(date1) {
            const date = new Date(date1);
            return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        },
        formatTime(date) {
            const temp = new Date(date);
            return temp.getUTCHours() + ':' + temp.getMinutes();
        },
        getNewSchedule() {
            console.log('start');
            this.newSchedule = this.employees.map(
                (employee, index) => {
                    console.log('start1');

                    var check = true;
                    for (var value of this.schedules) {
                        if (employee._id == value.employee._id && this.formatDate(value.date.date) == this.formatDate(this.dateValue)) {
                            console.log('start3');
                            check = false;
                            break;
                        }
                    }
                    if (check) {
                        console.log('start2');
                        return {
                            dentistId: employee._id,
                            dentistName: employee.name,
                            phone: employee.phone,
                            email: employee.email,
                            date: this.dateValue,
                            shifts: [false, false, false, false],
                            status: false,
                            note: ""
                        }
                    }
                }
            )
            this.newSchedule = this.newSchedule.filter(
                (value, index) => {
                    return value != undefined;
                }
            )
            console.log(this.newSchedule);
            return this.newSchedule;
        },
        async getAllSchedule() {
            try {
                this.schedules = await Schedule.getAll();
            } catch (error) {
                console.log(error);
            };
        },

        async getAllEmployee() {
            try {
                this.employees = await Employee.getAll();
            } catch (error) {
                console.log(error);
            };
        },

        convertShifts() {
            for (var value of this.newSchedule) {
                if (value.shifts[0] == true) value.shifts[0] = this.shifts[0]._id;
                if (value.shifts[1] == true) value.shifts[1] = this.shifts[1]._id;
                if (value.shifts[2] == true) value.shifts[2] = this.shifts[2]._id;
                if (value.shifts[3] == true) value.shifts[3] = this.shifts[3]._id;
            }
        },

        onSubmit() {
            var check = false;
            this.convertShifts();
            var body = this.newSchedule.map(
                (value, index) => {
                    if (value.status) {
                        check = true;
                        const temp = value.shifts.filter(
                            (shift, index) => {
                                return shift != false;
                            }
                        )
                        return {
                            employee: value.dentistId,
                            name: value.dentistName,
                            date: value.date,
                            note: value.note,
                            shifts: temp
                        }
                    }
                }
            )
            body = body.filter(
                (value, index) => {
                    return value != undefined;
                }
            )
            if (check) {
                this.createSchedule(body);
            }
        },

        async getAllDates() {
            try {
                this.dateList = await Datee.getAll();
            } catch (error) {
                console.log(error);
            };

        },

        async createSchedule(data) {
            var check = false;
            for (var e of data) {
                var dateObject = null;
                var error = false;
                try {
                    dateObject = await Datee.create({ date: this.formatDate1(e.date) });
                    await this.getAllDates();
                } catch (error) {
                    console.log(error);
                };
                console.log(dateObject);
                try {
                    if (e.note.length == 0 && e.shifts.length == 0) {
                        error = true;
                    } else if (e.note.length == 0) {
                        await Schedule.create({
                            employee: e.employee,
                            date: dateObject._id,
                            shifts: e.shifts,
                        });
                        check = true;
                    } else if (e.shifts.length == 0) {
                        await Schedule.create({
                            employee: e.employee,
                            date: dateObject._id,
                            note: e.note,
                        });
                        check = true;
                    } else {
                        await Schedule.create({
                            employee: e.employee,
                            date: dateObject._id,
                            shifts: e.shifts,
                            note: e.note,
                        });
                        check = true;
                    }

                } catch (err) {
                    console.log(err);
                }
                if (error) {
                    const option = Swal.fire({
                        background: "white",
                        color: "black",
                        icon: "error",
                        title: "Dentist" + " " + e.name,
                        text: "Shift or Note must have a valid ?",
                        showCancelButton: true,
                        cancelButtonText: "STOP",
                        showConfirmButton: true,
                        confirmButtonText: "CONTINUE",
                        reverseButtons: true,
                    });
                    if ((await option).isConfirmed) {
                        continue;
                    } else {
                        break;
                    }
                }
            }
            if (check) {
                Swal.fire({
                    background: "white",
                    color: "black",
                    icon: "success",
                    text: "Successfully asigned"
                });
                await this.getAllSchedule();
                await this.getAllEmployee();
                await this.getNewSchedule();
            }
        }
    },
    async created() {
        await this.getAllDates();
        await this.getAllShifts();
        await this.getAllSchedule();
        await this.getAllEmployee();
        await this.getNewSchedule();
    }
}
</script>