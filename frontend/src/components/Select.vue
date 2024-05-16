<template>
    <div class="relative flex flex-col items-center">
        <span class="absolute right-0 top-0 mt-2 mr-2">
            <i class= "text-slate-900 text-sm"
            :class="[!activeSelect ? 'bi bi-chevron-down' : 'bi bi-chevron-up']"
            ></i>
        </span>
        <input
            class="w-full text-md lowercase text-sky-900 border border-solid border-slate-300 rounded-md focus:border-sky-100 focus:border-1 focus:outline-0 outline-none placeholder:italic placeholder:text-sm placeholder:text-slate-400"
            :class="[modelValue_id ? 'border-slate-300' : 'border-red-500']"
            type="text" 
            :value="modelValue"
            @click="activeSelect = true"
            @input="updateModelValue"
            />
    </div>
    <div v-if="activeSelect" class="w-full flex flex-col mt-4 bg__light shadow-2xl overflow-auto rounded-md border border-solid border-slate-100" style="min-height: 50px; max-height: 300px;">
        <span
        v-for="(option, index) in options" :key="option._id"
        @click="[updateModelValue(option._id, option.name), activeSelect = false]" class="p-3 text-sm hover:bg-sky-300">{{option.name}}</span>
    </div>
</template>

<script>
export default {
    props: {
        // activeSelect: {
        //     type: Boolean, default: false
        // },
        // modelValue: { type: String, default: "" },
        options: {
            type: Array, default: []
        }
    },
    watch: {
        modelValue() {
            this.updateModelValue
        }
    },
    emits: ['update:modelValue'],
    methods: {
        updateModelValue(_id, _name) {
            this.modelValue = _name;
            this.modelValue_id = _id;
            this.$emit('update:modelValue', this.modelValue_id);
        },
    },
    data() {
        return {
            modelValue: "",
            modelValue_id: "",
            activeSelect: false
        }
    }
}
</script>