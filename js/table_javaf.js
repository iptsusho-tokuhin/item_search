function export_table()				//テーブルへ出力
{
	set_date_min_max();
	table.innerHTML = '';
	for(var i = 0; i < data.length; i++)	//データ出力
	{
		var row = table.insertRow(-1);
		for(var j = 0; j < data[i].length; j++)
		{
			var text;
			if(j == 0 || get_date(begin_date.value) <= get_date(data[0][j]) && get_date(data[0][j]) <= get_date(end_date.value))
			{
				if(data[i][j] == '0')				{text = '';}
				else						{text = data[i][j];}
				if(j != 0 && i % 11 == 1 && data[i + 1][j] != '0'){text = data[i][j] + '(' + data[i + 1][j] + ')';}
				var obj = '<td onclick=click_table(this) onmouseover=display_note(this) onmouseout=hidden_note() nowrap>' + text + '</td>';
				row.insertAdjacentHTML('beforeend',obj);
			}
		}
	}
	
	var sum = [];
	for(var i = 0; i < 11; i++)		//合計データ初期化
	{
		sum[i] = [];
		for(var j = 0; j < data[i].length; j++)
		{
			sum[i][j] = '0';
		}
	}

	sum[0][0] = '馬房数 合計';
	sum[1][0] = '馬房組立数 合計';
	sum[2][0] = 'サイドパネル 合計';
	sum[3][0] = 'バックパネル 合計';
	sum[4][0] = 'フロントパネル 合計';
	
	sum[5][0] = 'ツマ・１・オス 合計';
	sum[6][0] = 'ツマ・１・メス 合計';
	sum[7][0] = 'ツマ・２・オス 合計';
	sum[8][0] = 'ツマ・２・メス 合計';
	sum[9][0] = 'テント・２ 合計';
	sum[10][0] = 'テント・３ 合計';

	for(var i = 1; i < data.length; i++)	//合計データ作成
	{
		var n = i % 11 - 1;
		if(n < 0){n = 10;}
		for(var j = 1; j < data[i].length; j++)
		{
			sum[n][j] = Number(sum[n][j]) + Number(data[i][j]);
		}
	}

	for(var i = 0; i < sum.length; i++)	//合計データ出力
	{
		if(i != 1)			//組立馬房数行は不要
		{
			var row = table.insertRow(-1);
			for(var j = 0; j < sum[i].length; j++)
			{
				if(j == 0 || get_date(begin_date.value) <= get_date(data[0][j]) && get_date(data[0][j]) <= get_date(end_date.value))
				{
					var text;
					if(sum[i][j] == '0')	{text = '';}
					else			{text = sum[i][j];}
					var obj = '<td onclick=click_table(this) nowrap>' + text + '</td>';
					row.insertAdjacentHTML('beforeend',obj);
				}
			}
		}
	}
	
	for(var i = 0; i < table.rows.length; i++)
	{
		table.rows[i].cells[0].style.position = 'sticky';//1列目を固定
		table.rows[i].cells[0].style.left = '0px';
		if(i < table.rows.length - 10 && i != 0)
		{
			if(i % 11 == 1)	{table.rows[i].style.cursor = 'pointer';}//クリックできるようにする
			else		{table.rows[i].style.display = 'none';}	//隠す
		}
		
	}
	set_table_color();
}

function set_table_color()			//セルの色を設定
{
	var cl;
	var co;
	var f_co;
	var week;

	for(var i = 0; i < table.rows.length; i++)
	{	
		for(var j = 0; j < table.rows[i].cells.length; j++)
		{
			if(i == 0)		{cl = 'date';}
			else if(i % 11 == 1)	{cl = 'stable';}
			else			{cl = 'parts';}
			
			f_co = 'black';
			if(i == 0 && j > 0)
			{
				week = get_date(table.rows[i].cells[j].innerHTML).getDay();//曜日
				switch (week) {
				case 0://日曜日
					f_co = 'red';	break;
  				case 6://土曜日
					f_co = 'blue';	break;
  				default://平日
					f_co = 'black';	break;
				}
			}
			

			if(i > table.rows.length - 10)
			{
				if(i % 11 == 1)	{cl = 'sum_stable';}
				else		{cl = 'sum_parts';}
			}
			if(table.rows[i].cells[j].innerHTML.indexOf(')') > 0){cl = 'stable2'}//組立馬房なら

			switch (cl) {
			case 'date':
				co = 'gainsboro';	break;
  			case 'stable':
				co = 'palegreen';	break;
  			case 'stable2':
				co = 'lightsalmon';	break;
  			case 'parts':
				co = 'lightyellow';	break;
  			case 'sum_stable':
				co = 'gold';		break;
  			case 'sum_parts':
				co = 'khaki';		break;
  			default:
			}
			table.rows[i].cells[j].style.backgroundColor = co;
			table.rows[i].cells[j].style.color = f_co;
		}
	}
}

function click_table(e)
{
	var column = e.cellIndex;//列番号
	var tr = e.parentNode;
	var row = tr.sectionRowIndex;//行番号

	var cl = table.rows[row].className;

	if(row % 11 == 1 && row < table.rows.length - 11)
	{
		if(column == 0)
		{
			if(table.rows[row + 2].style.display == 'none')
			{
				table.rows[row + 2].style.display = '';
				table.rows[row + 3].style.display = '';
				table.rows[row + 4].style.display = '';
				table.rows[row + 5].style.display = '';
				table.rows[row + 6].style.display = '';
				table.rows[row + 7].style.display = '';
				table.rows[row + 8].style.display = '';
				table.rows[row + 9].style.display = '';
				table.rows[row + 10].style.display = '';
			}
			else
			{
				table.rows[row + 2].style.display = 'none';
				table.rows[row + 3].style.display = 'none';
				table.rows[row + 4].style.display = 'none';
				table.rows[row + 5].style.display = 'none';
				table.rows[row + 6].style.display = 'none';
				table.rows[row + 7].style.display = 'none';
				table.rows[row + 8].style.display = 'none';
				table.rows[row + 9].style.display = 'none';
				table.rows[row + 10].style.display = 'none';
			}
		}
		else
		{
			menu_open(column,row);
			set_table_color();
 			e.style.backgroundColor = 'indianred';
		}
	}
}
