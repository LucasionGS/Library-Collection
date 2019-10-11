class Notification {
  // Global Notification constructor
  constructor(title, message, dieAfter)
  {
    console.log(typeof message);
    // Variable check
    if (!message) {
      message = "";
    }

    // Object creation
    var mainDiv = document.createElement("div");
    var h1 = document.createElement("h1");
    var p = document.createElement("p");
    var button = document.createElement("a");
    var button_div = document.createElement("div");
    var button_div_p = document.createElement("p");
    // Settings
    mainDiv.setAttribute("class","_notification");
    h1.innerHTML = title;

    // Use of text or object[]?
    if (typeof message == "string" || typeof message == "number") {
      p.innerHTML = message;
    }
    else if (typeof message == "object") {
      p.innerHTML = "";
      for (var i = 0; i < message.length; i++) {
        if (typeof message[i] == "string" || typeof message[i] == "number") {
          if (message.length > 1 && (typeof message[i-1] == "string" || typeof message[i-1] == "number")) {
            p.innerHTML += "<br>"+message[i];
          }
          else {
            p.innerHTML += message[i];
          }
        }
        else if (typeof message[i] == "object") {
          p.appendChild(message[i]);
        }
      }
    }

    p.setAttribute("class", "notifText");
    // button.href = "#back";
    button.onclick = function () {
      mainDiv.close();
    }
    button_div.setAttribute("class", "NotificationButton");
    button_div.setAttribute("id", "doneNotificationButton");
    button_div_p.innerHTML = "Done";

    // Merging
    mainDiv.appendChild(h1);
    mainDiv.appendChild(p);
    // Add a button if dieAfter time hasn't been set. Button will close the notification
    if (!dieAfter) {
      button_div.appendChild(button_div_p);
      button.appendChild(button_div);
      mainDiv.appendChild(button);
    }

    // Finalizing
    document.getElementsByTagName("body")[0].appendChild(mainDiv);
    setTimeout(function () {
      mainDiv.setAttribute("action", "open");
    }, 0);
    if (dieAfter > 0) {
      setTimeout(function () {
        mainDiv.close();
      }, dieAfter);
    }

    mainDiv.close = function () {
      Notification.closeByObject(this);
      return undefined;
    }

    // Return the object
    this.object = mainDiv;
  }

  // Adding Notification Styling to the document. Required for use.
  static addStyle() {
    const style = document.createElement("style");
    style.setAttribute("id", "notificationStylingObject");
    style.innerHTML = `
      div._notification{
        position: fixed;
        left: 50%;
        top: 0;
        transform:translate(-50%, -100%);
        min-width: 512px;
        max-width: 768px;
        min-height: 128px;
        margin: auto;
        background: white;
        border-radius: 10px;
        box-shadow: 5px 5px 5pxblack;
        transition: all 0.3s ease-out;

      }
      div._notification h1, div._notification p{
        color:black;
        text-align: center;

      }
      div._notification p.notifText{
        padding-bottom: 36px;
        white-space: pre-wrap;

      }
      div._notification[action="open"]{
        left: 50%;
        top: 5%;
        transform:translateX(-50%);

      }
      div._notification[action="close"]{
        left: 50%;
        top: 0;
        transform: translate(-50%,-100%);

      }
      div.NotificationButton{
        position: absolute;
        right: 0;
        width: 128px;
        height: 40px;
        transform: translateY(-100%);
        background: #259f00;
        border-radius: 10px;
        overflow: hidden;
        transition: all 0.1s ease-in-out;

      }
      div.NotificationButton:hover{
        cursor: pointer;

      }
      div.NotificationButton p{
        user-select: none;
        margin: 0;
        text-align: center;
        margin-left: 50%;
        color: white;
        transform: translate(50%, 50%);

      }
    `;
    document.getElementsByTagName("html")[0].firstChild.appendChild(style);
  }

  // Global close top notification function
  static closeNewest()
  {
    id = document.getElementsByClassName("_notification").length-1;
    document.getElementsByClassName("_notification")[id].setAttribute("action", "close");
    setTimeout(function () {
      document.getElementsByClassName("_notification")[id]
      .parentNode.removeChild(
        document.getElementsByClassName("_notification")[id]
      );
    }, 300);
  }

  // Global close notification by ID function
  static closeById(id)
  {
    if (!id) {
      id = document.getElementsByClassName("_notification").length-1;
    }
    document.getElementsByClassName("_notification")[id].setAttribute("action", "close");
    setTimeout(function () {
      document.getElementsByClassName("_notification")[id]
      .parentNode.removeChild(
        document.getElementsByClassName("_notification")[id]
      );
    }, 300);
  }

  // Global close notification by specific Object function
  static closeByObject(object)
  {
    object.setAttribute("action", "close");
    setTimeout(function () {
      try {
        object.parentNode.removeChild(object);
      }
      catch (e) {
        console.log("No previous Instance object");
      }
    }, 300);
  }
}
