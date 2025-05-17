<template>
  <div>
    <!-- <input v-model="inputValue" @keydown.enter="addNewNote" /> -->
    <input @keydown.enter="addNewNote" ref="inputValue" />

    <ul v-if="notes.length > 0">
      <li
        v-for="(note, i) of notes"
        :key="note.id"
        @click="removeNote(note), printIndex(i)"
      >
        {{ note.body }}
      </li>
    </ul>

    <h2 v-else>No notes</h2>
  </div>
</template>

<!-- v-on:click="..." / @click="..." -->

<!-- v-bind:...="..." / :...="..." -->

<!-- v-for="... in ..." / v-for="... of ..." -->
<!-- v-for="(..., idx) in ..." -->

<!-- v-if v-else-if v-else -->
<!-- v-show -->

<!-- v-text="..." -->
<!-- v-html="..." -->

<!-- v-pre -->

<!-- v-once -->

<!-- v-cloak -->
<!-- <style>
[v-cloak] {
  display: none;
}
</style> -->

<script>
export default {
  data() {
    return {
      inputValue: '',
      notes: [],
    };
  },
  methods: {
    addNewNote() {
      if (this.$refs.inputValue.value === '') {
        return;
      }

      const newNote = {
        id: Date.now(),
        body: this.$refs.inputValue.value.trim(),
      };

      this.notes.push(newNote);
      this.$refs.inputValue.value = '';
    },
    removeNote({ id }) {
      this.notes = this.notes.filter((note) => note.id !== id);
    },
    printIndex(index) {
      console.log(index);
    },
  },
};
</script>

<style></style>
