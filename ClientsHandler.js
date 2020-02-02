var ITPpacket = require('./ITPpacketResponse'),
    singleton = require('./Singleton'),
	fs = require('fs')
	
var currTS,
	currSeqNum,
	ITPVer,
	requestType,
	responseType,
	imageName,
	imageData,
	imageSize,
	imageDir = './images';

var pkt;

module.exports = {
    handleClientJoining: function (sock) {
		//Gets current Time stamp and sequence number of connected client
		currTS = singleton.getTimestamp();
		currSeqNum = singleton.getSequenceNumber();
		console.log('\nClient-' + currTS + ' is connected at timestamp: ' + currTS);
		
		sock.on('data', readIncoming);
		sock.on('close', function(data) {
			console.log('\nClient-' + currTS + ' closed the connection');
		});
			
		//reads incoming data from client and verifies conditions such as:
		//- size of request packet header is 4 bytes
		//- Request Type is set to 1
		//- Image File Name is in image directory
		function readIncoming(data) {
			if(data.slice(0,4).length == 4 ){
				ITPVer = data.slice(0,2).readUInt16BE(0);
				requestType = data.slice(3).readUInt8(0).toString();
				imageName = data.slice(4).toString();
				console.log('\nClient-' + currTS + ' requests:');
				console.log('	--ITP version: ' + ITPVer);
				console.log('	--Request Type: ' + requestType);
				console.log('	--Image file name: ' + '\'' + imageName + '\'');
				responseType = 0;
				
				fs.readdir(imageDir, function(err, list){
					for(i = 0; i < list.length; i++){
						if(imageName == list[i]){
							responseType = 1;
						}
					}
					getImage(imageDir, imageName);
				});	
			}
		}
		
		//Acquires requested image and creates a response packet
		function getImage(imageDir, imageName) {
			//If image not found, send back NOT FOUND packet
			if(responseType == 0){
				imageData = Buffer.alloc(1);
				ITPpacket.init(ITPVer, responseType, currSeqNum, currTS, 0, imageData);
				pkt = ITPpacket.getPacket();
				sock.write(pkt);
			}
			//If image is found, send back packet with image data
			else{
				fs.readFile(imageDir + '\\' + imageName, (err, content) => {
					if(err) throw err;
					imageSize = content.length;
					imageData = content; 
					ITPpacket.init(ITPVer, responseType, currSeqNum, currTS, imageSize, imageData); 
					pkt = ITPpacket.getPacket();
					sock.write(pkt);
				});
			}
		}		
	}			
};


