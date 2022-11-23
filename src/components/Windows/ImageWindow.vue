<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useStore, images } from "@/stores/index";

const store = useStore();
const { program, isFullscreen } = storeToRefs(store);
</script>
<template>
    <img
        :class="{ fullscreen: isFullscreen }"
        :src="images[program.name]"
        :alt="program.name"
    />
</template>
<style lang="less" scoped>
img {
    width: 100%;
    height: auto;
    max-height: 750px;
    cursor: zoom-in;
    &.fullscreen {
        height: calc(100% - 50px);
        max-height: calc(100% - 50px);
    }
}
@media screen and (max-width: 768px) {
    img {
        &.fullscreen {
            height: calc(100% - 60px);
        }
    }
}
</style>
