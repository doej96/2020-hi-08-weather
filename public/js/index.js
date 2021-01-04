// opneweathermap: 488c40db3b8e389e1bcf4a0f9a83f8fa
// kakao: 8f8ecf68fb72a64ab9800fd79fb08d2a

// 7days: https://api.openweathermap.org/data/2.5/onecall?lat=38&lon=127&appid=488c40db3b8e389e1bcf4a0f9a83f8fa&units=metric&exclude=minutely,hourly

var url = 'https://api.openweathermap.org/data/2.5/onecall?lat=38&lon=127&appid=488c40db3b8e389e1bcf4a0f9a83f8fa&units=metric&exclude=minutely,hourly';


function onGet(r) {
	console.log(r);
}

$('#bt').click(function(){
	$.get(url, onGet);
});