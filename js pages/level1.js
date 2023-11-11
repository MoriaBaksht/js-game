const tilesContainer=document.querySelector(".tiles");
const images=["../img/one.png","../img/two.png","../img/three.png","../img/four.png"]
const allImages=[...images,...images]
const tileCount=allImages.length;
// Game state:
let revealedCount=0;//how many steps i did
let activeTile=null;
let awaitingEndOfMove=false;
let countdown;
let timerValue=60


function updateTimer(){
let timerElement=document.getElementById("myTimer")
timerElement.textContent=timerValue;

if(timerValue===0){
    clearInterval(countdown);
    console.log("timer ended!!!")
    buildTile()
    window.location.href="../html pages/endPage.html"
}
else{
    timerValue--;
}
}
startTimer();
function startTimer(){
    console.log("start timer")
    countdown=setInterval(updateTimer,1000)
}
function buildTile(image){
    
    const element=document.createElement("div");
    element.classList.add("tile");//study!!!!!!!!
    element.setAttribute("data-image",image);//stusy!!!!!!!!
    element.setAttribute("data-revealed",false)
    element.addEventListener("click",()=>{
        const revealed=element.getAttribute("data-revealed")
        if(awaitingEndOfMove||revealed===true||element==activeTile){
            return;
        }
        element.style.backgroundImage= `url(${image})`
        
        if(!activeTile){
            activeTile=element;
            return;
        }
        const imageToMatch=activeTile.getAttribute("data-image")
        if(imageToMatch===image){
            element.setAttribute("data-revealed","true");
            activeTile.setAttribute("data-revealed","true")
            activeTile=null;
            awaitingEndOfMove=false;
            revealedCount+=2;

            if(revealedCount===tileCount){
                window.location.href="../html pages/winnerPage.html"
                // alert("you win! refresh to start again.");
            }
            return;
        }


        //down here
        awaitingEndOfMove=true;

        setTimeout(()=>{
            element.style.backgroundImage="";
            activeTile.style.backgroundImage="";

            awaitingEndOfMove=false;
            activeTile=null;
        },1000)
    }); 



    return element;
}


//Build up tiles:
for(let i=0;i<tileCount;i++){
    const randomIndex=Math.floor(Math.random()*allImages.length);
    const image=allImages[randomIndex];
    const tile=buildTile(image)

    allImages.splice(randomIndex,1);//we remove this picture from the array because we want the picture just two times
    tilesContainer.appendChild(tile);

}

