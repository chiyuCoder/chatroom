<?php
	use Workerman\Worker;	
	require_once 'workerman/Autoloader.php';
	$_SESSION['start'] = true;
	$_SESSION['nickname'] = array();
	function UserObjFunc($userObj) {
		$adjustInArray = in_array($userObj->nickname, $_SESSION['nickname']);
		if ($adjustInArray) {
			echo 'has this username';
		} else {
			array_push($_SESSION['nickname'], $userObj->nickname);
		}		
		return $_SESSION['nickname'];
	};

	$myWS = new Worker("websocket://127.0.0.1:8484");
	$myWS->count = 1;
	$myWS->onMessage = function ($connection, $data) {
		echo "connect : ".$connection->getRemoteIp()."\n";
		$userObj = json_decode($data);
		$nicknameArray = UserObjFunc($userObj);		
		$sendDataArray = array($userObj, $nicknameArray);
		var_dump($_SESSION['nickname']);
		$sendData = json_encode($sendDataArray);
		$connection->send("$sendData");
	};

	Worker::runAll();
?>