<script setup>
const data = defineModel({
    type: String,
    required: true,
    default: 'Some default value'
});

</script>

<template>
    <input type="text" class="input" v-model="data" />
</template>

<style scoped>
.input {
    max-width: 260px;
    height: 53px;
    padding: 15px 20px;

    font-size: 18px;
    color: var(--color-primary);
    border: none;
    border-radius: 10px;
    background-color: var(--color-bg-card);
    box-shadow: 1px 2px 4px 0 var(--color-bg-main);
}

.input::placeholder {
    color: var(--color-placeholder);
}
</style>