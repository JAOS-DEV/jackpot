"use strict";

if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
  /* iOS hides Safari address bar */
  window.addEventListener("load", function () {
    setTimeout(function () {
      window.scrollTo(0, 1);
    }, 1000);
  });
}
