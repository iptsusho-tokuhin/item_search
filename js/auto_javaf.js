function Reach_Rate()//各点の到達率計算
{
	for(var j = 0; j <= 8; j++)//各航路番号ごと
	{
		for(var i = 0; i <= patharray[j].length - 1; i++)
		{
			if(i==0)//点0での到達距離は0
			{
				distance[j][i] = 0;
			}
			else//点1以降までの到達距離（点0から）
			{
				distance[j][i] = distance[j][i-1] + google.maps.geometry.spherical.computeDistanceBetween(patharray[j][i-1], patharray[j][i]);
			}
		}

		for(var i = 0; i <= distance[j].length - 1; i++)//各点での進捗率
		{
			percent[j][i] = distance[j][i] / distance[j][distance[j].length - 1];
		}
		
	}
}


function Marker_Estimation(i)//自動配置
{
	if(document.forms[i].elements[DEP].value == "" || document.forms[i].elements[DATE_DEP].value == "" || document.forms[i].elements[DATE_ARR].value == "")
	{
		return;//出発地、出発日、到着日のいずれかがが空欄ならおわり
	}

	var Day_Departure = new Date(document.forms[i].elements[DATE_DEP].value);//出航日
	var Day_Arrival = new Date(document.forms[i].elements[DATE_ARR].value);//到着日
	var Today = new Date(document.getElementById("today").value);	//本日

	var All_Days = (Day_Arrival - Day_Departure) / 86400000;	//全日程	差日を求める（86,400,000ミリ秒＝１日）
	var Progress_Days = (Today - Day_Departure) / 86400000;		//今日までの期間差日を求める（86,400,000ミリ秒＝１日）
	var n = document.forms[i].elements[DEP].value;			//航路番号
	var Progress_Rate = Progress_Days / All_Days;			//進捗率

	if(Progress_Rate <= 0)
	{
		document.forms[i].elements[LAT].value = patharray[n][0].lat();
		document.forms[i].elements[LNG].value = patharray[n][0].lng();
		Marker_Shift(i);
		return;//出航前なら出発地にマーク
	}
	if(Progress_Rate >= 1)
	{
		document.forms[i].elements[LAT].value = patharray[n][percent[n].length - 1].lat();
		document.forms[i].elements[LNG].value = patharray[n][percent[n].length - 1].lng();
		Marker_Shift(i);
		return;//到着済みなら到着地にマーク
	}
	
	var lat1;	//緯度１
	var lng1;	//経度１
	var lat2;	//緯度２
	var lng2;	//経度２
	var t;		//角度の係数

	for(var j = 1; j <= percent[n].length - 1; j++)
	{
		if(percent[n][j-1] < Progress_Rate && Progress_Rate <= percent[n][j])
		{
			lat1 = Math.PI * patharray[n][j-1].lat() / 180;
			lng1 = Math.PI * patharray[n][j-1].lng() / 180;
			lat2 = Math.PI * patharray[n][j].lat() / 180;
			lng2 = Math.PI * patharray[n][j].lng() / 180;
			t = (Progress_Rate - percent[n][j-1])/(percent[n][j] - percent[n][j-1]);
		}
	}
	
	var V1 = [Math.cos(lat1)*Math.cos(lng1), Math.cos(lat1)*Math.sin(lng1), Math.sin(lat1)];//V1ベクトル
	var V2 = [Math.cos(lat2)*Math.cos(lng2), Math.cos(lat2)*Math.sin(lng2), Math.sin(lat2)];//V2ベクトル
	var N = [V1[1]*V2[2]-V1[2]*V2[1], V1[2]*V2[0]-V1[0]*V2[2], V1[0]*V2[1]-V1[1]*V2[0]];	//外積ベクトル
	var L = Math.sqrt(N[0]*N[0]+N[1]*N[1]+N[2]*N[2]);					//外積ベクトルの絶対値
	
	N[0] = N[0] / L;//外積ベクトルを単位ベクトルに
	N[1] = N[1] / L;//外積ベクトルを単位ベクトルに
	N[2] = N[2] / L;//外積ベクトルを単位ベクトルに

	var deg = t * Math.acos(V1[0]*V2[0] + V1[1]*V2[1] + V1[2]*V2[2]);//V1,V2のなす角（それぞれ単位ベクトルなので計算を省略）
	var R = new Array();//ロドリゲスの回転行列

	R[0] = new Array();
	R[1] = new Array();
	R[2] = new Array();

	R[0][0]= N[0] * N[0] * (1 - Math.cos(deg)) + Math.cos(deg);
	R[0][1]= N[0] * N[1] * (1 - Math.cos(deg)) - N[2] * Math.sin(deg);
	R[0][2]= N[0] * N[2] * (1 - Math.cos(deg)) + N[1] * Math.sin(deg);

	R[1][0]= N[1] * N[0] * (1 - Math.cos(deg)) + N[2] * Math.sin(deg);
	R[1][1]= N[1] * N[1] * (1 - Math.cos(deg)) + Math.cos(deg);
	R[1][2]= N[1] * N[2] * (1 - Math.cos(deg)) - N[0] * Math.sin(deg);

	R[2][0]= N[2] * N[0] * (1 - Math.cos(deg)) - N[1] * Math.sin(deg);
	R[2][1]= N[2] * N[1] * (1 - Math.cos(deg)) + N[0] * Math.sin(deg);
	R[2][2]= N[2] * N[2] * (1 - Math.cos(deg)) + Math.cos(deg);

	//V1ベクトルをロドリゲスの回転行列で deg度回転（V2方向へ）
	var V3 = [ R[0][0]*V1[0]+R[0][1]*V1[1]+R[0][2]*V1[2] , R[1][0]*V1[0]+R[1][1]*V1[1]+R[1][2]*V1[2] , R[2][0]*V1[0]+R[2][1]*V1[1]+R[2][2]*V1[2] ];

	var lat3 = Math.atan2(V3[2], Math.sqrt(V3[0]*V3[0]+V3[1]*V3[1])) * 180 / Math.PI;//V3ベクトルを緯度へ逆変換
	var lng3 = Math.atan2(V3[1], V3[0]) * 180 / Math.PI;				//V3ベクトルを経度へ逆変換

	document.forms[i].elements[LAT].value = lat3;
	document.forms[i].elements[LNG].value = lng3;
	Marker_Shift(i);

}

function Marker_Shift(i)//同じ位置にある場合ずらす
{
	var dlat;
	var dlng;
	for(var j = 0; j < i; j++)
	{
		dlat = Math.abs(document.forms[i].elements[LAT].value - document.forms[j].elements[LAT].value);
		dlng = Math.abs(document.forms[i].elements[LNG].value - document.forms[j].elements[LNG].value);

		if(dlat < 0.5 && dlng < 0.5)
		{
			document.forms[i].elements[LAT].value = Number(document.forms[i].elements[LAT].value) + 0.5 * Math.sin(2 * i * Math.PI / (max/3));
			document.forms[i].elements[LNG].value = Number(document.forms[i].elements[LNG].value) + 0.5 * Math.cos(2 * i * Math.PI / (max/3));
			return;//ずらしは1回まで
		}
	}
}

function Change_Today()//日付の変更
{
	for(var i = 0; i <= max; i++)
	{
		if(document.forms[i].elements[AUTO].checked)
		{
			Marker_Reload(i,0);
		}
	}
}