var map;

var markers = [];
let infos = [];
var infoWindows = [];
var balloon_flag = [];
//https://github.com/iptsusho-tokuhin/Ship_Location/blob/main/img/SHIP1_L.png?raw=true
var url = "https://github.com/iptsusho-tokuhin/Ship_Location/blob/main/img/";
var icon = [	
url + "HERO.png?raw=true",
url + "SHIP1_L.png?raw=true",
url + "SHIP1_R.png?raw=true",
url + "SHIP2_L.png?raw=true",
url + "SHIP2_R.png?raw=true",
url + "AIRPLANE_L.png?raw=true",
url + "AIRPLANE_R.png?raw=true"
];

var max = 15;

var NAME = 0;
var IVNO = 1;
var IV1 = 2;
var DEP = 3;
var ARR = 4;
var DATE_DEP = 5;
var DATE_ARR = 6;
var SHIP = 7;
var URL_SHIP = 8;
var LAT = 9;
var LNG = 10;
var NOTE = 11;
var BALLOON = 12;
var ICON_NUM = 13;
var CLEAR_BUTTON = 14;
var AUTO = 15;
var TABLE = 16;
var FLAG = 17;



window.onload = function() {
	var latlng = new google.maps.LatLng(35.000000,135.000000);
	var opts = 
	{
		zoom: 2,
		minZoom: 2,
		center: latlng, 
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		mapTypeControl: false,
		zoomControl: false,
		streetViewControl: false,
		fullscreenControl: false,
		gestureHandling: 'greedy',
	};
	map = new google.maps.Map(document.getElementById("map_canvas"), opts);

	DrowRouteLine_EU();
	DrowRouteLine_USA();
	DrowRouteLine_CN();
	DrowRouteLine_ASEAN();
	DrowRouteLine_TW();
	DrowRouteLine_Air();
	Intput_from_gas();
}


function Set_Initial()
{
	if(document.getElementById("In_Out").value == "output")//inputとoutputとで初期表示を切り替え
	{	
		for(var i = 0; i <= max; i++)
		{
			balloon_flag[i] = 1;
		}
		document.getElementById("interface").style.display = "none";
	}
	else
	{
		for(var i = 0; i <= max; i++)
		{
			balloon_flag[i] = 2;
		}
		document.getElementById("interface").style.display = "block";
	}

	var today = new Date();
	today.setDate(today.getDate());
	var yyyy = today.getFullYear();
	var mm = ("0"+(today.getMonth()+1)).slice(-2);
	var dd = ("0"+today.getDate()).slice(-2);
 	document.getElementById("today").value = yyyy + "-" + mm + "-" + dd;

	for(var i = 0; i <= max; i++)
	{
		if(document.forms[i].elements[FLAG].value == 1)
		{
			Marker_Reload(i,0);
		}
	}
	Text_Load();
}


function Text_Load()
{
	var TEXT = 0;
	var FONT_SIZE = 1;
	var BOLD = 2;
	var FONT_COLOR = 3;
	var BACK_COLOR = 4;

	var start = max + 1;

	var elm = [];
	elm[0] = document.getElementById('text1');
	elm[1] = document.getElementById('text2');
	elm[2] = document.getElementById('text3');
	elm[3] = document.getElementById('text4');
	elm[4] = document.getElementById('text5');
	elm[5] = document.getElementById('text6');
	elm[6] = document.getElementById('text7');
	elm[7] = document.getElementById('text8');
	elm[8] = document.getElementById('text9');
	elm[9] = document.getElementById('text10');
	
	for(var i = 0; i <= 9; i++)
	{
		if(document.forms[start + i].elements[NAME].value != "")
		{
			elm[i].textContent = document.forms[start + i].elements[TEXT].value + "\n";
			elm[i].style.fontSize = document.forms[start + i].elements[FONT_SIZE].value;
			if(document.forms[start + i].elements[BOLD].checked)
			{
				elm[i].style.fontWeight = "bold";
			}
			else
			{
				elm[i].style.fontWeight = "normal";
			}	
			elm[i].style.color = document.forms[start + i].elements[FONT_COLOR].value;
			elm[i].style.background = document.forms[start + i].elements[BACK_COLOR].value;
		}
	}
	//Output_to_gas();
}

//地図上の線データ初期設定*******************************************************************************************************

