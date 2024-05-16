<template>
    <div class="flex justify-between py-5 px-2 items-center">
        <p class="text-slate-900">Showing {{totalRow ==0 ? 0 : startRow}} to {{endRow>totalRow ? totalRow : endRow}} of {{totalRow}} entries</p>
        <div class="flex items-center">
            <a class="bg-sky-100 rounded-full w-8 h-8 flex items-center justify-center hover:bg-sky-500 hover:text-white" href="#"
            @click="updatePagePrev(currentPage)"
            :class="[index === (currentPage - 1) ? 'bg-sky-500 text-white' : 'bg-sky-100']"
            ><i class="bi bi-chevron-left"></i></a>
            <div class="flex mx-2 bg-sky-100 rounded-full">
                <a class="rounded-full w-8 h-8 flex items-center justify-center hover:bg-sky-300 hover:text-white" href="#"
                v-for="(numberOfPage, index) in numberOfPages" :key="numberOfPage" @click="updatePage(numberOfPage)"
                :class="[index === (currentPage - 1) ? 'bg-sky-500 text-white' : 'bg-sky-100 text-slate-900']"
                >
                    {{numberOfPage}}
                </a>
            </div>
            <a class="bg-sky-100 rounded-full w-8 h-8 flex items-center justify-center hover:bg-sky-500 hover:text-white" href="#"
            @click="updatePageNext(currentPage)"
            :class="[index === (currentPage - 1) ? 'bg-sky-500 text-white' : 'bg-sky-100']"
            ><i class="bi bi-chevron-right"></i></a>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        totalRow: {
            type: Number, default: 0
        },
        currentPage: {
            type: Number, default: 1,
        },
        perPage: {
            type: Number, default: 0,
        },
        numberOfPages: {
            type: Number, default: 1,
        },
        startRow: {
            type: Number, default: 0,
        },
        endRow: {
            type: Number, default: 0,
        }
    },
    emits: ['update:currentPage'],
    methods: {
        updatePage(number) {
            this.$emit('update:currentPage', number);
        },
        updatePageNext(number) {
            // this.$emit('update:currentPage', number);
            if(number < this.numberOfPages && number > 0) {
                this.$emit('update:currentPage', number + 1);
            }
        },
        updatePagePrev(number) {
            if(number <= this.numberOfPages && number > 1) {
                this.$emit('update:currentPage', number - 1);
            }
        }
    }
}
</script>