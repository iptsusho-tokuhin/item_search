var bg = document.getElementById('bg');

bg.style.backgroundColor = "rgba(0,0,0,0.8)";
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
  bg.style.width = window.innerWidth + 'px';
  bg.style.height = window.innerHeight + 'px';
}

