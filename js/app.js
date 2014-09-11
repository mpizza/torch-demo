'use strict';

window.addEventListener('DOMContentLoaded', function() {

  var translate = navigator.mozL10n.get;
  navigator.mozL10n.once(start);

  function start() {
    var colorList = ['black', 'red', 'blue', 'green', 'yellow'];
    var index = 0;
    var mode = 'off';
    var screenBlock = document.getElementById('flashLight');
    var camera = null;
    screenBlock.addEventListener('click', changeColor);
    
    function changeColor() {
      index =  (index + 1) % colorList.length;
      screenBlock.style.backgroundColor = colorList[index];
      screenBlock.textContent = colorList[index];
    }

    screenBlock.addEventListener('click', openLed);
    
    function openLed() {
      // check if camera was assigned.
      if (camera !== null) {
        camera.release();
      }
      
      var myCamera = navigator.mozCameras.getListOfCameras()[0];
      function onSuccess(getCamera) {
        console.log('Success!!!');
        
        camera = getCamera;
        
        var capabilities = getCamera.capabilities;
        if ( mode === 'off') {
          mode = 'torch';
        } else {
          mode = 'off';
        }
        if (capabilities.flashModes.indexOf(mode) > -1) {
           console.log('set to ' + mode + ' mode!!!');
           getCamera.flashMode = mode;
        }
      }
      
      function onError() {
        console.log('error!!!');
      }
      navigator.mozCameras.getCamera(myCamera, {}, onSuccess, onError);
    }
  }
});
