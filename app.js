let grid = document.getElementById("box");
let cells = [];
let gridRow, gridCol;
let rowInput = document.getElementById('row');
let colInput = document.getElementById('col');
let x0 = document.getElementById('x0');
let x1 = document.getElementById('x1');
let y0 = document.getElementById('y0');
let y1 = document.getElementById('y1');
let drawButton = document.getElementById('draw-button');
let drawGridButton = document.getElementById('draw-grid-button');
let coodForm = document.getElementById('form');
let gridForm = document.getElementById('grid-form');

function setGridProperties(row, col) {
    grid.style.display = "grid";
    grid.style.gridTemplateRows = `repeat(${row},50px)`;
    grid.style.gridTemplateColumns = `repeat(${col},50px)`;
    x0.setAttribute("max", row - 1);
    x1.setAttribute("max", row - 1);
    y0.setAttribute("max", col - 1);
    y1.setAttribute("max", col - 1);
}

//drawing/updating board
function drawGrid(cells, row, col) {
    let colorPath = false;
    if (cells.length > 0) {
        grid.innerHTML = "";
        colorPath = true;
    }
    for (let j = row - 1; j >= 0; --j) {
        for (let i = 0; i < col; ++i) {
            let cell = document.createElement("div");
            cell.innerHTML = `<p>${i},${j}</p>`;
            cell.classList.add('cell');
            if (colorPath && cells.includes(`${i},${j}`)) {
                cell.style.color = "white";
                cell.style.backgroundColor = "blue";
                cell.classList.add('animate__bounceIn');
            }
            grid.appendChild(cell);
        }
    }
}

//collecting path
function generatePath(x0, x1, y0, y1) {
    let dx = x1 - x0;
    let dy = y1 - y0;
    let steps = Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy);
    let xIncrement = dx / steps;
    let yIncrement = dy / steps;
    let x = x0;
    let y = y0;
    cells.push(`${Math.round(x)},${Math.round(y)}`);

    for (let i = 0; i < steps; i++) {
        x += xIncrement;
        y += yIncrement;
        cells.push(`${Math.round(x)},${Math.round(y)}`);
    }
    console.log(cells);
    drawGrid(cells, gridRow, gridCol);
}

//extracting inputs
function extractInput() {
    let input = [parseInt(x0.value), parseInt(x1.value), parseInt(y0.value), parseInt(y1.value)];
    clearCoodInputFields();
    return input;
}

function clearCoodInputFields() {
    x0.value = "";
    x1.value = "";
    y0.value = "";
    y1.value = "";
}
function extractGridProperties() {
    gridRow = parseInt(rowInput.value);
    gridCol = parseInt(colInput.value);
    rowInput.value = "";
    colInput.value = "";
}

coodForm.addEventListener('submit', (e) => {
    //clearing cells for new path
    cells = [];
    generatePath(...extractInput());
    e.preventDefault();
});

gridForm.addEventListener('submit', (e) => {
    extractGridProperties();
    //clearing grid to make a new one
    grid.innerHTML = "";
    //clearing previous cells
    cells = [];
    clearCoodInputFields();
    setGridProperties(gridRow, gridCol);
    drawGrid(cells, gridRow, gridCol);
    e.preventDefault();
});
