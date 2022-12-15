function showStartes(returnString)
{
	//alert(returnString);
	//Intput_from_gas();//動作お試し
	document.getElementById('startes').innerHTML = returnString;
}

function Intput_from_gas()
{
	document.getElementById('startes').innerHTML = "読込中";
	google.script.run.withSuccessHandler(output_to_html).read_ss();
}

function output_to_html(text)
{
	//動作試験
	var arr1 = text.split('\n');
	var arr2 = [];

	//arr1[].pop();//各最後の行はごみデータになるので削除

	for(var i = 0; i < arr1.length; i++)
	{
		arr2[i] = [];
		arr2[i] = arr1[i].split(',');
		//arr2[i].pop();//各最後の行はごみデータになるので削除
	}
	
	data = arr2[0];
	set_data();
	document.getElementById('startes').innerHTML = "読込完了";
}
