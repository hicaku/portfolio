<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useStore } from "@/stores/index";

const store = useStore();
const { program } = storeToRefs(store);
</script>
<template>
    <img :src="program.name + '.' + program.extention" :alt="program.name" />
</template>
<style lang="less" scoped>
img {
    max-height: 700px;
    width: 100%;
    height: 100%;
    cursor: zoom-in;
}
</style>