var patharray_EU = new Array();//オランダ→スエズ運河→シンガポール→日本
var patharray_USA1 = new Array();//ロサンゼルス→日本
var patharray_USA2 = new Array();//シアトル→日本
var patharray_USA3 = new Array();//ノーフォーク→チャールストン→パナマ運河→日本
var patharray_CN = new Array();//青島→上海→日本
var patharray_ASEAN = new Array();//インドネシア→日本

var distance_EU = new Array();//オランダ→スエズ運河→シンガポール→日本
var distance_USA1 = new Array();//ロサンゼルス→日本
var distance_USA2 = new Array();//シアトル→日本
var distance_USA3 = new Array();//ノーフォーク→チャールストン→パナマ運河→日本
var distance_CN = new Array();//青島→上海→日本
var distance_ASEAN = new Array();//インドネシア→日本

var percent_EU = new Array();//オランダ→スエズ運河→シンガポール→日本
var percent_USA1 = new Array();//ロサンゼルス→日本
var percent_USA2 = new Array();//シアトル→日本
var percent_USA3 = new Array();//ノーフォーク→チャールストン→パナマ運河→日本
var percent_CN = new Array();//青島→上海→日本
var percent_ASEAN = new Array();//インドネシア→日本

var patharray = new Array();
var distance= new Array();
var percent= new Array();

var EU = 0;
var USA1 = 1;
var USA2 = 2;
var USA3 = 3;
var CN = 4;
var ASEAN = 5;
var TW = 6;
var AirEU = 7;
var AirUSA = 8;

patharray[EU] = new Array();//オランダ→スエズ運河→シンガポール→日本
patharray[USA1] = new Array();//ロサンゼルス→日本
patharray[USA2] = new Array();//シアトル→日本
patharray[USA3] = new Array();//ノーフォーク→チャールストン→パナマ運河→日本
patharray[CN] = new Array();//青島→上海→日本
patharray[ASEAN] = new Array();//インドネシア→日本
patharray[TW] = new Array();//台湾→日本
patharray[AirEU] = new Array();//
patharray[AirUSA] = new Array();//

distance[EU] = new Array();//オランダ→スエズ運河→シンガポール→日本
distance[USA1] = new Array();//ロサンゼルス→日本
distance[USA2] = new Array();//シアトル→日本
distance[USA3] = new Array();//ノーフォーク→チャールストン→パナマ運河→日本
distance[CN] = new Array();//青島→上海→日本
distance[ASEAN] = new Array();//インドネシア→日本
distance[TW] = new Array();//台湾→日本
distance[AirEU] = new Array();//
distance[AirUSA] = new Array();//

percent[EU] = new Array();//オランダ→スエズ運河→シンガポール→日本
percent[USA1] = new Array();//ロサンゼルス→日本
percent[USA2] = new Array();//シアトル→日本
percent[USA3] = new Array();//ノーフォーク→チャールストン→パナマ運河→日本
percent[CN] = new Array();//青島→上海→日本
percent[ASEAN] = new Array();//インドネシア→日本
percent[TW] = new Array();//台湾→日本
percent[AirEU] = new Array();//
percent[AirUSA] = new Array();//

