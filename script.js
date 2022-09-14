import { hasLost } from "./hasLost.js";
import {scoreCount} from "./score.js";
import { startGame } from "./start.js";

const FLAPHEIGHT = 12; 
const g = 5; // accelaration due to gravity
let GAME_SPEED = 3; // smaller is faster
function updateSpeed(tubes){
  for(let i = 0; i < tubes.length; i++){
    tubes[i].addEventListener('animationstart',()=>{
      tubes[i].style.setProperty('--animation-speed', GAME_SPEED);
    },{once : true});
  }
}

const game_area = document.querySelector('.game-area')
const tubes = document.querySelectorAll('.tube');
const holes = document.querySelectorAll('.hole');
const bird = document.querySelector('.bird');
const score_counter = document.querySelector('.score');
const startBtn = document.getElementById('startBtn');
let status = false;
let shouldAlert = true;
let canUpdate = true;
let isFlapping = 0
if(sessionStorage.getItem('Scores')==undefined){
  sessionStorage.Scores = '';
};

startBtn.focus();
startGame(startBtn,main,tubes,status,game_area);

window.addEventListener('keyup', e=>{
  if(e.code == 'Space' && isFlapping == 0){
    isFlapping = 1;
  } 
});
window.addEventListener('click', e=>{
  if(isFlapping == 0){
    isFlapping = 1;
  } 
});

let lastTime = 0;
function main(time) {

  score_counter.textContent = scoreCount(holes,bird);
  // if(parseInt(score_counter.textContent)%5 == 0 && 
  //   parseInt(score_counter.textContent) > 0 && canUpdate){
  //   GAME_SPEED-= .5;
  //   updateSpeed(tubes);
  //   canUpdate = false;
  // }
  // if(parseInt(score_counter.textContent)%5 > 0) {
  //   canUpdate = true;
  // }
  if(time > lastTime){
    var delta = time - lastTime;
    lastTime = time;
    status = hasLost(bird, game_area, tubes, holes, startBtn);
    
    if(status && shouldAlert){
      end();
      status = false;
      window.alert('You lose!');
      shouldAlert = false;
      let prevScores = sessionStorage.getItem('Scores');
      if(prevScores.length > 0){
        prevScores += `,${score_counter.textContent.trim()}`
      } else {
        prevScores = score_counter.textContent.trim();
      };
      sessionStorage.setItem('Scores', prevScores);
    }

    if(isFlapping==0){
      gravity(bird);
    }

    if(isFlapping == 1){
      flap(bird, delta);
    }
    
  }
  window.requestAnimationFrame(main);
}


function gravity(bird){
  bird.style.top = `${parseFloat(getComputedStyle(bird).top) + g}px`;
}

function flap(bird, delta){
    const rotate = 16;

    bird.style.top = `${parseFloat(getComputedStyle(bird).top) - FLAPHEIGHT}px`; 
    bird.style.rotate = `${parseFloat(getComputedStyle(bird).rotate) - rotate}deg`;
    
    let reverse = setTimeout(()=>{
      clearTimeout(reverse);
      bird.style.rotate = `${parseFloat(getComputedStyle(bird).rotate) + rotate}deg`;
    }, (delta * 4));

    setTimeout(()=>isFlapping = 0, (delta * 4));
}




for(let i = 0; i < tubes.length; i++){
  let tube = tubes[i];
  let hole = holes[i];
  tubes[i].addEventListener('animationiteration', ()=>{
    let max = 30;
    let min = 75;

    let randomPos = Math.random() * (min);
    (randomPos < max)? randomPos += max : '';

    hole.style.top = `${randomPos}%`;

  })

}

function end(){
  for(let i = 0; i < tubes.length; i++){
    tubes[i].style.setProperty('--play-state', 'paused');
  }
}