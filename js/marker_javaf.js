function Marker_Reload(i,a)//マーカー再配置（最重要関数！！）
{
	if(i < markers.length)
	{
		markers[i].setMap(null);//既にあるマーカーを削除
	}

	Table_Reload();	

	if(document.forms[i].elements[TABLE].checked == true && document.forms[i].elements[FLAG].value == 1)
	{
		if(document.forms[i].elements[AUTO].checked)
		{
			Marker_Estimation(i);
		}
		var tof = true;
		if(document.getElementById("In_Out").value == "output")//inputとoutputとでマーカーを動かせられるか切り替え
		{
			tof = false;
		}
		var latlng = new google.maps.LatLng(document.forms[i].elements[LAT].value,document.forms[i].elements[LNG].value);

		marker = new google.maps.Marker(
		{
		map: map,
		position: latlng,
		animation: a,
		draggable: tof,//true or false
		icon: icon[document.forms[i].elements[ICON_NUM].value]
		});

		markers[i] = marker;//ここで生成したマーカーを指定場所に格納する
		create_info(i);
		google.maps.event.addListener( markers[i], "dragend", function(ev){document.forms[i].elements[LAT].value = ev.latLng.lat();document.forms[i].elements[LNG].value = ev.latLng.lng();Marker_Reload(i,0);});
	}
	Output_to_gas();
}

var infoWindow = [];

function create_info(i)//インフォウィンドウの表示・再表示
{
	info_load(i);
	infoWindow[i] = new google.maps.InfoWindow({content:infos[i],maxWidth:135});
	infoWindow[i].open(map, markers[i]);
	google.maps.event.addListener(markers[i],"click",function(event){balloon_switch(i);});
}

function balloon_switch(i)//インフォウィンドウの切り替え
{

	if(balloon_flag[i] == 0)
	{
		balloon_flag[i] = 1;
	}
	else if(balloon_flag[i] == 1)
	{
		balloon_flag[i] = 2;
	}
	else
	{
		balloon_flag[i] = 0;
	}

	infoWindow[i].close(map, markers[i]);

	if(balloon_flag[i] > 0)
	{
		info_load(i);
		infoWindow[i] = new google.maps.InfoWindow({content:infos[i],maxWidth:135});
		infoWindow[i].open(map, markers[i]);
	}
}

function info_load(i)
{
	var f = 0;

	if(balloon_flag[i] == 1)
	{
		infos[i] = "<div style='font-size:14pt; background-color:" + document.forms[i].elements[BALLOON].value + "'>";
		if(document.forms[i].elements[NAME].value != "")
		{
			infos[i] = infos[i] + document.forms[i].elements[NAME].value;
		}
		infos[i] = infos[i] + "</div>";
		return;//ここで終わり
	}

	infos[i] = "<div style='font-size:9pt; background-color:" + document.forms[i].elements[BALLOON].value + "'>";

	if(document.forms[i].elements[NAME].value != "")
	{
		infos[i] = infos[i] + document.forms[i].elements[NAME].value + "<br>";
		f = 1;
	}

	if(document.forms[i].elements[IVNO].value != "" || document.forms[i].elements[IV1].value != "")
	{
		if(document.forms[i].elements[IV1].value != "")
		{
			infos[i] = infos[i] +  "<a href = " + document.forms[i].elements[IV1].value + " target=_blank rel=noopener noreferrer>";
		}

		if(document.forms[i].elements[IVNO].value != "")
		{
			infos[i] = infos[i] + "I/V: " + document.forms[i].elements[IVNO].value + "</a>" + "<br>";
		}
		else
		{
			infos[i] = infos[i] + "INVOICE" + "</a>" + "<br>";
		}
		f = 1;
	}

	if(document.forms[i].elements[DATE_ARR].value != "")
	{
		infos[i] = infos[i] + document.forms[i].elements[DATE_ARR].value.substr(-5).replace("-",'/') + " ";
		f = 1;
	}

	if(document.forms[i].elements[ARR].value != "")
	{
		infos[i] = infos[i] + document.forms[i].elements[ARR].value + " 着" + "<br>";
		f = 1;
	}

	if(document.forms[i].elements[SHIP].value != "")
	{
		infos[i] = infos[i] + "船名：<a href = " + document.forms[i].elements[URL_SHIP].value + " target=_blank rel=noopener noreferrer>" + document.forms[i].elements[SHIP].value + "</a><br>";
		f = 1;
	}

	if(document.forms[i].elements[NOTE].value != "")
	{
		infos[i] = infos[i] + "メモ：" + document.forms[i].elements[NOTE].value;
		f = 1;
	}
	infos[i] = infos[i] + "</div>";
	
	if(f == 0)
	{
		infos[i] = "<div style='font-size:9pt; background-color:" + document.forms[i].elements[BALLOON].value + "'>シュタッ</div>"
	}
}
