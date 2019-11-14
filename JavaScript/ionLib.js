class Hex{
  static HexToInt(hex)
  {
    if (hex.startsWith("0x")) {
      hex = hex.replace("0x", "#");
    }
    if (/^#([^0-9A-Fa-f])/g.test(hex)) {
      return false;
    }
    hex = hex.match(/([0-9A-Fa-f]+)/)[0];
    console.log(hex);
    var value = 0;
    var hexList = hex.split("");
    var rHex = "";
    for (let i = 0; i < hexList.length; i++) {
      const hexElement = hexList[i];
      rHex = hexElement + rHex;
    }

    hexList = rHex.split("");
    for (let i = 0; i < hexList.length; i++) {
      const hexElement = hexList[i].toLowerCase();
      var hexElementValue = 0;
      if (!isNaN(hexElement)) {
        hexElementValue = +hexElement;
      }
      else {
        switch (hexElement) {
          case "a":
            hexElementValue = 10;
            break;
          case "b":
            hexElementValue = 11;
            break;
          case "c":
            hexElementValue = 12;
            break;
          case "d":
            hexElementValue = 13;
            break;
          case "e":
            hexElementValue = 14;
            break;
          case "f":
            hexElementValue = 15;
            break;
          default:
            hexElementValue = 0;
            break;
        }
      }

      hexElementValue = hexElementValue*Math.pow(16, i);
      value += hexElementValue;
      console.log(hexElement+" = "+hexElementValue);
    }
    return value;
  }

  // Create an IntToHex()
  // static IntToHex(value)
  // {
  //   Do stuff
  // }
}

class IonJSON
{
  /**
   * 
   * @param {{}} json JSON Object to sort
   * @param {Function} sortFunction 
   */
  static sortJSON(json, sortFunction)
  {
    if (!sortFunction) {

      return console.error("Sorting function needs to be specified!\n");
    }
    var jsonArray = [];
    var jsonKeys = Object.keys(json);
    for (const i in jsonKeys) {
      if (jsonKeys.hasOwnProperty(i)) {
        var keyName = jsonKeys[i];
        jsonArray.push([keyName, json[keyName]])
      }
    }
    jsonArray = jsonArray.sort((a, b) => {
      return sortFunction(a[1], b[1]);
    });

    var newJson = {};
    for (let i = 0; i < jsonArray.length; i++) {
      newJson[jsonArray[i][0]] = jsonArray[i][1];
    }

    return newJson;
  }
}