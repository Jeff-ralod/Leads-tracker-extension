import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js"
import { getDatabase,
            ref,
            push,
            onValue
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js"

const firebaseConfig = {
    databaseURL: "https://leads-tracker-app-acb5c-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

//* Building the DOM
const inputEl = document.getElementById("input-el")
const btn = document.getElementById("btn")
const deleteBtn = document.getElementById("delete-btn")
const list = document.getElementById("list")
const referenceInDB = ref(database, "leads")


/* 
    *=================================================
       * ADDING EVENT LISTENERS!
    *================================================ 
*/  

btn.addEventListener("click", () => {
    push(referenceInDB, inputEl.value);
    inputEl.value = "";
    
});

// TODO:
deleteBtn.addEventListener("dblclick", () => {
    
});


/* 
    *=================================================
        * FUNCTIONS
    *================================================ 
*/

//! this function is for rendering leads in the extension
function render(leads) {
    let listItems = "";
    for(let i = 0; i < leads .length; i++){
        listItems += `
            <li>
                <a target = '_blank' href = "${leads[i]}"> 
                    <i class="fa-solid fa-link"></i>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    list.innerHTML = listItems;
}

onValue(referenceInDB, function(snapshot) {
    const snapshotValues = snapshot.val()
    const leads = Object.values(snapshotValues)
    render(leads)
})