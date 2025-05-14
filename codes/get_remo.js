function getNatureRemoData(endpoint) { //センサデータ取得
	const headers = {
		"Content-Type": "application/json;", //返り値でJSONを返すからこれが必要
		'Authorization': 'Bearer ' + REMO_ACCESS_TOKEN,
	};

	const options = {
		"method": "get",
		"headers": headers,
	};

	return JSON.parse(UrlFetchApp.fetch("https://api.nature.global/1/" + endpoint, options));
}

function getStatus(json) {
  const data = json;
  if (!data || data.length === 0) return;

  const air = data.filter(appliance => appliance.type === 'AC');
  if (air.length === 0) return;

  const status = air[0].settings.button;

  if (status === "") {
    return true;
  } else if (status === "power-off"){
    return false;
  }
}

function getMode(json) {
  const data = json;
  if (!data || data.length === 0) return;

  const air = data.filter(appliance => appliance.type === 'AC');
  if (air.length === 0) return;

  const status = air[0].settings.mode;

  if (status === "cool") {
    return COOL;
  } else if (status === "warm"){
    return WARM;
  }
}

function getCurrentTemp (json) {
	const remoData = json;

	for (var i = 0; i < remoData.length; i++) {
		var appliance = remoData[i];  //登録家電の配列のi番目をapplianceに代入(エアコンとかテレビとか)

		if (appliance.type === "AC") {
			return appliance.settings.temp; //エアコンが部屋に1台と仮定
		}
	}

	return null;
}

function getID() {
  const data = getNatureRemoData("appliances");

  if (!data || data.length === 0) return;

  const air = data.filter(appliance => appliance.type === 'AC');
  if (air.length === 0) return;

  const id = air[0].id;

  console.log(id);
}