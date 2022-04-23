<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useStore } from "@/stores/index";

const store = useStore();
const { stepNum, currentStep, isMinimized } = storeToRefs(store);
const { nextStep, prevStep, maxSteps, finishSetup } = store;
</script>
<template>
    <div class="step-window" v-show="!isMinimized">
        <div class="step-window__body">
            <div class="step-window__body-step">
                <div class="step-window__body-step-number">
                    <span>{{ stepNum }}</span>
                </div>
            </div>
            <div class="step-window__body-step-content">
                <div class="step-window__body-step-content-text">
                    <p>{{ currentStep }}</p>
                </div>
                <div class="step-window__body-step-content-buttons">
                    <button @click="prevStep" :disabled="stepNum === 1">
                        Previous
                    </button>
                    <button @click="nextStep" v-if="stepNum !== maxSteps">
                        Next
                    </button>
                    <button @click="finishSetup" v-if="stepNum === maxSteps">
                        Finish
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
.step-window {
    background: #333;
}
</style>
