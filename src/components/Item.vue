<template>
  <div class="item" @click="openHandler">
    <h2 class="item__title">{{item.title}}</h2>
    <p class="item__descr">{{item.description}}</p>
  </div>
</template>

<script>
  export default {
    name: 'item',
    props: {
      item: {
        type: Object,
        default: () => {
          {
          }
        }
      },
      index: {
        type: Number,
        required: true
      }
    },
    methods: {
      openHandler() {
        this.$emit('open', this.index)
      }
    }
  }
</script>

<style>
  .item {
    max-width: 200px;
    width: 100%;
    height: auto;
    margin: 0 40px 20px 0;
    border: 1px solid #000;
    cursor: pointer;
  }

  .item__descr,
  .item__title {
    white-space: nowrap;
    overflow: hidden;
    padding: 5px 10px;
    text-overflow: ellipsis;
  }
</style>
