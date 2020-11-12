let packingButton = document.querySelector("#packing-button")
let packing = document.querySelector(".packing")
let closeButton = document.querySelector("#close")

let packingList = document.querySelector("#packing-list")
let packingInput = document.querySelector("#packing-item")
let packingAdd = document.querySelector("#packing-add")

//add to packing list
packingAdd.addEventListener("click",function (){
    let item = document.createElement("li")
    let packingInput = document.querySelector("#packing-item").value
    item.appendChild(document.createTextNode(packingInput));
    packingList.appendChild(item)

    removeItem()
})

// remove an item from packing list
function removeItem(){
    let list = document.querySelectorAll("li")
    list.forEach(function (item){
        item.addEventListener("click", function (e){
            packingList.removeChild(item)
        })
    })
}




// adding show and close functionality for packing list popup
packingButton.addEventListener("click",show)
closeButton.addEventListener("click",close)

function show(){
    packing.removeAttribute("hidden");
}

function close(){
    packing.setAttribute("hidden","")
}

export {
    show,
    close
}
