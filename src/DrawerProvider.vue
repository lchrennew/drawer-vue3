<template>
    <a-drawer
            v-model:open="drawerVisible"
            v-bind="{...defaultProps, ...drawer, ...drawerProps}"
            @afterOpenChange="visible=>drawerLoaded=visible"
    >
        <component-context :context="drawerComponentContext">
            <component :is="drawerComponent" v-bind="drawerComponentProps|| {}"/>
        </component-context>
        <template v-if="drawerFooter" #footer>
            <div :id="drawerFooterId"/>
        </template>
    </a-drawer>
    <div ref="container" :class="docked" class="drawer-container">
        <slot :close="closeDrawer"/>
    </div>
</template>

<script setup>
import {computed, provide, ref, shallowRef} from 'vue'
import {generateObjectID} from "es-object-id";
import ComponentContext from "./ComponentContext.vue";

const props = defineProps({
    drawer: Object,
    docked: Boolean,
})

const container = ref()
const defaultProps = {
    width: 600, destroyOnClose: true,
    ...(props.docked ? {
        getContainer: () => container.value,
        style: {
            position: 'absolute',
        }
    } : {})
}

const drawerProps = ref(null)
const drawerVisible = ref(false)
const drawerComponent = shallowRef(null)
const drawerComponentProps = ref(null)
const drawerComponentContext = shallowRef(null)
const drawerFooterId = `drawer-footer-${generateObjectID()}`
const drawerFooter = shallowRef(false)
const drawerLoaded = ref(false)

const openDrawer = ({props, component, componentProps, componentContext, footer = false}) => {
    drawerProps.value = props
    drawerComponent.value = component
    drawerComponentProps.value = componentProps
    drawerComponentContext.value = componentContext ?? {}
    drawerVisible.value = true
    drawerFooter.value = footer
}

const closeDrawer = () => drawerVisible.value = false

provide('openDrawer', openDrawer)
provide('closeDrawer', closeDrawer)
provide('drawerFooterId', drawerFooterId)
provide('drawerLoaded', computed(() => drawerLoaded.value))
provide('drawerFooter', computed(() => drawerFooter.value))

</script>

<style scoped lang="less">
.drawer-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
}

[id^='drawer-footer-'] {
  text-align: right;
}
</style>
