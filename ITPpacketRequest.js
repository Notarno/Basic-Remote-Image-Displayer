var pVer = Buffer.alloc(3),
	requestType = Buffer.alloc(1),
	imgName;
	
var pkt;
module.exports = {


    init: function(ver, reqT, name) {
		pVer.writeUInt16BE(ver);
		requestType.writeUInt8(reqT);
		imgName = Buffer.from(name);
		
		//total length = header length(4 bytes) + length of image name
		const totalLength = pVer.length + requestType.length + imgName.length;
		pkt = Buffer.concat([pVer, requestType, imgName], totalLength);
    },

    //--------------------------
    //getpacket: returns the entire packet
    //--------------------------
    getpacket: function() {
        return pkt;
    }
};

