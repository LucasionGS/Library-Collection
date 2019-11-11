class Download{
  constructor(url, dest = undefined)
  {
    if (!url) {
      return console.error("URL is not defined");
    }
    this.url = url;
    this.dest = dest;
    this.downloadedData = 0;
  }

  OnData(data)
  {
    this.downloadedData += data.length;
  }

  OnEnd()
  {
    console.log("Download finished.");
  }

  Start(url = this.url, dest = this.dest)
  {
    // File system for writing files
    const fs = require("fs");

    // HTTP/HTTPS protocol
    var http;
    // HTTPS support
    if (url.startsWith("https")) {
      http = require("https");
    }
    // Else use regular HTTP
    else {
      http = require("http");
    }
    var OnData = this.OnData;
    var OnEnd = this.OnEnd;
    http.get(url, function(res){
      console.log("Downloading...");
      var downloadedData = 0;
      res.on("data", OnData);
      res.on("end", OnEnd);
      if (dest) {
        try {
          res.pipe(fs.createWriteStream(dest));
        } catch (error) {
          console.error(error);
        }
      }
      else {
        console.log("No destination specified.");
      }
    });
  }
}

var object = new Download("https://lucasion.xyz/dln//mygames/Spike%20Escape%205/Spike%20Escape%205%201.3.exe", "./Game.exe");
object.OnEnd = function()
{
  console.log("Download is le done");
}
object.Start();



// Exports
exports.download = Download;