<template>
    <teleport v-if="drawerLoaded && drawerFooter" :to="`#${drawerFooterId}`">
        <slot/>
    </teleport>
</template>

<script setup>
import { inject } from "vue";

const drawerLoaded = inject('drawerLoaded')
const drawerFooter = inject('drawerFooter')
const drawerFooterId = inject('drawerFooterId')
</script>