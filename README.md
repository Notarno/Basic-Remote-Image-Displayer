# Basic-Remote-Image-Displayer
Introduction to socket programming with the Node js environment:

Design:
- Using a client-server TCP model
- Incoporates custom protocol on top of TCP
- Follows Object Oriented Programming style
- Client(s) request images from the Server, and in turn the Server
  will send the image data back to the Client to be displayed
- Incoporates Buffers to handle data flow
  
NPM Modules:
- net
- File System(fs)
- minimist
- opn
- mathjs

Custom Modules:
- ITPpacketRequest
- ITPpacketResponse
- Singleton
- ClientsHandler

