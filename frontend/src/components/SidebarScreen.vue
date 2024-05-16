<template>
    <div v-if="sidebarToggle" v-on:mouseover="showToggle"
        class="fixed top-0 left-0 overflow-auto max-h-screen min-h-screen w-1/12 bg-white shadow-2xl">
        <div class="flex flex-col items-center justify-content-center">
            <div class="">
                <img class="w-20" src="../assets/images/logo.png" alt="" />
            </div>
            <div class="mt-3">
                <!-- <a href=""><i class="bi bi-house-door text-sky-700 text-2xl"></i></a> -->
                <router-link :to="{ name: `Dashboard` }"
                    class="my-3 flex items-center overflow-hidden py-2 px-2 w-full text-base"
                    :class="[
                      1000 === activeIndex ? 'bg-sky-500 text-white rounded-sm': 'text-sky-700'
                    ]" @click="updateActiveIndex(1000)">
                    <i class="bi bi-house-door text-2xl"></i>
                </router-link>
            </div>
            <div class="flex flex-col items-center">
                <a href="" class="my-3"><i class="text-sky-700 text-2xl">...</i></a>
                <router-link :to="{ name: `${sidebarTask.name}` }"
                    class="my-3 flex items-center overflow-hidden py-1 px-1 w-full text-base"
                    v-for="sidebarTask in sidebarTasks" :key="sidebarTask.id" :class="[
                      sidebarTask.id === activeIndex ? 'bg-sky-500 text-white rounded-sm': 'text-sky-700'
                    ]" @click="updateActiveIndex(sidebarTask.id)">
                    <i class="text-2xl p-1" :class="[sidebarTask.icon]"></i>
                </router-link>
                <a href="" class="mb-3 -mt-3"><i class="text-sky-700 text-2xl">...</i></a>
            </div>
            <!-- <div class="flex flex-col items-center">
                <a href="" class="my-3"><i class="bi bi-gear text-sky-700 text-2xl"></i></a>
            </div> -->
            <router-link :to="{ name: `Setting` }"
                    class="my-3 flex items-center overflow-hidden py-2 px-2 text-base"
                    :class="[
                      2000 === activeIndex ? 'bg-sky-500 text-white rounded-sm': 'text-sky-700'
                    ]" @click="updateActiveIndex(2000)">
                    <i class="bi bi-gear text-2xl"></i>
                </router-link>
        </div>
    </div>
    <!-- hover -->
    <div v-else v-on:mouseleave="showToggle"
        class="fixed top-0 left-0 overflow-auto max-h-screen min-h-screen w-2/12 bg-white shadow-lg shadow-blue-200 z-10">
        <div class="flex flex-col items-center justify-content-center">
            <div class="w-11/12 flex items-center">
                <img class="w-20 mr-0" src="../assets/images/logo.png" alt="" />
                <span class="font__logo text-sky-700 text-6xl">KeyOne</span>
            </div>
            <!-- <a href="#" class="flex items-center mt-3 overflow-hidden py-1 px-2 w-11/12 rounded-sm text-base text-sky-700">
                <i class="bi bi-house-door text-sky-700 text-2xl mr-3"></i>
                <span class="">Dashboards</span>
            </a> -->
            <router-link :to="{ name: `Dashboard` }"
                    class="mt-3 flex items-center overflow-hidden py-1 px-2 w-11/12 text-base rounded-2xl"
                    :class="[
                      1000 === activeIndex ? 'bg-sky-500 text-white rounded-sm': 'text-sky-700 hover:bg-sky-100 hover:text-sky-700'
                    ]" @click="updateActiveIndex(1000)">
                    <i class="bi bi-house-door text-sky-700 text-2xl mr-3"></i>
                    <span class="">Dashboards</span>
                </router-link>
            <div class="flex flex-col items-center w-11/12">
                <a href="#" class=""><i class="text-sky-700 text-2xl">...</i></a>
                <router-link :to="{ name: `${sidebarTask.name}` }"
                    class="my-3 flex items-center overflow-hidden py-1 px-2 w-full text-base rounded-2xl"
                    v-for="sidebarTask in sidebarTasks" :key="sidebarTask.id" :class="[
                      sidebarTask.id === activeIndex ? 'bg-sky-500 text-white rounded-sm': 'text-sky-700 hover:text-sky-700 hover:bg-sky-100'
                    ]" @click="updateActiveIndex(sidebarTask.id)">
                    <i class="text-2xl mr-3" :class="[sidebarTask.icon]"></i>
                    <span class="">{{ sidebarTask.name }}</span>
                </router-link>
                <a href="#" class="mb-3"><i class="text-sky-700 text-2xl">...</i></a>
            </div>
            <!-- <a href="#"
                class="my-3 flex items-center overflow-hidden py-1 px-2 w-11/12 rounded-sm text-base text-sky-700"><i
                    class="bi bi-gear text-sky-700 text-2xl mr-3"></i><span>Settings</span></a> -->
                    <router-link :to="{ name: `Setting` }"
                    class="flex items-center overflow-hidden py-1 px-2 w-11/12 text-base rounded-2xl mt-2"
                    :class="[
                      2000 === activeIndex ? 'bg-sky-500 text-white rounded-sm': 'text-sky-700 hover:bg-sky-100 hover:text-sky-700'
                    ]" @click="updateActiveIndex(2000)">
                    <i class="bi bi-gear text-2xl mr-3"></i>
                    <span class="">Settings</span>
                </router-link>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    data() {
        return {
            sidebarToggle: true,
            sidebarTasks: [
                {
                    id: 1,
                    icon: "bi bi bi-people",
                    name: "Customer",
                    active: false,
                },
                {
                    id: 2,
                    icon: "bi bi-calendar",
                    name: "Schedule",
                    active: false,
                },
                // {
                //     id: 3,
                //     icon: "bi bi-earbuds",
                //     name: "Activity",
                //     active: false,
                // },
                // {
                //     id: 4,
                //     icon: "bi bi-currency-dollar",
                //     name: "Invoice",
                //     active: false,
                // },
                {
                    id: 5,
                    icon: "bi bi-person-badge",
                    name: "Employee",
                    active: false,
                },
                {
                    id: 6,
                    icon: "bi bi-server",
                    name: "Statistics",
                    active: false,
                },
            ],
        };
    },
    methods: {
        showToggle() {
            this.sidebarToggle = !this.sidebarToggle;
        },
        onClick() {
            this.sidebarTasks.active = true;
        },
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        },
    },
};
</script>

<style>
/* .bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
} */
/* @keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
} */
.active {
    background-color: black;
}
</style>
