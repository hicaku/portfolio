<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useDesktopStore } from "@/stores/desktop";

const store = useDesktopStore();
const { getApps, programUrl } = storeToRefs(store);
</script>
<template>
    <div class="desktop-apps">
        <div class="desktop-apps__apps">
            <div
                class="desktop-apps__apps-item"
                v-for="app in getApps"
                :key="app.id"
                @click="app.url.trim() !== '' ? (programUrl = app.url) : null"
            >
                <div class="desktop-apps__apps-item-icon">
                    <img :src="app.icon" />
                </div>
                <div class="desktop-apps__apps-item-name">
                    <p>{{ app.name }}.{{ app.extention }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
.desktop-apps {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    &__apps {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        max-height: calc(100vh - 50px);
        width: 250px;
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
</style>
