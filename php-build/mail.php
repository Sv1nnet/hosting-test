<?php 

//set the mail and password on the lines 39 and 40

// move phpmailer on the one directory higher
require_once('./../phpmailer/PHPMailerAutoload.php');

if (!isset($_POST['phone']) && !isset($_POST['name'])) {
    header('Location: /');
    exit();
}

date_default_timezone_set('Europe/Moscow');

$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$name = $_POST['name'];
$phone = $_POST['phone'];
$testCheckBox_1 = isset($_POST['testCheckBox-1']) ? "true" : "false";
$testCheckBox_2 = isset($_POST['testCheckBox-2']) ? "true" : "false";
$testCheckBox_3 = isset($_POST['testCheckBox-3']) ? "true" : "false";
$date = date('Y-m-d H:i:s');

file_put_contents('./data/orders.txt', "
Имя: $name
Телефон: $phone
Дата: $date
Инп_1: $testCheckBox_1
Инп_2: $testCheckBox_2
Инп_3: $testCheckBox_3"."
" , FILE_APPEND);

//$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.mail.ru';  																							// Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'mail'; // Ваш логин от почты с которой будут отправляться письма
$mail->Password = 'password'; // Ваш пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465; // TCP port to connect to / этот порт может отличаться у других провайдеров

$mail->setFrom('svinnet92@mail.ru'); // от кого будет уходить письмо?
$mail->addAddress('svinnet92@mail.ru');     // Кому будет уходить письмо 
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Заявка от '.$name;
$mail->Body    = "<ul><li>Имя: $name</li><li>Телефон: $phone</li><li>Дата заявки: $date</li><li>Checkbox-1: $testCheckBox_1</li><li>Checkbox-2: $testCheckBox_2</li><li>Checkbox-3: $testCheckBox_3</li></ul>"; // html body
$mail->AltBody = '';

if(!$mail->send()) {
    echo 'Error';
} else {
    echo 'ok';
}
?>