<?php
	use Workerman\Worker;	
	require_once 'workerman/Autoloader.php';
	require 'myphp/userobjfunc.php';
	$_SESSION['start'] = true;
	$_SESSION['userInfo'] = array();
	$_SESSION['userInfo']['nickname'] = array();	

	$myWS = new Worker("websocket://127.0.0.1:8484");
	$myWS->count = 1;
	$myWS->onMessage = function ($connection, $data) {
		echo "connect : ".$connection->getRemoteIp()."\n";
		$sendDataArray = dealWithData($data);
		$sendData = json_encode($sendDataArray);
		// $userList = json_encode($sendDataArray['nickname']);
		foreach ($connection->worker->connections as $con) {
			# code...
			$con->send($sendData);
		}
	};
	Worker::runAll();
?>