let canvas=document.getElementById("main_board");
canvas.width=900;
canvas.height=885;
let c=canvas.getContext("2d");
console.log(canvas.width);
const board=new Image();
board.src="canvas.jpg";
let lead_appear=false;
if(localStorage.getItem('Golden Excalibur')==null)
{
    localStorage.setItem('Golden Excalibur',JSON.stringify(0));
    localStorage.setItem('Ruby Saber',JSON.stringify(0));
}
let gold_score=Number(localStorage.getItem('Golden Excalibur'));
let ruby_score=Number(localStorage.getItem('Ruby Saber'));

let black=0;
let gold_col='';
let gold_col_number=0;
let gold_row=0;
let ruby_col=0;
let ruby_col_number=0;
let ruby_row='';
let mapImage;
let set_gold;
let set_ruby;
let first_click=0;

let game_end=false;

let totaltime_gold=119;
let totaltime_ruby=119;

let history=[];
let history_image;

const button_sound=new Audio("button1.mp3");
const number_sound=new Audio("number.mp3");
let issound=true;

let isdark=true;

function time_gold()
{
    let min=Math.floor(totaltime_gold/60);
    let sec=totaltime_gold%60;
    sec=(sec<10)?`0`+sec : sec;
    console.log(totaltime_gold)
    if(totaltime_gold>=0)
    document.getElementById("timer_gold").textContent=`${min} : ${sec}`
    if(totaltime_gold==0)
    {
        window.alert("Game ends due to Timeout");
        clearInterval(set_gold);
        clearInterval(set_ruby);
        document.getElementById("winner").textContent="RUBY SABER WINS!!!";
        game_end=true;
    }
    if(totaltime_gold>=0)
        totaltime_gold-=1
    
}


function time_ruby()
{
    let min=Math.floor(totaltime_ruby/60);
    let sec=totaltime_ruby%60;
    sec=(sec<10)?`0`+sec : sec;
    console.log(totaltime_ruby)
    if(totaltime_ruby>=0)
    document.getElementById("timer_ruby").textContent=`${min} : ${sec}`
    if(totaltime_ruby==0)
    {
        window.alert("Game ends due to Timeout")
        document.getElementById("winner").textContent="GOLDEN EXCALIBUR WINS!!!";
        game_end=true;
    }
    if(totaltime_ruby>=0)
        totaltime_ruby-=1
    
}

// setInterval(time_silver,1000);

function loc()
{
    location.reload();
}


function undo()
{
    if(history.length>0)
    {
        
        if(count==1)
        {
            circle.x=91+120*(gold_col_number-1);
            circle.y=680-120*(gold_row-1);
            circle.color='white';
            circle.draw();
            console.log("colored white");
            mapImage=c.getImageData(0,0,canvas.width,canvas.height);
            c.putImageData(history.pop(),0,0);//remove out of history permanently, so that it doesnt affect replay...
            c.putImageData(history.pop(),0,0);
            gold_col[gold_row]='white';
            
            count=0;
            document.getElementById("gold").textContent='PLACE';
            history_image=c.getImageData(0,0,canvas.width,canvas.height);
            history.push(history_image);
                    
        }
        else if(count==3)
        {
            circle.x=91+120*(ruby_col_number-1);
            circle.y=680-120*(ruby_row-1);
            circle.color='white';
            circle.draw();
            mapImage=c.getImageData(0,0,canvas.width,canvas.height);
            c.putImageData(history.pop(),0,0);//remove out of history permanently, so that it doesnt affect replay...
            c.putImageData(history.pop(),0,0);
            ruby_col[ruby_row]='white';
            
            count=2;
            document.getElementById("ruby").textContent='PLACE';
            history_image=c.getImageData(0,0,canvas.width,canvas.height);;
            history.push(history_image);
        }
    }
}


function replay() {
    function shift() {
        if (history.length > 0) {
            c.putImageData(history.shift(), 0, 0);
            setTimeout(shift, 2000); 
        }
    }

    shift();
}

