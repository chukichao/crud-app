<template>
  <div v-if="isOpen" @click="$emit('toggle')" class="modal">
    <div @click.stop class="modal-content">
      <slot />

      <!-- <slot>...</slot> // в том числе с указанием значения по умолчанию -->

      <!-- <slot name="..."></slot> // по наименованию -->
      <!-- name="default" // значение по умолчанию -->

      <!-- $slots. ... // обращение к переданным слотам -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal-ui',
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  display: flex;

  background: rgba(0, 0, 0, 0.5);

  &-content {
    min-width: 300px;
    min-height: 50px;

    margin: auto;
    padding: 3rem 6rem;

    background-color: white;
    border: 1px solid #333;
    border-radius: 10px;
  }
}
</style>
