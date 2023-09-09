<script setup>
import Searchbar from "@/components/searchbar.vue";
import SearchbarPlaceholder from "@/components/placeholder/searchbarPlaceholder.vue";
import Search from "#/content/search.vue";
import {inject, onActivated, onDeactivated, ref} from "vue";
import router from "@/utilities/MainRouter";

const cookie = inject("cookie")

const history = ref([])
const advice = ref([])
const searchBar = ref(null)
const searchUtil = ref(null)

function getPrefer(){
    const prefer = searchUtil.value.prefer
    return [
        prefer["publisher"].value,
        prefer["cost"].value,
        prefer["type"].value
    ].join(';')
}

function submit(target, fromHistory=false){
    const idx = history.value.indexOf(target)
    if (idx !== -1) {
        history.value.splice(idx, 1)
        history.value.unshift(target)
    }
    else if (! fromHistory) {
        history.value.unshift(target)
    }
    console.log("searching for "+target)

    router.push({
        path: "result",
        query: {
            key: target,
            prefer: getPrefer()
        }
    })
}

onActivated(()=>{
    let hist = cookie.get("history")
    history.value = hist === null? [] : hist.split('__')
    advice.value = ['hi']
    // todo query advice
})
onDeactivated(()=>{
    cookie.set("history", history.value.join("__"))
})
</script>

<template>
    <Searchbar
        ref="searchBar"
        inputHint="搜索……"
        @submit="submit(searchBar.target)"
    />
    <Searchbar-placeholder/>

    <Search
        ref="searchUtil"
        :advices="advice"
        :histories="history"
        @hint="arg => submit(arg, true)"/>
</template>