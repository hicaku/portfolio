<script lang="ts" setup>
import DesktopApps from "@/components/Desktop/DesktopApps.vue";
import NavBar from "@/components/Desktop/NavBar.vue";
import ProgramWindow from "@/components/Desktop/ProgramWindow.vue";
import { onMounted } from "vue";

import { useStore } from "@/stores/index";

const store = useStore();
const { openProgram } = store;

onMounted(() => {
    if (localStorage.getItem("hasCodeRunBefore") === null) {
        openProgram({
            id: -1,
            name: "Welcome",
            extention: "",
            icon: "",
            type: "welcome",
            url: "",
            isOnStartMenu: false,
            sortApp: -1,
        });
        localStorage.setItem("hasCodeRunBefore", "true");
    }
});
</script>
<template>
    <DesktopApps />
    <NavBar />
    <ProgramWindow />
</template>
