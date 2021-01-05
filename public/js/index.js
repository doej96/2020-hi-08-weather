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


/******** 전역설정 ********/
var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
var params = {
	appid: '488c40db3b8e389e1bcf4a0f9a83f8fa',
	units: 'metric',
	exclude: 'minutely,hourly'
}

/******** 이벤트 등록 ********/
navigator.geolocation.getCurrentPosition(onGetPosition, onGetPositionError);


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



/******** 사용자 함수  ********/
function getWeather(lat, lon) {
	params.lat = lat;  //params에 lat 집어넣음
	params.lon = lon;
	$.get(weatherUrl, params, onGetWeather);
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
	$('.wrapper').css('background-image','url(../img/'+bg+')');
}
