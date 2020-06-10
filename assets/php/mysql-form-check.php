<?php
ini_set("session.save_path","../../.");
session_start();

include "mysql-config.php";
include "input-check.php";

switch($_POST["form"]){
	
	case "user":{
		
		$query = mysql_query("SELECT * FROM `user` WHERE `login` = '".$_POST["login"]."' LIMIT 1");
	
		if (mysql_num_rows($query) == 1){
			
			$_SESSION["user"] = array(
			"id_user"=>mysql_result($query, 0, "id_user"),
			"login"=>mysql_result($query, 0, "login"), 
			"email"=>mysql_result($query, 0, "email"),
			"password"=>mysql_result($query, 0, "password"), 
			"admin"=>mysql_result($query, 0, "admin"));
			
			if ($_POST["password"] == $_SESSION["user"]["password"]){
				$json = true;
			} else {
				$json = 2;
			}
			
		} else {
			$json = 1;
		}
		echo json_encode($json);
		
	} break;
	
	case "registration":{
		
		$query = mysql_query("SELECT * FROM `user` WHERE `login` = '".$_POST["login"]."' LIMIT 1");
		
		if (mysql_num_rows($query) == 1){
			$json = 1;
		} else if (!checkUserLogin($_POST["login"])){
			$json = 2;
		} else if (!checkUserEmail($_POST["email"])){
			$json = 3;
		} else if (!checkUserPassword($_POST["password"])){
			$json = 4;
		} else if ($_POST["email"] != $_POST["email_asset"]){
			$json = 5;
		} else if ($_POST["password"] != $_POST["password_asset"]){
			$json = 6;
		} else {
			$query = mysql_query("INSERT INTO `user` VALUE(null, '".strtolower($_POST["login"])."', '".strtolower($_POST["email"])."', '".$_POST["password"]."', false)");
			$query = mysql_query("SELECT * FROM `user` WHERE `login` = '".$_POST["login"]."' LIMIT 1");
			
			$_SESSION["user"] = array(
			"id_user"=>mysql_result($query, 0, "id_user"),
			"login"=>mysql_result($query, 0, "login"), 
			"email"=>mysql_result($query, 0, "email"),
			"password"=>mysql_result($query, 0, "password"), 
			"admin"=>mysql_result($query, 0, "admin"));
			
			$json = true;
		}		
		echo json_encode($json);
		
	} break;
	
	case "product":{
		
		if (!checkName($_POST["name"])){
			$json = 1;
		} else if (!checkSerial($_POST["serial"])){
			$json = 2;
		} else if (!checkFloat($_POST["weight"])){
			$json = 3;
		} else if (!checkText($_POST["color"])){
			$json = 4;
		} else if (!checkNumber($_POST["warranty"])){
			$json = 5;
		} else if (!checkFloat($_POST["cost"])){
			$json = 6;
		} else if ($_POST["id_product"]){			
			$query = mysql_query("UPDATE `product` SET `id_category` = '".$_POST["id_category"]."', `name` = '".$_POST["name"]."', `serial` = '".$_POST["serial"]."', `weight` = '".$_POST["weight"]."', `color` = '".$_POST["color"]."', `warranty` = '".$_POST["warranty"]."', `cost` = '".$_POST["cost"]."', `description` = '".$_POST["description"]."' WHERE `id_product` = '".$_POST["id_product"]."'");
			$json = true;
		} else {
			if(!$_SESSION["add"]) {
				$query = mysql_query("INSERT INTO `product` VALUE
				(null
				, '".$_POST["id_category"]."'
				, '".$_POST["name"]."'
				, '".$_POST["serial"]."'
				, '".$_POST["weight"]."'
				, '".$_POST["color"]."'
				, '".$_POST["warranty"]."'
				, '".$_POST["cost"]."'
				, '".$_POST["description"]."')");	
				
				$json = true;
				$_SESSION["add"] = $json;
			} else {
				$json = false;
				$_SESSION["add"] = null;
			}
		}		
		echo json_encode($json);
		
	} break;
	
	case "del-product":{		
		
		$query = mysql_query("DELETE FROM `product` WHERE `id_product` = '".$_POST["id_product"]."'");		
		$json = true;
		
		echo json_encode($json);
		
	} break;
	
	case "category":{
		
		if (!checkName($_POST["name"])){
			$json = 1;		
		} else if ($_POST["id_category"]){
			$query = mysql_query("UPDATE `category` SET `name` = '".$_POST["name"]."', `description` = '".$_POST["description"]."' WHERE `id_category` = '".$_POST["id_category"]."'");			
			$json = true;
		} else {
			if(!$_SESSION["add"]) {
				$query = mysql_query("INSERT INTO `category` VALUE
				(null				
				, '".$_POST["name"]."'
				, '".$_POST["description"]."')");
				
				$json = true;
				$_SESSION["add"] = $json;
			} else {
				$json = false;
				$_SESSION["add"] = null;
			}
		}		
		echo json_encode($json);
		
	} break;
	
	case "del-category":{
		
		$query = mysql_query("DELETE FROM `category` WHERE `id_category` = '".$_POST["id_category"]."'");		
		$json = true;
		
		echo json_encode($json);
		
	} break;
	
	case "sell":{
		
		if (!checkNumber($_POST["quantity"])){
			$json = 1;
		} else if (!checkInputDate($_POST["date"])){
			$json = 2;
		} else if ($_POST["id_sell"]){
			$query = mysql_query("UPDATE `sell` SET `quantity` = '".$_POST["quantity"]."', `date` = '".$_POST["date"]."' WHERE `id_sell` = '".$_POST["id_sell"]."'");			
			$json = true;
		} else {
			if(!$_SESSION["add"]) {
				$query = mysql_query("INSERT INTO `sell` VALUE
				(null
				, '".$_POST["id_product"]."'
				, '".$_POST["quantity"]."'
				, '".$_POST["date"]."')");
				
				$json = true;
				$_SESSION["add"] = $json;
			} else {
				$json = false;
				$_SESSION["add"] = null;
			}
		}		
		echo json_encode($json);
		
	} break;
	
	case "del-sell":{
		
		$query = mysql_query("DELETE FROM `sell` WHERE `id_sell` = '".$_POST["id_sell"]."'");		
		$json = true;
		
		echo json_encode($json);
		
	} break;
	
	case "feedback":{
		
		if (!checkName($_POST["title"])){
			$json = 1;		
		} else if ($_POST["id_feedback"]){
			$query = mysql_query("UPDATE `feedback` SET `title` = '".$_POST["title"]."', `rating` = '".$_POST["rating"]."', `content` = '".$_POST["content"]."', `plus` = '".$_POST["plus"]."', `minus` = '".$_POST["minus"]."', `date_time` = NOW() WHERE `id_feedback` = '".$_POST["id_feedback"]."'");
			$json = true;
		} else {
			if(!$_SESSION["add"]) {
				$query = mysql_query("INSERT INTO `feedback` VALUE
				(null
				, '".$_POST["id_user"]."'
				, '".$_POST["id_product"]."'
				, '".$_POST["title"]."'
				, '".$_POST["rating"]."'
				, '".$_POST["content"]."'
				, '".$_POST["plus"]."'
				, '".$_POST["minus"]."'
				, NOW())");
				
				$json = true;
				$_SESSION["add"] = $json;
			} else {
				$json = false;
				$_SESSION["add"] = null;
			}
		}		
		echo json_encode($json);
		
	} break;
	
	case "del-feedback":{
		
		$query = mysql_query("DELETE FROM `feedback` WHERE `id_feedback` = '".$_POST["id_feedback"]."'");
		$json = true;
		
		echo json_encode($json);
		
	} break;
	
	case "login":{
		
		if (!checkUserLogin($_POST["login"])){
			$json = 1;
		} else if ($_POST["password"] != $_SESSION["user"]["password"]){
			$json = 2;			
		} else {
			$query = mysql_query("UPDATE `user` SET `login` = '".$_POST["login"]."' WHERE `id_user` = '".$_SESSION["user"]["id_user"]."'");
			$_SESSION["user"]["login"] = $_POST["login"];
			$json = true;
		}		
		echo json_encode($json);
		
	} break;
	
	case "email":{
		
		if (!checkUserEmail($_POST["email"])){
			$json = 1;
		} else if ($_POST["password"] != $_SESSION["user"]["password"]){
			$json = 2;
		} else {
			$query = mysql_query("UPDATE `user` SET `email` = '".$_POST["email"]."' WHERE `id_user` = '".$_SESSION["user"]["id_user"]."'");
			$_SESSION["user"]["email"] = $_POST["email"];
			$json = true;
		}		
		echo json_encode($json);
		
	} break;
	
	case "password":{
		
		if ($_POST["password"] != $_SESSION["user"]["password"]){
			$json = 1;
		} else if (!checkUserPassword($_POST["new_password"])){
			$json = 2;
		} else if ($_POST["new_password"] != $_POST["new_password_asset"]){
			$json = 3;
		} else {
			$query = mysql_query("UPDATE `user` SET `password` = '".$_POST["new_password"]."' WHERE `id_user` = '".$_SESSION["user"]["id_user"]."'");
			$_SESSION["user"]["password"] = $_POST["new_password"];
			$json = true;
		}		
		echo json_encode($json);
		
	} break;
	
	case "del-user":{
		
		$query = mysql_query("DELETE FROM `user` WHERE `id_user` = '".$_POST["id_user"]."'");
		
		session_unset();
		session_destroy();
		header("location: ../../index.php");
		
	} break;
	
	default: echo json_encode(false); break;
}
?>