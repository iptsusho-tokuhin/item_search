var bg = document.getElementsByClassName('bg');

bg.body.style.backgroundColor = "rgba(255,255,255,0.5)";
bg.style.position = 'fixed';
bg.style.top = '0px';
bg.style.left = '0px';
function photo_close()
{

  bg.clientWidth = '0px';
  bg.clientHeight = '0px';
}

function photo_open()
{
  bg.clientWidth = window.innerWidth + 'px';
  bg.clientHeight = window.innerHeight + 'px';
}

