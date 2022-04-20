import { defineStore } from "pinia";

export const useStore = defineStore({
    id: "store",
    state: () => ({
        stepNum: 1,
        steps: [
            {
                id: 1,
                title: "Welcome to My Portfolio!",
                description:
                    "This is a setup wizard to help you get to know me.",
            },
            {
                id: 2,
                title: "My Technical Skills",
                description: "Here you can see my technical skills.",
            },
        ],
        isShown: true,
        isMinimized: false,
        isMaximized: false,
    }),
    getters: {},
    actions: {
        nextStep() {
            this.stepNum++;
        },
        prevStep() {
            this.stepNum--;
        },
        minimizeWindow() {
            this.isMinimized = true;
        },
        maximizeWindow() {
            this.isMaximized = true;
        },
        undoMaximizeWindow() {
            this.isMaximized = false;
        },
        closeWindow() {
            this.isShown = false;
        },
        openWindow() {
            this.isShown = true;
        },
    },
});
