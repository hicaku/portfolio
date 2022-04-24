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
    imgSrc: string;
}

export const useStore = defineStore({
    id: "store",
    state: () => ({
        stepNum: 1 as number,
        steps: [
            {
                id: 1,
                title: "Welcome!",
                description:
                    "At the of setup wizard, you will be able to see my CV.",
                imgSrc: "setup-banner.png",
            },
            {
                id: 2,
                title: "Employment History",
                description: "In short, you can see my employment history.",
                imgSrc: "employment-banner.png",
            },
            {
                id: 3,
                title: "Technical Skills",
                description: "My technical skills can be seen here.",
                imgSrc: "techstack-banner.png",
            },
            {
                id: 4,
                title: "Hobbies",
                description: "My hobbies are listed here.",
                imgSrc: "hobbies-banner.png",
            },
        ],
        searchQuery: "" as string,
        apps: Apps as App[],
        program: {} as App,
        isShown: true,
        isMinimized: false,
        isFullscreen: false,
        isSetupFinished: false,
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
            this.stepNum = 1;
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
            this.isSetupFinished = true;
            this.program = {} as App;
        },
        downloadCV() {
            const link = document.createElement("a");
            link.href = "./cv.pdf";
            link.download = "cv.pdf";
            link.click();
        },
    },
});
