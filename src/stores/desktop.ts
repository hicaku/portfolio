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

export const useDesktopStore = defineStore({
    id: "store",
    state: () => ({
        searchQuery: "" as string,
        apps: Apps as App[],
        program: [] as any,
        isMinimized: false,
        isFullscreen: false,
    }),
    actions: {
        openProgram(app: App) {
            this.isMinimized = false;
            this.program = app;
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
    },
});
