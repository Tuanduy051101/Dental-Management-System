<script>
import NavbarScreen from "./components/NavbarScreen.vue";
import SideBarScreen from "./components/SidebarScreen.vue";
import FooterScreen from "./components/FooterScreen.vue";
import Login from "./views/Login.vue";
import LoginService from "./services/login.service";

export default {
  components: {
    NavbarScreen,
    SideBarScreen,
    FooterScreen,
    Login,
  },
  data() {
    return {
      activeIndex: -1,
      user: {},
      userList: [],
      checkLogin: false,
    };
  },
  watch: {
    user() {
      this.checkLoginF();
    }
  },
  methods: {
    async getAllAccounts() {
      try {
        this.userList = await LoginService.getAll();
      } catch (error) {
        console.log(error.message);
      }
    },
    checkLoginF() {
      for (var value of this.userList) {
        console.log(this.user);
        if(value.email.toLowerCase() == this.user.email && value.password.toLowerCase() == this.user.password) {
          this.checkLogin = true;
          break;
        }
      }
    }
  },
  created() {
    this.getAllAccounts();
  }
};
</script>

<template>
  <div class="w-full">
    <Login v-if="!checkLogin" @submit="value => user = value" />
    <div v-if="checkLogin" class="flex flex-row">
      <div class="basis-1/12 relative z-30">
        <SideBarScreen v-model:activeIndex="activeIndex" />
      </div>
      <div class="basis-11/12 relative w-11/12">
        <div class="fixed top-0 right-0 bg-white my-4 mr-4 shadow-md rounded-md z-20" style="width: 89.666667%;">
          <NavbarScreen @logout="value => checkLogin = value" />
        </div>
        <div class="mr-3 ml-3.5 bg__light mt-24 shadow-xl rounded-md z-10" style="width: 97.666667%;">
          <RouterView></RouterView>
        </div>
        <div class="mr-3 ml-3.5 bg__light mt-4 shadow-xl rounded-md z-10" style="width: 97.666667%;">
          <FooterScreen />
        </div>
      </div>
    </div>
  </div>
</template>
