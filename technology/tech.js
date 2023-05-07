navigator.mediaDevices.getUserMedia({video: true})
  .then(function(stream) {
    document.getElementById('camera').srcObject = stream;

    const track = stream.getVideoTracks()[0];
    const settings = track.getSettings();
    const width = settings.width;
    const height = settings.height;
    document.getElementById('camera').setAttribute('width', width);
    document.getElementById('camera').setAttribute('height', height);
  })
  .catch(function() {
    alert('could not connect stream');
  });