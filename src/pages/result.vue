<script setup>
import router from "@/utilities/MainRouter";
import {inject, onActivated} from "vue";

const httpEndPoint = "http://"+inject("endpoint")


onActivated(() => {
    const prefer = router.currentRoute.value.query.prefer.split(';')
    const rawKey = router.currentRoute.value.query.key

    // todo parse key

    const parsedKey = []

    const param = {
        key: parsedKey,
        publisher: prefer[0],
        cost: prefer[1],
        type: prefer[2]
    }

    fetch(httpEndPoint+"/query", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(param)
    }).then(data => {
        // todo fill data
    })
})
</script>

<template>

</template>

<style scoped>

</style>