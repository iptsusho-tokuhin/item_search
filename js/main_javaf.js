var data = [];

var table = document.getElementById('table');
var main = document.getElementById('main');
Intput_from_gas();

function search(e)				//今日までのデータを作成
{
	var keyword = e.value;
	var results = [];
	results[0] = data[0];
	
	var judge = [];
	for(var i = 1; i < data.length; i++)
	{
		judge[1] = data[i][1].indexOf(keyword)
		judge[2] = data[i][2].indexOf(keyword)
		if(judge[1] !== -1 || judge[2] !== -1){results.push(data[i]);}
	}
}
