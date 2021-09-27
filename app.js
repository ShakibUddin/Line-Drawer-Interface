let grid = document.getElementById("box");
let cells = [];
let x0 = document.getElementById('x0');
let x1 = document.getElementById('x1');
let y0 = document.getElementById('y0');
let y1 = document.getElementById('y1');
let drawButton = document.getElementById('draw-button');
let form = document.getElementById('form');

function generateGrid(cells) {
    let colorPath = false;
    if (cells.length > 0) {
        grid.innerHTML = "";
        colorPath = true;
    }
    for (let j = 9; j >= 0; --j) {
        for (let i = 0; i < 10; ++i) {
            let cell = document.createElement("div");
            cell.innerHTML = `<p>${i},${j}</p>`;
            cell.classList.add('cell');
            if (colorPath && cells.includes(`${i},${j}`)) {
                cell.style.color = "white";
                console.log(`color ${i},${j}`)
                cell.style.backgroundColor = "blue";
                cell.classList.add('animate__bounceIn');
            }
            grid.appendChild(cell);
        }
    }
}

function generatePath(x0, x1, y0, y1) {
    cells = [];
    console.log(x0, x1, y0, y1)
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
    generateGrid(cells);
}

function extractInput() {
    let input = [parseInt(x0.value), parseInt(x1.value), parseInt(y0.value), parseInt(y1.value)];
    x0.value = "";
    x1.value = "";
    y0.value = "";
    y1.value = "";
    return input;
}

generateGrid([]);
drawButton.addEventListener('click', (e) => {
    generatePath(...extractInput());
    e.preventDefault();
})
