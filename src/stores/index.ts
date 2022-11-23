import { defineStore } from "pinia";
import Apps from "@/datas/apps.json";

/* ************** IMAGES ************** */
import photo from "@/assets/images/photo.png";
import photo1 from "@/assets/images/photo1.jpg";
import photo2 from "@/assets/images/photo2.jpg";
import photo3 from "@/assets/images/photo3.jpg";
import photo4 from "@/assets/images/photo4.jpg";
import photo5 from "@/assets/images/photo5.jpg";
import step1 from "@/assets/images/step1.png";
import step2 from "@/assets/images/step2.png";
import step3 from "@/assets/images/step3.png";
import step4 from "@/assets/images/step4.png";
import solitaire from "@/assets/images/solitaire.png";
import cv from "@/assets/images/cv.png";
import nba from "@/assets/images/nba.png";
import hikotify from "@/assets/images/hikotify.png";
import linkedin from "@/assets/images/linkedin.png";
import github from "@/assets/images/github.png";
import folder from "@/assets/images/folder.png";
import tictactoe from "@/assets/images/tictactoe.png";
import calculator from "@/assets/images/calculator.png";
import earthquakes from "@/assets/images/earthquakes.png";
import hibu from "@/assets/images/hibu.png";
import infiniteWordle from "@/assets/images/infinite-wordle.png";
import setup from "@/assets/images/setup.png";
import readme from "@/assets/images/readme.png";

export const images = {
    photo: photo,
    photo1: photo1,
    photo2: photo2,
    photo3: photo3,
    photo4: photo4,
    photo5: photo5,
    step1: step1,
    step2: step2,
    step3: step3,
    step4: step4,
    solitaire: solitaire,
    cv: cv,
    nba: nba,
    hikotify: hikotify,
    linkedin: linkedin,
    github: github,
    folder: folder,
    tictactoe: tictactoe,
    calculator: calculator,
    earthquakes: earthquakes,
    hibu: hibu,
    "infinite-wordle": infiniteWordle,
    setup: setup,
    readme: readme,
} as any;
/* ************** END of IMAGES ************** */
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
    img: any;
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
                img: step1,
            },
            {
                id: 2,
                title: "Employment History",
                description: "In short, you can see my employment history.",
                img: step2,
            },
            {
                id: 3,
                title: "Technical Skills",
                description: "My technical skills can be seen here.",
                img: step3,
            },
            {
                id: 4,
                title: "Hobbies",
                description: "My hobbies are listed here.",
                img: step4,
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
                    icon: "folder",
                    type: "folder",
                    children: [
                        {
                            id: 10,
                            name: "photo1",
                            extention: "jpg",
                            icon: "photo1",
                            type: "photo",
                        },
                        {
                            id: 11,
                            name: "photo2",
                            extention: "jpg",
                            icon: "photo2",
                            type: "photo",
                        },
                        {
                            id: 12,
                            name: "photo3",
                            extention: "jpg",
                            icon: "photo3",
                            type: "photo",
                        },
                        {
                            id: 13,
                            name: "photo4",
                            extention: "jpg",
                            icon: "photo4",
                            type: "photo",
                        },
                        {
                            id: 16,
                            name: "photo5",
                            extention: "jpg",
                            icon: "photo5",
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
