function Output_to_gas()
{
	//document.getElementById('startes').innerHTML = "保存中";
	var text = '';
	
	for(var i = 0; i < data.length; i++)
	{
		for(var j = 0; j < data[i].length; j++)
		{
				text += data[i][j] + ',';
		}
		text += '\n';
	}
	
	text += '***';//データ区切り

	for(var i = 0; i < note.length; i++)
	{
		text += note[i] + ',' + '\n';
	}
	
	text += '***';//データ区切り
	
	for(var i = 0; i < his.length; i++)
	{
		text += his[i] + ',' + '\n';
	}
	
	text += '***';//データ区切り
	
	text += document.getElementById('forum').value + ',' + '\n';
	google.script.run.withSuccessHandler(showStartes).write_ss(text);
}

function showStartes(returnString)
{
	alert(returnString);
	Intput_from_gas();//動作お試し
	//document.getElementById('startes').innerHTML = returnString;
}
   
function Intput_from_gas()
{
	//document.getElementById('startes').innerHTML = "読込中";
	google.script.run.withSuccessHandler(output_to_html).read_ss();
}

function output_to_html(text)
{
	document.getElementById('forum').value = text;
}
