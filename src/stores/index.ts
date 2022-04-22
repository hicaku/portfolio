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
        program: [] as any,
        isShown: true,
        isMinimized: false,
        isFullscreen: false,
        isTextEditor: false,
        isSetupOpen: false,
        isPhotoViewer: false,
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
            console.log(this.steps[this.stepNum - 1]);
            console.log(this.stepNum);
            return this.steps[this.stepNum - 1];
        },
    },
    actions: {
        openProgram(app: App) {
            if (app.type === "project") {
                this.isMinimized = false;
                this.isPhotoViewer = false;
                this.isSetupOpen = false;
                this.isTextEditor = false;
                this.program = app;
            } else if (app.type === "text") {
                this.isPhotoViewer = false;
                this.isSetupOpen = false;
                this.isTextEditor = true;
            } else if (app.type === "setup") {
                this.isPhotoViewer = false;
                this.isSetupOpen = true;
                this.isTextEditor = false;
            } else if (app.type === "photo") {
                this.isPhotoViewer = true;
                this.isSetupOpen = false;
                this.isTextEditor = false;
            }
        },
        closeProgram() {
            this.isMinimized = false;
            this.program = [];
        },
        toggleMinimized() {
            this.isMinimized = !this.isMinimized;
        },
        toggleFullscreen() {
            this.isFullscreen = !this.isFullscreen;
        },
    },
});
