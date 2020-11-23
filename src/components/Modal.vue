<template>
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">

            <div class="modal-header">
              <slot name="header">
                <span class="modal__descr">Title: </span>
                <h3 class="modal-header__title">{{item.title}}</h3>
              </slot>
            </div>

            <div class="modal-body">
              <slot name="body">
                <span class="modal__descr">Description: </span>
                <p class="modal-body__descr">{{item.description}}</p>
              </slot>
            </div>

            <div class="modal-footer">
              <slot name="footer">
                <button class="modal-default-button" @click="closeHandler">
                  Close
                </button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
</template>

<script>
export default {
  name: 'modal',
  props: {
    item: {
      type: Object,
      default: () => {{}}
    }
  },
  methods: {
    closeHandler() {
      this.$emit('close')
    }
  }
}
</script>

<style>
  .modal-mask {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: grid;
    transition: opacity 0.3s ease;
  }

  .modal-wrapper {
    display: block;
  }

  .modal-container {
    width: 300px;
    height: auto;
    margin: 100px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
  }

  .modal-header {
    margin-top: 0;
    font-weight: 600;
  }

  .modal__descr {
    font-weight: 300;
  }

  .modal-header__title {
    display: inline-block;
  }

  .modal-body {
    margin: 20px 0;
    font-weight: 600;
  }

  .modal-body__descr {
    white-space: pre-wrap;
    overflow: auto;
  }

  .modal-footer {
    text-align: right;
  }

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    transform: scale(1.1);
  }
</style>
