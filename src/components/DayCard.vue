<script setup>
import { computed } from 'vue';
import IconCloud from './icons/weather/IconCloud.vue';
import IconRain from './icons/weather/IconRain.vue';
import IconSun from './icons/weather/IconSun.vue';

const { weatherCode, temperature, date, isActive } = defineProps({
  weatherCode: Number,
  temperature: Number,
  date: Date,
  isActive: Boolean
});

const iconColor = computed(() => {
    return isActive
        ? 'var(--color-primary-inverted)'
        : 'var(--color-primary)';
});
</script>

<template>
    <button class="card" :class="{ active: isActive }">
        <IconSun 
            v-if="weatherCode <= 1003" 
            :color="iconColor"
        />
        <IconCloud 
            v-if="weatherCode >= 1006 && weatherCode < 1063" 
            :color="iconColor"
        />
        <IconRain 
            v-if="weatherCode >= 1063" 
            :color="iconColor"
        />

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

.active {
    color: var(--color-primary-inverted);
    background-color: var(--color-primary);
}

.card:not(.active):hover {
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