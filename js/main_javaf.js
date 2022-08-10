var data = [
['日付',		'2022/01/01'],
['本社',		'100'],
['馬房数',		'0'],
['サイドパネル',	'110'],
['バックパネル',	'100'],
['フロントパネル',	'100'],

['美浦',		'100'],
['馬房数',		'0'],
['サイドパネル',	'110'],
['バックパネル',	'100'],
['フロントパネル',	'100'],

['A乗馬クラブ',		'0'],
['馬房数',		'0'],
['サイドパネル',	'0'],
['バックパネル',	'0'],
['フロントパネル',	'0'],

['B乗馬クラブ',		'0'],
['馬房数',		'0'],
['サイドパネル',	'0'],
['バックパネル',	'0'],
['フロントパネル',	'0'],

['C乗馬クラブ',		'0'],
['馬房数',		'0'],
['サイドパネル',	'0'],
['バックパネル',	'0'],
['フロントパネル',	'0']
];

var note = ['本社です','美浦事務所です','〇月〇日 20馬房予定','〇月〇日 まで30馬房','10月工事予定'];
var his = [];
var elm = [];
elm[0] = []; 
elm[1] = []; 
elm[2] = []; 
elm[3] = []; 
elm[4] = []; 

elm[0][0] = document.getElementById('move_date');
elm[0][1] = document.getElementById('move_select1');
elm[0][2] = document.getElementById('move_select2');
elm[0][3] = document.getElementById('move_stable');
elm[0][4] = document.getElementById('move_SP');
elm[0][5] = document.getElementById('move_BP');
elm[0][6] = document.getElementById('move_FP');
elm[0][7] = document.getElementById('max_m_st');
elm[0][8] = document.getElementById('max_m_sp');
elm[0][9] = document.getElementById('max_m_bp');
elm[0][10]= document.getElementById('max_m_fp');
elm[0][11]= document.getElementById('move_note1_label');
elm[0][12]= document.getElementById('move_note1');
elm[0][13]= document.getElementById('move_note2_label');
elm[0][14]= document.getElementById('move_note2');

elm[1][0] = document.getElementById('build_date');
elm[1][1] = document.getElementById('build_select');
elm[1][2] = document.getElementById('build_stable');
elm[1][3] = document.getElementById('max_b_st');
elm[1][4] = document.getElementById('build_note_label');
elm[1][5] = document.getElementById('build_note');

elm[2][0] = document.getElementById('demolition_date');
elm[2][1] = document.getElementById('demolition_select');
elm[2][2] = document.getElementById('demolition_stable');
elm[2][3] = document.getElementById('max_d_st');
elm[2][4] = document.getElementById('build_note_label');
elm[2][5] = document.getElementById('demolition_note');

elm[3][0] = document.getElementById('customer_select1');
elm[3][1] = document.getElementById('customer_text1');
elm[3][2] = document.getElementById('customer_text2');

elm[4][0] = document.getElementById('includ_date');
elm[4][1] = document.getElementById('includ_select');
elm[4][2] = document.getElementById('includ_stable');
elm[4][3] = document.getElementById('includ_SP');
elm[4][4] = document.getElementById('includ_BP');
elm[4][5] = document.getElementById('includ_FP');



var begin_date = document.getElementById('begin_date');
var end_date = document.getElementById('end_date');
begin_date.value = '2022-01-01';
end_date.value = convert_date(new Date()).replace(/(\d+)\/(\d+)\/(\d+)/g,'$1-$2-$3');

var table = document.getElementById('table');
var main = document.getElementById('main');

set_data();
export_table();
main.scrollLeft = 9999999999999999999999999999999999;
road_history();
set_select();















function set_data()				//今日までのデータを作成
{
	var today = new Date();
	var L = data[0].length;
	for(var j = 1;;j++)
	{
		if(j >= L)
		{	
			var d = get_date(data[0][j-1]);
			d.setDate(d.getDate() + 1);
			data[0][j] = convert_date(d);
			if(d > today){break;}
		}
	}

	for(var i = 1;i < data.length; i++)
	{
		for(var j = 1;j < data[0].length; j++)
		{
			if(j >= L){data[i][j] = data[i][j-1];}
		}
	}
}

function set_select()				//selectを再設定（valueにはrow値が入る）
{
	var select = [];
	select[0] = elm[0][1];//select要素を取得する
	select[1] = elm[0][2];//select要素を取得する
	select[2] = elm[1][1];//select要素を取得する
	select[3] = elm[2][1];//select要素を取得する
	select[4] = elm[3][0];//select要素を取得する
	select[5] = elm[4][1];//select要素を取得する

	for(var i = 0; i < select.length; i++)	
	{
		select[i].innerHTML = '';
		for(var j = 0; j < data.length; j++)//データ出力
		{
			if(j % 5 == 1)
			{
				const op = document.createElement('option');	//option要素を新しく作る
				op.value = j;					//option要素にvalueと表示名を設定
				op.textContent = data[j][0];
				select[i].appendChild(op);			//select要素にoption要素を追加する
			}
		}
	}
}

