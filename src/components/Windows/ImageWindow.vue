<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useStore } from "@/stores/index";

const store = useStore();
const { program, isFullscreen } = storeToRefs(store);
</script>
<template>
    <img
        :class="{ fullscreen: isFullscreen }"
        :src="program.name + '.' + program.extention"
        :alt="program.name"
    />
</template>
<style lang="less" scoped>
img {
    width: 100%;
    height: 100%;
    cursor: zoom-in;
    &.fullscreen {
        height: calc(100% - 50px);
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
