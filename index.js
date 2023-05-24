
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"

import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL:"https://playground-a5af8-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const MessageCorrectorDB = ref(database, "message-corrector")
let inputEl = document.getElementById("input-el")
let messageEl = document.getElementById("message-contents-wrapper")
let btnEl = document.getElementById("btn-el")
let frombtnEl = document.getElementById("from-message-el")
let tombtnEl = document.getElementById("to-message-el")
let button1El = document.getElementById("btn-1")
let button2El = document.getElementById("btn-2")
let contRolbtnSEl = document.getElementById("control-from-to-options-wrapper")
let firstHeadernames = document.getElementById("first-header-name")
let secondHeadernames = document.getElementById("second-header-name")
let Realholder = document.getElementById("design-messages-wrapper")
onValue(MessageCorrectorDB, function(snapshot){
    if(snapshot.exists())
    {
        let itemsArray = Object.values(snapshot.val())
        clearinputTextareaValue()
        for(let items = 0; items<itemsArray.length; items++)
        {
            messageEl.innerHTML +=`
            <div id="design-messages-wrapper">
            ${itemsArray[items]}
            </div>
            `
        }
    }
})
button1El.addEventListener("click", function(){
      frombtnEl.style.display = "block"
    frombtnEl.style.backgroundColor = "#444059"
})
button2El.addEventListener("click", function(){
    tombtnEl.style.display = "block"
    tombtnEl.style.backgroundColor = "#444059"
})


btnEl.addEventListener("click", function(){
    let firstbtn1 = frombtnEl.value
    let secondbtn1 = tombtnEl.value
    contRolbtnSEl.style.display = "none"
    let inputTextareaValue = firstbtn1+" "+inputEl.value +" "+ secondbtn1 
    push(MessageCorrectorDB, inputTextareaValue)
    inputEl.value = ""
    clearfromandtoinputfields()
})

function clearinputTextareaValue()
{
    messageEl.innerHTML = ""
}

function clearfromandtoinputfields()
{
     frombtnEl.value = ""
     tombtnEl.value = ""
}



