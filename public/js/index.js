// function a(arg, arg2) {}
// arguments, parameters, 인자, 매개변수 ...

// $.get(url, cb);      url에서 하나의 문장으로 보냄
// $.get(url, params, cb);      url에 주소 넣고 전달하는 쿼리를 객체형태로 만들어서 전달

/* 
var url = 'https://api.openweathermap.org/data/2.5/onecall?lat=38&lon=127&appid=488c40db3b8e389e1bcf4a0f9a83f8fa&units=metric&exclude=minutely,hourly';

function onGet(r) {
	console.log(r);
}

$('#bt').click(function(){
	$.get(url, onGet);
});
*/


// opneweathermap: 488c40db3b8e389e1bcf4a0f9a83f8fa
// kakao: 8f8ecf68fb72a64ab9800fd79fb08d2a

// 7days: https://api.openweathermap.org/data/2.5/onecall?lat=38&lon=127&appid=488c40db3b8e389e1bcf4a0f9a83f8fa&units=metric&exclude=minutely,hourly

//icon: http://openweathermap.org/img/wn/10d@2x.png


/******** 전역설정 ********/
var map;
var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
var params = {
	appid: '488c40db3b8e389e1bcf4a0f9a83f8fa',
	units: 'metric',
	exclude: 'minutely,hourly'
}

/******** 이벤트 등록 ********/
navigator.geolocation.getCurrentPosition(onGetPosition, onGetPositionError);
mapInit();



/******** 이벤트 콜백 ********/
function onGetPosition(r) {
	getWeather(r.coords.latitude, r.coords.longitude);
}

function onGetPositionError() {
  //서울시청좌표
	getWeather(37.56679, 126.978413);
}

function onGetWeather(r) {
	console.log(r);
	console.log(r.weather[0].icon);
	updateBg(r.weather[0].icon);
}

function onGetCity(r) {
	createMarker(r.cities);
	// 변경할 사항은 위의 createMarker를 실행하지 않고 openweathermap 통신으로 날씨정보 받아오면 그 때 그 정보로 marker 만듦
}


/******** 사용자 함수  ********/
function createMarker(v) {
	for(var i in v) {
		var content = '';
		content += '<div class="popper '+v[i].class+'">';
		content += '<div class="img-wrap">';
		content += '	<img src="http://openweathermap.org/img/wn/02d.png" class="mw-100">';
		content += '</div>';
		content += '<div class="cont-wrap">';
		content += '	<div class="name">'+v[i].name+'</div>';
		content += '	<div class="temp">-3.57도</div>';
		content += '</div>';
		content += '<i class="fa fa-caret-down"></i>';
		content += '</div>';
		var position = new kakao.maps.LatLng(v[i].lat, v[i].lon)
		var customOverlay = new kakao.maps.CustomOverlay({
			position: position,
			content: content
		});
		customOverlay.setMap(map);
	}
}

function getWeather(lat, lon) {
	params.lat = lat;  //params에 lat 집어넣음
	params.lon = lon;
	$.get(weatherUrl, params, onGetWeather);
}

function mapInit() {
	var mapContainer = document.getElementById('#map'), // 지도를 표시할 div 
	mapOption = { 
		center: new kakao.maps.LatLng(35.8, 127.7), // 지도의 중심좌표
		level: 13, // 지도의 확대 레벨
		draggable: false,
		zoomable: false
	};
	
  // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
	map = new kakao.maps.Map($('#map')[0], mapOption); 
	map.setDraggable(false);
	map.setZoomable(false);
	
	$.get('../json/city.json', onGetCity);
}


function updateBg(icon) {
	var bg;
	switch(icon) {
		case '01d':
		case '02d':
			bg = '01d-bg.jpg';
			break;
		case '01n':
		case '02n':
			bg = '01n-bg.jpg';
			break;

		case '03d':
		case '04d':
			bg = '03d-bg.jpg';
			break;
		case '03n':
		case '04n':
			bg = '03n-bg.jpg';
			break;

		case '09d':
		case '010d':
			bg = '09d-bg.jpg';
			break;
		case '09n':
		case '010n':
			bg = '09n-bg.jpg';
			break;

		case '11d':
			bg = '11d-bg.jpg';
			break;
		case '11n':
			bg = '11n-bg.jpg';
			break;
		case '13d':
			bg = '13d-bg.jpg';
			break;
		case '13n':
			bg = '13n-bg.jpg';
			break;
		case '50d':
			bg = '50d-bg.jpg';
			break;
		case '50n':
			bg = '50n-bg.jpg';
			break;
	}
	$('.all-wrapper').css('background-image','url(../img/'+bg+')');
}

