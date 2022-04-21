<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useDesktopStore } from "@/stores/desktop";

const store = useDesktopStore();
const { programUrl } = storeToRefs(store);
</script>
<template>
    <div class="program-window" v-if="programUrl !== ''">
        <iframe :src="programUrl" frameborder="0"></iframe>
    </div>
</template>
<style lang="less" scoped>
iframe {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 300px;
    min-height: 700px;
    border: 1px solid #8c52ff;
}
</style>
