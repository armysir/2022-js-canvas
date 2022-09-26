const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const modeBtn = document.getElementById("mode-btn")
const colorOption = Array.from(document.getElementsByClassName("color"));
const destroyBtn = document.getElementById("destroy-btn");
const file =document.getElementById("file");
const eraserBtn = document.getElementById("eraser-btn");
const textInput =document.getElementById("text");
const saveBtn = document.getElementById("save")
canvas.width = 500;
canvas.height = 500;
ctx.lineCap = "round"
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
function onFileChange(event){
    

    console.dir(event.target)
    const files = event.target.files[0];
    const url = URL.createObjectURL(files);
    console.log(url);
    const image = new Image();
    image.src = url;
    image.onload = function(){
        ctx.drawImage(image,0,0,500,500)
        
    }
}
function onDb(event){
    ctx.save();
    console.log(textInput.value)
    text = textInput.value;
    ctx.font="20px sefif"
    ctx.lineWidth=1;
    ctx.fillText(text,event.offsetX,event.offsetY);
    console.log(event.offsetX,event.offsetY)
    ctx.restore();

}
function onSaveClick (){
   const url = canvas.toDataURL();
   const a = document.createElement("a")
   a.href = url ;
   a.download = "내 그림";
   a.click();
   

}
canvas.addEventListener("mousemove",onClick)
canvas.addEventListener("mousedown",onMouse)
canvas.addEventListener("mouseup",onMouseUp)
canvas.addEventListener("mouseleave",onMouseUp)
canvas.addEventListener("click",onCanvasFill);
canvas.addEventListener("dblclick",onDb);


lineWidth.addEventListener("change",onLineWidthChange)
color.addEventListener("change",onColorChange);
colorOption.forEach(a =>a.addEventListener("click",onColorClick))
console.log(colorOption)

modeBtn.addEventListener("click",onModeClick)
destroyBtn.addEventListener("click",onCanvasDestroy);
eraserBtn.addEventListener("click",onClickEraser);
file.addEventListener("change",onFileChange)
saveBtn.addEventListener("click",onSaveClick);