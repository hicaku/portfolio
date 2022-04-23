<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useStore } from "@/stores/index";
import SetupWindow from "@/components/Windows/SetupWindow.vue";
import ImageWindow from "@/components/Windows/ImageWindow.vue";

const store = useStore();
const { program, isMinimized, isFullscreen } = storeToRefs(store);
const { toggleMinimized, closeProgram, toggleFullscreen } = store;
</script>
<template>
    <div
        class="program-window"
        v-if="program?.type"
        v-show="!isMinimized"
        :class="{ fullscreen: isFullscreen }"
    >
        <div class="program-window__header">
            <span>{{ program.name }}</span>
            <div class="program-window__header-buttons">
                <button type="button" @click="toggleMinimized">
                    <img src="minimize.png" alt="Minimize" />
                </button>
                <button type="button" @click="toggleFullscreen">
                    <img
                        v-if="!isFullscreen"
                        src="maximize.png"
                        alt="Maximize"
                    />
                    <img v-else src="maximized.png" alt="Maximized" />
                </button>
                <button type="button" @click="closeProgram">
                    <img src="close.png" alt="Close" />
                </button>
            </div>
        </div>
        <iframe
            v-if="program.type === 'project'"
            :src="program.url"
            frameborder="0"
        ></iframe>
        <SetupWindow v-if="program.type === 'setup'" />
        <ImageWindow v-if="program.type === 'photo'" />
        <div class="text-editor" v-if="program.type === 'text'">TEXTTEXT</div>
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
    &.fullscreen {
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        transform: translate(0, 0);
        border-radius: 0;
        iframe {
            height: calc(100% - 110px);
        }
    }
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
                img {
                    width: 16px;
                    height: 16px;
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
@media screen and (max-width: 1024px) {
    .program-window {
        width: 70%;
        height: 400px;
        min-height: 400px;
        transform: translate(-50%, -100%);
        iframe {
            min-height: 500px;
        }
    }
}
@media screen and (max-width: 768px) {
    .program-window {
        width: 70%;
        height: 300px;
        min-height: 300px;
        transform: translate(-50%, -100%);
        &__header {
            height: 60px;
            &-buttons {
                button {
                    width: 32px;
                    height: 32px;
                    font-size: 24px;
                    line-height: 24px;
                }
            }
        }
    }
}
</style>
