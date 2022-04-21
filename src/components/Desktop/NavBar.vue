<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useDesktopStore } from "@/stores/desktop";

const store = useDesktopStore();
const { searchQuery, getApps } = storeToRefs(store);
</script>
<template>
    <div class="navbar">
        <img class="navbar__logo" src="logo.png" alt="Logo" />
        <div class="navbar__search">
            <img
                class="navbar__search-icon"
                src="search-icon.png"
                alt="Search"
            />
            <input
                type="text"
                class="navbar__search-input"
                v-model="searchQuery"
                placeholder="Search..."
            />
        </div>
        <div class="navbar__settings">
            <img src="wifi.png" alt="wifi" />
            <img src="eng.png" alt="ENG" />
        </div>
    </div>
</template>
<style lang="less" scoped>
.navbar {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #000;
    &__logo {
        width: 60px;
        height: 50px;
        padding-right: 10px;
        border-right: 1px solid #8c52ff;
        cursor: pointer;
    }
    &__search {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 150px;
        height: 100%;
        margin-right: auto;
        margin-left: 30px;
        border-bottom: 1px solid #8c52ff;
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
    &__settings {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100px;
        height: 100%;
        margin-left: 30px;
        img {
            width: 40px;
            height: 40px;
            margin: 0 5px;
            cursor: pointer;
        }
    }
}
</style>
