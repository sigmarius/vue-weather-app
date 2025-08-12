<script setup>
    const props = defineProps({
        error: String        
    });
</script>

<template>
    <div class="error" v-if="props.error">
        {{ props.error }}
    </div>
</template>

<style scoped>
.error {
    margin: -60px 0 60px 0;
    padding: 15px;
    font-size: 18px; 
    text-align: center; 
    border-radius: 0 0 25px 25px;
    background-color: var(--color-bg-card);  
}
</style>