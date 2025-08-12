<script setup>
import { onMounted, ref } from 'vue';
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

// состояние определяет, находимся ли мы в режиме редактирования
// по умолчанию - false, мы не редактируем город
const isEdited = ref(false);

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
        <div v-if="isEdited" class="city-input">
            <Input 
                v-focus 
                placeholder="Введите город" 
                v-model="city" 
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