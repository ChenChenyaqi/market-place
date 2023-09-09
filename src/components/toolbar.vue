<script setup>
    import {ref} from "vue";

    const _show = ref(false)
    const username = ref("")

    function show(){
        _show.value = true
    }

    defineExpose({
        username,
        show
    })
</script>

<template>
    <div>
    <div class="modal">
        <input id="switch" type="checkbox" v-model="_show" />
        <label for="switch" class="overlay"></label>
        <article>
            <header>
                <h3>{{username}}</h3>
                <label for="switch" class="close">&times;</label>
            </header>
            <section class="content">

            </section>
            <footer>
                <a class="button" href="#">See offer</a>
                <label for="switch" class="button dangerous">
                    Cancel
                </label>
            </footer>
        </article>
    </div>
    <footer class="fill-x">
        <div class="flex">
            <label class="success center"
                @click="show">
                我
            </label>
        </div>
    </footer>
    </div>
</template>

<style scoped>

footer{
    background: lightskyblue;
    position: fixed;
    bottom: 0;
    height: 10vh;
}
footer > div {
    width: 90%;
    height: 100%;
    margin-left: 5%;
    margin-right: 5%;
}
</style>