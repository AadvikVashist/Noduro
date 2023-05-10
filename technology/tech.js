// navigator.mediaDevices.getUserMedia({video: true})
//   .then(function(stream) {
//     document.getElementById('camera').srcObject = stream;

//     const track = stream.getVideoTracks()[0];
//     const settings = track.getSettings();
//     const width = settings.width;
//     const height = settings.height;
//     document.getElementById('camera').setAttribute('width', width);
//     document.getElementById('camera').setAttribute('height', height);
//   })
//   .catch(function() {
//     alert('could not connect stream');
//   });
var cam = document.getElementById('camera');
window.noduro_api.start_video()
function update_camera(stream) {
  cam.src = stream;
}
// window.noduro_api.start()
// const video = document.getElementById('camera');

// // Function to receive video data from the main process
// function onDataReceived(data) {
//   console.log('received data');
//   // Create a blob from the video data
//   const blob = new Blob([data], { type: 'image/jpeg' });

//   // Create a URL for the blob
//   const url = URL.createObjectURL(blob);

//   // Set the URL as the source of the video element
//   video.src = url;
// }
// window.noduro_api.start_video()