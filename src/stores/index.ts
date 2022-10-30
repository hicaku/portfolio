import { defineStore } from "pinia";
import Apps from "@/datas/apps.json";

interface App {
    id: number;
    name: string;
    extention?: string;
    icon: string;
    type: string;
    url?: string;
    children?: App[];
    isOnStartMenu?: boolean;
    sortApp?: number;
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
        folderPrograms: [] as App[] | undefined,
        currentTime: (("0" + new Date().getHours()).slice(-2) +
            ":" +
            ("0" + new Date().getMinutes()).slice(-2)) as string,
        currentDate: (("0" + new Date().getDate()).slice(-2) +
            "." +
            ("0" + (new Date().getMonth() + 1)).slice(-2) +
            "." +
            new Date().getFullYear()) as string,
        recentApps: [] as App[],
        isShown: true,
        isMinimized: false,
        isFullscreen: false,
        isSetupFinished: false,
        isStartMenuOpen: false,
    }),
    getters: {
        getApps(): App[] {
            if (this.searchQuery.trim().length >= 3) {
                return this.apps.filter((app) =>
                    app.name
                        .toLowerCase()
                        .includes(this.searchQuery.toLowerCase())
                );
            }
            return this.apps.sort((a, b) => {
                if (!a.sortApp) return 1;
                if (!b.sortApp) return -1;
                return a.sortApp - b.sortApp;
            });
        },
        getStartMenuApps(): App[] {
            return this.apps.filter((app) => app.isOnStartMenu);
        },
        currentStep(): Step {
            return this.steps[this.stepNum - 1];
        },
        maxSteps(): number {
            return this.steps.length;
        },
    },
    actions: {
        getCurrentTime() {
            const now = new Date();
            const time =
                ("0" + now.getHours()).slice(-2) +
                ":" +
                ("0" + now.getMinutes()).slice(-2);
            this.currentTime = time;
        },
        openProgram(app: App) {
            this.isStartMenuOpen = false;
            if (app.type === "app") {
                window.open(app.url, "_blank");
                this.insertRecentApp(app);
            } else if (app.type === "folder") {
                this.folderPrograms = app.children;
                this.isMinimized = false;
                this.program = app;
            } else {
                this.isMinimized = false;
                this.program = app;
                this.insertRecentApp(app);
            }
        },
        insertRecentApp(app: App) {
            if (app.isOnStartMenu) {
                return;
            }
            if (this.recentApps.includes(app)) {
                this.recentApps.splice(this.recentApps.indexOf(app), 1);
                this.recentApps.unshift(app);
            } else if (this.recentApps.length === 5) {
                this.recentApps.unshift(app);
                this.recentApps.pop();
            } else {
                this.recentApps.unshift(app);
            }
        },
        closeProgram() {
            this.isFullscreen = false;
            this.isMinimized = false;
            this.stepNum = 1;
            if (this.program.type === "photo") {
                this.program = {
                    id: 9,
                    name: "Photographs",
                    icon: "folder.png",
                    type: "folder",
                    children: [
                        {
                            id: 10,
                            name: "photo1",
                            extention: "jpg",
                            icon: "photo.png",
                            type: "photo",
                        },
                        {
                            id: 11,
                            name: "photo2",
                            extention: "jpg",
                            icon: "photo.png",
                            type: "photo",
                        },
                        {
                            id: 12,
                            name: "photo3",
                            extention: "jpg",
                            icon: "photo.png",
                            type: "photo",
                        },
                        {
                            id: 13,
                            name: "photo4",
                            extention: "jpg",
                            icon: "photo.png",
                            type: "photo",
                        },
                    ],
                };
            } else {
                this.program = {} as App;
            }
        },
        toggleMinimized() {
            if (this.isMinimized) {
                this.isStartMenuOpen = false;
            }
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
