
from flask import Flask
from flask_socketio import SocketIO, emit
import cv2
import base64

app = Flask(__name__)
socketio = SocketIO(app)

# Open the video capture device
cap = cv2.VideoCapture(0)


if __name__ == '__main__':
    socketio.run(app)

# Continuously capture frames and send them over the WebSocket connection
while True:
    ret, frame = cap.read()
    _, jpeg_frame = cv2.imencode('.jpg', frame)
    b64_frame = base64.b64encode(jpeg_frame).decode('utf-8')
    socketio.emit('frame', b64_frame)

