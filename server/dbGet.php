<?php 

$bd = new PDO('pgsql:host=localhost; dbname=chat', 'yves_etu', 'root');

$allMessages = $bd->prepare('select author, body from messages');
$allMessages->execute();
$allMessagesTab = $allMessages->fetchAll(PDO::FETCH_NUM);
// print_r($allMessagesTab);

$i = 0;
$masterTab = [];
while ($i < sizeof($allMessagesTab)) {
    $tab = [];
    $tab["user"]=$allMessagesTab[$i][0];
    $tab["message"]=$allMessagesTab[$i][1];
    array_push($masterTab, $tab);
    $i++;
}

$tmpStr = json_encode($masterTab);
echo $tmpStr;