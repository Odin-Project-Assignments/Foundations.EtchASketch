const container = document.getElementById("container");
const resetButton = document.getElementById("reset");

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
        gridItem.innerText = i + 1;
        container.appendChild(gridItem).className = "item";
    }
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
    removeAllChildrenElements(container);
    let number = parseInt(prompt("How many squares per side would you like for the grid? (must be between 1 and 100)"));
    while(!(number > 0) || !(number < 101)){
        number = parseInt(prompt("Please enter a valid number!"));
    }

    makeGrid(number, number);
}

makeGrid(16, 16);
resetButton.addEventListener('click', resetGrid);