function set_history(h)				//操作履歴に追加
{
	var d = new Date();
	var hour = ('00' + d.getHours()).slice(-2);
	var min = ('00' + d.getMinutes()).slice(-2);
	var sec = ('00' + d.getSeconds()).slice(-2);
	var time = '[' + convert_date(d) + ' ' + hour + ':' + min + ':' + sec +']';
	his.push(time + h);
	road_history();
	Output_to_gas();
}

function road_history()				//操作履歴を表示
{
	if(his.length == 0){return;}
	var text = '';
	for(var i = his.length-1;i >= 0; i--){text += his[i] + '<br>';}
	document.getElementById('history').innerHTML = text;
}



function set_note(row,text)			//備考を書き込み
{
	var n = Math.floor(row / 5);
	note[n] = text.replace(/\r?\n/g, '<br>');
}

function road_note(row)				//備考を読み込み
{
	if(row % 5 == 1)
	{
		var text;
		var n = Math.floor(row / 5);
		return note[n];
	}
	else
	{
		return '';
	}
}

function display_note(e)			//備考を表示
{
	const column = e.cellIndex;//列番号
	const tr = e.parentNode;
	const row = tr.sectionRowIndex;//行番号
	if(row % 5 == 1 && row < table.rows.length - 5)
	{
		document.getElementById('note').style.display = 'block';

		var text = data[row][0] + '<br>' + road_note(row);
		document.getElementById('note').innerHTML = text;
	}
}

function hidden_note()				//備考を非表示に
{
	document.getElementById('note').style.display = 'none';
}

















function customer_entry(f)
{
	if(f == 0)
	{
		if(elm[3][1].value == ''){alert('空欄は不適です');return;}
		var h = ' 名前変更 ' + data[elm[3][0].value][0] + ' → ' + elm[3][1].value;
		data[elm[3][0].value][0] = elm[3][1].value;
	}
	else if(f == 1)
	{
		if(elm[3][2].value == ''){alert('空欄は不適です');return;}
		var arry1 = [elm[3][2].value,	'0'];
		var arry2 = ['馬房数',		'0'];
		var arry3 = ['サイドパネル',	'0'];
		var arry4 = ['バックパネル',	'0'];
		var arry5 = ['フロントパネル',	'0'];

		data.push(arry1);
		data.push(arry2);
		data.push(arry3);
		data.push(arry4);
		data.push(arry5);
		note.push('');
		for(var i = 1; i < data[0].length; i++)
		{
			data[data.length-5][i] = '0';
			data[data.length-4][i] = '0';
			data[data.length-3][i] = '0';
			data[data.length-2][i] = '0';
			data[data.length-1][i] = '0';
		}
		var h = ' 顧客追加 ' + elm[3][2].value;
	}
	set_data();
	set_select();
	export_table();
	menu_close();
	set_history(h);
}




















function menu_open(column,row)
{
	menu_close();
	document.getElementById('select').style.display = 'block';

	var date = data[0][column].replace(/(\d+)\/(\d+)\/(\d+)/g,'$1-$2-$3');
	for(var i = 0; i <= 2; i++){elm[i][0].value = date;}

	for(var i = 3; i <= 6; i++){elm[0][i].value = 0;}

	elm[1][2].value = 0;
	elm[2][2].value = 0;

	elm[0][1].value = 0;
	elm[0][2].value = row;
	elm[1][1].value = row;
	elm[2][1].value = row;

	set_max();
}

function menu_close()
{
	document.getElementById('select').style.display = 'none';
	document.getElementById('move').style.display = 'none';
	document.getElementById('build').style.display = 'none';
	document.getElementById('demolition').style.display = 'none';
	document.getElementById('customer').style.display = 'none';
	document.getElementById('includ').style.display = 'none';
	set_table_color();
	for(var i = 0; i < elm.length; i++)	
	{
		for(var j = 0; j < elm[i].length; j++)//データ出力
		{
			elm[i][j].value = '';
		}
	}
}

function menu_select(n)
{
	set_date_min_max();
	switch (n) {
		case 0:
		document.getElementById('move').style.display = 'block';break;
  		case 1:
		document.getElementById('build').style.display = 'block';break;
  		case 2:
		document.getElementById('demolition').style.display = 'block';break;
		case 3:
		menu_close();
		document.getElementById('customer').style.display = 'block';break;
  		case 4:
		menu_close();
		elm[4][0].value = convert_date(new Date()).replace(/(\d+)\/(\d+)\/(\d+)/g,'$1-$2-$3');
		elm[4][1].value = '1';
		document.getElementById('includ').style.display = 'block';break;
  		default:
	}
}




