export function hasLost(bird, game_area, tubes, holes){

  let hasLost = false;

  const OOB = game_area.getBoundingClientRect().bottom;
  let birdPos = bird.getBoundingClientRect();

  if(birdPos.y > OOB){
    hasLost = true;
  }

  for(let i = 0; i < tubes.length; i++){

    let tubesPos = tubes[i].getBoundingClientRect();
    let holesPos = holes[i].getBoundingClientRect();
    
    if(birdPos.right >= tubesPos.x && 
      birdPos.x <= tubesPos.right) {

        if(birdPos.y < holesPos.y ||
          birdPos.bottom > holesPos.bottom){

            hasLost = true;
            break;

          }
      }

      
  }

  return hasLost;

}