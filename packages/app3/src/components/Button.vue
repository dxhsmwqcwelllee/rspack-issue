<template>
  <button class="shared-button" @click="handleClick">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'SharedButton',
  props: {
    text: {
      type: String,
      default: 'Click me'
    }
  },
  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>

<style scoped>
.shared-button {
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.shared-button:hover {
  background-color: #45a049;
}
</style>
