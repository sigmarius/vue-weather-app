<script setup>
import { onMounted, provide, ref, watch } from 'vue';
import { API_ENDPOINT, API_KEY, cityProvide } from './constants';
import PanelLeft from './components/PanelLeft.vue';
import PanelRight from './components/PanelRight.vue';

let rawData = ref();

// сюда будем записывать ошибки из API
let error = ref();

// индекс выбранного дня в списке
let activeIndex = ref(0);

let city = ref('Vladimir'); // отображается при загрузке приложения

// из корневого компонента пробрасываем значение в любой вложенный компонент, минуя ненужную вложенность
// работает также и для реактивных переменных
// используем символ из constants.js для уникальности
provide(cityProvide, city)

watch(city, () => {
  handleSelectCity(city.value);
});

onMounted(() => {
  handleSelectCity(city.value);
});

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
}
</script>

<template>
  <main class="main">
    <div class="left">
      <PanelLeft
        v-if="rawData"
        :dayData="rawData?.forecast?.forecastday[activeIndex]"  
      />
    </div>

    <div class="right">
      <PanelRight 
        :data="rawData" 
        :active-index 
        :error 
        @select-index="(index) => activeIndex = index" 
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
  background-image: url('/left-bg.png');
  background-repeat: no-repeat;
  background-size: cover;
}

.right {
  padding: 60px;
  border-radius: 0 25px 25px 0;
  background: var(--color-bg-main);
}
</style>
