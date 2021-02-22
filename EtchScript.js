const container = document.getElementById("container");

function makeGrid(numberOfRows, numberOfColumns){
    container.style.setProperty('--row-count', numberOfRows);
    container.style.setProperty('--column-count', numberOfColumns);
    for(let i = 0; i < (numberOfRows * numberOfColumns); i++){
        let gridItem = document.createElement("div");
        gridItem.innerText = i + 1;
        container.appendChild(gridItem).className = "item";
    }
}

makeGrid(16, 16);
