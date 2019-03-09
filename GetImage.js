var net = require('net');
var fs = require('fs');
var ITPpacket = require('./ITPpacketRequest')
var args = require('minimist')(process.argv.slice(2));
var opn = require('opn');

var SERV = args.s.split(":");

//Acquires User input and connects to specified HOST and PORT
var client = new net.Socket();
client.connect(SERV[1], SERV[0], function() {
	
	console.log('Connected to ImageDB server on: ' + args.s);
	ITPpacket.init(args.v, 1, args.q);
	var pkt = ITPpacket.getpacket();
	client.write(pkt);	
});

//Displays Server's Response and displays image if found
client.on('data', function(data) {
	console.log('Server Sent: \n\n');
	console.log('	--ITP Version = ' + data.slice(0,2).readUInt16BE(0));
	console.log('	--Response Type = ' + data.slice(3).readUInt8(0));
	console.log('	--Sequence Number = ' + data.slice(4, 7).readUInt16BE(0));
	console.log('	--Timestamp = ' + data.slice(8, 11).readUInt16BE(0));
	console.log('	--Image size = ' + data.slice(12,15).readUInt16BE(0));
	
	if(data.slice(3, 4).readUInt8(0) != 0){
		fs.writeFile('new.jpg', data.slice(16), function(err){
			if(err) throw err;
			opn('new.jpg').then(() => {
			
			});
		});
	}
	//Close client after getting response from server
	client.destroy();
});

client.on('close', function() {
	console.log('\nDisconnected from the server');
	console.log('Connection closed');
});