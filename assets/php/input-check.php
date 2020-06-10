<?php

function checkUserLogin($text){
	return preg_match("/^[\-_A-Za-z0-9]+$/i", $text);
}

function checkUserEmail($text){
	return preg_match("/^[\.\-_A-Za-z0-9]+@[\.\-A-Za-z0-9]+\.[A-Za-z]{2,6}$/i", $text);
}

function checkUserPassword($text){
	return preg_match("/^[\-_A-Za-z0-9]+$/i", $text);
}

function checkName($text){
	return preg_match("/^[\s\-A-Za-zА-Яа-яёЁ]+$/u", $text);
}

function checkSerial($text){
	return preg_match("/^[\[\]\(\)\-A-Za-z0-9]+$/i", $text);
}

function checkFloat($text){
	return preg_match("/^[\.0-9]+$/i", $text);
}

function checkText($text){
	return preg_match("/^[\sA-Za-zА-Яа-яёЁ]+$/u", $text);
}

function checkNumber($text){
	return preg_match("/^[0-9]+$/i", $text);
}

function checkInputDate($text){
	return preg_match("/^[0-9]{4}\-[0-9]+\-[0-9]+$/i", $text);
}

?>