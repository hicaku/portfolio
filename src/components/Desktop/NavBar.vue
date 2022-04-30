<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useStore } from "@/stores/index";

const store = useStore();
const { searchQuery, program, currentTime, currentDate } = storeToRefs(store);
const { toggleMinimized, getCurrentTime } = store;
setInterval(getCurrentTime, 5000);
</script>
<template>
    <div class="navbar">
        <img class="navbar__logo" src="@/assets/images/start.png" alt="Logo" />
        <div class="navbar__search">
            <img
                class="navbar__search-icon"
                src="@/assets/images/search-icon.png"
                alt="Search"
            />
            <input
                type="text"
                class="navbar__search-input"
                v-model="searchQuery"
                placeholder="Search..."
            />
        </div>
        <div
            class="navbar__opened-program"
            v-if="program?.type"
            @click="toggleMinimized"
        >
            <img
                class="navbar__opened-program-icon"
                :src="program.icon"
                alt="Minimized Icon"
            />
            <p class="navbar__opened-program-name">
                {{ program.name }}
            </p>
        </div>
        <div class="navbar__settings">
            <span class="navbar__settings-time"> {{ currentTime }}</span>
            <span class="navbar__settings-date"> {{ currentDate }}</span>
        </div>
    </div>
    <div class="start-menu"></div>
</template>
<style lang="less" scoped>
.navbar {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    background-color: #000;
    &__logo {
        width: 150px;
        height: 50px;
        border-top-right-radius: 30px;
        border-bottom-right-radius: 30px;
        cursor: pointer;
    }
    &__search {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 150px;
        height: 100%;
        margin-left: 30px;
        color: #8c52ff;
        &-icon {
            width: 30px;
            height: 30px;
            cursor: pointer;
        }
        &-input {
            width: 100%;
            height: 100%;
            border: none;
            outline: none;
            background-color: transparent;
            color: #fff;
            font-size: 16px;
            padding-left: 10px;
            &::placeholder {
                color: #fff;
            }
        }
    }
    &__opened-program {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 170px;
        height: 100%;
        margin-right: auto;
        margin-left: 10px;
        font-size: 30px;
        color: #fff;
        background-color: #ab82fe;
        cursor: pointer;
        &-icon {
            width: 30px;
            height: 30px;
            margin: auto 5px;
        }
        &-name {
            width: 100%;
            border: none;
            outline: none;
            background-color: transparent;
            color: #fff;
            font-size: 16px;
            margin: auto 0;
            padding-left: 10px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            user-select: none;
        }
    }
    &__settings {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100px;
        height: 100%;
        margin-left: auto;
        background-color: #ab82fe;
        border-left: 1px solid #333;
        span {
            line-height: 25px;
        }
    }
}
@media screen and (max-width: 400px) {
    .navbar {
        &__settings {
            display: none;
        }
    }
}
</style>
