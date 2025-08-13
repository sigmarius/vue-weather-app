<script setup>
import { computed, inject } from 'vue';
import { cityProvide } from '../constants';
import IconLocation from './icons/IconLocation.vue';
import IconSun from './icons/weather/IconSun.vue';
import IconCloud from './icons/weather/IconCloud.vue';
import IconRain from './icons/weather/IconRain.vue';

const { dayData } = defineProps({
    dayData: Object
});

// получаем город из корневого компонента
// используем символ из constants.js для уникальности
const city = inject(cityProvide);

const day = computed(() => {
    return new Date(dayData.date).toLocaleDateString('ru-RU', {
        weekday: 'long'
    });
});

const date = computed(() => {
    return new Date(dayData.date).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
});

const weatherCode = computed(() => {
    return dayData?.day?.condition?.code
});
</script>

<template>
    <div class="panel-left">
        <div>
            <div class="panel-left__day">{{ day }}</div>
            <div class="panel-left__date">{{ date }}</div>

            <div class="panel-left__city">
                <IconLocation />
                {{ city }}
            </div>
        </div>

        <div>
            <div class="panel-left__weather-icon">
                <IconSun 
                    v-if="weatherCode <= 1003" 
                    :size="95" 
                />
                <IconCloud 
                    v-if="weatherCode >= 1006 && weatherCode < 1063" 
                    :size="95" 
                />
                <IconRain 
                    v-if="weatherCode >= 1063" 
                    :size="95" 
                />
            </div>

            <div class="panel-left__temperature">
                {{ dayData?.day?.avgtemp_c }}
            </div>
            <div class="panel-left__condition">
                {{ dayData?.day?.condition?.text }}
            </div>
        </div>
    </div>
</template>

<style scoped>
.panel-left {
    height: 100%;
    padding: 48px 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.panel-left__day {
    margin-bottom: 16px;
    font-size: 37px;
    font-weight: 700;
    text-transform: capitalize;
}

.panel-left__date {
    margin-bottom: 10px;
    font-size: 22px;
    font-weight: 500;
}

.panel-left__city {
    display: flex;
    gap: 8px;
    align-items: center;
    text-transform: capitalize;
}

.panel-left__weather-icon {
    margin: 25px;
}

.panel-left__temperature {
    margin-bottom: 9px;
    font-size: 50px;
    font-weight: 700;
}

.panel-left__condition {
    font-size: 30px;
    font-weight: 700;
}
</style>