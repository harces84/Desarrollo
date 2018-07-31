<?php
/**
 * @version 1.0
 */

require("class.phpmailer.php");
require("class.smtp.php");

$errors = array();

	// Check if name has been entered
	if (!isset($_POST['name'])) {
		$errors['name'] = 'Please enter your name';
	}

	// Check if email has been entered and is valid
	if (!isset($_POST['email']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
		$errors['email'] = 'Please enter a valid email address';
	}

	//Check if message has been entered
	if (!isset($_POST['message'])) {
		$errors['message'] = 'Please enter your message';
	}

	$errorOutput = '';

	if(!empty($errors)){

		$errorOutput .= '<div class="alert alert-danger alert-dismissible" role="alert">';
 		$errorOutput .= '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';

		$errorOutput  .= '<ul>';

		foreach ($errors as $key => $value) {
			$errorOutput .= '<li>'.$value.'</li>';
		}

		$errorOutput .= '</ul>';
		$errorOutput .= '</div>';

		echo $errorOutput;
		die();
	}

$nombre = $_POST["name"];
$email = $_POST["email"];
$mensaje = "Mensaje enviado desde Sitio Web \n<br> <b>Nombre:</b> ".$_POST["name"]." \n<br><b>Correo:</b> ".$_POST["email"]." \n<br>";
$mensaje = $mensaje.$_POST["message"];

// Datos de la cuenta de correo utilizada para enviar vía SMTP
$smtpHost = "c1120286.ferozo.com";  // Dominio alternativo brindado en el email de alta 
$smtpUsuario = "info@elofir.com.mx";  // Mi cuenta de correo
$smtpClave = "1nf0E10f1r";  // Mi contraseña

// Email donde se enviaran los datos cargados en el formulario de contacto
$emailDestino = "info@elofir.com.mx";
    
$mail = new PHPMailer();
$mail->IsSMTP();
$mail->SMTPAuth = true;
$mail->Port = 587; 
$mail->IsHTML(true); 
$mail->CharSet = "utf-8";

$mail->Host = $smtpHost; 
$mail->Username = $smtpUsuario; 
$mail->Password = $smtpClave;

$mail->From = $smtpUsuario; // Email desde donde envío el correo.
$mail->FromName = $nombre;
$mail->AddAddress($emailDestino); // Esta es la dirección a donde enviamos los datos del formulario
$mail->AddReplyTo($email); // Esto es para que al recibir el correo y poner Responder, lo haga a la cuenta del visitante. 
$mail->Subject = "El Ofir - Mensaje enviado desde formulario de contacto"; // Este es el titulo del email.
$mensajeHtml = nl2br($mensaje);
$mail->Body = "{$mensajeHtml} <br /><br />Formulario Web el Ofir<br />"; // Texto del email en formato HTML
$mail->AltBody = "{$mensaje} \n\n Formulario Web el Ofir"; // Texto sin formato HTML
// FIN - VALORES A MODIFICAR //

$mail->SMTPOptions = array(
    'ssl' => array(
        'verify_peer' => false,
        'verify_peer_name' => false,
        'allow_self_signed' => true
    )
);

$estadoEnvio = $mail->Send(); 
$result = '';
if($estadoEnvio){
    $result .= '<div class="alert alert-success alert-dismissible" role="alert">';
 		$result .= '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
		$result .= 'Gracias, en breve nos pondremos en contacto';
		$result .= '</div>';
        echo $result;
		die();
} else {
    $result = '';
	$result .= '<div class="alert alert-danger alert-dismissible" role="alert">';
	$result .= '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
	$result .= 'Algo malo ha sucedido al intentar enviar el correo, favor de intentarlo mas tarde';
	$result .= '</div>';
	echo $result;
}


