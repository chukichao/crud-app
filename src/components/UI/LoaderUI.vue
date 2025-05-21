<template>
  <div class="loader"></div>
</template>

<script>
export default {
  name: 'loader-ui',
};
</script>

<style scoped lang="scss">
.loader {
  width: 50px;
  height: 50px;

  border: 4px dashed #333;
  border-radius: 50%;

  animation: rotate 2s infinite linear;

  margin: 2rem auto;

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
