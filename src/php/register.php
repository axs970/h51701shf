<?php
	include 'DBHelper.php';
	
	$username = $_POST["username"];
	$password = $_POST["password"];
	$phone = $_POST["phone"];
	$email = $_POST["email"];
	//判断当前 username 是否已存在数据表中
	$usernamecheck = "select * from username where `username` ='$username'";
	$result = query($usernamecheck);
	//当前 username 不存在，执行插入操作
	if(count($result) < 1){

		$sql = "insert into username(`username`, `password`,`phone`,`email`) values('$username', '$password','$phone','$email')";
		$excute = excute($sql);
		if($excute){
			echo "{state: true}";
		} else {
			echo "{state: false, message: '插入失败！！！'}";
		}
	} else {
		echo "{state: false, message: 'email 已被注册！！！'}";
	}
?>
