<template>
  <Form @submit="onSubmit" :validation-schema="formSchema">
    <div class="mb-4 block">
      <label for="name" class="text-md text-slate-900 ml-0.5">Full name</label>
      <Field
        class="w-full text-md text-sky-900 border border-solid border-slate-300 rounded-md focus:border-sky-100 focus:border-1 focus:outline-0 outline-none placeholder:italic placeholder:text-sm placeholder:text-slate-400"
        :class="[formValue.name ? 'border-slate-300' : 'border-red-500']"
        v-model="formValue.name"
        name="name"
        type="text"
        placeholder="Enter full name"
      />
      <ErrorMessage class="text-sm text-red-500 italic ml-0.5" name="name" />
    </div>
    <div class="mb-4 block">
      <label for="" class="text-md text-slate-900 ml-0.5 block">Gender</label>
      <div class="flex items-center">
        <input
          checked
          class="border border-solid border-slate-400 outline-none"
          name="gender"
          type="radio"
          value="true"
          v-model="formValue.gender"
        /><span class="ml-2 mr-10">male</span>
        <input
          class="border border-solid border-slate-400"
          name="gender"
          type="radio"
          value="false"
          v-model="formValue.gender"
        /><span class="mx-2">female</span>
      </div>
      <ErrorMessage class="text-sm text-red-500 italic ml-0.5" name="gender" />
    </div>
    <div class="mb-4 block">
      <label for="contact" class="text-md text-slate-900 ml-0.5">Contact</label>
      <Field
        class="w-full text-md text-sky-900 border border-solid border-slate-300 rounded-md focus:border-sky-100 focus:border-1 focus:outline-0 outline-none placeholder:italic placeholder:text-sm placeholder:text-slate-400"
        :class="[formValue.phone ? 'border-slate-300' : 'border-red-500']"
        v-model="formValue.phone"
        name="contact"
        type="text"
        placeholder="Enter a phone number"
      />
      <ErrorMessage class="text-sm text-red-500 italic ml-0.5" name="contact" />
      <span
        v-if="checkContact.length"
        class="text-sm text-red-500 italic ml-0.5"
        >Contact already exists.</span
      >
    </div>
    <div class="mb-4 block">
      <label for="email" class="text-md text-slate-700 ml-0.5">Email</label>
      <Field
        class="w-full text-md text-sky-900 border border-solid border-slate-300 rounded-md focus:border-sky-100 focus:border-1 focus:outline-0 outline-none placeholder:italic placeholder:text-sm placeholder:text-slate-400"
        :class="[formValue.email ? 'border-slate-300' : 'border-red-500']"
        v-model="formValue.email"
        name="email"
        type="email"
        placeholder="Enter email address"
      />
      <ErrorMessage class="text-sm text-red-500 italic ml-0.5" name="email" />
      <span v-if="checkMail.length" class="text-sm text-red-500 italic ml-0.5"
        >E-mail already exists.</span
      >
    </div>
    <div class="mb-4 block">
      <label for="" class="text-md text-slate-900 ml-0.5 block">Position</label>
      <Select
        :options="positions"
        @update:modelValue="(value) => (formValue.position = value)"
      />
    </div>
    <div class="mb-4 block">
      <label for="" class="text-md text-slate-900 ml-0.5 block">Diplomas</label>
      <Select
        :options="diplomas"
        @update:modelValue="(value) => (formValue.diplomas = value)"
      />
    </div>
    <div class="flex flex-row items-center">
      <button
        class="py-2 px-6 rounded-md bg-sky-500 text-white border border-solid border-sky-500 hover:bg-sky-900"
      >
        Add
      </button>
      <div class="ml-8">
        <a
          @click="onCancel"
          class="py-2 px-8 rounded-md bg-white text-slate-700 border border-solid border-slate-500 box-border hover:bg-slate-500 hover:text-white cursor-pointer"
          >Cancel</a
        >
      </div>
    </div>
  </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import Select from "./Select.vue";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
    Select,
  },
  props: {
    positions: {
      type: Array,
      default: [],
    },
    diplomas: {
      type: Array,
      default: [],
    },
    employees: {
      type: Array,
      default: [],
    },
  },
  emits: ["cancel", "submit:form"],
  data() {
    const formSchema = yup.object().shape({
      name: yup
        .string()
        .required("Name needs to have value.")
        .min(2, "The name must be more than 2 characters.")
        .max(50, "The name must be less than 50 characters."),
      contact: yup
        .string()
        .matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, "Invalid phone number."),
      email: yup
        .string()
        .email("Incorrect E-mail.")
        .max(50, "E-mail must be less than 50 characters."),
    });
    return {
      formSchema,
      formValue: {
        name: "",
        gender: true,
        phone: "",
        email: "",
        position: "",
        diplomas: "",
      },
    };
  },
  computed: {
    employeesString() {
      return this.employees.map((employee, index) => {
        const { phone, email } = employee;
        console.log([phone, email].join(""));
        return [phone, email].join("");
      });
    },
    checkContact() {
      return this.employees.filter((employee, index) => {
        return this.employeesString[index].includes(this.formValue.phone);
      });
    },
    checkMail() {
      return this.employees.filter((employee, index) => {
        return this.employeesString[index].includes(
          this.formValue.email.toUpperCase()
        );
      });
    },
  },
  methods: {
    onCancel() {
      this.$emit("cancel", false);
    },
    updateModelValue() {
      console.log("abc");
    },
    onSubmit() {
      this.$emit("submit:form", this.formValue);
    },
  },
};
</script>