function DrowRouteLine_EU()//EU航路の線を引く
{
	patharray[EU][0] = new google.maps.LatLng(51.887287, 3.914865);//オランダ→スエズ運河→シンガポール→日本
	patharray[EU][1] = new google.maps.LatLng(48.584620, -4.787783);
	patharray[EU][2] = new google.maps.LatLng(41.593424, -10.359403);
	patharray[EU][3] = new google.maps.LatLng(36.959745, -9.136943);
	patharray[EU][4] = new google.maps.LatLng(35.984796, -5.606774);
	patharray[EU][5] = new google.maps.LatLng(37.395877, 9.756097);
	patharray[EU][6] = new google.maps.LatLng(31.527636, 31.958826);
	patharray[EU][7] = new google.maps.LatLng(31.280838, 32.331102);
	patharray[EU][8] = new google.maps.LatLng(31.247391, 32.305364);
	patharray[EU][9] = new google.maps.LatLng(30.805818, 32.317742);
	patharray[EU][10] = new google.maps.LatLng(30.727459, 32.341532);
	patharray[EU][11] = new google.maps.LatLng(30.706567, 32.344366);
	patharray[EU][12] = new google.maps.LatLng(30.618519, 32.324535);
	patharray[EU][13] = new google.maps.LatLng(30.579466, 32.304646);
	patharray[EU][14] = new google.maps.LatLng(30.553549, 32.306509);
	patharray[EU][15] = new google.maps.LatLng(30.515966, 32.336324);
	patharray[EU][16] = new google.maps.LatLng(30.411448, 32.358149);
	patharray[EU][17] = new google.maps.LatLng(30.324303, 32.396275);
	patharray[EU][18] = new google.maps.LatLng(30.273117, 32.455286);
	patharray[EU][19] = new google.maps.LatLng(30.252327, 32.533560);
	patharray[EU][20] = new google.maps.LatLng(30.190107, 32.568643);
	patharray[EU][21] = new google.maps.LatLng(30.062145, 32.571734);
	patharray[EU][22] = new google.maps.LatLng(29.975798, 32.586982);
	patharray[EU][23] = new google.maps.LatLng(29.949529, 32.580356);
	patharray[EU][24] = new google.maps.LatLng(29.926175, 32.555517);
	patharray[EU][25] = new google.maps.LatLng(28.980521, 32.883160);
	patharray[EU][26] = new google.maps.LatLng(27.506422, 34.037454);
	patharray[EU][27] = new google.maps.LatLng(12.618474, 43.467008);
	patharray[EU][28] = new google.maps.LatLng(12.026598, 50.770476);
	patharray[EU][29] = new google.maps.LatLng(5.461612, 80.302742);
	patharray[EU][30] = new google.maps.LatLng(6.057735, 96.321668);
	patharray[EU][31] = new google.maps.LatLng(1.135852, 103.657384);
	patharray[EU][32] = new google.maps.LatLng(1.328037, 104.356027);
	patharray[EU][33] = new google.maps.LatLng(3.130172, 105.570735);
	patharray[EU][34] = new google.maps.LatLng(20.787345, 121.161279);
	patharray[EU][35] = new google.maps.LatLng(26.395408, 126.687145);
	patharray[EU][36] = new google.maps.LatLng(32.993032, 135.126387);

	var polylineOpts_EU = {map: map, path: patharray[EU], geodesic:true, strokeColor: "darkcyan", strokeWeight: 3, strokeOpacity: 0.5};
	var polyline_EU = new google.maps.Polyline(polylineOpts_EU);
}

