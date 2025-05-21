// エアコンの電源をON/OFFにする関数
function setAirconPower(flag) {

	const payload = {
		button: flag === ON ? "" : "power-off"
	};
	const headers = {
		'Authorization': 'Bearer ' + REMO_ACCESS_TOKEN,
	};
	const options = {
		"method": "post",
		"headers": headers,
		"payload": payload
	};
	const url = 'https://api.nature.global/1/appliances/' + AIRCONID + '/aircon_settings';
	UrlFetchApp.fetch(url, options);
}

//温度を上げ下げする関数
function changeAirconTemperature(flag, currentTemp) {
	var newTemp = parseInt(currentTemp);

	if (flag === UP) { // 温度上げ
		newTemp += 1;
	} else if (flag === DOWN) { // 温度下げ
		newTemp -= 1;
	}

  var payload = {
    temperature: String(newTemp), 
  };
  
	const headers = {
		'Authorization': 'Bearer ' + REMO_ACCESS_TOKEN,
	};
	const options = {
		"method": "post",
		"headers": headers,
		"payload": payload
	};
	const url = 'https://api.nature.global/1/appliances/' + AIRCONID + '/aircon_settings';
	UrlFetchApp.fetch(url, options);
}

//温度を指定する関数
function setTemp(temp) {

  const payload = {
    temperature: String(temp),
  };
	const headers = {
		'Authorization': 'Bearer ' + REMO_ACCESS_TOKEN,
	};
	const options = {
		"method": "post",
		"headers": headers,
		"payload": payload
	};

  const url = 'https://api.nature.global/1/appliances/' + AIRCONID + '/aircon_settings';
	UrlFetchApp.fetch(url, options);
}

//モードを指定する関数
function setMode(mode) {

  var payload = {
    operation_mode: mode == COOL ? "cool" : "warm",
  }
	const headers = {
		'Authorization': 'Bearer ' + REMO_ACCESS_TOKEN,
	};
	const options = {
		"method": "post",
		"headers": headers,
		"payload": payload
	};

  const url = 'https://api.nature.global/1/appliances/' + AIRCONID + '/aircon_settings';
	UrlFetchApp.fetch(url, options);
}