function extra_time()
{
    if(count==0 ||count==1)
    {
        clearInterval(set_gold);
        totaltime_gold+=20;
        set_gold=setInterval(time_gold,1000);
        console.log("successfully inc time for gold");
    }
    else if(count==2 || count==3)
    {
        clearInterval(set_ruby);
        totaltime_ruby+=20;
        set_ruby=setInterval(time_ruby,1000);
    }

}

function time_thief()
{
    if(count==0 ||count==1)
    {
        
        totaltime_ruby-=10;
        time_ruby();
    }
    else if(count==2 || count==3)
    {
        totaltime_gold-=10;
        time_gold()
    }
}

function another_move()
{
    if(count==1)
    {
        count=0;
    }
    else if(count==3)
    {
        count=2;
    }
}

function block_unblocked()
{
    if(count==0 || count==2)
    {
        black=0;
        c.putImageData(mapImage,0,0);
    }
}


let count=0;

let col1={
    1:'white',
    2:'white',
    3:'white',
    4:'white',
    5:'white',
    6:'white',
}

let col2={
    1:'white',
    2:'white',
    3:'white',
    4:'white',
    5:'white',
    6:'white',
}

let col3={
    1:'white',
    2:'white',
    3:'white',
    4:'white',
    5:'white',
    6:'white',
}

let col4={
    1:'white',
    2:'white',
    3:'white',
    4:'white',
    5:'white',
    6:'white',
}

let col5={
    1:'white',
    2:'white',
    3:'white',
    4:'white',
    5:'white',
    6:'white',
}

let col6={
    1:'white',
    2:'white',
    3:'white',
    4:'white',
    5:'white',
    6:'white',
}

let col7={
    1:'white',
    2:'white',
    3:'white',
    4:'white',
    5:'white',
    6:'white',
}

