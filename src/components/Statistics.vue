<script setup>
</script>

<template>
    <div class="statistics">
        <div class="statistics__name">Влажность</div>
        <div class="statistics__value">90%</div>
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
