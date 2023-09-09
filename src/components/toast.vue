<script setup>
import {ref} from "vue";

const _title = ref("")
const _content = ref("")
const _show = ref(false)

defineExpose({
    alert: (title, content) => {
        _title.value = title
        _content.value = content
        _show.value = true
    }
})
</script>


<template>
    <div :class="[
        'fixed', 'w-6/5','inset-0',
         'p-0', 'z-10', 'm-auto',
         'text-center', 'h-1/3', 'ml-10', 'mr-10',
         'pl-10','pr-10','pt-5','pb-5','mt-auto','mb-auto',
          _show? 'visible': 'collapse']">
        <article class="bg-blue-200 w-full h-full border-amber-100 border-2 rounded-2xl">
            <h3 class="text-4xl inline-block font-serif	 font-bold">{{_title}}</h3>
            <section class="content" v-html="_content">
            </section>
            <footer>
                <label for="modal_1" class="button dangerous">
                    确定
                </label>
            </footer>
        </article>
    </div>
</template>