function score()
{
    if(col1[6]!='white'  && col2[6]!='white' && col3[6]!='white' && col4[6]!='white' && col5[6]!='white' && col6[6]!='white' && col7[6]!='white')
    {
        document.getElementById("winner").textContent="IT'S A DRAW!!!";
        game_end=true;
        clearInterval(set_gold);
        clearInterval(set_ruby);
    }
    for (let i=1;i<=3;i++)
    {
        if((col1[i]=='gold' && col1[i+1]=='gold' && col1[i+2]=='gold' && col1[i+3]=='gold')|| (col2[i]=='gold' && col2[i+1]=='gold' && col2[i+2]=='gold' && col2[i+3]=='gold')||(col3[i]=='gold' && col3[i+1]=='gold' && col3[i+2]=='gold' && col3[i+3]=='gold')||(col4[i]=='gold' && col4[i+1]=='gold' && col4[i+2]=='gold' && col4[i+3]=='gold')||(col5[i]=='gold' && col5[i+1]=='gold' && col5[i+2]=='gold' && col5[i+3]=='gold')||(col6[i]=='gold' && col6[i+1]=='gold' && col6[i+2]=='gold' && col6[i+3]=='gold')||(col7[i]=='gold' && col7[i+1]=='gold' && col7[i+2]=='gold' && col7[i+3]=='gold'))
        {
            document.getElementById("winner").textContent="GOLDEN EXCALIBUR WINS!!!";
            gold_score+=1;
            game_end=true;
            clearInterval(set_gold);
            clearInterval(set_ruby);
        }
        
    }
    for (let i=1;i<=6;i++)
    {
        if((col1[i]=='gold' && col2[i]=='gold' && col3 [i]=='gold' && col4[i]=='gold')||(col2[i]=='gold' && col3[i]=='gold' && col4 [i]=='gold' && col5[i]=='gold')||(col3[i]=='gold' && col4[i]=='gold' && col5 [i]=='gold' && col6[i]=='gold')||(col4[i]=='gold' && col5[i]=='gold' && col6 [i]=='gold' && col7[i]=='gold'))
        {
            document.getElementById("winner").textContent="GOLDEN EXCALIBUR WINS!!!";
            gold_score+=1;
            game_end=true;
            clearInterval(set_gold);
            clearInterval(set_ruby);
        }
       


    }
    
    let l=[col1,col2,col3,col4,col5,col6,col7];
    for(let i=0;i<3;i++)
    {
        for(let j=1;j<4;j++)
        {
            if((l[i][j]=='gold' && l[i+1][j+1]=='gold' && l[i+2][j+2]=='gold' && l[i+3][j+3]=='gold'))
            {
                document.getElementById("winner").textContent="GOLDEN EXCALIBUR WINS!!!";
                gold_score+=1;
                game_end=true;
                clearInterval(set_gold);
                clearInterval(set_ruby);
            }
          
        }
        
    }



    for(let i=6;i>3;i--)
    {
        for(let j=6;j>3;j--)
        {
            if((l[i][j]=='gold' && l[i-1][j-1]=='gold' && l[i-2][j-2]=='gold' && l[i-3][j-3]=='gold'))
            {
                document.getElementById("winner").textContent="GOLDEN EXCALIBUR WINS!!!";
                gold_score+=1;
                game_end=true;
                clearInterval(set_gold);
                clearInterval(set_ruby);
            }
          
        }
        
    }


    for (let i=1;i<=3;i++)
    {
        if((col1[i]=='ruby' && col1[i+1]=='ruby' && col1[i+2]=='ruby' && col1[i+3]=='ruby')||(col2[i]=='ruby' && col2[i+1]=='ruby' && col2[i+2]=='ruby' && col2[i+3]=='ruby')||(col3[i]=='ruby' && col3[i+1]=='ruby' && col3[i+2]=='ruby' && col3[i+3]=='ruby')||(col4[i]=='ruby' && col4[i+1]=='ruby' && col4[i+2]=='ruby' && col4[i+3]=='ruby')||(col5[i]=='ruby' && col5[i+1]=='ruby' && col5[i+2]=='ruby' && col5[i+3]=='ruby')||(col6[i]=='ruby' && col6[i+1]=='ruby' && col6[i+2]=='ruby' && col6[i+3]=='ruby')||(col7[i]=='ruby' && col7[i+1]=='ruby' && col7[i+2]=='ruby' && col7[i+3]=='ruby'))
        {
            document.getElementById("winner").textContent="RUBY SABER WINS!!!";
            ruby_score+=1;
            game_end=true;
            clearInterval(set_gold);
            clearInterval(set_ruby);
        }
        
    }
    for (let i=1;i<=6;i++)
    {
        if((col1[i]=='ruby' && col2[i]=='ruby' && col3 [i]=='ruby' && col4[i]=='ruby')||(col2[i]=='ruby' && col3[i]=='ruby' && col4 [i]=='ruby' && col5[i]=='ruby')||(col3[i]=='ruby' && col4[i]=='ruby' && col5 [i]=='ruby' && col6[i]=='ruby')||(col4[i]=='ruby' && col5[i]=='ruby' && col6 [i]=='ruby' && col7[i]=='ruby'))
            {
            document.getElementById("winner").textContent="RUBY SABER WINS!!!";
            ruby_score+=1;
            game_end=true;
            clearInterval(set_gold);
            clearInterval(set_ruby);
            }
        
    }

    for(let i=0;i<3;i++)
    {
        for(let j=1;j<4;j++)
        {
            if((l[i][j]=='ruby' && l[i+1][j+1]=='ruby' && l[i+2][j+2]=='ruby' && l[i+3][j+3]=='ruby'))
            {
                document.getElementById("winner").textContent="RUBY SABER WINS!!!";
                ruby_score+=1;
                game_end=true;
                clearInterval(set_gold);
                clearInterval(set_ruby);
            }
          
        }
        
    }



    for(let i=6;i>3;i--)
    {
        for(let j=6;j>3;j--)
        {
            if((l[i][j]=='ruby' && l[i-1][j-1]=='ruby' && l[i-2][j-2]=='ruby' && l[i-3][j-3]=='ruby'))
            {
                document.getElementById("winner").textContent="RUBY SABER WINS!!!";
                ruby_score+=1;
                game_end=true;
                clearInterval(set_gold);
                clearInterval(set_ruby);
            }
          
        }
        
    }


    if(game_end==true)
    {
        let game_number=Number(localStorage.getItem('Total no. of Games finished'));
        game_number+=1;
        console.log("game_end");
        localStorage.setItem('Total no. of Games finished',JSON.stringify(game_number));
        localStorage.setItem('Golden Excalibur',JSON.stringify(gold_score));
        localStorage.setItem('Ruby Saber',JSON.stringify(ruby_score));
    }
}