function set_max()				//移動・組立・解体可能な最大値を設定
{
	var date = [];
	date[0] = get_date(elm[0][0].value);
	date[1] = get_date(elm[1][0].value);
	date[2] = get_date(elm[2][0].value);

	var row = [];
	row[0] = Number(elm[0][1].value);	//場所のvalue = tableのrow
	row[1] = Number(elm[0][2].value);	//場所のvalue = tableのrow
	row[2] = Number(elm[1][1].value);	//場所のvalue = tableのrow
	row[3] = Number(elm[2][1].value);	//場所のvalue = tableのrow

	for(var i = 3; i <= 6; i++){elm[0][i].min = 0;}
	elm[1][2].min = 0;
	elm[2][2].min = 0;

	if(row[0] == 0)
	{
		for(var i = 3; i <= 6; i++){elm[0][i].max = 0;}
	}
	else
	{
		elm[0][3].max = search_max(row[0]    ,date[0],0);//maxを探る
		elm[0][4].max = search_max(row[0] + 2,date[0],1);//maxを探る
		elm[0][5].max = search_max(row[0] + 3,date[0],1);//maxを探る
		elm[0][6].max = search_max(row[0] + 4,date[0],1);//maxを探る
	}

	elm[1][2].max = search_max(row[2]    ,date[1],0);	//maxを探る
	elm[2][2].max = search_max(row[3] + 1,date[2],1);	//maxを探る

	for(var i = 3; i <= 6; i++){re_set_num(0,i);}
	re_set_num(1,2);
	re_set_num(2,2);

	for(var i = 3; i <= 6; i++){elm[0][i + 4].innerHTML = '最大：' + elm[0][i].max;}
	elm[1][3].innerHTML = '最大：' + elm[1][2].max;
	elm[2][3].innerHTML = '最大：' + elm[2][2].max;

	elm[0][11].innerHTML = data[row[0]][0];
	elm[0][13].innerHTML = data[row[1]][0];
	elm[1][4].innerHTML = data[row[2]][0];
	elm[2][4].innerHTML = data[row[3]][0];

	elm[0][12].value = road_note(row[0]).replace(/<br>/g, "\n");
	elm[0][14].value = road_note(row[1]).replace(/<br>/g, "\n");
	elm[1][5].value = road_note(row[2]).replace(/<br>/g, "\n");
	elm[2][5].value = road_note(row[3]).replace(/<br>/g, "\n");


}

function re_set_num(m,n)
{
	if(Number(elm[m][n].value) < Number(elm[m][n].min)){elm[m][n].value = elm[m][n].min}
	if(Number(elm[m][n].max) < Number(elm[m][n].value)){elm[m][n].value = elm[m][n].max}
}



function move_entry()
{
	var date	= new Date(elm[0][0].value);
	var place1 	= Number(elm[0][1].value);
	var place2 	= Number(elm[0][2].value);
	var stable	= Number(elm[0][3].value);
	var side_panel	= Number(elm[0][4].value);
	var back_panel	= Number(elm[0][5].value);
	var front_panel	= Number(elm[0][6].value);

	if(place1 == 0 || place2 == 0){alert('移動元or移動先が未選択です。');return;}
	var d;

	for(var i = 1; i < data[0].length; i++)
	{
		d = get_date(data[0][i]);
		if(date <= d)
		{
			data[place1][i]     = String(Number(data[place1][i]) - stable);
			data[place1 + 2][i] = String(Number(data[place1 + 2][i]) - side_panel);
			data[place1 + 3][i] = String(Number(data[place1 + 3][i]) - back_panel);
			data[place1 + 4][i] = String(Number(data[place1 + 4][i]) - front_panel);

			data[place2][i]     = String(Number(data[place2][i]) + stable);
			data[place2 + 2][i] = String(Number(data[place2 + 2][i]) + side_panel);
			data[place2 + 3][i] = String(Number(data[place2 + 3][i]) + back_panel);
			data[place2 + 4][i] = String(Number(data[place2 + 4][i]) + front_panel);
		}
	}

	export_table();
	menu_close();

	var h = convert_date(date) + ' 移動 ' + data[place1][0] + ' → ' + data[place2][0] + ' ' + stable + '馬房 ' + '(SP' + side_panel + '枚,BP' + back_panel + '枚,FP' + front_panel + '枚)';
	set_history(h);
	set_note(place1,elm[0][12].value);
	set_note(place2,elm[0][14].value);
}

