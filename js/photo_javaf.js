var viewer = document.getElementById('viewer');
var img = document.getElementById('img');
var upload = document.getElementById('upload');
var update = document.getElementById('update');
var check  = document.getElementById('check');

//var old_name= document.getElementById('old_name');
//var new_name= document.getElementById('new_name');

var file = "";
var item_num = "";

var old_name = "";
var new_name = "";

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
	upload.style.display = "none";
	update.style.display = "none";
	check.style.display = "none";
	img.removeAttribute('src');
	file = "";
	item_num = "";
	old_name = "";
	new_name = "";
}

function photo_open(num)//画像ビュワーを表示
{
	viewer.style.display = "block";
	dounload_img(num);
	item_num = num;
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
	upload.style.display = "inline-block";
	old_name = file.name;
	new_name = item_num + '.' + file.name.split('.').pop();
}
