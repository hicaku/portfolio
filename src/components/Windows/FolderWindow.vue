<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useStore } from "@/stores/index";

const store = useStore();
const { program, isFullscreen } = storeToRefs(store);
</script>
<template>
    <div class="folder-window" :class="{ fullscreen: isFullscreen }"></div>
</template>
<style lang="less" scoped>
.folder-window {
    width: 100%;
    height: auto;
    max-height: 750px;
    &.fullscreen {
        height: calc(100% - 50px);
        max-height: calc(100% - 50px);
    }
}
@media screen and (max-width: 768px) {
    .folder-window {
        &.fullscreen {
            height: calc(100% - 60px);
        }
    }
}
</style>
