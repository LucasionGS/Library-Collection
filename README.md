# Documentation

## notif.js

### Initialize for use
You can use one of the following, they will do the same thing.
```js
Notif.Initialize(options);
Notif.addStyle(options);
```

``options`` is a JSON object and can have one or more of these following values.
```js
{
  "theme":"dark", // Changes the theme of the notification. [Default: light]
  "top":"[number]", // [number] is any pixel count you want the notification to be from the top when it is fully extended out. [Default: 15]
  "transition": "ease|linear|easein|easeout|easeinout", // Change how the transition looks. Any CSS transition animation works here. [Default: easeout]
  "transitionTime":"[time in milliseconds]" // The time in milliseconds you want for the notification before it is fully extended. [Default: 300]
}
```

Using this function will create a ``notificationStylingObject`` as a ``<style>`` tag in your ``html`` tag

### Create a new notification
Create a new notification by with:
```js
new Notif(title, [Optional: description|object, dieAfter]);
```
``description`` is smaller text below the title text. You can add text or HTML code into this field as a string,
or you can insert an array of both strings and HTML nodes. The order they appear in inside the array, is the order they will appear in the notification.


``dieAfter`` is an amount of time in milliseconds for how long the notification should stay on screen, and will close after the time is up.
If this is not defined or set to ``0``, it will have a ``Done`` button to close the notification.

### Close a notification
You can close a notification using one of the following functions.

If you have assigned it to a variable:
```js
var notification = new Notif("Test Title", "Test Description");

notification.close();
```

If you want to close the newest notification, use the class static function:
```js
Notif.closeNewest();
```

If you want to close a specific notification by its ID, use the class static function:
```js
Notif.closeById(id);
```

If you want to close a specific notification by its object reference, use the class static function:
```js
var notification = new Notif("Test Title", "Test Description");

Notif.closeByObject(notification.object);
// Or
Notif.closeByObject(document.querySelector("#MyNotification"));
```
