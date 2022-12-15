function showStartes(returnString)
{
	//alert(returnString);
	//Intput_from_gas();//動作お試し
	document.getElementById('startes').innerHTML = returnString;
}

function Input_from_gas()
{
	document.getElementById('startes').innerHTML = "読込中";
	google.script.run.withSuccessHandler(output_to_html).read_ss();
}

function output_to_html(text)
{
	var arr1 = text.split('\n');
	var arr2 = [];

	//arr1[].pop();//各最後の行はごみデータになるので削除

	for(var i = 0; i < arr1.length; i++)
	{
		arr2[i] = arr1[i].split(',');
		arr2[i][1] = Hankana2Zenkana(arr2[i][1]);//半角カナを全角カナに変換
		arr2[i].pop();//各最後の行はごみデータになるので削除
	}
	
	data = arr2;
	document.getElementById('startes').innerHTML = "読込完了";
}

function Hankana2Zenkana(str) {
	const kanaMap = {
		"ガ": "ｶﾞ", "ギ": "ｷﾞ", "グ": "ｸﾞ", "ゲ": "ｹﾞ", "ゴ": "ｺﾞ",
		"ザ": "ｻﾞ", "ジ": "ｼﾞ", "ズ": "ｽﾞ", "ゼ": "ｾﾞ", "ゾ": "ｿﾞ",
		"ダ": "ﾀﾞ", "ヂ": "ﾁﾞ", "ヅ": "ﾂﾞ", "デ": "ﾃﾞ", "ド": "ﾄﾞ",
		"バ": "ﾊﾞ", "ビ": "ﾋﾞ", "ブ": "ﾌﾞ", "ベ": "ﾍﾞ", "ボ": "ﾎﾞ",
		"パ": "ﾊﾟ", "ピ": "ﾋﾟ", "プ": "ﾌﾟ", "ペ": "ﾍﾟ", "ポ": "ﾎﾟ",
		"ヴ": "ｳﾞ", "ヷ": "ﾜﾞ", "ヺ": "ｦﾞ",
		"ア": "ｱ", "イ": "ｲ", "ウ": "ｳ", "エ": "ｴ", "オ": "ｵ",
		"カ": "ｶ", "キ": "ｷ", "ク": "ｸ", "ケ": "ｹ", "コ": "ｺ",
		"サ": "ｻ", "シ": "ｼ", "ス": "ｽ", "セ": "ｾ", "ソ": "ｿ",
		"タ": "ﾀ", "チ": "ﾁ", "ツ": "ﾂ", "テ": "ﾃ", "ト": "ﾄ",
		"ナ": "ﾅ", "ニ": "ﾆ", "ヌ": "ﾇ", "ネ": "ﾈ", "ノ": "ﾉ",
		"ハ": "ﾊ", "ヒ": "ﾋ", "フ": "ﾌ", "ヘ": "ﾍ", "ホ": "ﾎ",
		"マ": "ﾏ", "ミ": "ﾐ", "ム": "ﾑ", "メ": "ﾒ", "モ": "ﾓ",
		"ヤ": "ﾔ", "ユ": "ﾕ", "ヨ": "ﾖ",
		"ラ": "ﾗ", "リ": "ﾘ", "ル": "ﾙ", "レ": "ﾚ", "ロ": "ﾛ",
		"ワ": "ﾜ", "ヲ": "ｦ", "ン": "ﾝ",
		"ァ": "ｧ", "ィ": "ｨ", "ゥ": "ｩ", "ェ": "ｪ", "ォ": "ｫ",
		"ッ": "ｯ", "ャ": "ｬ", "ュ": "ｭ", "ョ": "ｮ",
		"。": "｡", "、": "､", "ー": "ｰ", "「": "｢", "」": "｣", "・": "･"
  };
  const regExp = new RegExp(`(${Object.keys(kanaMap).join("|")})`, "g");
  return str
    .replace(regExp, function(match) {
      return kanaMap[match];
    })
    .replace(/ﾞ/g, "゛")
    .replace(/ﾟ/g, "゜");
}
