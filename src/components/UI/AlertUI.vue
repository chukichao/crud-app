<template>
  <div class="alert">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'alert-ui',
};
</script>

<style scoped lang="scss">
.alert {
  position: fixed;
  left: 0;
  bottom: 0;

  padding: 1rem 4rem;
  width: 400px;

  background: bisque;
  border: 2px solid #333;
  border-radius: 5px;
}
</style>
