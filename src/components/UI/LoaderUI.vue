<template>
  <div class="loader"></div>
</template>

<script>
export default {
  name: 'LoaderUI',
};
</script>

<style scoped lang="scss">
.loader {
  width: 50px;
  height: 50px;

  margin: 2rem auto;

  border: 4px dashed #333;
  border-radius: 50%;

  animation: rotate 2s infinite linear;

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