console.log(col1[2]);

class Circle
{
    constructor(x,y,color)
    {
        this.x=x;
        this.y=y;
        this.color=color;
    }
    draw()
    {
        c.beginPath();
        c.arc(this.x,this.y,30,0,Math.PI*2,false);
        c.strokeStyle="rgb(147, 88, 153)";
        c.stroke();
        c.fillStyle=this.color;
        c.fill();
    }
    updatex()
    {
        
        this.draw();
        this.x+=120;
    }
    updatey()
    {
        
        this.draw();
        this.y-=120;
        
    }
}




function cplacegold(column,col_name)
{
    c.putImageData(mapImage,0,0);
    for(let i=0;i<7;i++)
       {
            if(col_name[i]=='white')
            {
                console.log("place gold success");
                col_name[i]='gold';
                circle.x=91+120*(column-1);
                circle.y=680-120*(i-1);
                circle.color='gold';
                circle.draw();
                gold_col=col_name;
                gold_row=i;
                gold_col_number=column;
                break;
            
            }
            
        }  
    mapImage=c.getImageData(0,0,canvas.width,canvas.height);    
    history_image=mapImage;
    history.push(history_image);
    console.log("pushed into history after placing gold");
    score(); 
}


function cplaceruby(column,col_name)
{
    c.putImageData(mapImage,0,0); //to place the canvas as before black column was made
    for(let i=0;i<7;i++)
       {
            if(col_name[i]=='white')
            {
                console.log("place ruby successful");
                col_name[i]='ruby';
                circle.x=91+120*(column-1);
                circle.y=680-120*(i-1);
                circle.color='rgb(224, 17, 95)'
                circle.draw();
                ruby_col=col_name;
                ruby_row=i;
                ruby_col_number=column;
                break;
            }
            
        }  
    mapImage=c.getImageData(0,0,canvas.width,canvas.height); 
    history_image=mapImage;
    history.push(history_image);
    console.log("pushed into history after placing ruby");
    score();     
}

function block(column,col_name)
{
    console.log("successfully blocked");
    c.putImageData(mapImage,0,0);  //not necessary
    circle.x=91+120*(column-1);
    circle.y=680;
    circle.color='black';
    for(let j=0;j<6;j++)
    {
        circle.updatey();
        circle.draw();
    }
    history_image=c.getImageData(0,0,canvas.width,canvas.height);
    history.push(history_image);
    console.log("pushed into history after blocking");
    score();
}


let circle=new Circle(91,680,'white');



