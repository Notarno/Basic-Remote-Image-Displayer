var pVer = Buffer.alloc(3),
	responseType = Buffer.alloc(1),
	seqNum = Buffer.alloc(4),
	timeS = Buffer.alloc(4),
	imgSize = Buffer.alloc(4),
	imgData;

var pkt;

module.exports = {

    init: function(ver, repT, sNum, ts, size, data) {
		pVer.writeUInt16BE(ver);
		responseType.writeUInt8(repT);
		seqNum.writeUInt16BE(sNum);
		timeS.writeUInt16BE(ts);
		imgSize.writeUInt16BE(size);
		imgData = data;
		
		//total length = header length(16 bytes) + image data
		const totalLength = pVer.length + responseType.length + seqNum.length + timeS.length + imgSize.length + imgData.length;
		pkt = Buffer.concat([pVer, responseType, seqNum, timeS, imgSize, imgData], totalLength);
    },

    //--------------------------
    //getlength: return the total length of the ITP packet
    //--------------------------
    getLength: function() {
        return (pkt.length - imgData.length);
    },

    //--------------------------
    //getpacket: returns the entire packet
    //--------------------------
    getPacket: function() {
        return pkt;
    }
};