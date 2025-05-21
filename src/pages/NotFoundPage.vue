<template>
  <div class="notFount">
    <h2>This page was not found</h2>
    <RouterLink to="/">Go home</RouterLink>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.notFount {
  text-align: center;

  h2 {
    margin: 2rem;
  }

  a {
    text-decoration: none;
    color: inherit;
    font-size: 30px;
  }
}
</style>
