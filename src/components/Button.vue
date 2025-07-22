<script setup>
</script>

<template>
    <button class="button">
        <div>
            <slot name="blue" />
        </div>
        <small>
            <slot name="text" />
        </small>
        <slot />
    </button>
</template>

<style scoped>
    .button {
        padding: 14px;
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