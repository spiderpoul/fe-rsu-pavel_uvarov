function setCookie(name, value, options) {
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function showCookies(table) {	
    let i = 0;
	const cookie = document.cookie.split(';');
	for(i; i < cookie.length; i += 1) {
        console.log(cookie)
	}
	return null;
}

function deleteCookie(name) {
  setCookie(name, "", {
    expires: -1
  })
}

window.onload = init;

function init() {
    const table = document.getElementById("cookie-table");
    setCookie("Jhon","q1234",5);
    setCookie("Jim","Qwe123456",4); 
    setCookie('ppkcookie','testcookie',7)
    console.log(document.cookie);
    showCookies(table)
    
}
