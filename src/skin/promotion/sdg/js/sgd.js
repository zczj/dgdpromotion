var Sgd =function () {
  function dgdLayer(type,msg,btnArrayObj) {
    $.dialog({
         type: type,
         message: msg,
         buttons: btnArrayObj,
         maskOpacity: .4,
         maskClose: true,
         effect: true
       })
  }

  var Dgd = {};
  return Dgd.layer = dgdLayer,
         Dgd

}

window.Sgd = Sgd();