<?php
	function dealWithData($gotData) {
		$gotArr = json_decode($gotData);
		var_dump($gotArr);
		foreach ($gotArr as $gotObj) {
			switch ($gotObj->dataType) {
				case 'userNickname':
					if (!in_array($gotObj->data, $_SESSION['userInfo']['nickname'])) {
						array_push($_SESSION['userInfo']['nickname'], $gotObj->data);
					};
					break;
				
				default:
					$_SESSION['userInfo'][$gotObj->dataType] = $gotObj->data;
					break;
			};
		};
		return $_SESSION['userInfo'];
	};
?>