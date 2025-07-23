<script setup>
</script>

<template>
    <button class="button">
        <slot />
    </button>
</template>

<style scoped>
.button {
    padding: 14px;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;

    font-family: var(--font);
    font-size: 20px;
    font-weight: 600;
    color: var(--primary);
    border: none;
    border-radius: 10px;
    background: var(--gradient);
    cursor: pointer;
    transition: all 0.3s linear;
}

.button:hover,
.button:focus {
    background: var(--gradient-inverted);
}
</style>