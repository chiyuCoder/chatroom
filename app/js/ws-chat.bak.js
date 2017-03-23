var recordBody = $('.record-content'),	
	userNicknameEle = $('.user-nickname'),
	sheTalksEle = $('#user-tell'),
	sendMessage = $('#sendContext'),
	messageToAll = $("#message-to-all");

function bottomIt() {
	var containerHeight = $('.talking-record').height(),
		recordHeight = $(recordBody).height();
	console.log(recordHeight + ":" + (containerHeight - 10));
	if (recordHeight >= containerHeight - 10) {
		$(recordBody).css("bottom",  "20px");
	}
}

function listUsername(alist) {
	var listSize = alist.length
		selectOptionSingle = "";
	for (var l = 0; l < listSize; l ++) {
		selectOptionSingle += "<option value='" + alist[l] + "' id='message-to-" + alist[l] + "'>"
			+ alist[l] 
			+ "</option>";
	}
	selectOption = "<option value='all' id='message-to-all'>all</option>"
		+ selectOptionSingle;
	$('#message-to').html(selectOption);
}

function writeHerTold(toldthing) {
	var talkInfo = JSON.parse(toldthing),
		talkHTML = "<div class='talks'>" 
			+ "<div class='i-talk'>" 
			+ "<div class='name'>"
			+ talkInfo[0].nickname
			+ "</div>"
			+ "<div class='content'>"
			+ talkInfo[0].tell
			+ "</div>"
			+ "</div>"
			+ "</div>",
		userList = talkInfo[1];
	console.log(talkInfo);
	listUsername(userList);
	$('.record-content').append(talkHTML);
	bottomIt();
}

function testws(dataJSON) {
	var jsWS = new WebSocket('ws://127.0.0.1:8484');
	console.log('start');
	try {
		jsWS.onopen = function () {			
			jsWS.send(dataJSON);
			console.log("open");
		}
		jsWS.onmessage = function (event) {
			console.log("message");
			console.log(event.data);
			// writeHerTold(event.data);
		}
		jsWS.onerror = function () {
			console.log("error");
		}
		jsWS.onclose = function () {
			console.log("close");
		}
	} catch (e) {
		console.log(e);
	}
}
//testws();

function whenLoad() {
	$(userNicknameEle).change(function () {
		$(userNicknameEle).attr('disabled', true);
	});
	$(sendMessage).click(function (event) {
		event.preventDefault();
		if ($(userNicknameEle).attr('disabled') == 'disabled') {
			var userNickname = $(userNicknameEle).val(),
				messageTo = $("#message-to").val(),
				sheTalks = $(sheTalksEle).val();
			if ($(sheTalks) != null) {
				var user = {
					nickname: userNickname,
					messageto: messageTo,
					tell: sheTalks,
				},
				userJSON = JSON.stringify(user);
				testws(userJSON);
			} else {
				console.log('she has not talk anything');
			}
		}
	});	
}
whenLoad();