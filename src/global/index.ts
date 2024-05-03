import registElementPlus from "./registElementPlus"
import gegistElementPlusIcon from "./gegistElementPlusIcon"
import type { App } from "vue"

export const setRegistGlobal=(app:App)=>{
    app.use(registElementPlus)
    app.use(gegistElementPlusIcon)
}
