<?php
$dblocation = "localhost"; // Имя сервера
$dbname = "trade_centre"; // Имя бд
$dbuser = "root";   // Имя пользователя
$dbpasswd = "";    // Пароль
$dbcnx = @mysql_connect($dblocation,$dbuser,$dbpasswd);
if (!$dbcnx) // Если дескриптор равен 0 соединение не установлено
{
 echo("<P>В настоящий момент сервер базы данных не доступен, поэтому
  корректное отображение страницы невозможно.</P>");
 exit();
}

if (!@mysql_select_db($dbname,$dbcnx))
{
 echo( "<P>В настоящий момент база данных не доступна, поэтому корректное отображение страницы невозможно.</P>" );
 exit();
}

mysql_query("SET NAMES 'utf8");
mysql_query("SET CHARACTER SET 'utf8'");
?>
