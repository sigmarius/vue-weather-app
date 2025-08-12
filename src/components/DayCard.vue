<script setup>
import IconCloud from './icons/weather/IconCloud.vue';
import IconRain from './icons/weather/IconRain.vue';
import IconSun from './icons/weather/IconSun.vue';

const { weatherCode, temperature, date } = defineProps({
  weatherCode: Number,
  temperature: Number,
  date: Date
});
</script>

<template>
    <button class="card">
        <IconSun v-if="weatherCode === 1000" />
        <IconCloud v-if="weatherCode === 1189" />
        <IconRain v-if="weatherCode === 1063" />

        <div class="card__date">
            {{ date.toLocaleDateString('ru-RU', { weekday: 'short' }) }}
        </div>

        <div>
            <div class="card__temperature">
                {{ temperature }}&nbsp;°C
            </div>
        </div>
    </button>
</template>

<style scoped>
.card {
    padding: 20px 24px;
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
    
    font-family: var(--font);
    
    color: var(--color-primary);
    background-color: var(--color-bg-card);
    border: none;
    border-radius: 10px;
    box-shadow: 1px 2px 4px 0 var(--color-bg-main);

    cursor: pointer;
    transition: all 0.3s ease-in-out;
}

.card:hover {
    background-color: var(--color-bg-card-hover);
}

.card__date {
    font-size: 20px;
    font-weight: 400;
}

.card__temperature {
    font-size: 20px;
    font-weight: 700;
}
</style>