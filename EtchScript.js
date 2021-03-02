const container = document.getElementById("container");
const resetButton = document.getElementById("reset");
const drawEraseButton = document.getElementById("draw-erase");

/**
 * Makes a grid of div elements based on the parameters passed in
 * @param {*} numberOfRows 
 * @param {*} numberOfColumns 
 */
function makeGrid(numberOfRows, numberOfColumns){
    container.style.setProperty('--row-count', numberOfRows);
    container.style.setProperty('--column-count', numberOfColumns);
    for(let i = 0; i < (numberOfRows * numberOfColumns); i++){
        let gridItem = document.createElement("div");
        //gridItem.innerText = i + 1;
        container.appendChild(gridItem).className = "item";
    }
}

/**
 * Creates a default grid
 */
function setDefaultGrid(){
    makeGrid(16, 16);
    addHoverEffect(document.querySelectorAll(".item"));
}

/**
 * Removes all children elements from a specified parent element
 * @param {*} parentElement 
 */
function removeAllChildrenElements(parentElement){
    while(parentElement.firstChild){
        parentElement.removeChild(parentElement.firstChild);
    }
}

/**
 * Resets the current grid dimensions and prompts the user for the new dimensions and then 
 * generates it. Also, sanitizes user input to ensure valid input is given
 */
function resetGrid(){
    let number = prompt("How many squares per side would you like for the grid? (must be between 1 and 100)");    
    if(number === null){
        return;
    }
    
    number = parseInt(number);
    while(!(number > 0) || !(number < 101) || Number.isNaN(number)){
        number = prompt("Please enter a valid numbe between 1 and 100!");
        if(number === null){
            return;
        }
        number = parseInt(number);
    }

    removeAllChildrenElements(container);
    makeGrid(number, number);
    drawEraseButton.innerText = "Erase";
    addHoverEffect(document.querySelectorAll(".item"));
}

/**
 * Generates a random color for the '--random-color' css variable; checks the current percentage of the '--lightness' css
 * variable, and if it is greater than 9, it will subtract 10 from the total percentage and reset the new value
 * for the variable
 * @param {*} item 
 */
function addRandomColor(item){
    randomNumber = Math.floor((Math.random() * 360));
    item.style.setProperty('--random-color', randomNumber);
    lightnessPercentageAsInt = parseInt(getComputedStyle(item).getPropertyValue('--lightness').replace('%',''));
    if(lightnessPercentageAsInt > 9){
        lightnessPercentageAsInt -= 10
    }
    item.style.setProperty('--lightness', lightnessPercentageAsInt.toString() + '%')

}

/**
 * Adds an event listerner to every item in the arguments array that is passed in; each item
 * is given a mouse-enter event, where the "item-highlight" class is added to the element
 * if it is not currently assigned
 * @param {*} gridItems  
 */
function addHoverEffect(gridItems){
    if(gridItems.length < 1){
        return; 
    }
    gridItems.forEach(item => {
        item.addEventListener("mouseenter", e => {
            if(!e.target.classList.contains("item-highlight")){
                e.target.classList.add("item-highlight");
            } 
            addRandomColor(e.target);
        })
    })
}

/**
 * Adds an event listerner to every item in the arguments array that is passed in; each item
 * is given a mouse-enter event, where the "item-highlight" class is removed from the element
 * if it is currently assigned
 * @param {*} gridItems  
 */
function removeHoverEffect(gridItems){
    if(gridItems.length < 1){
        return; 
    }
    gridItems.forEach(item => {
        item.addEventListener("mouseenter", e => {
            if(e.target.classList.contains("item-highlight")){
                e.target.classList.remove("item-highlight");
            } 
        })
    })
}

window.addEventListener('load', setDefaultGrid);
resetButton.addEventListener('click', resetGrid);
drawEraseButton.addEventListener('click', e => {
    if (e.target.innerText === "Erase"){
        e.target.innerText = "Draw";
        removeHoverEffect(document.querySelectorAll(".item"));
    } else if (e.target.innerText === "Draw"){
        e.target.innerText = "Erase";
        addHoverEffect(document.querySelectorAll(".item"));
    }
});

