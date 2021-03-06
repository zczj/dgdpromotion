function browserRedirect() {
  var e = navigator.userAgent.toLowerCase(),
    t = "ipad" == e.match(/ipad/i),
    i = "iphone os" == e.match(/iphone os/i),
    n = "midp" == e.match(/midp/i),
    r = "rv:1.2.3.4" == e.match(/rv:1.2.3.4/i),
    a = "ucweb" == e.match(/ucweb/i),
    o = "android" == e.match(/android/i),
    d = "windows ce" == e.match(/windows ce/i),
    m = "windows mobile" == e.match(/windows mobile/i);
  return t || i || n || r || a || o || d || m
}

function setRem() {
  var e, t, i, n = document.documentElement,
    r = document.createElement("style"),
    a = document.querySelector('meta[name="viewport"]');
  e = window.devicePixelRatio || 1, i = 1 / e, t = n.clientWidth * e / 10, a.setAttribute("content", "width=" + e * n.clientWidth + ",initial-scale=" + i + ",maximum-scale=" + i + ", minimum-scale=" + i + ",user-scalable=no"), n.setAttribute("data-dpr", e), n.firstElementChild.appendChild(r), r.innerHTML = "html{font-size:" + t + "px!important;}", window.rem2px = function(e) {
    return e = parseFloat(e), e * t
  }, window.px2rem = function(e) {
    return e = parseFloat(e), e / t
  }, window.dpr = e, window.rem = t
}
var dynamicLoading = {
  css: function(e) {
    if (!e || 0 === e.length) throw new Error('argument "path" is required !');
    var t = document.getElementsByTagName("body")[0],
      i = document.createElement("link");
    i.href = e, i.rel = "stylesheet", i.type = "text/css", t.appendChild(i)
  },
  js: function(e) {
    if (!e || 0 === e.length) throw new Error('argument "path" is required !');
    var t = document.getElementsByTagName("body")[0],
      i = document.createElement("script");
    i.src = e, i.type = "text/javascript", t.appendChild(i)
  }
};