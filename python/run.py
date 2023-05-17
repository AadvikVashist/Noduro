import cv2
import base64
# # import os, sys, subprocess
cap = cv2.VideoCapture(0, cv2.CAP_DSHOW)  # Change the parameter to the video source you want to capture from

while True:
    # Read a frame from the VideoCapture
    ret, frame = cap.read()

    # Encode the frame to base64
    _, buffer = cv2.imencode('.jpg', frame)
    frame_data = base64.b64encode(buffer).decode('utf-8')
    cv2.imshow('frame', frame)
    cv2.waitKey(1)
    # Print the encoded image data
    print(frame_data, flush=True)
    # Send the encoded frame over the WebSocket connection
