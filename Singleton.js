const math = require('mathjs');
var timeS = math.round(math.random()*(999 - 1) + 1);
var seqNum = math.round(math.random()*(999 - 1) + 1);

module.exports = {
    init: function() {
	   //updateTS: updates the time-stamp every 10 milliseconds
		function updateTS(){
			if(timeS == math.pow(2, 32)){
				timeS = 0;
			}
			timeS = timeS + 1;
		}
		setInterval(updateTS, 10); 
    },
	
    //--------------------------
    //getSequenceNumber: return the current sequence number + 1
    //--------------------------
    getSequenceNumber: function() {
		seqNum = seqNum + 1;
        return seqNum;
    },

    //--------------------------
    //getTimestamp: return the current timer value
    //--------------------------
    getTimestamp: function() { 
        return timeS;
    }
};

