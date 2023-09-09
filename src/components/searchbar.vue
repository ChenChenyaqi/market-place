<script setup>
import {onActivated, ref} from "vue";
import search from "$/picture/search.svg"
import router from "@/utilities/MainRouter"

const props = defineProps([
    "inputHint",
    "decoration"
])
const target = ref("")
const bar = ref(null)
const focused = ref(false)

function check(){
    if (props.decoration === undefined)
        return
    router.push('/search')
}

defineExpose({
    target
})
defineEmits([
    'submit'
])

onActivated(()=>{
    if (props.decoration !== undefined)
        return
    const id = setInterval(() => {
        if (bar.value == null)
            return

        bar.value.focus()
        clearInterval(id)
    })
})

</script>


<template>
    <header>
        <div class="container">
            <span class="icon">
            <label for="search-bar" @click="$emit('submit')">
                <img :src="search" alt="搜索" style="width: 100%;top:0;">
            </label>
        </span>
            <span class="input">
            <input
                id="search-bar"
                ref="bar"
                type="text"
                class="medium"
                :placeholder="focused? '' :inputHint"
                v-model="target"
                @click="check"
                @focusin="focused=true"
                @focusout="focused=false"
                @keyup.enter="$emit('submit')"
            />
        </span>
        </div>
    </header>
</template>

<style scoped>
header{
    z-index: 1;
    height: fit-content;
    position: fixed;
    background: lightskyblue;
}
.container{
    top: 0;

    margin-left: 1%;
    margin-right: 1%;

    overflow: hidden;
}
::placeholder{
    text-align: center;
}
.icon{
    border-top: thin;
    width: 10%;
    height: 100%;
    display: inline-block;
    margin-right: 1%;
    float: left;
}
.input{
    top:0;
    width: 88%;
    height: 100%;
    margin-left: 1%;
    display: inline-block;
    border-top: thin;
    float: right;
    text-align: center;
    align-items: center;
}
input{
    margin: 1% 5% 1% 0;
}
</style>