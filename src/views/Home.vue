<template>
  <div class="home">
    <div class="nav">
      <router-link
        to="/create-item"
        class="nav__link"
      >
        Add Item
      </router-link>
      <div class="nav-check">
        <input
          id="disabled"
          type="checkbox"
          v-model="enabled"
          class="nav-check__input"
        />
        <label
          class="nav-check__label"
          for="disabled"
        >
          DnD enabled
        </label>
      </div>
    </div>
    <div class="items-wrapper">

      <draggable
        :list="items"
        :disabled="!enabled"
        class="list-group"
        ghost-class="ghost"
        @start="dragging = true"
        @end="draggingEnd"
      >
        <Item
          v-for="(item, idx) of items"
          :key="idx"
          :item="item"
          :index="idx"
          @open="openModal"
        />
      </draggable>

      <Modal
        v-if="showModal"
        @close="closeModal"
        :item="items[currentItem]"
      />

    </div>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import Item from '../components/Item'
  import Modal from '../components/Modal'

  export default {
    name: 'home',
    components: {
      draggable,
      Item,
      Modal
    },
    data: () => ({
      items: [],
      enabled: true,
      dragging: false,
      showModal: false,
      currentItem: 0
    }),
    async mounted() {
      this.items = await this.$store.dispatch('GET_ITEMS')
    },
    methods: {
      draggingEnd() {
        this.$store.dispatch('RELOAD_ITEM', this.items)
        this.dragging = false
      },
      openModal(index) {
        this.showModal = true
        this.currentItem = index
      },
      closeModal() {
        this.showModal = false
      }
    }
  }
</script>

<style>
  .items-wrapper {
    max-width: 1000px;
    width: 100%;
    margin: 0 auto;
  }

  .nav {
    padding: 30px;
  }

  .nav__link {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
    display: inline-block;
    margin-bottom: 25px;
  }

  .nav__link:hover {
    color: #42b983;
  }

  .list-group {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-items: center;
  }

  .ghost {
    opacity: 0.5;
    background: #c8ebfb;
  }
</style>
