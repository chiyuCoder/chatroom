<?php
	use Workerman\Worker;
	use Workerman\WebServer;
	use Workerman\Protocols\Http;
	require_once 'workerman/Autoloader.php';
	// $myHttpMethod = new newhttp();
	
<<<<<<< HEAD
	$myHTTP = new WebServer('http://192.168.199.189:3000');
=======
	$myHTTP = new WebServer('http://127.0.0.1:3000');
>>>>>>> 0d839c2704fd37014d36e68ebec9752cfa8daa59
	$myHTTP->count = 1;
	$myHTTP->addRoot('www.your_domain.com', __DIR__.'/app');
	
	Worker::runAll();
	
	
	// var_dump($_SESSION);
?>