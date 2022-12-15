var data = [];

var table = document.getElementById('table');
Input_from_gas();

function search(e)
{
	var keyword = e.value;
	alert(keyword);
	var results = [];
	results[0] = data[0];
	
	var judge = [];
	for(var i = 1; i < data.length; i++)
	{
		judge[1] = String(data[i][1]).indexOf(keyword)
		judge[2] = String(data[i][2]).indexOf(keyword)
		if(judge[1] !== -1 || judge[2] !== -1){results.push(data[i]);}
	}
	
	table.innerHTML = '';
	for(var i = 0; i < data.length; i++)	//データ出力
	{
		var row = table.insertRow(-1);
		for(var j = 0; j < data[i].length; j++)
		{
			var obj = '<td nowrap>' + data[i][j] + '</td>';
			row.insertAdjacentHTML('beforeend',obj);
		}
	}
}
