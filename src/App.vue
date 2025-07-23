<script setup>
import Button from './components/Button.vue';
import Statistics from './components/Statistics.vue';
import IconLocation from './components/icons/IconLocation.vue';

const data = {
  label: 'Влажность',
  statistics: '90%'
};
</script>

<template>
  <main class="main">
    <Statistics v-bind="data" />
    <Statistics statistics="0%" />
    <Button>
      <IconLocation />
      <span>Сохранить</span>
    </Button>
  </main>
</template>

<style scoped>
.main {
  padding: 60px;
  border-radius: 25px;
  background: var(--color-bg-main);
}
</style>
