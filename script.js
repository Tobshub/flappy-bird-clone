import { hasLost } from "./hasLost.js";

const game_area = document.querySelector('.game-area')
const tubes = document.querySelectorAll('.tube');
const holes = document.querySelectorAll('.hole');
const bird = document.querySelector('.bird');
const score_counter = document.querySelector('.score');
let status = false;
let shouldAlert = true;
let isFlapping = 0;
let score = 1;

window.addEventListener('keyup', e=>{
  if(e.code == 'Space' && isFlapping == 0){
    isFlapping = 1;
  } 
});

let lastTime = 0;
function main(time) {
  if(time > lastTime){
    var delta = time - lastTime;
    lastTime = time;
    status = hasLost(bird, game_area, tubes, holes);

    if(status && shouldAlert){
      reset();
      status = false;
      let restart = window.confirm('You lose!\n Do you wanna play again?');
      if(restart){
        location.reload();
      }
      shouldAlert = false;
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

window.requestAnimationFrame(main);


function gravity(bird){
  bird.style.top = `${parseFloat(getComputedStyle(bird).top) + 3}px`;
}

function flap(bird, delta){
  
    bird.style.top = `${parseFloat(getComputedStyle(bird).top) - 10}px`;  
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

    score++;
    score_counter.textContent = score;

  })

}


function reset(){
  for(let i = 0; i < tubes.length; i++){
    tubes[i].style.setProperty('--play-state', 'paused');
  }
}