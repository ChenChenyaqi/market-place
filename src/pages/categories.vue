<!--suppress HtmlUnknownBooleanAttribute -->
<script setup>
import {ref} from "vue";
import Toolbar from "@/components/toolbar.vue";
import Searchbar from "@/components/searchbar.vue";
import SearchbarPlaceholder from "@/components/placeholder/searchbarPlaceholder.vue";
import ToolbarPlaceholder from "@/components/placeholder/toolbarPlaceholder.vue";
import Categories from "#/content/categories.vue";

const searchBar = ref(null)
</script>

<template>
    <Searchbar
        inputHint="搜索……"
        decoration
        ref="searchBar"
    />
    <Searchbar-placeholder/>

    <categories />

    <toolbar-placeholder/>
    <toolbar />
</template>

<style scoped>
.fade-enter-active{}
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from{}
.fade-leave-to {
    opacity: 0;
}
</style>