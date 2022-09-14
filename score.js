let score = 0;
let allowAdd = false;
export function scoreCount(holes, bird){

  let birdPos = bird.getBoundingClientRect();

  for(let i = 0; i < holes.length; i++){

    let holesPos = holes[i].getBoundingClientRect();

    if( birdPos.x > holesPos.x){
      if(birdPos.x < holesPos.right){
        allowAdd = true;
      }
    }

    if( birdPos.x > holesPos.x && allowAdd){
      if(birdPos.x >= holesPos.right && birdPos.x < holesPos.right + 10){
        score++;
        allowAdd = false;
      }
    }

  }

  return score;
}