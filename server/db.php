<?php 

$bd = new PDO('pgsql:host=localhost; dbname=chat', 'yves_etu', 'root');
$message = $_POST['message'];
$user = $_POST['user']; 

$fetchId = $bd->prepare('select id from messages order by id desc limit 1');
$fetchId->execute();    
$maxId = (int)($fetchId->fetchAll()[0][0])+1;

$fetchUserForCondition = $bd->prepare('select author from messages where author=:user');
$fetchUserForCondition->bindValue(":user", $user);
$fetchUserForCondition->execute();
$userInTable = $fetchUserForCondition->fetchAll()[0][0];

// if ($userInTable != "") {
//     $request = $bd->prepare('update messages set body=:message where author=:user');
//     $request->bindValue(":message", $message);
//     $request->bindValue(":user", $user);
//     $request->execute();

// }



    $requete = $bd->prepare('insert into messages values (:max, :user, :message)');
    $requete->bindValue(':max', $maxId);
    $requete->bindValue(":user", $user);
    $requete->bindValue(":message", $message);
    $requete->execute();
