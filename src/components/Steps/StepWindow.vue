<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useStore } from "@/stores/index";

const store = useStore();
const { isShown, stepNum, currentStep } = storeToRefs(store);
const { nextStep, prevStep, minimizeWindow, maximizeWindow, closeWindow } =
    store;
</script>
<template>
    <div class="step-window" v-if="!isShown">
        <div class="step-window__header">
            <h1>Hikmet Can Küfteoğlu</h1>
            <div class="buttons">
                <button type="button" @click="minimizeWindow()"></button>
                <button type="button" @click="maximizeWindow()"></button>
                <button type="button" @click="closeWindow()"></button>
            </div>
        </div>
        <div class="step-window__body">
            <div class="step-window__body-content">
                <div class="step-window__body-content-step">
                    <div class="step-window__body-content-step-number">
                        <span>aaaaa{{ stepNum }}</span>
                    </div>
                    <div class="step-window__body-content-step-title">
                        <p>{{ currentStep }}</p>
                    </div>
                </div>
                <div class="step-window__body-content-step-content">
                    <div class="step-window__body-content-step-content-text">
                        <p>{{ currentStep }}</p>
                    </div>
                    <div class="step-window__body-content-step-content-buttons">
                        <button @click="prevStep">Previous</button>
                        <button @click="nextStep">Next</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
