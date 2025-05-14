function doPost(e) {
  var json = JSON.parse(e.postData.contents);
  var message = json.events[0].message.text;
  var jsondata = getNatureRemoData("appliances");

  if (message == "電源ON") {
    setAirconPower(ON);
    sendLine(TURNED_ON_AC);

  } else if (message == "電源OFF") {
    setAirconPower(OFF);
    sendLine(TURNED_OFF_AC);

  }
  if (getStatus(jsondata) == true) {
    if (message == "1℃上げる") {
      changeAirconTemperature(UP, getCurrentTemp(jsondata));
      sendLine(TELL_TEMP)

    } else if (message == "1℃下げる") {
      changeAirconTemperature(DOWN, getCurrentTemp(jsondata));
      sendLine(TELL_TEMP);

    }else if (message == "冷房") {
      setMode(COOL);
      sendLine(MODE_COOL);

    }else if (message == "暖房") {
      setMode(WARM);
      sendLine(MODE_WARM);

    }
  } else if (message == "1℃上げる" || message == "1℃下げる" || message == "冷房" || message == "暖房") {
      sendLine(POWEROFF);

  }
}

function sendLine(situation) {
  var message = "";
  if (situation != TELL_HEATING && situation != ALERT_HEATING && situation != TURNED_OFF_AC && situation != POWEROFF) {
    json = getNatureRemoData("appliances");
  }

  if (situation == TELL_HEATING) {
    message = '室温が28℃以上です。冷房をつけましょう' /*28 */

  } else if (situation == ALERT_HEATING) {
    message = '室温が31℃以上です。設定温度  ' + ASSIGNED_TEMP + '℃  で冷房をつけました！'

  } else if (situation == TURNED_ON_AC) {
    if (getMode(json) == COOL) {
      message = '設定温度  ' + getCurrentTemp(json) + '℃  で  冷房  をつけました';
    } else {
      message = '設定温度  ' + getCurrentTemp(json) + '℃  で  暖房  をつけました';
    }

  } else if (situation == TURNED_OFF_AC) {
    message = 'エアコンを消しました'

  } else if (situation == TELL_TEMP) {
    message = '設定温度を  ' + getCurrentTemp(json) + '℃  に変更しました'

  }else if (situation == POWEROFF) {
    message = '電源が入っていません'

  }else if (situation == MODE_COOL) {
    message = '設定温度  ' + getCurrentTemp(json) + '℃  で  冷房  に切り替えました'

  }else if (situation == MODE_WARM) {
    message = '設定温度  ' + getCurrentTemp(json) + '℃  で  暖房  に切り替えました'

  }

  UrlFetchApp.fetch("https://api.line.me/v2/bot/message/push", {
    "method": "post",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + LINE_ACCESS_TOKEN,
    },
    "payload": JSON.stringify({
      "to": USERID,
      "messages": [
        {
          "type": "text",
          "text": message
        }
      ]
    })
  });
}