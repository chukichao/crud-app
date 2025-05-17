<template>
  <h2>Update post</h2>
  <form class="form" @submit.prevent="updatePost">
    <div>
      <h3>Title:</h3>
      <textarea v-model.trim="post.title" placeholder="title" ref="title" />
    </div>

    <div>
      <h3>Body:</h3>
      <textarea v-model.trim="post.body" placeholder="description" />
    </div>

    <button-ui>Сonfirm</button-ui>
  </form>
</template>

<script>
export default {
  props: {
    title: String,
    body: String,
    id: Number,
  },

  emits: ['update', 'toggle'],

  data() {
    return {
      post: {
        title: '',
        body: '',
      },
    };
  },

  methods: {
    updatePost() {
      if (!this.post.title || !this.post.body) {
        return;
      }

      this.$emit('update', this.id, this.post);

      this.post = {
        title: '',
        body: '',
      };

      this.$emit('toggle');
    },
  },

  mounted() {
    this.post.title = this.title;
    this.post.body = this.body;

    this.$refs.title.focus();
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

  textarea {
    margin: 0.5rem;
    resize: horizontal;

    min-width: 500px;
    min-height: 100px;

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
