const clearButton = document.getElementById("clear");
const saveButton = document.getElementById("save");
const loadButton = document.getElementById("load");
const showButton = document.getElementById("show");
const hideButton = document.getElementById("hide");
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');
let colorInput = document.querySelector('#color');
let lineWidthSlider = document.querySelector('#lineWidth');
//var linesArray;

window.addEventListener("load", () => {
  //resize canvas on load
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  showButton.style.display = "none";

  //variables
  let painting = false;

  function startPosition(e) {
    painting = true;
    paint(e);
  }
  function endPosition() {
    painting = false;
    ctx.beginPath();
  }
  function paint(e) {
    if (!painting) return;
    ctx.lineWidth = lineWidth.value;
    ctx.lineCap = 'round';
    ctx.strokeStyle = colorInput.value;

    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
  }
  //event listeners
  canvas.addEventListener('pointerdown', startPosition);
  canvas.addEventListener('pointerup', endPosition);
  canvas.addEventListener('pointermove', paint);
});

//color input
colorInput.addEventListener('input', () => {
  let color = colorInput.value;
});

//width input
lineWidthSlider.addEventListener('input', () => {
  let width = lineWidthSlider.value;
});

//hide button
hideButton.addEventListener("click", function (hideButtonClickEvent) {
  hideButtonClickEvent.preventDefault();
  var x = document.getElementById("head");
  x.style.display = "none";
  showButton.style.display = "block";
});

//show button
showButton.addEventListener("click", function (showButtonClickEvent) {
  showButtonClickEvent.preventDefault();
  var x = document.getElementById("head");
  x.style.display = "block";
  showButton.style.display = "none";
});

//clear button
clearButton.addEventListener("click", function (clearButtonClickEvent) {
  clearButtonClickEvent.preventDefault();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

//save button
saveButton.addEventListener("click", function (saveButtonClickEvent) {
  saveButtonClickEvent.preventDefault();

  //save canvas to local storage
  localStorage.setItem(canvas, canvas.toDataURL())
});

//load button
loadButton.addEventListener("click", function (loadButtonClickEvent) {
  loadButtonClickEvent.preventDefault();

  //pull canvas from local storage
  var dataURL = localStorage.getItem(canvas);

  //instatiate and set a new html5 image element
  var art = new Image;
  art.src = dataURL;

  //draw saved canvas on load
  art.onload = function () {
    ctx.drawImage(art, 0, 0);
  }
});

//resize canvas on window resize
window.addEventListener('resize', () => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
});