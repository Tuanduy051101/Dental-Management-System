<template>
    <Form @submit="onSubmit" :validation-schema="formSchema" v-slot="{errors}">
        <div class="mb-4 block">
        <label for="patient" class="text-md text-slate-900 ml-0.5">Patient</label>
        <Field disabled
          class="w-full text-md text-sky-900 border border-solid border-slate-300 rounded-md focus:border-sky-100 focus:border-1 focus:outline-0 outline-none placeholder:italic placeholder:text-sm placeholder:text-slate-400"
          v-model="formValue.patientName"
          name="patient"
          type="text"
        />
      </div>
      <div class="mb-4 block">
        <label for="expression" class="text-md text-slate-900 ml-0.5">Expression</label>
        <Field
          class="w-full text-md text-sky-900 border border-solid border-slate-300 rounded-md focus:border-sky-100 focus:border-1 focus:outline-0 outline-none placeholder:italic placeholder:text-sm placeholder:text-slate-400"
          :class="[formValue.expression ? 'border-slate-300' : 'border-red-500']"
          v-model="formValue.expression"
          name="expression"
          type="text"
          placeholder="Enter customer's expression"
        />
        <ErrorMessage class="text-sm text-red-500 italic ml-0.5" name="expression" />
      </div>
      <div class="mb-4 block">
        <label for="" class="text-md text-slate-900 ml-0.5 block">Dentist</label>
        <Select
          :options="schedule"
          @update:modelValue="(value) => (formValue.scheduleWork = value)"
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
      schedule: {
        type: Array,
        default: [],
      },
      formValue: {
        type: Object,
        default: {},
      }
    },
    emits: ["cancel", "submit:form"],
    data() {
      const formSchema = yup.object().shape({
        expression: yup
          .string()
          .required("The expression needs to have value.")
      });
      return {
        formSchema,
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
        this.$emit("submit:form", true);
      },
    },
  };
  </script>
  