<template>
  <div class="modal" @click="uiStore.closeModal">
    <div class="modal-body" @click.stop>
      <slot />
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia';
import { useUIStore } from '../../store/UIStore.js';

export default {
  name: 'ModalUI',

  computed: {
    ...mapStores(useUIStore),
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

  text-align: center;

  &-body {
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
