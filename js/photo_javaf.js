var viewer = document.getElementById('viewer');
var img = document.getElementById('img');

viewer.style.backgroundColor = 'rgba(0,0,0,0.7)';
viewer.style.position = 'fixed';
viewer.style.display = "none";
viewer.style.top = '0px';
viewer.style.left = '0px';
viewer.style.width = window.innerWidth + 'px';
viewer.style.height = window.innerHeight + 'px';
var h = window.innerHeight * 0.6;
img.style.height = h + 'px';
function photo_close()
{
  viewer.style.display = "none";
  img.src = "";
}

function photo_open(num)
{
  viewer.style.display ="block";
  input_to_img(get_id(num));
}

function get_id(num)
{
  for(var i = 0; i < f_list.length; i++)
  {
    if(!f_list[i][0].indexOf(num)){return f_list[i][1];}// 前方一致のときの処理
  }
  return '1jKJA2AOkWwD08r8mjBRPUI6c8EeAzNXR';//noimage
}

function take_picture(e)
{
  var reader = new FileReader();
  reader.onload = function (e) {
    img.setAttribute("src", e.target.result);
  }
  reader.readAsDataURL(e.target.files[0]);
}
