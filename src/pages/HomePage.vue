<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useStore } from "../stores/index";

const store = useStore();
const { stepNum, isShown, isMinimized, isMaximized } = storeToRefs(store);
const {
    steps,
    nextStep,
    prevStep,
    minimizeWindow,
    maximizeWindow,
    closeWindow,
} = store;
</script>
<template>
    <div class="home-page">
        <div class="home-page__header">
            <h1>Hikmet Can Küfteoğlu</h1>
            <div class="buttons">
                <button type="button" @click="minimizeWindow()"></button>
                <button type="button" @click="maximizeWindow()"></button>
                <button type="button" @click="closeWindow()"></button>
            </div>
        </div>
        <div class="home-page__body">
            <div class="home-page__body-content">
                <div class="home-page__body-content-step">
                    <div class="home-page__body-content-step-number">
                        <span>{{ stepNum }}</span>
                    </div>
                    <div class="home-page__body-content-step-title">
                        <p>{{ steps[stepNum - 1].title }}</p>
                    </div>
                </div>
                <div class="home-page__body-content-step-content">
                    <div class="home-page__body-content-step-content-text">
                        <p>{{ steps[stepNum - 1].description }}</p>
                    </div>
                    <div class="home-page__body-content-step-content-buttons">
                        <button @click="prevStep">Previous</button>
                        <button @click="nextStep">Next</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
