<script setup>
import {computed, onActivated} from "vue";

const prop = defineProps([
    "name",
    "values",
    "default",
    "acceptAll"
])
const flexCount = " one two three four five six seven eight nine ten".split(' ')
let _selected = undefined
function check(index) {
    if (_selected !== undefined)
        return index === _selected? 'checked' : null

    if (prop.default === undefined)
        return index === 0? 'checked' : null
    return index === prop.default.value? 'checked' : null
}

const choices = computed(()=>{
    const ret = []
    if (prop.acceptAll !== undefined)
        ret.push({
            val: 'all',
            desc: '不限'
        })

    for(const k in prop.values)
        ret.push({
            val: k,
            desc: prop.values[k]
        })
    return ret
})

defineExpose({
    check: (index, val) => {
        if (index !== undefined)
            return _selected = index
        let i = 0
        for(const k in prop.values){
            if (k === val)
                return _selected = i
            i ++
        }
    }
})

</script>

<template>
    <div :class="['flex', 'large', flexCount[
            Number(choices.length)
        ]]">
        <label class="choice" v-for="({desc, val}, index) in choices">
            <input type="radio"
                   :name="name"
                   :value="val"
                   :checked = "check(index)"
            />
            <span class="checkable">{{ desc }}</span>
        </label>
    </div>
</template>

<style scoped>
label.choice{
    padding: 1%;
    display: inline-block;
    text-align: center;
}
div.flex{
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 5vw;
}
</style>