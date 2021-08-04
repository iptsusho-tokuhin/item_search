function Output_to_gas()
{
	document.getElementById('startes').innerHTML = "保存中";
	let text = "";
	var data;

	for(var i = 0; i <= max; i++)
	{
		for(var j = 0; j <= FLAG; j++)
		{
			if(j == AUTO||j == TABLE)
			{
				if(document.forms[i].elements[j].checked == true){data = 1;}else{data = "";}
			}
			else if(j == IVNO)
			{
				data = "##" + document.forms[i].elements[j].value;
			}
			else if(j == DATE_DEP)
			{
				data = document.forms[i].elements[j].value;
				alert(data);
			}
			else
			{
				data = document.forms[i].elements[j].value;
			}
				text = text + data + ',';
		}
		text = text +  '***';
	}

	for(var i = max + 1; i <= max + 10; i++)
	{
		for(var j = 0; j <= 4; j++)
		{
		if(j == 2)
		{
			if(document.forms[i].elements[j].checked == true){data = 1;}else{data = "";}
		}
		else
		{
			data = document.forms[i].elements[j].value;
		}
		text = text + data + ',';
        }
        text = text + '***';
	}
	
	var today = new Date();
	today.setDate(today.getDate());
	var yyyy = today.getFullYear();
	var mm = ("0"+(today.getMonth()+1)).slice(-2);
	var dd = ("0"+today.getDate()).slice(-2);
 	var date = yyyy + "年" + mm + "月" + dd + "日";
		
	text = text + "　発注済・船便未確定案件　更新日" + date;
	google.script.run.withSuccessHandler(showStartes).write_ss(text);
}

function showStartes(returnString)
{
	document.getElementById('startes').innerHTML = returnString;
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
