var viewer = document.getElementById('viewer');
var img = document.getElementById('img');
var upload_ico = document.getElementById('upload_ico');

var file = "";

viewer.style.backgroundColor = 'rgba(0,0,0,0.7)';
viewer.style.position = 'fixed';
viewer.style.top = '0px';
viewer.style.left = '0px';
viewer.style.width = window.innerWidth + 'px';
viewer.style.height = window.innerHeight + 'px';
var h = window.innerHeight * 0.7;
img.style.height = h + 'px';

function photo_close()//画像ビュワーを閉じる
{
  viewer.style.display = "none";
  upload_ico.style.display = "none";
  img.removeAttribute('src');
  file = "";
}

function photo_open(num)//画像ビュワーを表示
{
  viewer.style.display = "block";
  input_to_img(get_id(num));
}

function get_id(num)//GASより取得したファイルリストのファイル名よりIDを得る
{
  for(var i = 0; i < f_list.length; i++)
  {
    if(!f_list[i][0].indexOf(num)){return f_list[i][1];}// 前方一致のときの処理
  }
  return '1jKJA2AOkWwD08r8mjBRPUI6c8EeAzNXR';//noimage
}

function take_picture(elm)//inputの中身が変更されたらビュワーを更新する
{
  var fileList = elm.files;// ファイルリストを取得
  var fileReader = new FileReader();// FileReaderを生成
  file = fileList[0];// ファイルを取得
 
  // 読み込み完了時の処理を追加
  fileReader.onload = function() {
    img.setAttribute("src", this.result);
  };
  fileReader.readAsDataURL(file); // ファイルの読み込み
  upload_ico.style.display = "inline-block";
  //alert(file.name);
}
