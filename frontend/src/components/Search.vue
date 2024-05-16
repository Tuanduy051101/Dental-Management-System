<template>
    <div class="relative flex items-center">
        <span class="absolute left-0 pl-2">
            <i class="bi bi-search text-sky-700"></i>
        </span>
        <input type="text" name="search" id="search" placeholder="Search for anything..."
            class="py-2 pl-9 pr-3 w-full border-solid border-b-2 border-t-0 border-l-0 border-r-0  border-sky-500 placeholder:italic placeholder:text-sm placeholder:text-slate-400 block rounded-md shadow-sm outline-none ring-sky-500 ring-1"
            :value="modelValue" @input="updateModelValue" @keyup.enter="search" />
    </div>
</template>

<script>
export default {
    props: {
        modelValue: { type: String, default: "" },
    },
    emits: ["search", "update:modelValue"],
    methods: {
        updateModelValue(e) {
            this.$emit("update:modelValue", e.target.value);
        },
        search() {
            this.$emit("search");
        },
    },
}
</script>

<style>

</style>