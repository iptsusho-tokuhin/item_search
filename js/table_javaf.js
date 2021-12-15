function Button_New()//新規ボタン
{
	if(document.forms[max].elements[FLAG].value == 1)
	{
		return;//最後にもマーカーがあればここで終わり
	}

	var j;

	for(var i = 0; i <= max; i++)
	{
		if(document.forms[i].elements[FLAG].value != 1)
		{
			j = i;			
			break;
		}
	}

	document.forms[j].elements[ICON_NUM].value = 0;
	document.forms[j].elements[FLAG].value = 1;
	ButtonTypeChange();
	Marker_Reload(j,0);

	document.forms[j].elements[LAT].value = "";
	document.forms[j].elements[LNG].value = "";
}

function Table_Reload()//表にデータを追加
{
	var latlng = map.getCenter();

	Table_Delete();

	var table = document.getElementById('table2');//表のオブジェクトを取得
 
	var row;  //行末に行(tr要素)を追加;
 
	var cell1;  //セル(td要素)の追加
	var cell2; 
	var cell3; 
	var cell4;

	var text2;
	var text3;

	for(var i = 0; i <= max; i++)
	{
		text2 = "";
		text3 = "";

		if(document.forms[i].elements[LAT].value == "" && document.forms[i].elements[FLAG].value == 1)
		{
			document.forms[i].elements[LAT].value = latlng.lat();
			document.forms[i].elements[LNG].value = latlng.lng();
		}

		document.getElementById('table1').rows[i+1].cells[TABLE].style.backgroundColor = "white";

		if(document.forms[i].elements[TABLE].checked == false && document.forms[i].elements[FLAG].value == 1)
		{
			document.getElementById('table1').rows[i+1].cells[TABLE].style.backgroundColor = "coral";

			row = table.insertRow(-1);  //行末に行(tr要素)を追加
			cell1 = row.insertCell(0);  //セル(td要素)の追加
			cell2 = row.insertCell(1); 
			cell3 = row.insertCell(2); 
			cell4 = row.insertCell(3); 

			if(document.forms[i].elements[IVNO].value != "" || document.forms[i].elements[IV1].value != "")
			{
				if(document.forms[i].elements[IV1].value != "")
				{
					text2 = "<a href = " + document.forms[i].elements[IV1].value + " target=_blank rel=noopener noreferrer>";
				}

				if(document.forms[i].elements[IVNO].value != "")
				{
					text2 = text2 + document.forms[i].elements[IVNO].value + "</a>";
				}
				else
				{
					text2 = text2 + "INVOICE" + "</a>";
				}
			}

			if(document.forms[i].elements[DATE_ARR].value != "")
			{
				text3 =  document.forms[i].elements[DATE_ARR].value.substr(-5).replace("-",'/') + " ";
			}

			if(document.forms[i].elements[ARR].value != "")
			{
				text3 = text3 + document.forms[i].elements[ARR].value + " 着" + "<br>";
			}



			cell1.innerHTML = document.forms[i].elements[NAME].value;   //セルにデータを挿入する
			cell2.innerHTML = text2;
			cell3.innerHTML = text3; 
			cell4.innerHTML = document.forms[i].elements[NOTE].value;

			cell1.style.backgroundColor = document.forms[i].elements[BALLOON].value;
			cell2.style.backgroundColor = document.forms[i].elements[BALLOON].value;
			cell3.style.backgroundColor = document.forms[i].elements[BALLOON].value;
			cell4.style.backgroundColor = document.forms[i].elements[BALLOON].value;
		}
	}
}

function Table_Delete()//表を削除
{
	var table = document.getElementById('table2');  //表のオブジェクトを取得
	var row_num = table.rows.length;		//表の行数
	if (row_num>1)					//表に二行以上あるとき末尾行を削除
	{
		for(var i = 1; i <= row_num - 1; i++)
		{
			table.deleteRow(1);//行を削除
		}
	}
}
