export function startGame(btn,func,tubes,game_area){

  let state = true;

  btn.addEventListener('click', ()=>{
    if(state){
      btn.blur();
      window.requestAnimationFrame(func);
      for(let i = 0; i < tubes.length; i++){
        tubes[i].style.setProperty('--play-state', 'running');
      }
      state = false;
      btn.textContent = 'Restart';
    } else if(!state) {
      state = true;
      location.reload();
      window.requestAnimationFrame(func);
    }
  })

}