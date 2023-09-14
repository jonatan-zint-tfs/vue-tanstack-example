<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    modelValue: string | number
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | number): void
}>()
console.log(`Editable cell with ${props.modelValue} rerendered`)
const value = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit('update:modelValue', value)
    }
})
</script>
<template>
    <input v-model="value">
</template>