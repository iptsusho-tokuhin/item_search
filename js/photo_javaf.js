var bg = document.getElementById('bg');
var img = document.getElementById('img');

bg.style.backgroundColor = 'rgba(0,0,0,0.8)';
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
  
  var id = get_id(num);
  if(id)
  {
    img.src = 'https://drive.google.com/uc?id=' + id;
  }
}

function get_id(num)
{
  for(var i = 0; i < list.length; i++)	//データ出力
	{
    if(!list[0].indexOf(num)){return i;}// 前方一致のときの処理
  }
  return false;
}
