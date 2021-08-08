//Initial Setup
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;


//Variables
var mouse = {
    x: innerWidth/2,
    y: innerHeight/2
};

var colors = [
    '#2185C5',
    '#7ECEFD',
    '#FFF6E5',
    '#FF7F66'
];

var gravity = 1;
var friction = 0.99;
//Event Listiners
addEventListener("mousemove", function(event){
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

addEventListener("resize", function(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});

addEventListener("click", function(){
    init();
})
//Utility Functons
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min +1 ) + min);
}

function randomColor(colors){
    return colors[Math.floor(Math.random() * colors.length)];
}

//Objects
function Ball(x, y, dx, dy, radius, color){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
    
    this.update = function(){
        if(this.y + this.radius+ this.dy> canvas.height){
            this.dy = - this.dy * friction;
        }
        else{
            this.dy += gravity;
        }

        if(this.x + this.radius +this.dx > canvas.width || this.x - this.radius<= 0){
            this.dx = -this.dx;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
        //console.log(dx);
    };




    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2,false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    };
}


//Implementation
//var ball;
var balls = [];
function init() {
    balls = [];
    for(var i = 0; i < 100; i++){
        var x = randomIntFromRange(0, canvas.width- radius);
        var y = randomIntFromRange(0, canvas.height- radius);
        var dx = randomIntFromRange(-2, 2);
        var dy = randomIntFromRange(-2, 2);
        var radius = randomIntFromRange(10, 30);
        var color = randomColor(colors);
        balls.push(new Ball(x, y, dx, dy, radius,color ))
    }
    //  ball = new Ball(canvas.width/2, canvas.height/2, 2, 30, 'red')
}

//Animation Loop
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    // c.fillText("HTML CANVAS BOILERPLATE", mouse.x, mouse.y);
    // console.log(ball);
    for(var i = 0; i < balls.length; i++){
        balls[i].update();
    }
    // ball.update();

}
init();
animate();