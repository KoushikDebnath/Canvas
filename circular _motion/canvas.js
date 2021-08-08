var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');


// canvas.width = innerWidth;
// canvas.height = innerHeight;

canvas.width = innerWidth;
canvas.height = innerHeight;

// console.log(canvas.height);
const mouse = {
    x: canvas.width/2,
    y: canvas.height/2
   };

   const colors = [
       '#00bdff',
       '#4d39ce',
       '#088eff'
   ]
   // Event Listeners
   addEventListener('mousemove', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY
   });
   addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
   });
//Utility Function
   function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min +1 ) + min);
}

function randomColor(colors){
    return colors[Math.floor(Math.random() * colors.length)];
}


//Object
function Particle(x, y, radius, color) {
    this.x = x;
    // console.log(this.x);
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radians = Math.random() * Math.PI * 2;
    this.velocity = 0.05;
    this.distanceFromCenter = randomIntFromRange(50, 120);
    this.lastMouse = {x : x, y: y };
    // console.log(this.lastMouse.x)
    this.draw = lastPoint =>  {
        c.beginPath();
        c.strokeStyle = this.color;
        c.lineWidth = this.radius;
        c.moveTo(lastPoint.x, lastPoint.y);
        c.lineTo(this.x, this.y);
        c.stroke();
       
        c.closePath();
       }

       this.update = () =>{
        console.log(this.lastMouse.x)   
        //    console.log(this.x);
          const lastPoint ={x: this.x, y: this.y};
            // console.log(lastPoint)
        //Move mouse over time
        this.radians += this.velocity;

        //Drag effect
        this.lastMouse.x += (mouse.x - this.lastMouse.x)* 0.05; 
        this.lastMouse.y += (mouse.y - this.lastMouse.y)* 0.05;
        // console.log(this.lastMouse);
        console.log(mouse.x);
        //Circular Motion
        this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter;
        this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter;
        // console.log(this.x);
        // console.log(this.lastMouse.x);
        // console.log(Math.cos(this.radians) * this.distanceFromCenter);

        this.draw(lastPoint);
       
         }
   }

//Implementation
 let particles;
function init() {
 particles = [];
 for (let i = 0; i < 50; i++) {
 let x = canvas.width / 2;
 let y = canvas.height / 2;
 let radius =  (Math.random() * 2) +1 ;
 let color = randomColor(colors);
 particles.push(new Particle(x, y, radius, color));
 }
  console.log(particles[0]);
}

    init();
   animate();
//Animation Loop
   function animate() {
       console.log("animate");
    requestAnimationFrame(animate); // Create an animation loop
    c.fillStyle = 'rgba(255, 255, 255, 0.1)';
    c.fillRect(0, 0, canvas.width, canvas.height); // Erase whole canvas
    particles.forEach(particle => {
    particle.update();
    });
    
   }
   