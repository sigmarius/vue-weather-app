<script setup>
import { computed, ref } from 'vue';

import Statistics from './Statistics.vue';
import CitySelect from './CitySelect.vue';
import Error from './Error.vue';
import DayCard from './DayCard.vue';

const { data, activeIndex, error } = defineProps({
  data: Object,
  activeIndex: Number,
  error: Object
});

const emit = defineEmits([
    'select-index',
    'select-city'
]);

const errorMap = new Map([
    [1006, "Указанный город не найден"]
]);

const errorDisplay = computed(() => {
    return errorMap.get(error?.error?.code)
});

let statisticsData = computed((prev) => {
    if (!data) {
        return;
    }

    return [
        {
            label: 'Влажность',
            statistics: data?.current?.humidity + ' %'
        },
        {
            label: 'Облачность',
            statistics: data?.current?.cloud + ' %'
        },
        {
            label: 'Ветер',
            statistics: data?.current?.wind_kph + ' км/ч'
        }
    ]
});
</script>

<template>
    <Error v-if="error" :error="errorDisplay" />

    <div v-if="data" class="cards">
        <div class="cards__statistics">
            <Statistics 
                v-for="item in statisticsData" 
                v-bind="item" 
                :key="item.label" />
        </div>

        <div class="cards__list">
            <DayCard 
                v-for="(item, index) in data?.forecast?.forecastday" 
                :key="item.date"
                :weather-code="item?.day?.condition?.code" 
                :date="new Date(item.date)"
                :temperature="item?.day?.avgtemp_c" 
                :is-active="activeIndex === index"
                @click="() => emit('select-index', index)" />
        </div>
    </div>

    <CitySelect />
</template>

<style scoped>
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