var canvas = document.querySelector('canvas')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

// //Reactangle
// c.fillStyle = 'rgba(255, 0, 0, 0.7)';
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = 'rgba(0, 255, 0, 0.7)';
// c.fillRect(400, 100, 100, 100);
// c.fillRect(300, 300, 100, 100);


// // Line
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400,300);
// c.strokeStyle = "red"
// c.stroke();


// //Arc / Circle
// c.arc(300,300,30, 0, Math.PI*2 ); // In radian
// c.stroke();
// c.beginPath();
// c.arc(200,400,30, 0, Math.PI*2,false ); // In radian
// c.strokeStyle = "blue";
// c.stroke();

// for(var i = 0; i < 3; i++){
//     var x = Math.random() * window.innerWidth;
//     var y = Math.random() * window.innerHeight;
//     var r = Math.random() * 255;
//     var g = Math.random() * 255;
//     var b = Math.random() * 255;
//     c.beginPath();
//     c.arc(x , y ,30, 0, Math.PI*2,false ); // In radian
//     c.strokeStyle = "rgba({r} , {g} , {b}, 0.7)";
//     c.stroke(); 
// }




// var x = Math.random() * innerWidth;
// var y = Math.random() * innerHeight;
// var dx = (Math.random() - 0.5) * 10 ;
// var dy = (Math.random() - 0.5) * 10;
// var radius = 30;
// function animate()  {
//     requestAnimationFrame(animate);
//     c.clearRect(0 ,0, innerWidth, innerHeight);  //clear the rec of given size
//     c.beginPath();
//     c.arc(x, y, radius, 0, Math.PI*2, false);
//     c.strokeStyle = 'blue';
//     c.stroke();


//     if(x + radius > innerWidth || x-radius < 0){
//         dx = -dx;
//     }

//     if(y + radius > innerHeight || y-radius < 0){
//         dy = -dy;
//     }
//     x+=dx;
//     y+= dy;
// }
// animate();


/////////////////////////////////////
var mouse = {
    x: undefined,
    y: undefined
}
window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;

});
window.addEventListener('resize',function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})
var colorArray =[
    "#C004D9B3",
    "#E74C3CB3",
    "#ECF0F1B3",
    "#3498DBB3",
    "#2980B9B3"
];
var maxRadius = 50;
    
function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    

    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        // c.strokeStyle = 'blue';
        // c.stroke();
        c.fillStyle =this.color ;
        c.fill();
    }

    this.update = function() {
        if(this.x + this.radius > innerWidth || this.x-this.radius < 0){
            this.dx = -this.dx;
        }
    
        if(this.y + this.radius > innerHeight || this.y-this.radius < 0){
            this.dy = -this.dy;
        }
       this.x+=this.dx;
        this.y+= this.dy;
        //interactivity
        if(mouse.x - this.x < 50 && mouse.x - this.x > -50
            && mouse.y - this.y < 50 && mouse.y - this.y > -50){
                if(this.radius < maxRadius){
                this.radius += 1;
                }
            }
        else if (this.radius > this.minRadius){
            this.radius -= 1;
        }
        this.draw();
    }
}

// var circle = new Circle(200, 200, 3, 3, 30);
var circles = [];

function init(){
circles = []; 
for(var i = 0; i < 500; i++){
    var x = Math.random() * (innerWidth - radius*2) + radius;
    var y = Math.random() * (innerHeight - radius*2) + radius;
    var dx = (Math.random() - 0.5) * 2 ;
    var dy = (Math.random() - 0.5) * 2;
    var radius = Math.random() * 6 + 1;
    circles.push(new Circle(x, y, dx, dy, radius));
}}
    init();
     animate();

 function animate(){
     requestAnimationFrame(animate);
     c.clearRect(0, 0, innerWidth, innerHeight);
     for(var i = 0; i < circles.length; i++){
            circles[i].update();
     }
    //  circle.update();
 }