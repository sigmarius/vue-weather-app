<script setup>
const { label = "Не задан", statistics } = defineProps({
    label: String,
    statistics: String
});
</script>

<template>
    <div class="statistics">
        <div class="statistics__name">{{ label }}</div>
        <div class="statistics__value">{{ statistics }}</div>
    </div>
</template>

<style scoped>
.statistics {
    display: flex;
    justify-content: space-between;
    gap: 20px;

    font-size: 28px;
}

.statistics__name {
    font-weight: 700;
}

.statistics__value {
    font-weight: 500;
}
</style>
