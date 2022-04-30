<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useStore } from "@/stores/index";

const store = useStore();
const { isFullscreen, folderPrograms } = storeToRefs(store);
const { openProgram } = store;
</script>
<template>
    <div class="folder-window" :class="{ fullscreen: isFullscreen }">
        <div class="folder-window__apps">
            <div
                class="folder-window__apps-item"
                v-for="app in (folderPrograms as any)"
                :key="app.id"
                @click="openProgram(app)"
            >
                <div class="folder-window__apps-item-icon">
                    <img :src="app.icon" />
                </div>
                <div class="folder-window__apps-item-name">
                    <p>
                        {{ app.name
                        }}{{ app.extention ? "." + app.extention : "" }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
.folder-window {
    width: 100%;
    height: auto;
    max-height: 750px;
    padding: 10px;
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;
    background: #333;
    &.fullscreen {
        height: calc(100% - 50px);
        max-height: calc(100% - 50px);
    }
    &__apps {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        &-item {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin: 10px;
            width: 100px;
            height: 100px;
            cursor: pointer;
            &-icon {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 70px;
                height: 70px;
                margin: 0 auto;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            &-name {
                display: flex;
                flex-direction: column;
                justify-content: center;
                width: 100%;
                p {
                    width: 100%;
                    height: 100%;
                    text-align: center;
                    word-break: break-word;
                }
            }
        }
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
