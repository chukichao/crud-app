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

  width: 400px;

  padding: 1rem 2rem;

  background: bisque;
  border: 2px solid #333;
  border-radius: 5px;
}
</style>
