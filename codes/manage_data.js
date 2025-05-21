function recordSensorData() { //最初に走る関数
	const deviceData = getNatureRemoData("devices");　　　　//data取得
	const lastSensorData = getLastRow(SHEETNAME);　　　　　//最終data取得
  const jsondata = getNatureRemoData("appliances");

	var arg = {
		te: deviceData[0].newest_events.te.val,　　//温度
		mo: deviceData[0].newest_events.mo.val,    //人感
	}

	setSensorData(arg, lastSensorData + 1);
	check_SensorData(arg, jsondata);
}

function setSensorData(data, row) {
	getSheet(SHEETNAME).getRange(row, 1, 1, 3).setValues([[new Date(), data.te, data.mo]])
}

function check_SensorData(data, json) { //室温と人感センサの条件を満たすか確認する

	if (getStatus(json) == false) {

		if (checkLastmotion() == MOTION) {
			if (data.te >= TEMP_LIMIT1 && data.te < TEMP_LIMIT2) {
				sendLine(TELL_HEATING);

			} else if (data.te >= TEMP_LIMIT2) {
				setAirconPower(ON);
        setMode(COOL);
        setTemp(ASSIGNED_TEMP);
        sendLine(ALERT_HEATING);
				
			}
		}

	} else if (getStatus(json) == true) {
    return;
	} else {
		throw new Error('エアコンが見つかりません');
	}
}

function checkLastmotion() { //直近30分間人感センサに反応が無い場合は実行しないようにする
  var i;
  var lastdata = getLastRow(SHEETNAME);

  for (i = 0; i < 6; i ++) {

    if (lastdata - i < 2) {
      break;
    }

    if (getSheet(SHEETNAME).getRange(lastdata - i, 3).getValue() == 1) {
      return MOTION;
    }

  }
  return NOMOTION;
}
