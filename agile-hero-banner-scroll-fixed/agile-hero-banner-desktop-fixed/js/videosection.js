/* =========================================================
   VERIFIED BUSINESS CALLER VIDEO
   UNIQUE JS VARIABLES
========================================================= */

const agvcVideo = document.getElementById("agvcVideo");
const agvcPlayBtn = document.getElementById("agvcPlayBtn");
const agvcVideoBox = document.querySelector(".agvc-video-box");


if (agvcVideo && agvcPlayBtn && agvcVideoBox) {


  /* =======================================================
     PLAY / PAUSE VIDEO
  ======================================================= */

  async function agvcToggleVideo(){

    try{

      if(agvcVideo.paused){

        await agvcVideo.play();

      }else{

        agvcVideo.pause();

      }

    }catch(error){

      console.error(
        "Video playback error:",
        error
      );

      agvcVideo.controls = true;

    }

  }


  /* =======================================================
     PLAY BUTTON CLICK
  ======================================================= */

  agvcPlayBtn.addEventListener(
    "click",
    function(event){

      event.stopPropagation();

      agvcToggleVideo();

    }
  );


  /* =======================================================
     VIDEO CLICK
  ======================================================= */

  agvcVideo.addEventListener(
    "click",
    function(){

      agvcToggleVideo();

    }
  );


  /* =======================================================
     VIDEO PLAY
  ======================================================= */

  agvcVideo.addEventListener(
    "play",
    function(){

      agvcVideoBox.classList.add(
        "playing"
      );

    }
  );


  /* =======================================================
     VIDEO PAUSE
  ======================================================= */

  agvcVideo.addEventListener(
    "pause",
    function(){

      agvcVideoBox.classList.remove(
        "playing"
      );

    }
  );


  /* =======================================================
     VIDEO ENDED
  ======================================================= */

  agvcVideo.addEventListener(
    "ended",
    function(){

      agvcVideoBox.classList.remove(
        "playing"
      );

    }
  );

}