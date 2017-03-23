<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>--websocket-chatroom--</title>
    <link rel="stylesheet" href="css/index.css">
</head>

<body>
    <div class="container">
        <div class="talking-record">
            <div class="record-content">
            	<div class="talks">
	                <div class="i-talk">
	                	<div class="name">name</div>
	                	<div class="content">i has said it to you that you can write something in bellow</div>
	                </div>
	            </div>
	         </div>
        </div>
        <div class="user-operates">
            <form   id="my-form" >
                <div class="acb">
                    <div class="fl">
                        <lable for="message-from">from:</lable><input type="text" value="" name="nickname" class="user-nickname" id="message-from" placeholder="enter your nickname, plz">
                    </div>
                    <div class="fr">
                        <lable for="message-to">to:</lable>
                        <select name="message-to" id="message-to">
                            <option value="all" id="message-to-all">all</option>
                        </select>
                    </div>
                </div>
                <div>
                    <textarea name="speakContent" id="user-tell" cols="70" rows="3" placeholder="what do you want to say? write here"></textarea>
                    <div>
                        <input type="submit" value="send" id="sendContext">
                    </div>
                </div>
            </form>
        </div>
    </div>

    <script src="js/jquery-3.1.0.min.js" type="text/javascript" charset="utf-8" defer></script>
    <script src="js/ws-chat.js" type="text/javascript" defer></script>
</body>
</html>
