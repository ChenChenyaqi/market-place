<script setup>

</script>

<template>
    <div>
    <div class="container card">
        <h5 class="center">按类型浏览</h5>
        <button class="success">
            出售与收购（物品）
        </button>
        <button class="success">
            技能与任务（非物品）
        </button>
    </div>
    <div class="container card">
        <h5 class="center">按收支浏览</h5>
        <button class="success">
            出售与技能（付款）
        </button>
        <button class="success">
            收购与任务（收款）
        </button>
    </div>
    <div class="container card">
        <h5 class="center">按发布浏览</h5>
        <button class="success">
            在校生发布
        </button>
        <button class="success">
            合作商发布
        </button>
    </div>
    </div>
</template>

<style scoped>
.container{
    top: 5%;
    margin: 5% auto 10% auto;
    border-color: black;
    padding: 3%;
    width: 90%;
    height: 30%;
    display: block;
}
button{
    font-size: large;
    width: 40%;
    margin-top: 0;
    margin-left: 5%;
    margin-right: 5%;
    height: 70%;
    display: inline-block;
}
</style>