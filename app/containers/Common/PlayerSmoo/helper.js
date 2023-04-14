/* eslint-disable no-underscore-dangle */
import { each, find } from 'lodash';

/* eslint-disable prettier/prettier */
window.player = [];
export function controllerPlayer(options) {
  window.player = window.player.filter((item) => item.player.id_ !== options.player.id_)
  window.player.push(options);
  console.log('window.player.push: ', window.player);
  window.player = window.player.filter((item) => {
    if(!item.player.paused() && item.player.id_ === options.player.id_ && !options.inView){
      console.log(11111111, item.player.id_, item);
      console.log(222222, options.player.id_, options);
      // options.player.pause();
    }
    // if(item.player._id === options.player._id && !options.inView){
    //   item.player.pause()
    // }
    return item;
  })
  // if(!options.inView){
  //   options.player.pause();
  // }
  // if (player.inView) {
  //   const itemed = find(window.player, (item) => item.player.id_ === player.id_);
  //   if (!itemed)
  //     window.player.push({ player, options });
  // }

  // if (!player.inView) {
  //   console.log('player: ', player);
  //   player.pause()
  //   // const itemed = find(window.player, (item) => item.player.id_ === player.id_); 
  //   // if(itemed) {
  //   //   itemed.player.muted(true);
  //   // }
  // }

  // //   window.player =  window.player.map((item) => {
  // //     if(item.inView === false) item.pause();
  // //     return item
  // //   })
  // window.player = window.player.filter((item) => item.player.inView);
  // console.log(' window.player: ', window.player);
  // // if(options.inView === false) {
  // //   player.pause();
  // //   console.log(player)
  // // }
  // each(window.player, (itemPlayer, index) => {
  //   console.log('player', itemPlayer.player.id_, itemPlayer.player.paused());


  //   itemPlayer.player.bigPlayButton.on('click', () => {
  //     itemPlayer.player.src(itemPlayer.options.src);
  //   })

  // })
}

export function activePlayer(player) {
  // controllerPlayer(player);
  document.addEventListener('scroll', () => {
    controllerPlayer(player);
  });
}
