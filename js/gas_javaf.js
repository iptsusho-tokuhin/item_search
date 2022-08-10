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
		//for(var j = 0; j < note[i].length; j++)
		//{
				text += note[i] + ',,' + '\n';
		//}
		//text += '\n';
	}
	
	text += '***';//データ区切り
	
	for(var i = 0; i < his.length; i++)
	{
		//for(var j = 0; j < his.length; j++)
		//{
				text += his[i] + ',,' + '\n';
		//}
		//text += '\n';
	}
	
	text += '***';//データ区切り
	
	text += document.getElementById('forum').value + ',,/n';
	//alert('ここまで');
	google.script.run.withSuccessHandler(showStartes).write_ss(text);
}

function showStartes(returnString)
{
	alert(returnString);
	//document.getElementById('startes').innerHTML = returnString;
}
   
function Intput_from_gas()
{
	document.getElementById('startes').innerHTML = "読込中";
	google.script.run.withSuccessHandler(output_to_html).read_ss();
}

function output_to_html(text)
{
	text = text.replace(/##/g, '');
	let arr_text = text.split('***');
	let data;
      
	for (var i = 0 ; i <= max ; i++)
	{
		data = arr_text[i].split(',');
		for (var j = 0 ; j <= FLAG ; j++)
        	{
			if(j == AUTO||j == TABLE)
			{
				document.forms[i].elements[j].checked = data[j];
			}
			else
			{
				document.forms[i].elements[j].value = data[j];
			}
		}
	}

	for(var i = max + 1; i <= max + 10; i++)
	{
		data = arr_text[i].split(',');
		for(var j = 0; j <= 4; j++)
		{
			if(j == 2)
			{
				document.forms[i].elements[j].checked = data[j];
			}
			else
			{
				document.forms[i].elements[j].value = data[j];
			}
		}
	}

	document.getElementById('index').textContent = arr_text[max + 11];
	document.getElementById('startes').innerHTML = "読込完了";
	ButtonTypeChange();
	Reach_Rate();
	Set_Initial();
}
