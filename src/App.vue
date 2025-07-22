<script setup>
import Button from './components/Button.vue';
import Statistics from './components/Statistics.vue';
</script>

<template>
  <main class="main">
    <Statistics />
    <Button>Сохранить</Button>
  </main>

</template>

<style scoped>
.main {
  padding: 60px;
  border-radius: 25px;
  background: var(--color-bg-main);
}
</style>
