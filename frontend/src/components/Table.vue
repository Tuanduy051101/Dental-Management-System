<template>
    <table class="border-collapse table-auto bg-white" style="width: 100%">
        <thead class="">
            <tr class="bg__light text-slate-900 text-base uppercase">
                <th
                    class="border border-solid border-l-0 border-r-0 border-slate-500 py-2 pl-2 pr-2 relative text-xl w-20">
                    <span class="float-left">#</span>
                </th>
                <th class="border border-solid border-l-0 border-r-0 border-slate-500 py-2 pl-2 pr-2 relative"
                    v-for="(field, index) in fields" :key="index">
                    <span class="float-left">
                        {{field}}
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
            <tr class="text-slate-700 text-lg lowercase" v-for="(item, index) in items" :key="item._id">
                <td
                    class="border border-solid border-l-0 border-r-0 border-slate-300 p-2 relative cursor-pointer text-sky-500">
                    <router-link :to="
                        {
                            name: actionList[0],
                            params: {id: item._id}
                        }
                    ">
                        #{{sliceID(item._id, index)}}
                    </router-link>
                </td>
                <td class="border border-solid border-l-0 border-r-0 border-slate-300 p-2"
                    v-for="(label, index) in labels" :key="index">
                    {{setGender(label, item[label])}}
                </td>
                <td
                    class="border border-solid border-l-0 border-r-0 border-slate-300 p-2 relative cursor-pointer mr-14">
                    <i class="bi bi-three-dots-vertical" @click="updateActiveIndex(index)"></i>
                    <div class="absolute bg-white mt-2 left-0 mr-5 block shadow-md text-base z-10" v-if="index === activeIndex">
                        <router-link :to="{name: actionList[0], 
                            params: { id: item._id},
                        }" class="flex flex-row items-center px-5 py-2 text-sky-700 hover:text-white hover:bg-sky-500">
                            <i class="bi bi-file-text mr-2"></i>
                            <span>Details</span>
                        </router-link>

                        <router-link :to="{name: actionList[1], 
                            params: { id: item._id},
                        }" class="flex flex-row items-center px-5 py-2 text-sky-700 hover:text-white hover:bg-sky-500">
                            <i class="bi bi-pencil-square mr-2"></i>
                            <span>Edit</span>
                        </router-link>
                        <div @click="deleteItem(item._id)"
                            class="flex flex-row items-center px-5 py-2 text-sky-700 hover:text-white hover:bg-sky-500">
                            <i class="bi bi-trash mr-2"></i>
                            <span>Delete</span>
                        </div>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <span v-if="this.items.length == 0" class="flex justify-center py-4 text-slate-700">No matching records found</span>
</template>

<script>
import Sort from "../components/Sort.vue";
export default {
    components: {
        Sort,
    },
    props: {
        items: {
            type: Array, default: []
        },
        fields: {
            type: Array, default: []
        },
        labels: {
            type: Array, default: []
        },
        activeIndex: {
            type: Number, default: -1
        },
        actionList: {
            type: Array, default: []
        }
    },
    emits: ["update:activeIndex", "deleteItem"],
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        },
        sliceID(id, index) {
            return id.substring(18, 22).concat(index);
        },
        setGender(name, value) {
            if (name == 'gender' && value == true) return 'male';
            else if (name == 'gender' && value == false) return 'female';
            return value;
        },
        deleteItem(id) {
            this.$emit("deleteItem", id);
        }
    }
}
</script>

<style>

</style>
