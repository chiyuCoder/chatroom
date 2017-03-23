var JSWS = new WebSocket("ws://192.168.199.189:8484"),


function bottomIt() {
	var recordBody = $('.record-content'),
		containerHeight = $('.talking-record').height(),
		recordHeight = $(recordBody).height();
	console.log(recordHeight + ":" + (containerHeight - 10));
	if (recordHeight >= containerHeight - 10) {
		$(recordBody).css("bottom",  "20px");
	}
}
function writeUserList(userList) {
	var userListHTML = "<option value='all' id='message-to-all'>"
			+ "all" + "</option>",
		userListSize = userList.length;
	for (var uli = 0; uli < userListSize; uli ++) {
		userListHTML += "<option value='" + userList[uli] + "' id='message-to-" 
			+ userList[uli] + "'>" + userList[uli] + "</option>";
	}
	$("#message-to").html(userListHTML);
}
function sheHasSaid(she, herWord, isPageHost) {
	var herWordHtmlVersion = "<div class='talks'>"
			+ "<div class='" + (isPageHost ? 'i-talk' : 'she-talks') +"'>" 
			+ "<div class='name'>" + she + "</div>"
			+ "<div class='content'>" + herWord + "</div>"
			+ "</div>"
			+ "</div>";
	$(".record-content").append(herWordHtmlVersion);
	bottomIt();
}
function writeWhatSheSaid(she,toWhom, whatSheSaid) {
	var pageHost = $("#message-from").val();
	if (she == pageHost) {
		sheHasSaid(she, whatSheSaid, true);
	} else {
		if (toWhom == 'all' || toWhom == pageHost) {
			sheHasSaid(she, whatSheSaid, false);
		}
	}
}


JSWS.onopen = function () {
	console.log("open");	
}
JSWS.onmessage = function (event) {
	var data = JSON.parse(event.data);
	console.log(data);
	writeUserList(data.nickname);
	writeWhatSheSaid(data.messageFrom,data.messageTo, data.message);
}
JSWS.onerror = function (e) {
	console.log(e);
}
JSWS.onclose = function () {
	console.log("close");
}

$('#message-from').change(function () {
	$("#message-from").attr("disabled", true);
	var userNickname = $("#message-from").val(),
		sendUserNickName = JSON.stringify([{dataType:"userNickname", data: userNickname}]);
	JSWS.send(sendUserNickName);
});
$("#sendContext").click(function (event) {
	event.preventDefault();
	if ($("#message-from").attr("disabled") == "disabled") {
		var messageToHim = $("#message-to").val(),
			message = $("#user-tell").val(),
			fromWhom = $("#message-from").val(),
			sendMessageToHim = JSON.stringify([{dataType:"messageFrom",data:fromWhom},{dataType:"messageTo",data:messageToHim},{dataType:"message",data:message}]);
		JSWS.send(sendMessageToHim);		
	}
});
