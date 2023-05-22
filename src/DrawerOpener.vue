<template>
    <slot :open="open"/>
</template>

<script setup>
import {inject, onBeforeUnmount} from "vue";

const openDrawer = inject('openDrawer')
const closeDrawer = inject('closeDrawer')
const props = defineProps({
    props: Object,
    component: {required: true},
    componentProps: {required: true},
    componentContext: {required: false},
    footer: {type: Boolean, default: false},
    closeOnDestroy: {type: Boolean, default: true},
})

const open = () => openDrawer(props)
onBeforeUnmount(() => props.closeOnDestroy && closeDrawer())
</script>