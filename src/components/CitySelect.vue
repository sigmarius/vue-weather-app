<script setup>
import { onMounted, onWatcherCleanup, ref, watch, watchEffect } from 'vue';
import Button from './Button.vue';
import IconLocation from './icons/IconLocation.vue';
import Input from './Input.vue';

const emit = defineEmits({
    selectCity(payload) {
        console.log('Validating payload', payload);
        return payload;
    }
});

let city = ref('Vladimir');

// onUpdated срабатывает при любом изменении компонента
// чтобы следить за изменением конкретного реактивного свойства, используем watch
// свойство city будет отслеживаться, и при его изменении будет вызываться колбек => оно передается первым аргументом
// колбек передается вторым аргументом, и в нем будет функция, которая исполняется при изменении первого аргумента
// третий аргумент - опции, здесь мы указываем immediate: true, чтобы колбек сработал сразу при создании компонента
// похоже на computed, но здесь мы не создаем новое реактивное свойство, а просто следим за изменением существующего, и делаем что-то при этом
watch(city, (newValue, oldValue) => {
    console.log('City changed from', oldValue, 'to', newValue);

    // очистка предыдущего состояния city, когда city изменится
    onWatcherCleanup(() => {
        console.log('Cleanup for city watcher');
    });
}, {
    immediate: true, // срабатывает сразу при создании компонента, независимо от изменений city
    once: true // срабатывает только один раз, а потом не будет отслеживать все изменения. Используется не так часто
});

// состояние определяет, находимся ли мы в режиме редактирования
// по умолчанию - false, мы не редактируем город
const isEdited = ref(false);

// watchEffect позволяет отслеживать не одно свойство, а сразу несколько реактивных переменных
// принимает сразу колбек функцию, не принимает аргументы с названиями переменных
// любая реактивная переменная, которая используется внутри этой функции, будет отслеживаться
// часто используется при получении данных с сервера, когда нужно следить за несколькими переменными
// если в дальнейшем нужно остановить отслеживание, то нужно сохранить результат вызова watchEffect в переменную, например, unwatch, и вызвать ее
const unwatch = watchEffect(() => {
    console.log('Watch effect Current city:', city.value);
    console.log('Watch effect Is edited:', isEdited.value);
});

// вызываем переменную, в которой сохранен результат вызова watchEffect, чтобы остановить отслеживание
unwatch(); // остановка отслеживания, если нужно

onMounted(() => {
    console.log('CitySelect component mounted');
    emit('selectCity', city.value);
});

function selectCity() {
    isEdited.value = false;

    emit('selectCity', city.value);
}

function edit() {
    isEdited.value = true;
}
</script>

<template>
    <div class="city-select">
        <div v-show="isEdited" class="city-input">
            <Input 
                placeholder="Введите город" 
                v-model="city" 
                @keyup.enter="selectCity()" 
            />
            <Button @click="selectCity()">
                Сохранить
            </Button>
        </div>

        <Button v-show="!isEdited" @click="edit()">
            <IconLocation />
            Изменить город
        </Button>
    </div>
</template>

<style scoped>
.city-select {
    width: 100%;
}

.city-input {
    display: flex;
    gap: 12px;
}
</style>