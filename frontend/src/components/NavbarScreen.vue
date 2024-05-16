<template>
  <div class="flex flex-row items-center">
    <div class="basis-1/2">
      <!-- <form action="" class="relative ml-2">
        <span class="absolute inset-y-0 left-0 flex items-center pl-2">
          <i class="bi bi-search text-sky-700"></i>
        </span>
        <input type="search" name="search" id="search" placeholder="Search for anything..."
          class="py-2 pl-9 pr-3 w-full border-solid border-b-2 border-t-0 border-r-0 border-l-0 border-sky-500 placeholder:italic placeholder:text-sm placeholder:text-slate-400 block focus:rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1" />
      </form> -->
      <span class="text-blue-500 text-4xl mt-5 ml-2" style="letter-spacing: 4px; font-family: 'Monofett', cursive;">DENTAL MANAGERMENT SYSTEM</span>
    </div>
    <div class="basis-1/4">
      <!-- task -->
      <div class="flex justify-end">
        <a class="items-center group pl-2 border hover:bg-sky-500 py-2 pr-2 rounded-sm">
          <i class="bi bi-moon-stars text-sky-700 text-xl group-hover:text-white"></i>
        </a>
        <a class="items-center group pl-2 border hover:bg-sky-500 py-2 pr-2 rounded-sm">
          <i class="bi bi bi-bell text-sky-700 text-xl group-hover:text-white"></i>
        </a>
        <a class="items-center group pl-2 border hover:bg-sky-500 py-2 pr-2 rounded-sm">
          <i class="bi bi-grid-3x3-gap text-sky-700 text-xl group-hover:text-white"></i>
        </a>
      </div>
      <!-- dropdown -->
      <!-- <div class="absolute h-auto top-16 bg-white right-72 mr-5 rounded-sm">
        a
      </div> -->
    </div>
    <div class="basis-1/4">
      <!-- user -->
      <div @click="showUsers" class="group flex justify-end items-center overflow-hidden my-1 cursor-pointer"
        id="menu-button" aria-expanded="true" aria-haspopup="true">
        <img class="shrink-0 h-12 w-12 rounded-full"
          src="https://cdn.pixabay.com/photo/2022/05/15/13/38/woman-7198072__340.jpg" alt="" />
        <div class="ml-3 mr-2">
          <p class="text-base font-medium text-sky-700">Tran Tuan Duy</p>
          <p class="text-xs font-medium text-slate-500 group-hover:italic">
            Admin
          </p>
        </div>
      </div>
      <!-- dropdown -->
      <div v-if="usersToggle" class="absolute h-auto w-40 top-16 bg-white right-0 mr-2 shadow-lg rounded-sm" role="menu"
        aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
        <div class="border border-solid border-sky-200 border-t-0 border-r-0 border-l-0">
          <a class="flex items-center p-2 text-sky-700 hover:bg-sky-500 text-sm hover:text-white">
            <span class="material-symbols-outlined ml-5 mr-5 text-xl mt-0.5">
              contact_page
            </span>
            <span>Profile</span>
          </a>
          <a class="flex items-center p-2 text-sky-700 hover:bg-sky-500 text-sm hover:text-white">
            <span class="material-symbols-outlined ml-5 mr-5 text-xl mt-0.5">
              inbox
            </span>
            <span>Inbox</span>
          </a>
          <a class="flex items-center p-2 text-sky-700 hover:bg-sky-500 text-sm hover:text-white">
            <span class="material-symbols-outlined ml-5 mr-5 text-xl mt-0.5">
              task
            </span>
            <span>Task</span>
          </a>
          <a class="flex items-center p-2 text-sky-700 hover:bg-sky-500 text-sm hover:text-white">
            <span class="material-symbols-outlined ml-5 mr-5 text-xl mt-0.5">
              chat
            </span>
            <span>Chat</span>
          </a>
        </div>
        <a class="flex items-center p-2 text-sky-700 hover:bg-sky-500 text-sm hover:text-white">
          <span class="material-symbols-outlined ml-5 mr-5 text-xl mt-0.5">
            settings
          </span>
          <span>Setting</span>
        </a>
        <a @click="logout()" class="flex items-center p-2 text-sky-700 hover:bg-sky-500 text-sm hover:text-white">
          <i class="bi bi-box-arrow-in-right ml-5 mr-5 text-lg mt-0.5"></i>
          <span>Logout</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usersToggle: false,
    };
  },
  methods: {
    showUsers() {
      this.usersToggle = !this.usersToggle;
    },
    logout() {
      this.$emit('logout', false);
    }
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Monofett&family=Rubik+Microbe&family=Tiro+Tamil&display=swap');
</style>