function DrowRouteLine_USA()//USA航路の線を引く
{
	patharray[USA1][0] = new google.maps.LatLng(33.733833, -118.740900);//ロサンゼルス→日本
	patharray[USA1][1] = new google.maps.LatLng(34.783989, 140.843402);
	patharray[USA1][2] = new google.maps.LatLng(32.993032, 135.126387);

	patharray[USA2][0] = new google.maps.LatLng(48.049592, -125.829131);//シアトル→日本
	patharray[USA2][1] = new google.maps.LatLng(50.718682, -176.540144);
	patharray[USA2][2] = new google.maps.LatLng(34.783989, 140.843402);
	patharray[USA2][3] = new google.maps.LatLng(32.993032, 135.126387);

	patharray[USA3][0] = new google.maps.LatLng(36.749950, -75.560835);//ノーフォーク→チャールストン→パナマ運河→日本
	patharray[USA3][1] = new google.maps.LatLng(35.201003, -75.133806);
	patharray[USA3][2] = new google.maps.LatLng(32.566892, -79.659319);
	patharray[USA3][3] = new google.maps.LatLng(23.915708, -74.661900);
	patharray[USA3][4] = new google.maps.LatLng(20.175211, -74.002829);
	patharray[USA3][5] = new google.maps.LatLng(9.388203, -79.918834);
	patharray[USA3][6] = new google.maps.LatLng(9.311990, -79.919179);
	patharray[USA3][7] = new google.maps.LatLng(9.262020, -79.911047);
	patharray[USA3][8] = new google.maps.LatLng(9.231901, -79.885297);
	patharray[USA3][9] = new google.maps.LatLng(9.197779, -79.871844);
	patharray[USA3][10] = new google.maps.LatLng(9.182860, -79.856750);
	patharray[USA3][11] = new google.maps.LatLng(9.182270, -79.841396);
	patharray[USA3][12] = new google.maps.LatLng(9.176829, -79.833624);
	patharray[USA3][13] = new google.maps.LatLng(9.162584, -79.812822);
	patharray[USA3][14] = new google.maps.LatLng(9.120180, -79.801203);
	patharray[USA3][15] = new google.maps.LatLng(9.113944, -79.767108);
	patharray[USA3][16] = new google.maps.LatLng(9.121377, -79.750583);
	patharray[USA3][17] = new google.maps.LatLng(9.115446, -79.706473);
	patharray[USA3][18] = new google.maps.LatLng(9.107772, -79.691863);
	patharray[USA3][19] = new google.maps.LatLng(9.084170, -79.677816);
	patharray[USA3][20] = new google.maps.LatLng(9.067721, -79.670916);
	patharray[USA3][21] = new google.maps.LatLng(9.057586, -79.657217);
	patharray[USA3][22] = new google.maps.LatLng(9.038144, -79.643443);
	patharray[USA3][23] = new google.maps.LatLng(9.011535, -79.612081);
	patharray[USA3][24] = new google.maps.LatLng(8.958368, -79.570831);
	patharray[USA3][25] = new google.maps.LatLng(8.945876, -79.568805);
	patharray[USA3][26] = new google.maps.LatLng(8.935635, -79.555869);
	patharray[USA3][27] = new google.maps.LatLng(8.899535, -79.560755);
	patharray[USA3][28] = new google.maps.LatLng(8.642921, -79.691248);
	patharray[USA3][29] = new google.maps.LatLng(7.471900, -79.977763);
	patharray[USA3][30] = new google.maps.LatLng(7.205420, -80.405224);
	patharray[USA3][31] = new google.maps.LatLng(7.132500, -81.944846);
	patharray[USA3][32] = new google.maps.LatLng(17.849478, -104.548193);
	patharray[USA3][33] = new google.maps.LatLng(34.783989, 140.843402);
	patharray[USA3][34] = new google.maps.LatLng(32.993032, 135.126387);

	var polylineOpts_USA1 = {map: map, path: patharray[USA1], geodesic:true, strokeColor: "orangered", strokeWeight: 3, strokeOpacity: 0.5};
	var polylineOpts_USA2 = {map: map, path: patharray[USA2], geodesic:true, strokeColor: "orangered", strokeWeight: 3, strokeOpacity: 0.5};
	var polylineOpts_USA3 = {map: map, path: patharray[USA3], geodesic:true, strokeColor: "orangered", strokeWeight: 3, strokeOpacity: 0.5};
	var polyline_USA1 = new google.maps.Polyline(polylineOpts_USA1);
	var polyline_USA2 = new google.maps.Polyline(polylineOpts_USA2);
	var polyline_USA3 = new google.maps.Polyline(polylineOpts_USA3);
}

function DrowRouteLine_CN()//中国航路の線を引く
{
	patharray[CN][0] = new google.maps.LatLng(35.959662, 120.423708);//青島→上海→日本
	patharray[CN][1] = new google.maps.LatLng(30.516843, 122.852852);
	patharray[CN][2] = new google.maps.LatLng(30.930535, 130.969199);
	patharray[CN][3] = new google.maps.LatLng(32.993032, 135.126387);

	var polylineOpts_CN = {map: map, path: patharray[CN], geodesic:true, strokeColor: "deeppink", strokeWeight: 3, strokeOpacity: 0.5};
	var polyline_CN = new google.maps.Polyline(polylineOpts_CN);
}

function DrowRouteLine_ASEAN()//東南アジア航路の線を引く
{
	patharray[ASEAN][0] = new google.maps.LatLng(-6.780215, 112.689933);//インドネシア→日本
	patharray[ASEAN][1] = new google.maps.LatLng(-2.890650, 110.104329);
	patharray[ASEAN][2] = new google.maps.LatLng(-1.252044, 109.193855);
	patharray[ASEAN][3] = new google.maps.LatLng(0.798607, 108.662066);
	patharray[ASEAN][4] = new google.maps.LatLng(2.722500, 108.939598);
	patharray[ASEAN][5] = new google.maps.LatLng(18.558804, 120.521249);
	patharray[ASEAN][6] = new google.maps.LatLng(26.567634, 128.429652);
	patharray[ASEAN][7] = new google.maps.LatLng(32.993032, 135.126387);

	var polylineOpts_ASEAN = {map: map, path: patharray[ASEAN], geodesic:true, strokeColor: "darkorange", strokeWeight: 3, strokeOpacity: 0.5};
	var polyline_ASEAN = new google.maps.Polyline(polylineOpts_ASEAN);
}

