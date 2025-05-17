<template>
  <h2>Create post</h2>
  <form class="form" @submit.prevent="createPost">
    <input-ui v-model.trim="post.title" placeholder="title" ref="title" />
    <input-ui v-model.trim="post.body" placeholder="description" />
    <button-ui>Сonfirm</button-ui>
  </form>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: '',
        body: '',
      },
    };
  },
  emits: ['create'],
  methods: {
    createPost() {
      if (!this.post.title || !this.post.body) {
        return;
      }

      this.post.id = Date.now();

      this.$emit('create', this.post);

      this.post = {
        title: '',
        body: '',
      };
    },
  },
  mounted() {
    this.$refs.title.getInputRef().focus();
  },
};
</script>

<style scoped lang="scss">
h2 {
  margin: 1rem 0;

  font-size: 30px;
}

.form {
  display: flex;
  flex-direction: column;

  input {
    &:focus {
      outline: 1px solid #333;
    }
  }

  button {
    align-self: flex-end;

    margin-top: 1rem;

    &:hover {
      background: bisque;
    }
  }
}
</style>
