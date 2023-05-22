<template>
    <slot/>
</template>

<script setup>
import {computed, provide, watchEffect} from 'vue'

const props = defineProps({context: Object})

watchEffect(() => {
    if (props.context)
        for (const name in props.context) {
            provide(name, computed(() => props.context[name]))
        }
})
</script>

<style scoped>

</style>