function DrowRouteLine_TW()//台湾航路の線を引く
{
	patharray[TW][0] = new google.maps.LatLng(25.152463, 121.356022);//台湾→日本
	patharray[TW][1] = new google.maps.LatLng(25.172814, 121.361403);
	patharray[TW][2] = new google.maps.LatLng(25.287324, 121.454318);
	patharray[TW][3] = new google.maps.LatLng(29.343273, 130.1415726);
	patharray[TW][4] = new google.maps.LatLng(32.993032, 135.126387);

	var polylineOpts_TW = {map: map, path: patharray[TW], geodesic:true, strokeColor: "limegreen", strokeWeight: 3, strokeOpacity: 0.5};
	var polyline_TW = new google.maps.Polyline(polylineOpts_TW);
}

function DrowRouteLine_Air()//航空路
{
	patharray[AirEU][0] = new google.maps.LatLng(52.362361, 4.908625);//EU→日本
	patharray[AirEU][1] = new google.maps.LatLng(34.436604, 135.2421820);

	patharray[AirUSA][0] = new google.maps.LatLng(39.136013, -94.5501764);//EU→日本
	patharray[AirUSA][1] = new google.maps.LatLng(34.436604, 135.2421820);

	var polylineOpts_AirEU = {map: map, path: patharray[AirEU], geodesic:true, strokeColor: "coral", strokeWeight: 3, strokeOpacity: 0.5};
	var polyline_AirEU = new google.maps.Polyline(polylineOpts_AirEU);
	var polylineOpts_AirUSA = {map: map, path: patharray[AirUSA], geodesic:true, strokeColor: "deepskyblue", strokeWeight: 3, strokeOpacity: 0.5};
	var polyline_AirUSA = new google.maps.Polyline(polylineOpts_AirUSA);
}
 




//データの保存*******************************************************************************************************

function downloadText()
{
	let text = "";
	var tof;
	for(var i = 0; i <= max; i++)
	{
		for(var j = 0; j <= FLAG; j++)
		{
			if(j == AUTO || j == TABLE)
			{
				text = text + "document.forms[" + String(i) + "].elements[" + String(j) + "].checked = " + document.forms[i].elements[j].checked + ";\n";
			}
			else
			{
				text = text + "document.forms[" + String(i) + "].elements[" + String(j) + "].value = " + "\"" + document.forms[i].elements[j].value.replace(/\n/g, "\" + \"\\n\" + \"") + "\"" + ";\n";
			}
		}
		text = text + "\n";
	}
	
	var start = max + 1;
	for(var i = 0; i <= 9; i++)
	{
		for(var j = 0; j <= 4; j++)
		{
			if(j == 2)
			{
				text = text + "document.forms[" + String(start + i) + "].elements[" + String(j) + "].checked = " + document.forms[start + i].elements[j].checked + ";\n";
			}
			else
			{
				text = text + "document.forms[" + String(start + i) + "].elements[" + String(j) + "].value = " + "\""+ document.forms[start + i].elements[j].value.replace(/\n/g, "\" + \"\\n\" + \"") + "\"" + ";\n";
			}
		}
	}

	var today = new Date();
	today.setDate(today.getDate());
	var yyyy = today.getFullYear();
	var mm = ("0"+(today.getMonth()+1)).slice(-2);
	var dd = ("0"+today.getDate()).slice(-2);
 	var date = yyyy + "年" + mm + "月" + dd + "日";

	text = text + "\n"+  "document.getElementById('index').textContent = " + "\"" + "　発注済・船便未確定案件　更新日" + date + "\";";

	const a = document.createElement('a');
	a.href = 'data:text/plain,' + encodeURIComponent(text);
	a.download = 'initialf.js';

	a.style.display = 'none';
	document.body.appendChild(a); // ※ DOM が構築されてからでないとエラーになる
	a.click();
	document.body.removeChild(a);
}
