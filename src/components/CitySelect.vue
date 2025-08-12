<script setup>
import { inject, ref } from 'vue';
import Button from './Button.vue';
import IconLocation from './icons/IconLocation.vue';
import Input from './Input.vue';

// состояние определяет, находимся ли мы в режиме редактирования
// по умолчанию - false, мы не редактируем город
const isEdited = ref(false);

function selectCity() {
    isEdited.value = false;

    city.value = inputValue.value;
}

function edit() {
    isEdited.value = true;
}

// получаем город из корневого компонента
const city = inject('city');

// связываем с input, передавая туда начальное значение города
const inputValue = ref(city.value);
</script>

<template>
    <div class="city-select">
        <div v-if="isEdited" class="city-input">
            <Input 
                v-focus 
                placeholder="Введите город" 
                v-model="inputValue" 
                @keyup.enter="selectCity()" 
            />
            <Button @click="selectCity()">
                Сохранить
            </Button>
        </div>

        <Button v-else @click="edit()">
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