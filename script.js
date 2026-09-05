//* Building the DOM
const inputEl = document.getElementById("input-el");
const btn = document.getElementById("btn");
const tabBtn = document.getElementById("tab-btn");
const deleteBtn = document.getElementById("delete-btn");
const list = document.getElementById("list");
let myLeads = [];

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage;
    render(myLeads)
}



/* 
    *=================================================
       * ADDING EVENT LISTENERS!
    *================================================ 
*/  

btn.addEventListener("click", () => {
    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    console.log("button clicked!")
    render(myLeads)
    
});

// TODO:
tabBtn.addEventListener("click", () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    console.log("tabBtn clicked")
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
    })
    
});

// TODO:
deleteBtn.addEventListener("dblclick", () => {
    localStorage.clear();
    myLeads = [];
    render(myLeads)
    console.log("delete button clicked")
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
                <a target = '_blank' href = "${leads}"> 
                    <i class="fa-solid fa-link"></i>
                    ${leads}
                </a>
            </li>
        `
    }
    list.innerHTML = listItems;
}