<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useStore } from "@/stores/index";

const store = useStore();
const {
    searchQuery,
    program,
    currentTime,
    currentDate,
    isStartMenuOpen,
    recentApps,
} = storeToRefs(store);
const { toggleMinimized, getCurrentTime, getStartMenuApps, openProgram } =
    store;
setInterval(getCurrentTime, 5000);
</script>
<template>
    <div class="navbar">
        <img
            class="navbar__logo"
            src="@/assets/images/start.png"
            alt="Logo"
            @click="isStartMenuOpen = !isStartMenuOpen"
        />
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
            v-if="program?.type && program?.type !== 'welcome'"
            @click="toggleMinimized"
        >
            <img
                class="navbar__opened-program-icon"
                :src="'../../src/assets/images/' + program.icon"
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
    <div class="start-menu" v-if="isStartMenuOpen">
        <div class="start-menu__header">
            <h3 class="start-menu__header-title">Visitor</h3>
        </div>
        <div class="start-menu__content">
            <div
                class="start-menu__content-item"
                v-for="app in getStartMenuApps"
                :key="app.id"
                @click="openProgram(app)"
            >
                <img
                    class="start-menu__content-item-icon"
                    :src="'../../src/assets/images/' + app.icon"
                    :alt="app.name"
                />
                <span class="start-menu__content-item-name">{{
                    app.name
                }}</span>
            </div>
        </div>

        <h3 v-if="recentApps.length" class="start-menu__recent-title">
            Recent Apps
        </h3>
        <div v-if="recentApps.length" class="start-menu__content">
            <div
                class="start-menu__content-item"
                v-for="app in recentApps"
                :key="app.id"
                @click="openProgram(app)"
            >
                <img
                    class="start-menu__content-item-icon"
                    :src="'../../src/assets/images/' + app.icon"
                    :alt="app.name"
                />
                <span class="start-menu__content-item-name">{{
                    app.name
                }}</span>
            </div>
        </div>
    </div>
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
    border-top: 3px solid #8c52ff;
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
.start-menu {
    position: absolute;
    bottom: 50px;
    width: 350px;
    height: 600px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: #333;
    z-index: 1;
    border-top-right-radius: 20px;
    &__header {
        width: 100%;
        height: 50px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        background-color: #ab82fe;
        padding: 0 20px;
        border-top-right-radius: 20px;
        &-user {
            width: 100%;
            height: 100%;
            font-size: 30px;
            color: #fff;
            margin-left: 10px;
            cursor: pointer;
        }
    }
    &__content {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
        row-gap: 20px;
        column-gap: 10px;
        padding: 10px;
        &-item {
            width: calc(50% - 5px);
            height: 50px;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
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
    }
    &__recent-title {
        width: 100%;
        padding: 0 20px;
        background-color: #ab82fe;
    }
}
@media screen and (max-width: 400px) {
    .navbar {
        &__search {
            display: none;
        }
        &__settings {
            display: none;
        }
    }
    .start-menu {
        width: 100%;
        height: calc(100% - 50px);
    }
}
</style>
