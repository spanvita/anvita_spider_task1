let canvas=document.getElementById("needle")
let flag=0;
let v=0;

canvas.width=450;
canvas.height=300;
let c=canvas.getContext("2d");

let audio=new Audio("sound.mp3");
//imageh for hammer
//images for scoreboard

document.getElementById("refresh").onclick=function()
{
    location.reload();
}


class Needle
{
    constructor(theta,vel,acc)
    {
        this.theta=theta;
        this.vel=vel;
        this.acc=acc;
        
    }
    draw()
    {
        this.x=Math.cos((this.theta*Math.PI)/180)*200+225;
        this.y=225-(Math.sin((this.theta*Math.PI)/180)*200);
        c.beginPath();
        c.moveTo(225,225);
        c.lineTo(this.x,this.y);
        c.lineWidth=6;
        c.stroke();
    }

 

    update()
    {
        this.draw();
        if(this.theta<=0)
        {
            flag=0
            this.vel=1
        }
        if(this.theta>=180)
        {
            flag=1
            this.vel=1
        }
        if(this.theta<=0)
            v=0
        if(this.theta<=91 && this.theta >=89)
            v=0.5
        if(this.theta>=180)
            v=1
        if(flag==0)
        {
            this.theta+=this.vel;
            // console.log(this.vel);
        }
        else
        {
            this.theta-=this.vel;
            // console.log(this.vel);
        }
        if(v==0)
        {
            this.vel+=(this.acc);
        }
        else if(v==0.5)
        {
            this.vel-=(this.acc);
        }
        else
        {
            this.vel+=(this.acc);
        }
        // console.log("update")
        // console.log(this.x,this.y)
    }
}


    


let needle=new Needle(0,1,16/483.0);
// needle.draw();

function animate()
{
    c.clearRect(0,0,canvas.width,canvas.height)
    requestAnimationFrame(animate);
    needle.update();
    // console.log("animate fn.")
}


animate();




let canvas2=document.getElementById("hammer")
canvas2.width=250;
canvas2.height=300;
let k=canvas2.getContext("2d");
const imageh=new Image();
imageh.src="Hammer.jpg";
// let imageh=document.getElementById("hammerimage");
// image directly in js, instead of from html
k.fillStyle='red';
k.fillRect(0,250,100,100);




class Imagehammer
{
    constructor(angle)
    {
        this.angle=angle;

    }
    draw()
    {
        console.log("entered image loop");
        k.clearRect(0,0,canvas2.width,canvas2.height);
        k.save();
        k.translate(220,180);
        k.rotate(this.angle*Math.PI/180);
        // k.translate(-100,-75);
        k.drawImage(imageh,-200,-75,200,150);
        
        k.restore();
        k.fillStyle='red';
        k.fillRect(25,235,100,50);
    }
    update()
    {
        this.draw();
        if(this.angle==0)
        {
            this.angle=0;
            k.fillStyle='green';
            k.fillRect(25,235,100,50);
        }
        else
            this.angle-=3;
        
            
    }
}


let image=new Imagehammer(0);
let imageLoaded=false;

imageh.onload=function()
    {
        console.log("image is loaded");
        imageLoaded=true;
        image.draw();
    }

function hammeranime()
{
    requestAnimationFrame(hammeranime);
    image.update();

}



let canvas3=document.getElementById("scoreboard");
canvas3.width=350;
canvas3.height=600;
let s=canvas3.getContext("2d");



const images=new Image();
images.src="Scoreboard_new.png";





class Circle
{
    constructor(x,y,score)
    {
        this.x=x;
        this.y=y;
        this.score=score;
    }
    draw()
    {
        s.beginPath();
        s.arc(this.x,this.y,10,0,Math.PI*2,false);
        s.fillStyle="red";
        s.strokeStyle="black"
        s.stroke();
        s.fill();
    }
    update()
    {
        this.draw();
        if(this.y>125+(100-this.score)*3.2)
            this.y-=2;
    }

}

function scoreboard_animate()
{
    s.clearRect(0,0,canvas3.width,canvas3.height);
    s.drawImage(images,0,0);
    requestAnimationFrame(scoreboard_animate);
    circle.update();
}


let circle=new Circle(152,445,0);

let scoreboard_load=false;

images.onload=function()
{
    scoreboard_load=true;
    s.drawImage(images,0,0);
    circle.draw();
}




document.getElementById("strike").onclick=function()
{
    audio.play();
    needle.vel=0;
    needle.acc=0;
    let pointer;
    // console.log(needle.theta);
    if(needle.theta>90)
        pointer=180-needle.theta;
    else
        pointer=needle.theta;
    let score=(100.0/90)*pointer;
    if(imageLoaded)
    {
        image.angle=90;
        hammeranime();
    }
    else{
        window.alert("Image not loaded");
    }

    if(scoreboard_load==true)
    {
        circle.score=score;
        setTimeout(scoreboard_animate,750);
        
    }
    else
    {
        window.alert("Image not loaded");
    }
    score=Math.trunc(score);
    setTimeout(function(){document.getElementById("my_h2").textContent=`Score:${score}`},2000);
}


