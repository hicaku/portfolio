<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useStore } from "@/stores/index";

const store = useStore();
const { program, isMinimized } = storeToRefs(store);
const { toggleMinimized, closeProgram, toggleFullscreen } = store;
</script>
<template>
    <div class="program-window" v-if="program?.url" v-show="!isMinimized">
        <div class="program-window__header">
            <span>{{ program.name }}</span>
            <div class="program-window__header-buttons">
                <button type="button" @click="toggleMinimized">-</button>
                <button type="button" @click="toggleFullscreen">+</button>
                <button type="button" @click="closeProgram">x</button>
            </div>
        </div>
        <iframe :src="program.url" frameborder="0"></iframe>
    </div>
</template>
<style lang="less" scoped>
.program-window {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-height: 780px;
    min-width: 300px;
    width: 70%;
    border-radius: 10px;
    &__header {
        height: 50px;
        width: 100%;
        background-color: #8c52ff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        font-size: 24px;
        font-weight: 700;
        span {
            width: 100%;
        }
        &-buttons {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            align-items: center;
            width: 100%;
            height: 100%;
            gap: 10px;
            button {
                width: 32px;
                height: 32px;
                border-radius: 5px;
                border: none;
                color: #000;
                background-color: #fff;
                font-size: 24px;
                line-height: 24px;
                cursor: pointer;
                transition: all 0.6s;
                &:hover {
                    color: #8c52ff;
                    background-color: #000;
                }
            }
        }
    }
    iframe {
        min-width: 300px;
        min-height: 750px;
        border: 1px solid #8c52ff;
        width: 100%;
    }
}
</style>
