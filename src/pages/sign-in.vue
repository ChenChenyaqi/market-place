<script setup>
import {computed, inject, onActivated, ref} from "vue";
import Toast from "@/components/toast.vue";

const httpEndPoint = "http://"+inject("endpoint")
const wsEndPoint = "ws://"+inject("endpoint")
let hash = inject("hash")
const router = inject("router")

const signupMode = ref(false)
const codeRequestCoolDown = ref(-1)

const name = ref("")
const password = ref("")
const phone = ref("")
const code = ref("")

const usernameHint = ref("用户名")
const passwordHint = ref("密码")
const phoneHint = ref("手机号")
const codeHint = ref("验证码")
const passwordAction = ref("go")

const toaster = ref(null)

const connecting = ref(false)

const denySignIn = computed(()=>{
    return name.value === ""
        || password.value === ""

})

const denySignUp = computed(()=>{
    return name.value === ""
        || password.value === ""
        || phone.value.toString().length !== 11
})

const denySubmit = computed(()=>{
    return connecting.value
        || signupMode.value
        ? denySignUp.value
        : denySignIn.value
})

const submitHint = computed(()=>{
    return signupMode.value
        ? "注册"
        : "登录"
})

const switchHint = computed(()=>{
    return signupMode.value
        ? "已有账户？"
        : "没有账户？"
})

const codeSenderHint = computed(()=>{
    switch (codeRequestCoolDown.value) {
        case -1:
            return "发送验证码"
        case 0:
            return "重新发送"
        default:
            return "重新发送("+codeRequestCoolDown.value+")"
    }
})

setInterval(()=>{
    if (codeRequestCoolDown.value > 0)
        codeRequestCoolDown.value -= 1
}, 1000)

let ws = null
let step = 0

function requestCode(){
    codeRequestCoolDown.value = 60
    if (ws != null) {
        ws.send("code?")
        return
    }

    ws = new WebSocket(wsEndPoint + "/signup")
    ws.onopen = e => {
        ws.send(phone.value)
    }
    ws.onmessage = e => {
        console.log(step)
        switch (step){
            case 1:
                if (e.data === "accepted")
                    step = 2
                else
                    toaster.value.alert(
                        "验证码不正确",
                        "请再试一次"
                    )
                break
            case 2:
                const postfix = e.data

                const code = hash(
                    name.value +
                    password.value +
                    phone.value.toString() +
                    postfix
                )
                console.log(code)
                ws.send(code)
                ws.send(JSON.stringify({
                    username: name.value,
                    password: password.value,
                    phoneNumber: phone.value.toString()
                }))
                step = 3
                break
            case 3:
                const obj = JSON.parse(e.data)
                toaster.value.alert(
                    "注册成功",
                    "3秒后将自动登录"
                )
                console.log(obj)
                ws.close(1000, "success")
                setTimeout(()=>{
                    router.replace("/")
                })
        }
    }
    ws.onclose = e => {
        connecting.value = false
        switch (e.code) {
            case 1000:
                break
            default:
                toaster.value.alert(
                    "注册失败",
                    "代码："+e.code+"<br>服务器信息："+e.reason+"<br>请重新申请验证码登录"
                )
                ws = null
                step = 0
                codeRequestCoolDown.value = -1
                code.value = ""

        }
    }



}

function signin(){

    const userInfo = {
        name: name.value,
        password: password.value
    }

    fetch(httpEndPoint + "/signin", {
        method : "POST",
        body : JSON.stringify(userInfo)
    })
        .then(resp => resp.text())
        .then(data => {
            console.log("login success")
            console.log(data)
            // todo
            },
            reason => {
                console.log(reason)
                toaster.value.alert("登录失败", "密码不正确或用户不存在")
            })
        .finally(()=>{
            connecting.value = false
        })
}
function signup(){
    ws.send(code.value)
    step = 1
}

function submit(){
    connecting.value = true
    if (signupMode.value)
        signup()
    else
        signin()
}

onActivated(()=>{
    ws = null
})

</script>

<template>
    <header class="bg-primary-200 h-fit">
        <h2 class="text-center text-3xl h-auto px-3 py-1">云 · 集</h2>
    </header>

    <form class="label xl">
        <input
            id="user-field"
            type="text"
            enterkeyhint="next"
            :placeholder=usernameHint
            @focusin="usernameHint = ''"
            @focusout="usernameHint = '用户名'"
            v-model="name"
        />

        <input
            id="pwd-field"
            type="password"
            :enterkeyhint="passwordAction"
            @focusin="passwordHint = ''"
            @focusout="passwordHint = '密码'"
            :placeholder=passwordHint
            v-model="password"
        />

        <input
            v-if="signupMode"
            id="phone-field"
            type="number"
            enterkeyhint="go"
            @focusin="phoneHint = ''"
            @focusout="phoneHint = '手机号'"
            :placeholder=phoneHint
            v-model="phone"
        />

        <input
            v-if="phone.toString().length === 11 && signupMode"
            id="code-button"
            type="button"
            class="success button"
            :value="codeSenderHint"
            :disabled="codeRequestCoolDown > 0"
            @click="requestCode"
        />

        <input
            v-if="signupMode"
            id="code-field"
            type="text"
            enterkeyhint="go"
            @focusin="codeHint = ''"
            @focusout="codeHint = '验证码'"
            :placeholder=codeHint
            v-model="code"
        />

        <input
            id="submit-button"
            type="button"
            class="success button icon-paper-plane"
            :value="submitHint"
            :disabled="denySubmit"
            @click="submit"
        />

        <input
            id="switch-button"
            type="button"
            :class="[ signupMode? 'signupStyle' : 'signinStyle', 'button']"
            :value="switchHint"
            @click="signupMode = !signupMode"
        />
    </form>

    <toast ref="toaster"/>
</template>

<style scoped>
header{
    background: lightblue;
    margin-bottom: 20%;
}

form{
    margin: 5%;
    width: 90%;
    background: lightskyblue;
}

input{
    margin-top: 5%;
    margin-bottom: 5%;
    color: black;
}

input::selection{
    border: thick blue;
}

input:disabled{
    color: lightgrey;
}

.button{
    margin-left: 5%;
    margin-right: 5%;
    padding-right: 10%;
    padding-left: 10%;
    width: auto;
}

input.signupStyle{
    background: green;
}

input:active.signupStyle{
    background: darkred;
}

input.signinStyle{
    background: red;
}

input:active.signinStyle{
    background: darkgreen;
}
</style>
