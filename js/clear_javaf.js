function Button_Clear(i)//クリアボタン
{
	if(i < markers.length)
	{
		markers[i].setMap(null);//既にあるマーカーを削除
	}
	if(document.forms[i].elements[FLAG].value == 1)
	{
		Input_Clear(i);
	}
}

function Input_Clear(i)//指定列のクリア
{
	for(var j = i; j <= max; j++)
	{
		if(j != max)
		{
			for(var k = 0; k <= FLAG; k++)
			{
				if(k == AUTO)
				{
					document.forms[j].elements[k].checked = document.forms[j+1].elements[k].checked;
				}
				else if(k == TABLE)
				{
					document.forms[j].elements[k].checked = document.forms[j+1].elements[k].checked;
				}
				else
				{
					document.forms[j].elements[k].value = document.forms[j+1].elements[k].value;
				}
			}
		}
		else
		{
			for(var k = 0; k <= FLAG; k++)
			{
				if(k == BALLOON)
				{
					document.forms[j].elements[k].value = "#ffffff";
				}
				else if(k == AUTO)
				{
					document.forms[j].elements[k].checked = false;
				}
				else if(k == TABLE)
				{
					document.forms[j].elements[k].checked = false;
				}
				else
				{
					document.forms[j].elements[k].value = "";
				}
			}
		}
	}

	ButtonTypeChange();

	for(var j = 0; j <= max; j++)
	{
		Marker_Reload(j,0);
	}
}

function ButtonTypeChange()
{
	for(var i = 0; i <= max; i++)
	{
		if(document.forms[i].elements[FLAG].value == 1)
		{
			for(var j = 0; j <= FLAG; j++)
			{
				document.forms[i].elements[j].disabled = false;
			}
			//document.forms[i].elements[CLEAR_BUTTON].disabled = false;
			//document.forms[i].elements[AUTO].disabled = false;
			//document.forms[i].elements[TABLE].disabled = false;
		}
		else
		{
			for(var j = 0; j <= FLAG; j++)
			{
				document.forms[i].elements[j].disabled = true;
			}
			//document.forms[i].elements[CLEAR_BUTTON].disabled = true;
			//document.forms[i].elements[AUTO].disabled = true;
			//document.forms[i].elements[TABLE].disabled = true;
		}
	}
}