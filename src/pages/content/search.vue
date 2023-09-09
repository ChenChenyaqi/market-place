
<!--suppress HtmlUnknownBooleanAttribute -->
<script setup>
import {ref} from "vue";
import RadioGroup from "@/components/radioGroup.vue";

defineProps([
    "histories",
    "advices"
])


const prefer = ref(null)

defineExpose({
    prefer
})

defineEmits([
    "hint"
])
</script>

<template>
    <div class="fill">
        <div class="fill-x flow">
            <p class="large">历史记录</p>
            <div class="for-flow">
                <label class="hist" v-for="history in histories"
                       @click="$emit('hint', history)">
                    {{history}}
                </label>
            </div>
        </div>
        <div style="height: 2vw"/>
        <div class="fill-x flow">
            <p class="large">搜索建议</p>
            <div class="for-flow">
                <label class="hist" v-for="advice in advices"
                       @click="$emit('hint', advice)">
                    {{advice}}
                </label>
            </div>
        </div>
        <div class="fill-x">
            <p class="large">偏好设置</p>
            <form class="card large" ref="prefer">
                <label class="title">发布者</label>
                <radio-group
                    name="publisher"
                    accept-all
                    :values="{
                        'student': '在校生',
                        'company': '合作商'
                    }"/>
                <label class="title">收支类型</label>
                <radio-group
                    name="cost"
                    accept-all
                    :values="{
                        'positive': '消费',
                        'negative': '悬赏',
                        'zero': '公益'
                    }"/>
                <label class="title">类型</label>
                <radio-group
                    name="type"
                    accept-all
                    :values="{
                        'object': '物品',
                        'service': '服务'
                    }"/>
            </form>
        </div>
    </div>
</template>

<style scoped>
p{
    margin:0;
    color: paleturquoise;
}
.for-flow{
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;
    height: 23vw;
    border-top: thin solid deepskyblue;

    border-radius: 5vw;
    border-left: none;
    border-right: none;
    border-bottom: thin solid deepskyblue;
    padding-top: 1%;
    padding-bottom: 2%;
    margin-left: 2%;
    margin-right: 2%;

    text-align: center;
    align-items: center;
}
.for-flow::-webkit-scrollbar{
    display: none;
}
label.hist{
    font-size: medium;
    height: fit-content;
    padding: 1% 2% 1% 2%;
    margin: 1%;
    background: #5E77FF0F;
    color: grey;
}
form {
    padding: 1vw 5vw 1vw 5vw;
    height: 80vw;
}
.card{
    background: aliceblue;
    border-color: powderblue;
}
.title{
    font-weight: bold;
}
</style>