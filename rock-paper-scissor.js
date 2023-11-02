let score = JSON.parse(localStorage.getItem('score')) || {
  wins:0,
  loses:0,
  ties:0
}

updateScoreElement();
// if(score === null){
//   score = {
//     wins:0,
//     loses:0,
//     ties:0
//   }
// }
let isAutoPlaying = false;
let idInterval;
function autoplay(){
  if(!isAutoPlaying){
    idInterval = setInterval(()=>{
      const playerMove =pickcomputerMove();
      playGame(playerMove);
    },1000);
    isAutoPlaying = true;
    document.querySelector('.js-autoplay').innerHTML = 'Stop Play';
  }else{
    clearInterval(idInterval);
    isAutoPlaying= false;
    document.querySelector('.js-autoplay').innerHTML = 'Auto Play';
  }
 
}

document.querySelector('.js-rock-button').addEventListener('click',()=> {
  playGame('rock'); 
})

document.body.addEventListener('keydown',(event)=>{
  if(event.key=='r'){
    playGame('rock');
  }else if(event.key=='p'){
    playGame('paper');
  }else if(event.key=='s'){
    playGame('scissors');
  }else if (event.key === 'a') {
    autoplay();
  } else if (event.key === 'Backspace') {
     score.wins =0;
     score.loses=0;
     score.ties=0;
     localStorage.removeItem('score');
     updateScoreElement();
     document.querySelector('.js-result').innerHTML = '';
     document.querySelector('.js-moves').innerHTML = '';
   // showResetConfirmation();
  }
})


function playGame(playerMove){
  const computerMove = pickcomputerMove();
  let result ='';
  if(playerMove ==='scissors'){
    if(computerMove==='rock'){
      result = 'You lose.';
      }else if(computerMove==='paper'){
            result = 'You won.';
      }else if(computerMove==='scissors'){
            result = 'Tie.';
      }
    
  }
  else if(playerMove ==='rock'){
    if(computerMove==='rock'){
      result = 'Tie.';
      }else if(computerMove==='paper'){
            result = 'You lose.';
      }else if(computerMove==='scissors'){
            result = 'You won.';
      }
  }
  else if(playerMove ==='paper'){
    if(computerMove==='rock'){
      result = 'You won.';
    }else if(computerMove==='paper'){
      result = 'Tie.';
    } else if(computerMove==='scissors'){
      result = 'You lose.';
      }
  }
  if(result ==='You won.'){
    score.wins =score.wins+1;
  }
  else if(result ==='You lose.'){
    score.loses = score.loses+1;
  }else if(result ==='Tie.'){
    score.ties = score.ties+1;
  }
  localStorage.setItem('score',JSON.stringify(score));
  updateScoreElement();
  
  document.querySelector('.js-result').innerHTML = result;
  document.querySelector('.js-moves').innerHTML = ` You
  <img src="images/${playerMove}-emoji.png" class="move-icon">
  <img src="images/${computerMove}-emoji.png" class="move-icon">
  Computer
`;
//           alert(`you picked ${playerMove}.computer picked ${computerMove}. ${result}
// Wins: ${score.wins},Lose: ${score.loses},Tie:${score.ties}`)
}

function pickcomputerMove(){
  const randomNumber=Math.random();
  let computerMove = ' ';
  let result = '';
  if(randomNumber>=0 && randomNumber<1/3){
      computerMove = 'rock';
  }else  if(randomNumber >= 1/3 && randomNumber<2/3){
      computerMove = 'paper';
  }else  if(randomNumber >= 2/3 && randomNumber<1){
      computerMove = 'scissors';
  }
  return computerMove;
}

function updateScoreElement(){
  document.querySelector('.js-score').innerHTML = `Wins: ${score.wins},Lose: ${score.loses},Tie:${score.ties}`
}


