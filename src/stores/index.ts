import { defineStore } from "pinia";
import Apps from "@/datas/apps.json";

interface App {
    id: number;
    name: string;
    extention: string;
    icon: string;
    type: string;
    url: string;
}
interface Step {
    id: number;
    title: string;
    description: string;
}

export const useStore = defineStore({
    id: "store",
    state: () => ({
        stepNum: 1 as number,
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
        searchQuery: "" as string,
        apps: Apps as App[],
        program: {} as App,
        isShown: true,
        isMinimized: false,
        isFullscreen: false,
    }),
    getters: {
        getApps(): App[] {
            if (this.searchQuery.trim().length >= 3) {
                return this.apps.filter(
                    (app) =>
                        app.name
                            .toLowerCase()
                            .includes(this.searchQuery.toLowerCase()) ||
                        app.extention
                            .toLowerCase()
                            .includes(this.searchQuery.toLowerCase())
                );
            }
            return this.apps;
        },
        currentStep(): Step {
            return this.steps[this.stepNum - 1];
        },
        maxSteps(): number {
            return this.steps.length;
        },
    },
    actions: {
        openProgram(app: App) {
            this.isMinimized = false;
            this.program = app;
        },
        closeProgram() {
            this.isFullscreen = false;
            this.isMinimized = false;
            this.program = {} as App;
        },
        toggleMinimized() {
            this.isMinimized = !this.isMinimized;
        },
        toggleFullscreen() {
            this.isFullscreen = !this.isFullscreen;
        },
        nextStep() {
            this.stepNum++;
        },
        prevStep() {
            this.stepNum--;
        },
        finishSetup() {
            this.stepNum = 1;
            this.program = {} as App;
        },
    },
});
