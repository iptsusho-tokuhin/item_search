function Input_from_gas()//必要なデータをgoogledriveから読み込み　1
{
	document.getElementById('startes').innerHTML = "読込中";
	document.getElementById('search_word').disabled = true;
	google.script.run.withSuccessHandler(output_to_html).read_ss();
}

function output_to_html(DataJSON)//必要なデータをgoogledriveから読み込み　２
{
	DataJSON = replaceKanaHalfToFull(DataJSON);//半角カナを全角カナに変換
	data =  JSON.parse(DataJSON);
	
	document.getElementById('startes').innerHTML = "読込完了";
	document.getElementById('search_word').disabled = false;
	document.getElementById('search_word').focus();
}


function replaceKanaHalfToFull(str)//全角半角をあるていど統一
{
  var kanaMap = {
    '０': '0', '１': '1', '２': '2', '３': '3', '４': '4', '５': '5', '６': '6', '７': '7', '８': '8', '９': '9',
    'ｶﾞ': 'ガ', 'ｷﾞ': 'ギ', 'ｸﾞ': 'グ', 'ｹﾞ': 'ゲ', 'ｺﾞ': 'ゴ',
    'ｻﾞ': 'ザ', 'ｼﾞ': 'ジ', 'ｽﾞ': 'ズ', 'ｾﾞ': 'ゼ', 'ｿﾞ': 'ゾ',
    'ﾀﾞ': 'ダ', 'ﾁﾞ': 'ヂ', 'ﾂﾞ': 'ヅ', 'ﾃﾞ': 'デ', 'ﾄﾞ': 'ド',
    'ﾊﾞ': 'バ', 'ﾋﾞ': 'ビ', 'ﾌﾞ': 'ブ', 'ﾍﾞ': 'ベ', 'ﾎﾞ': 'ボ',
    'ﾊﾟ': 'パ', 'ﾋﾟ': 'ピ', 'ﾌﾟ': 'プ', 'ﾍﾟ': 'ペ', 'ﾎﾟ': 'ポ',
    'ｳﾞ': 'ヴ', 'ﾜﾞ': 'ヷ', 'ｦﾞ': 'ヺ',
    'ｱ': 'ア', 'ｲ': 'イ', 'ｳ': 'ウ', 'ｴ': 'エ', 'ｵ': 'オ',
    'ｶ': 'カ', 'ｷ': 'キ', 'ｸ': 'ク', 'ｹ': 'ケ', 'ｺ': 'コ',
    'ｻ': 'サ', 'ｼ': 'シ', 'ｽ': 'ス', 'ｾ': 'セ', 'ｿ': 'ソ',
    'ﾀ': 'タ', 'ﾁ': 'チ', 'ﾂ': 'ツ', 'ﾃ': 'テ', 'ﾄ': 'ト',
    'ﾅ': 'ナ', 'ﾆ': 'ニ', 'ﾇ': 'ヌ', 'ﾈ': 'ネ', 'ﾉ': 'ノ',
    'ﾊ': 'ハ', 'ﾋ': 'ヒ', 'ﾌ': 'フ', 'ﾍ': 'ヘ', 'ﾎ': 'ホ',
    'ﾏ': 'マ', 'ﾐ': 'ミ', 'ﾑ': 'ム', 'ﾒ': 'メ', 'ﾓ': 'モ',
    'ﾔ': 'ヤ', 'ﾕ': 'ユ', 'ﾖ': 'ヨ',
    'ﾗ': 'ラ', 'ﾘ': 'リ', 'ﾙ': 'ル', 'ﾚ': 'レ', 'ﾛ': 'ロ',
    'ﾜ': 'ワ', 'ｦ': 'ヲ', 'ﾝ': 'ン',
    'ｧ': 'ァ', 'ｨ': 'ィ', 'ｩ': 'ゥ', 'ｪ': 'ェ', 'ｫ': 'ォ',
    'ｯ': 'ッ', 'ｬ': 'ャ', 'ｭ': 'ュ', 'ｮ': 'ョ',
    '｡': '。', '､': '、', 'ｰ': 'ー', '｢': '「', '｣': '」', '･': '・'
  };
  let reg = new RegExp('(' + Object.keys(kanaMap).join('|') + ')', 'g');
  return str.replace(reg, function(s){
    return kanaMap[s];
  }).replace(/ﾞ/g, '゛').replace(/ﾟ/g, '゜');
}

function dounload_img(num)//アイテムコードを渡し、googledriveからファイル名より画像を読み込みimgに表示する
{
	(function() {
	const url = google.script.run.withSuccessHandler(base64Data => {
		img.setAttribute("src", "data:image/png;base64," + base64Data);
	})
      	.withFailureHandler(console.error)
      	.get_image(num);
	})(); 
}

function uploading_file()//画像アップロード中に行う処理
{
	google.script.run.delete_file(item_num);//既存画像の削除
	upload.style.display = "none";
	update.style.display = "inline-block";
	check.style.display = "none";
}

function uploaded_file()//画像アップロード終了後に行う処理
{
	google.script.run.rename_file(old_name,new_name);//アップロードした画像を後追いで名前変更
	upload.style.display = "none";
	update.style.display = "none";
	check.style.display = "inline-block";
}
