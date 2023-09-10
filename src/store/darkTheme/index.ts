import { defineStore } from 'pinia'
import { ref } from 'vue'

const useDarkThemeStore = defineStore('theme', () => {
  const darkTheme = ref('')

  const changeDarkTheme = (flag: boolean) => {
    darkTheme.value = flag ? 'dark' : ''
  }

  return {
    darkTheme: ref(darkTheme),
    changeDarkTheme
  }
})

export default useDarkThemeStore