function build_and_demolition_entry(f)
{
	var date   = new Date(elm[f][0].value);
	var place  = Number(elm[f][1].value);
	var stable;

	if(f == 1){stable =  Number(elm[f][2].value);}
	if(f == 2){stable = -Number(elm[f][2].value);}

	var d;

	for(var i = 1; i < data[0].length; i++)
	{
		d = get_date(data[0][i]);
		if(date <= d)
		{
			data[place + 1][i] = String(Number(data[place + 1][i]) + stable);
		}
	}

	export_table();
	menu_close();

	if(f == 1){var h = convert_date(date) + ' 組立 ' + data[place][0] + ' ' + Number(elm[f][2].value) + '馬房 ';}
	if(f == 2){var h = convert_date(date) + ' 解体 ' + data[place][0] + ' ' + Number(elm[f][2].value) + '馬房 ';}
	set_history(h);

	if(f == 1){set_note(place,elm[1][5].value);}
	if(f == 2){set_note(place,elm[2][5].value);}
	
}

function move_stable_change()			//移動する馬房数に合わせてパネル数を自動計算（20馬房1棟計算）
{
	re_set_num(0,3);
	var st = Number(elm[0][3].value);
	var sp = st + Math.ceil(st / 20) * 2 ;
	elm[0][4].value = sp;
	elm[0][5].value = st;
	elm[0][6].value = st;
	for(var i = 4; i <= 6; i++){re_set_num(0,i);}
}

function includ_stable_change()			//移動する馬房数に合わせてパネル数を自動計算（20馬房1棟計算）
{
	var st = Number(elm[4][2].value);
	if(st < 0)	{var sp = st + Math.floor(st / 20) * 2;}
	else		{var sp = st + Math.ceil(st / 20) * 2;}
	elm[4][3].value = sp;
	elm[4][4].value = st;
	elm[4][5].value = st;
}

function includ_entry()
{
	var date	= new Date(elm[4][0].value);
	var place 	= Number(elm[4][1].value);
	var stable	= Number(elm[4][2].value);
	var side_panel	= Number(elm[4][3].value);
	var back_panel	= Number(elm[4][4].value);
	var front_panel	= Number(elm[4][5].value);

	if(place == 0){alert('入出荷場所が未選択です。');return;}
	var d;

	for(var i = 1; i < data[0].length; i++)
	{
		d = get_date(data[0][i]);
		if(date <= d)
		{
			data[place][i]     = String(Number(data[place][i]) + stable);
			data[place + 2][i] = String(Number(data[place + 2][i]) + side_panel);
			data[place + 3][i] = String(Number(data[place + 3][i]) + back_panel);
			data[place + 4][i] = String(Number(data[place + 4][i]) + front_panel);
		}
	}

	export_table();
	menu_close();

	var h = convert_date(date) + ' 棚卸 ' + data[place][0] + ' ' + stable + '馬房 ' + '(SP' + side_panel + '枚・BP' + back_panel + '枚・FP' + front_panel + '枚)';
	set_history(h);
}





















function get_date(date)//yyyy/mm/dd形式をdateに変換
{
	var year = Number(date.substring(0, 4));
	var month = Number(date.substring(5, 7));
	var day = Number(date.substring(8, 10));
	var d = new Date(year, month - 1, day, 23, 59, 59);
	return d;
}

function convert_date(dt)//dateをyyyy/mm/dd形式に変換
{
	
	var y = dt.getFullYear();
	var m = ('00' + (dt.getMonth()+1)).slice(-2);
	var d = ('00' + dt.getDate()).slice(-2);
	var date = y + '/' + m + '/' + d;
	return date;
}



function search_max(row,date,f)//row列のdate日以降の最小値をmaxとして返す
{
	var max = 999999;
	var flag = 0;
	for(var i = 1; i < data[0].length; i++)
	{
		d = get_date(data[0][i]);
		if(f == 0){num = Number(data[row][i]) - Number(data[row + 1][i]);}
		else      {num = Number(data[row][i]);}
		if(date <= d && num < max)
		{
			flag = 1;
			max = num;
		}
	}
	if(flag ==  0){max = 0;}
	return max;
}

function set_date_min_max()//表示日の最大最小
{
	begin_date.min = '2022-01-01';
	begin_date.max = end_date.value;
	end_date.min = begin_date.value;
	end_date.max = convert_date(new Date()).replace(/(\d+)\/(\d+)\/(\d+)/g,'$1-$2-$3');

	elm[0][0].min = begin_date.value;
	elm[0][0].max = end_date.value;
	elm[1][0].min = begin_date.value;
	elm[1][0].max = end_date.value;
	elm[2][0].min = begin_date.value;
	elm[2][0].max = end_date.value;
}

