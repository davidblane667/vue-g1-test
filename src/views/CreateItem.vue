<template>
  <form
    class="form"
    @submit.prevent="submitHandler"
  >
    <div class="form-row">
      <label class="form-row__label">Enter title:</label>
      <input
        class="form-row__input"
        type="text"
        v-model="title"
        :class="{'invalid': invalidTitle}"
      >
    </div>
    <div class="form-row">
      <label class="form-row__label">Enter description:</label>
      <textarea
        class="form-row__textarea"
        v-model="description"
        :class="{'invalid': invalidDescr}"
      ></textarea>
    </div>
    <div class="form-row form-row_space-between">
      <button
        type="submit"
        class="form-row__button"
      >
        Add
      </button>
      <router-link
        to="/"
        class="form-row__link"
      >
        Cancel
      </router-link>
    </div>
  </form>
</template>

<script>
  import {required} from 'vuelidate/lib/validators'

  export default {
    name: 'create-item',
    data: () => ({
      title: '',
      description: ''
    }),
    validations: {
      title: {
        required
      },
      description: {
        required
      }
    },
    methods: {
      async submitHandler() {
        this.$v.$touch()
        if (!this.$v.$invalid) {
          await this.$store.dispatch('ADD_ITEM', {
            title: this.title,
            description: this.description
          })
          await this.$router.push('/')
        }
      }
    },
    computed: {
      invalidTitle() {
        return (this.$v.title.$dirty && !this.$v.title.required)
      },
      invalidDescr() {
        return (this.$v.description.$dirty && !this.$v.description.required)
      }
    }
  }
</script>

<style>
  .form {
    max-width: 500px;
    width: 100%;
    margin: 100px auto 0;
    border: 1px solid #000;
    border-radius: 25px;
    padding: 15px 30px;
    text-align: center;
  }

  .form-row {
    text-align: left;
    margin-bottom: 40px;
  }

  .form-row_space-between {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .form-row__label {
    display: block;
    margin-bottom: 5px;
  }

  .form-row__input {
    width: 100%;
    min-height: 20px;
    border: 2px solid #2c3e50;
    border-radius: 5px;
    outline: none;
  }

  .form-row__input:focus,
  .form-row__textarea:focus {
    border: 2px solid #42b983;
  }

  .form-row__textarea {
    width: 100%;
    height: 200px;
    resize: none;
    border: 2px solid #2c3e50;
    border-radius: 5px;
    outline: none;
  }

  .form-row__button {
    max-width: 100px;
    width: 100%;
    padding: 5px 10px;
    background-color: #42b983;
    border: 2px solid transparent;
    border-radius: 10px;
    text-align: center;
    color: #fff;
    cursor: pointer;
    outline: none;
  }

  .form-row__button:hover {
    border-color: #2c3e50;
  }

  .form-row__link {
    text-decoration: none;
    color: #ccc;
  }

  .form-row__link:hover {
    color: #6D6B6E;
  }

  .invalid {
    border: 2px solid red;
  }
</style>
