<script setup>
import { ref } from 'vue';
import PanelRight from './components/PanelRight.vue';

// https://www.weatherapi.com/my/
// Weather API Key - 0453fef08fc540c38fd64830253107
const API_ENDPOINT = 'https://api.weatherapi.com/v1';

const API_KEY = '0453fef08fc540c38fd64830253107';

let rawData = ref();

// сюда будем записывать ошибки из API
let error = ref();

// индекс выбранного дня в списке
let activeIndex = ref(0);

async function handleSelectCity(city) {
  const params = new URLSearchParams({
    key: API_KEY,
    lang: 'ru',
    q: city,
    days: 4
  });

  const response = await fetch(`${API_ENDPOINT}/forecast.json?${params.toString()}`);

  if (response.status !== 200) {
    error.value = await response.json();

    rawData.value = null;

    console.log('error! ' + response.status);
    return;
  }

  error.value = null;
  rawData.value = await response.json();

  console.log('Weather data for', city, ':', rawData.value);
}
</script>

<template>
  <main class="main">
    <div class="left">

    </div>

    <div class="right">
      <PanelRight 
        :data="rawData" 
        :active-index 
        :error 
        @select-index="(index) => activeIndex = index" 
        @select-city="handleSelectCity"
      />
    </div>
  </main>
</template>

<style scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: center;
}

.left {
  width: 500px;
  height: 680px;
  border-radius: 30px;
  background-image: url('/public/left-bg.png');
  background-repeat: no-repeat;
  background-size: cover;
}

.right {
  padding: 60px;
  border-radius: 0 25px 25px 0;
  background: var(--color-bg-main);
}
</style>
