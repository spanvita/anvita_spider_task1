let canvas=document.getElementById("needle")
let flag=0;
let v=0;
let count=0;
canvas.width=450;
canvas.height=300;
let c=canvas.getContext("2d");
let score_animate_id;
let hammer_animate_id
let player1score=0;
let player2score=0;
//imageh for hammer
//images for scoreboard
let audio=new Audio("sound.mp3");
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
    k.clearRect(0,0,canvas2.width,canvas2.height);
    hammer_animate_id=requestAnimationFrame(hammeranime);
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
    score_animate_id=requestAnimationFrame(scoreboard_animate);
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

function locate()
{
    location.reload();
}

function alert_now()
{
    window.alert("Game restarts in 5 seconds");
}

document.getElementById("strike").onclick=function()
{
    audio.play();
    circle=new Circle(152,445,0);
    image=new Imagehammer(0);
    count+=1;
    if(count>10)
    {
        window.alert("Each player gets a maximum of 5 chances.");
    }
    
    // console.log(count);

    

    else if(count%2==0)
    {
        document.getElementById("h3").textContent="Player 1's turn";
    }
    else{
        document.getElementById("h3").textContent="Player 2's turn";
    }
    
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
        cancelAnimationFrame(hammer_animate_id);
        hammeranime();
    }
    else{
        window.alert("Image not loaded");
    }

    if(scoreboard_load==true)
    {
        circle.score=score;
        cancelAnimationFrame(score_animate_id);
        setTimeout(scoreboard_animate,750);
        
    }
    else{
        window.alert("Image not loaded");
    }
    score=Math.trunc(score);
    if(count%2==0)
    {
        player2score+=score;
        console.log(player2score);
        setTimeout(function(){document.getElementById("my_h2p2").textContent=`Player 2 Score:${player2score}`},2000);
    }
    else if(count%2 !=0){
        player1score+=score;
        setTimeout(function(){document.getElementById("my_h2p1").textContent=`Player 1 Score:${player1score}`},2000);
    }

    if(count==10)
    {
        if(player2score>player1score)
        {
            document.getElementById("h3").textContent="Player 2 Wins!!!";
            setTimeout(alert_now,2000);
            setInterval(locate,7000);
        }
        else if(player2score==player1score)
        {
            document.getElementById("h3").textContent="It's a Draw!!!";
            setTimeout(alert_now,2000);
            setInterval(locate,7000);
        }
        else{
            document.getElementById("h3").textContent="Player 1 Wins!!!";
            setTimeout(alert_now,2000);
            setInterval(locate,7000);
        }
        
    }
}




