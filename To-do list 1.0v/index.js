const newTaskBtn = document.querySelector(".newTaskBtn")
const mainContainer = document.querySelector(".main")
const olEl = document.createElement("ol")
olEl.classList.add("olEl")
mainContainer.appendChild(olEl)


let newBtnOpen = false

newTaskBtn.addEventListener("click", function() {
    if (newBtnOpen === false) {

        let inputValue = null
        let containerInput = document.createElement("div")
        containerInput.classList.add("containerInput")
        mainContainer.appendChild(containerInput)
    
        let inputField = document.createElement("input")
        inputField.classList.add("inputField")
        containerInput.appendChild(inputField)
    
        let okBtn = document.createElement("button")
        okBtn.classList.add("okBtn")
        containerInput.appendChild(okBtn)
    
        let delBtn = document.createElement("button")
        delBtn.classList.add("delBtn")
        containerInput.appendChild(delBtn)

        newBtnOpen = true

        inputField.addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                if (inputField.value === "") {
                    return
                }
                    containerInput.remove()
                    inputValue = inputField.value
    
                    let checkboxEl = document.createElement("input")
                    checkboxEl.type = "checkbox"
                    checkboxEl.classList.add("checkboxEl")
    
                    const liEl = document.createElement("li")
                    liEl.classList.add("liEl")
                    liEl.appendChild(checkboxEl)
                    liEl.appendChild(document.createTextNode(inputValue));
                    olEl.appendChild(liEl)
    
                    const delLineBtn = document.createElement("button")
                    delLineBtn.classList.add("delLineBtn")
                    delLineBtn.style.visibility = "hidden"
                    liEl.appendChild(delLineBtn)
    
                    checkboxEl.addEventListener("change", function() {
                        if (checkboxEl.checked) {
                            liEl.style.textDecoration = "line-through"
                            delLineBtn.style.visibility = "visible"
                        } else {
                            liEl.style.textDecoration = "none"
                            delLineBtn.style.visibility = "hidden"
                        }
                    })

                    delLineBtn.addEventListener("click", function() {
                        liEl.remove()
                    })

                newBtnOpen = false
            }
        })

        delBtn.addEventListener("click", function() {
            containerInput.remove()

            newBtnOpen = false
        })

        okBtn.addEventListener("click", function() {
            if (inputField.value === "") {
                return
            }
                containerInput.remove()
                inputValue = inputField.value

                let checkboxEl = document.createElement("input")
                checkboxEl.type = "checkbox"
                checkboxEl.classList.add("checkboxEl")

                const liEl = document.createElement("li")
                liEl.classList.add("liEl")
                liEl.appendChild(checkboxEl)
                liEl.appendChild(document.createTextNode(inputValue));
                olEl.appendChild(liEl)

                const delLineBtn = document.createElement("button")
                delLineBtn.classList.add("delLineBtn")
                delLineBtn.style.visibility = "hidden"
                liEl.appendChild(delLineBtn)

                



                checkboxEl.addEventListener("change", function() {
                    if (checkboxEl.checked) {
                        liEl.style.textDecoration = "line-through"
                        delLineBtn.style.visibility = "visible"
                    } else {
                        liEl.style.textDecoration = "none"
                        delLineBtn.style.visibility = "hidden"
                    }
                })

                delLineBtn.addEventListener("click", function() {
                    liEl.remove()
                })

                newBtnOpen = false
        })
    }

})

