let boxes=document.querySelectorAll(".box");//array of box 0 to 8
let resetbtn=document.querySelector("#resetbutton");
let newgamebtn=document.querySelector("#newgame");
let msgcon=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
let turnO=true;//whether x's turn or 0's turn
//we will store the box patters which are win patterns
let moveCount=0;
const winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];
const showWinner=(winner)=>{
    disableBoxes();
    msg.innerText=`Congratulations ${winner} , you won!! \uD83D\uDE0A`;
    msgcon.classList.remove("hide");
    newgamebtn.style.display = "inline-block";
};
const tie=()=>{
    disableBoxes();
    msg.innerText="Try Again!!";
    msgcon.classList.remove("hide");
    newgamebtn.style.display = "inline-block";
};
const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
};
const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
};
const resetGame =() => {
    moveCount=0;
    turnO=true;
    enableBoxes();
    msgcon.classList.add("hide");
    newgamebtn.style.display="none";
};
const checkWinner= () => {
    for(let pattern of winPatterns){
        let pos0Val=boxes[pattern[0]].innerText;
        let pos1Val=boxes[pattern[1]].innerText;
        let pos2Val=boxes[pattern[2]].innerText;
        if(pos0Val!="" && pos1Val!="" && pos2Val!=""){
            if(pos0Val===pos1Val && pos1Val===pos2Val){
                //console.log(${pos0Val} you won!!!);
                showWinner(pos0Val);
                return;
                
            }
        }    
    }
    if(moveCount===9){
        tie();
    }
};
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turnO){
            box.innerText="O";
            turnO=false;
        }else{
            box.innerText="X";
            turnO=true;
        }
        box.disabled=true;
        moveCount++;
        checkWinner();
        
    });
});
newgamebtn.addEventListener("click",resetGame);
resetbtn.addEventListener("click",resetGame);