board.onload=function()
{
    c.drawImage(board,0,0,canvas.width,canvas.height);
    console.log("board loaded");
    circle.draw();
    for(let i=0;i<7;i++)
    {
        
        for(let j=0;j<6;j++)
        {
            circle.updatey();
        }
        circle.y=680;
        circle.updatex();
        
    }

    document.getElementById("leaderboard").onclick=function()
    {
        if(lead_appear==false)
        {
            lead_appear=true;
            document.getElementById("lead").hidden=false;
            console.log("leaderboard appears")
        }
        else if(lead_appear==true)
        {
            lead_appear=false;
            document.getElementById("lead").hidden=true;
        }
        document.getElementById("game").textContent=`Total no. of Games finished ${Number(localStorage.getItem('Total no. of Games finished'))}`
        document.getElementById("score_gold").textContent=`Golden Excalibur ${Number(localStorage.getItem('Golden Excalibur'))}`
        document.getElementById("score_ruby").textContent=`Ruby Saber ${Number(localStorage.getItem('Ruby Saber'))}`
    }
    mapImage=c.getImageData(0,0,canvas.width,canvas.height); 
    history_image=mapImage;
    history.push(history_image);

    document.getElementById("sound").onclick=function()
    {
        if(issound==true)
        {
            document.getElementById("sound_img").src='no_music.jpg';
            issound=false;
            button_sound.muted=true;
            number_sound.muted=true;
        }
        else if(issound==false)
        {
            document.getElementById("sound_img").src='music.png';
            issound=true;
            button_sound.muted=false;
            number_sound.muted=false;
        }

    }


    document.getElementById("bg_icon").onclick=function()
    {
        if(isdark==true)
        {
            console.log("make bg light");
            document.getElementById("icon").src="dark_icon.jpg";
            document.getElementById("bg").src="Light_bg.jpg";
            isdark=false;
        }
        else if(isdark==false)
        {
            console.log("make bg dark");
            document.getElementById("icon").src="light_icon.jpg";
            document.getElementById("bg").src="Dark_bg.jpg"
            isdark=true;
        }
    }

    document.getElementById("undo").onclick=function()
    {
        if(count==1 ||count==3)
        {
            button_sound.play();
            console.log("undo clicked");
            undo();
        }
    }

    document.getElementById("replay").onclick=function() //only after game ends...
    {
        if(game_end==true)
        {
        button_sound.play();
        console.log("replay clicked");
        replay();
        }
    }

    document.getElementById("extra_time_gold").onclick=function()
    {
        if(count==0 || count==1)
        {
        button_sound.play();
        console.log("extra time for gold");
        extra_time();
        this.remove();
        }
    }

    document.getElementById("extra_time_ruby").onclick=function()
    {
        if(count==2 || count==3)
        {
            button_sound.play();
        extra_time();
        this.remove();
        }
    }
    
    document.getElementById("time_thief_gold").onclick=function()
    {
        if(count==0 || count==1)
        {
            button_sound.play();
        time_thief();
        this.remove();
        }
    }
    
    document.getElementById("time_thief_ruby").onclick=function()
    {
        if(count==2 || count==3)
        {
            button_sound.play();
        time_thief();
        this.remove();
        }
    }

    document.getElementById("another_move_gold").onclick=function()
    {
        if(count==1)
        {
            button_sound.play();
        another_move();
        this.remove();
        }
    }

    document.getElementById("another_move_ruby").onclick=function()
    {
        if(count==3)
        {
            button_sound.play();
        another_move();
        this.remove();
        }
    }

    document.getElementById("block_unblocked_gold").onclick=function()
    {
        if(count==0)
        {
            button_sound.play();
        block_unblocked();
        this.remove();
        }
    }

    document.getElementById("block_unblocked_ruby").onclick=function()
    {
        if(count==2)
        {
            button_sound.play();
        block_unblocked();
        this.remove();
        }
    }

    document.addEventListener("click", function(event)
    {
        if(first_click==0)
        {
            set_gold=setInterval(time_gold,1000);
            first_click=1;
        }
        console.log("Entered event listener");
        
        const clickedId = event.target.id;
        if(clickedId=='b1')
        {
            
            if(count==0 && black!=1)
            {
                number_sound.play();
                document.getElementById("gold").textContent="BLOCK";
                console.log("clicked b1");
                cplacegold(1,col1);
                count+=1;
            }
            else if(count==1)
            {
                if((col2[6]=='white')||(col3[6]=='white')||(col4[6]=='white')||(col5[6]=='white')||(col6[6]=='white')||(col7[6]=='white'))
                {
                    // number_sound.play();
                    document.getElementById("gold").textContent="WAIT";
                    document.getElementById("ruby").textContent="PLACE";
                    block(1,col1);
                    black=1;
                }
                else
                {
                    document.getElementById("gold").textContent="Cannot block this column. Pls WAIT";
                    document.getElementById("ruby").textContent="PLACE";
                }
                count+=1;
                clearInterval(set_gold);
                set_ruby=setInterval(time_ruby,1000);
            }

            
        }

        if(clickedId=='b2')
        {
            if(count==0 && black!=2)
            {
                number_sound.play();
                document.getElementById("gold").textContent="BLOCK";
                console.log("clicked b2");
                cplacegold(2,col2);
                count+=1;
            }
            else if(count==1)
            {
                if((col1[6]=='white')||(col3[6]=='white')||(col4[6]=='white')||(col5[6]=='white')||(col6[6]=='white')||(col7[6]=='white'))
                {
                    // number_sound.play();
                    document.getElementById("gold").textContent="WAIT";
                    document.getElementById("ruby").textContent="PLACE";
                    block(2,col2);
                    black=2;
                }
                else
                {
                    document.getElementById("gold").textContent="Cannot block this column. Pls WAIT";
                    document.getElementById("ruby").textContent="PLACE";
                }
                count+=1;
                clearInterval(set_gold);
                set_ruby=setInterval(time_ruby,1000);
            }
        }

        if(clickedId=='b3')
        {
            if(count==0 && black!=3)
            {
                number_sound.play();
                document.getElementById("gold").textContent="BLOCK";
                console.log("clicked b3");
                cplacegold(3,col3);
                count+=1;
            }
            else if(count==1)
            {
                if((col1[6]=='white')||(col2[6]=='white')||(col4[6]=='white')||(col5[6]=='white')||(col6[6]=='white')||(col7[6]=='white'))
                {
                    // number_sound.play();
                    document.getElementById("gold").textContent="WAIT";
                    document.getElementById("ruby").textContent="PLACE";
                    block(3,col3);
                    black=3;
                }
                else
                {
                    document.getElementById("gold").textContent="Cannot block this column. Pls WAIT";
                    document.getElementById("ruby").textContent="PLACE";
                }
                count+=1;
                clearInterval(set_gold);
                console.log("gold interval cleared");
                set_ruby=setInterval(time_ruby,1000);
            }
        }
        if(clickedId=='b4')
        {
            if(count==0 && black!=4)
            {
                number_sound.play();
                document.getElementById("gold").textContent="BLOCK";
                console.log("clicked b4");
                cplacegold(4,col4);
                count+=1;
            }
            else if(count==1)
            {
                if((col1[6]=='white')||(col2[6]=='white')||(col3[6]=='white')||(col5[6]=='white')||(col6[6]=='white')||(col7[6]=='white'))
                {
                    // number_sound.play();
                    document.getElementById("gold").textContent="WAIT";
                    document.getElementById("ruby").textContent="PLACE";
                    block(4,col4);
                    black=4;
                }
                else
                {
                    document.getElementById("gold").textContent="Cannot block this column. Pls WAIT";
                    document.getElementById("ruby").textContent="PLACE";
                }
                count+=1;
                clearInterval(set_gold);
                set_ruby=setInterval(time_ruby,1000);
            }
        }
        if(clickedId=='b5')
        {
            if(count==0 && black!=5)
            {
                number_sound.play();
                document.getElementById("gold").textContent="BLOCK";
                console.log("clicked b5");
                cplacegold(5,col5);
                count+=1;
            }
            else if(count==1)
            {
                if((col1[6]=='white')||(col2[6]=='white')||(col3[6]=='white')||(col4[6]=='white')||(col6[6]=='white')||(col7[6]=='white'))
                {
                    // number_sound.play();
                    document.getElementById("gold").textContent="WAIT";
                    document.getElementById("ruby").textContent="PLACE";
                    block(5,col5);
                    black=5;
                }
                else
                {
                    document.getElementById("gold").textContent="Cannot block this column. Pls WAIT";
                    document.getElementById("ruby").textContent="PLACE";
                }
                count+=1;
                clearInterval(set_gold);
                set_ruby=setInterval(time_ruby,1000);
            }
        }
        if(clickedId=='b6')
        {
            if(count==0 && black!=6)
            {
                number_sound.play();
                document.getElementById("gold").textContent="BLOCK";
                console.log("clicked b6");
                cplacegold(6,col6);
                count+=1;
            }
            else if(count==1)
            {
                if((col1[6]=='white')||(col2[6]=='white')||(col3[6]=='white')||(col4[6]=='white')||(col5[6]=='white')||(col7[6]=='white'))
                {
                    // number_sound.play();
                    document.getElementById("gold").textContent="WAIT";
                    document.getElementById("ruby").textContent="PLACE";
                    block(6,col6);
                    black=6;
                }
                else
                {
                    document.getElementById("gold").textContent="Cannot block this column. Pls WAIT";
                    document.getElementById("ruby").textContent="PLACE";
                }
                count+=1;
                clearInterval(set_gold);
                set_ruby=setInterval(time_ruby,1000);
            }
        }
        if(clickedId=='b7')
        {
            
            if(count==0 && black!=7)
            {
                number_sound.play();
                document.getElementById("gold").textContent="BLOCK";
                console.log("clicked b7");
                cplacegold(7,col7);
                count+=1;
            }
            else if(count==1)
            {
                if((col1[6]=='white')||(col2[6]=='white')||(col3[6]=='white')||(col4[6]=='white')||(col5[6]=='white')||(col6[6]=='white'))
                {
                    // number_sound.play();
                    document.getElementById("gold").textContent="WAIT";
                    document.getElementById("ruby").textContent="PLACE";
                    block(7,col7);
                    black=7;
                }
                else
                {
                    document.getElementById("gold").textContent="Cannot block this column. Pls WAIT";
                    document.getElementById("ruby").textContent="PLACE";
                }
                count+=1;
                clearInterval(set_gold);
                set_ruby=setInterval(time_ruby,1000);
            }
        }




        if(clickedId=='c1')
        {
            if(count==2 && black!=1)
            {
                number_sound.play();
                document.getElementById("ruby").textContent="BLOCK";
                console.log("clicked c1");
                cplaceruby(1,col1);
                count+=1;
            }
            else if(count==3)
            {
                if((col2[6]=='white')||(col3[6]=='white')||(col4[6]=='white')||(col5[6]=='white')||(col6[6]=='white')||(col7[6]=='white'))
                {
                    // number_sound.play();
                    document.getElementById("ruby").textContent="WAIT";
                    document.getElementById("gold").textContent="PLACE";
                    block(1,col1);
                    black=1;
                }
                else
                {
                    document.getElementById("ruby").textContent="Cannot block this column. Pls WAIT";
                    document.getElementById("gold").textContent="PLACE";
                }
                count=0;
                set_gold=setInterval(time_gold,1000);
                clearInterval(set_ruby);
            }
        }

        if(clickedId=='c2')
        {
            if(count==2 && black!=2)
            {
                number_sound.play();
                document.getElementById("ruby").textContent="BLOCK";
                console.log("clicked c2");
                cplaceruby(2,col2);
                count+=1;
            }
            else if(count==3)
            {
                if((col1[6]=='white')||(col3[6]=='white')||(col4[6]=='white')||(col5[6]=='white')||(col6[6]=='white')||(col7[6]=='white'))
                {
                    // number_sound.play();
                    document.getElementById("ruby").textContent="WAIT";
                    document.getElementById("gold").textContent="PLACE";
                    block(2,col2);
                    black=2;
                }
                else
                {
                    document.getElementById("ruby").textContent="Cannot block this column. Pls WAIT";
                    document.getElementById("gold").textContent="PLACE";
                }
                count=0;
                set_gold=setInterval(time_gold,1000);
                clearInterval(set_ruby);
            }
        }

        if(clickedId=='c3')
        {
            if(count==2 && black!=3)
            {
                number_sound.play();
                document.getElementById("ruby").textContent="BLOCK";
                console.log("clicked c3");
                cplaceruby(3,col3);
                count+=1;
            }
            else if(count==3)
            {
                if((col1[6]=='white')||(col2[6]=='white')||(col4[6]=='white')||(col5[6]=='white')||(col6[6]=='white')||(col7[6]=='white'))
                {
                    // number_sound.play();
                    document.getElementById("ruby").textContent="WAIT";
                    document.getElementById("gold").textContent="PLACE";
                    block(3,col3);
                    black=3;
                }
                else
                {
                    document.getElementById("ruby").textContent="Cannot block this column. Pls WAIT";
                    document.getElementById("gold").textContent="PLACE";
                }
                count=0;
                set_gold=setInterval(time_gold,1000);
                clearInterval(set_ruby);
            }
        }
        if(clickedId=='c4')
        {
            if(count==2 && black!=4)
            {
                number_sound.play();
                document.getElementById("ruby").textContent="BLOCK";
                console.log("clicked c4");
                cplaceruby(4,col4);
                count+=1;
            }
            else if(count==3)
            {
                if((col1[6]=='white')||(col2[6]=='white')||(col3[6]=='white')||(col5[6]=='white')||(col6[6]=='white')||(col7[6]=='white'))
                {
                    // number_sound.play();
                    document.getElementById("ruby").textContent="WAIT";
                    document.getElementById("gold").textContent="PLACE";
                    block(4,col4);
                    black=4;
                }
                else
                {
                    document.getElementById("ruby").textContent="Cannot block this column. Pls WAIT";
                    document.getElementById("gold").textContent="PLACE";
                }
                count=0;
                set_gold=setInterval(time_gold,1000);
                clearInterval(set_ruby);
            }
        }
        if(clickedId=='c5')
        {
            if(count==2 && black!=5)
            {
                number_sound.play();
                document.getElementById("ruby").textContent="BLOCK";
                console.log("clicked c5");
                cplaceruby(5,col5);
                count+=1;
            }
            else if(count==3)
            {
                if((col1[6]=='white')||(col2[6]=='white')||(col3[6]=='white')||(col4[6]=='white')||(col6[6]=='white')||(col7[6]=='white'))
                {
                    // number_sound.play();
                    document.getElementById("ruby").textContent="WAIT";
                    document.getElementById("gold").textContent="PLACE";
                    block(5,col5);
                    black=5;
                }
                else
                {
                    document.getElementById("ruby").textContent="Cannot block this column. Pls WAIT";
                    document.getElementById("gold").textContent="PLACE";
                }
                count=0;
                set_gold=setInterval(time_gold,1000);
                clearInterval(set_ruby);
            }
        }
        if(clickedId=='c6')
        {
            if(count==2 && black!=6)
            {
                number_sound.play();
                document.getElementById("ruby").textContent="BLOCK";
                console.log("clicked c6");
                cplaceruby(6,col6);
                count+=1;
            }
            else if(count==3)
            {
                if((col1[6]=='white')||(col2[6]=='white')||(col3[6]=='white')||(col4[6]=='white')||(col5[6]=='white')||(col7[6]=='white'))
                {
                    // number_sound.play();
                    document.getElementById("ruby").textContent="WAIT";
                    document.getElementById("gold").textContent="PLACE";
                    block(6,col6);
                    black=6;
                }
                else
                {
                    document.getElementById("ruby").textContent="Cannot block this column. Pls WAIT";
                    document.getElementById("gold").textContent="PLACE";
                }
                count=0;
                set_gold=setInterval(time_gold,1000);
                clearInterval(set_ruby);
            }
        }
        if(clickedId=='c7')
        {
            if(count==2 && black!=7)
            {
                number_sound.play();
                document.getElementById("ruby").textContent="BLOCK";
                console.log("clicked c7");
                cplaceruby(7,col7);
                count+=1;
            }
            else if(count==3)
            {
                if((col1[6]=='white')||(col2[6]=='white')||(col3[6]=='white')||(col4[6]=='white')||(col5[6]=='white')||(col6[6]=='white'))
                {
                    // number_sound.play();
                    document.getElementById("ruby").textContent="WAIT";
                    document.getElementById("gold").textContent="PLACE";
                    block(7,col7);
                    black=7;
                }
                else
                {
                    document.getElementById("ruby").textContent="Cannot block this column. Pls WAIT";
                    document.getElementById("gold").textContent="PLACE";
                }
                count=0;
                set_gold=setInterval(time_gold,1000);
                clearInterval(set_ruby);
            }
        }
    
        
    
    })
    
}





