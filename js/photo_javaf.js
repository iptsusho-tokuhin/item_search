var bg = document.getElementById('bg');
var img = document.getElementById('img');

bg.style.backgroundColor = 'rgba(0,0,0,0.7)';
bg.style.position = 'fixed';
bg.style.top = '0px';
bg.style.left = '0px';
function photo_close()
{
  bg.style.width = '0px';
  bg.style.height = '0px';
}

function photo_open(num)
{
  bg.style.width = window.innerWidth + 'px';
  bg.style.height = window.innerHeight + 'px';
  
  input_to_img(get_id(num));
}

function get_id(num)
{
  for(var i = 0; i < f_list.length; i++)
  {
    if(!f_list[i][0].indexOf(num)){return f_list[i][1];}// 前方一致のときの処理
  }
  return false;
}

