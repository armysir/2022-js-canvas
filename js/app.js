const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const modeBtn = document.getElementById("mode-btn")
const colorOption = Array.from(document.getElementsByClassName("color"));
const destroyBtn = document.getElementById("destroy-btn");
const file =document.getElementById("file");
const eraserBtn = document.getElementById("eraser-btn");
canvas.width = 500;
canvas.height = 500;
ctx.lineWidth=lineWidth.value;
let isPainting = false;
let isFilling = false;


const arr=   [ "red","blue","green","yellow","purple"]


function onClick(event){
    if(isPainting)
    {
        ctx.lineTo(event.offsetX,event.offsetY)
        ctx.stroke();
        
        return;
    }
    ctx.moveTo(event.offsetX,event.offsetY);
   
    
    

}
function onMouse (event){
    isPainting = true;

}
function onMouseUp (event){
    ctx.beginPath();
    isPainting = false;
}

function onLineWidthChange(event){
   
    ctx.lineWidth=event.target.value;

}
function onColorChange(event){
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle= event.target.value;
}

function onColorClick(event)
{
    console.log(event.target.dataset.color)
    ctx.strokeStyle = event.target.dataset.color
    ctx.fillStyle= event.target.dataset.color
    color.value = event.target.dataset.color;

}
function onModeClick(event){
    if(isFilling){
        isFilling=false
        modeBtn.innerText = "배경"
        
    }
    else{
        isFilling=true;
        modeBtn.innerText = "선"
        ctx.fill();

    }

}
function onCanvasFill(){
    if(isFilling)
    {
        
        ctx.fillRect(0,0,800,800);
    }
}
function onCanvasDestroy(){
    ctx.fillStyle="white";
    ctx.fillRect(0,0,800,800)
    
}
function onClickEraser (){
    ctx.strokeStyle ="white"
    if(isFilling)
    {
        isFilling = false;
        modeBtn.innerText = "채우기"
    }
}
canvas.addEventListener("mousemove",onClick)
canvas.addEventListener("mousedown",onMouse)
canvas.addEventListener("mouseup",onMouseUp)
canvas.addEventListener("mouseleave",onMouseUp)
canvas.addEventListener("click",onCanvasFill);


lineWidth.addEventListener("change",onLineWidthChange)
color.addEventListener("change",onColorChange);
colorOption.forEach(a =>a.addEventListener("click",onColorClick))
console.log(colorOption)

modeBtn.addEventListener("click",onModeClick)
destroyBtn.addEventListener("click",onCanvasDestroy);
eraserBtn.addEventListener("click",onClickEraser);
file.addEventListener("change",onFileChange)