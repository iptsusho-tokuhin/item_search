var data;
var f_list;

var table = document.getElementById('table');
Input_from_gas();

function search(e)
{
	var keyword = e.value;
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
	for(var i = 0; i < results.length; i++)	//データ出力
	{
		for(var j = 0; j < results[i].length; j++)
		{
			var obj = '<td font-size: 150%; nowrap>' + results[i][j] + '</td>';
			row.insertAdjacentHTML('beforeend',obj);
		}
	}
}
