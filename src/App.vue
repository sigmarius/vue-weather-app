<script setup>
import { computed, ref } from 'vue';
import Statistics from './components/Statistics.vue';
import CitySelect from './components/CitySelect.vue';
import Error from './components/Error.vue';
import DayCard from './components/DayCard.vue';

// https://www.weatherapi.com/my/
// Weather API Key - 0453fef08fc540c38fd64830253107
const API_ENDPOINT = 'https://api.weatherapi.com/v1';

const API_KEY = '0453fef08fc540c38fd64830253107';

let rawData = ref();

// сюда будем записывать ошибки из API
let error = ref();

const errorMap = new Map([
  [1006, "Указанный город не найден"]
]);

const errorDisplay = computed(() => {
  return errorMap.get(error.value?.error?.code)
});

// индекс выбранного дня в списке
let activeIndex = ref(0);

let data = computed((prev) => {
  if (!rawData.value) {
      return [];
  }

  return [
    {
      label: 'Влажность',
      statistics: rawData.value.current.humidity + ' %'
    },
    {
      label: 'Облачность',
      statistics: rawData.value.current.cloud + ' %'
    },
    {
      label: 'Ветер',
      statistics: rawData.value.current.wind_kph + ' км/ч'
    }
  ]
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

  console.log('Weather data for', city, ':', rawData.value);
}
</script>

<template>
  <main class="main">
    <Error :error="errorDisplay" />

    <div v-if="data" class="cards">
      <div class="cards__statistics">
        <Statistics 
          v-for="item in data" 
          v-bind="item" 
          :key="item.label" 
        />
      </div>

      <div class="cards__list">
        <DayCard 
          v-for="(item, index) in rawData?.forecast?.forecastday" 
          :key="item.date"
          :weather-code="item?.day?.condition?.code" 
          :date="new Date(item.date)" 
          :temperature="item?.day?.avgtemp_c"
          :is-active="activeIndex === index"   
          @click="() => activeIndex = index"   
        />
      </div>
    </div>

    <CitySelect @select-city="handleSelectCity" />
  </main>
</template>

<style scoped>
.main {
  padding: 60px;
  border-radius: 25px;
  background: var(--color-bg-main);
}

.cards {
  margin-bottom: 70px;
  display: flex;
  flex-direction: column;
  gap: 80px;
}

.cards__statistics {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cards__list {
  display: flex;
  gap: 1px;
}
</style>
