<?php

function website_form_is_ajax() {
	return isset($_SERVER['HTTP_X_REQUESTED_WITH'])
		&& strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest';
}

function website_form_respond($message, $success = false, $status = 200) {
	http_response_code($status);
	if (website_form_is_ajax()) {
		if ($success) {
			echo '<div class="alert alert-success" role="status">' . htmlspecialchars($message, ENT_QUOTES, 'UTF-8') . '</div>';
		} else {
			echo htmlspecialchars($message, ENT_QUOTES, 'UTF-8');
		}
		exit;
	}
	$title = $success ? 'Message received' : 'Unable to send message';
	$class = $success ? '#e8f5f2' : '#fff1f0';
	echo '<!doctype html><html lang="en-TZ"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">';
	echo '<title>' . htmlspecialchars($title, ENT_QUOTES, 'UTF-8') . ' | ALHEZ</title>';
	echo '<body style="margin:0;padding:32px;font:16px/1.6 Arial,sans-serif;color:#244b50;background:#f5fafb"><main style="max-width:640px;margin:10vh auto;padding:32px;background:' . $class . '">';
	echo '<h1>' . htmlspecialchars($title, ENT_QUOTES, 'UTF-8') . '</h1><p>' . htmlspecialchars($message, ENT_QUOTES, 'UTF-8') . '</p>';
	echo '<p><a href="../../index.html" style="color:#168db7">Return to ALHEZ</a></p></main></body></html>';
	exit;
}

function website_form_field($key) {
	return isset($_POST[$key]) ? trim((string) $_POST[$key]) : '';
}

function website_form_plain_field($key) {
	return preg_replace('/[\r\n]+/', ' ', website_form_field($key));
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
	website_form_respond('Please submit the form from the ALHEZ website.', false, 405);
}

// Quietly discard bots that fill this hidden honeypot field.
if (website_form_field('website') !== '') {
	website_form_respond('Thank you. Your message has been received.', true);
}

$form_type = website_form_field('form_type');
if (!in_array($form_type, array('contact', 'quote'), true)) {
	website_form_respond('This form submission could not be recognized. Please try again.', false, 400);
}

$name = website_form_field('name');
$email = website_form_field('email');
$phone = website_form_plain_field('phone');
$organization = website_form_plain_field('organization');
$comments = website_form_field('comments');

if ($name === '' || $email === '' || $comments === '') {
	website_form_respond('Please complete all required fields.', false, 422);
}

if (strlen($name) > 120 || strlen($email) > 254 || strlen($phone) > 40 || strlen($organization) > 160 || strlen($comments) > 10000) {
	website_form_respond('Some information is too long. Please shorten it and try again.', false, 422);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
	website_form_respond('Please enter a valid email address.', false, 422);
}

if ($form_type === 'contact') {
	$subject = 'Website contact request';
	$message = "A new contact message was submitted on the ALHEZ website.\n\n";
	$message .= "Name: {$name}\nEmail: {$email}\n";
	$message .= 'Phone: ' . ($phone !== '' ? $phone : 'Not provided') . "\n";
	$message .= 'Organization: ' . ($organization !== '' ? $organization : 'Not provided') . "\n\n";
	$message .= "Message:\n{$comments}\n";
	$confirmation = 'Your message has been sent to ALHEZ.';
} else {
	$service = website_form_plain_field('service');
	$location = website_form_plain_field('location');
	if ($organization === '' || $service === '' || $location === '') {
		website_form_respond('Please complete all required fields.', false, 422);
	}
	if (strlen($service) > 160 || strlen($location) > 160) {
		website_form_respond('Some information is too long. Please shorten it and try again.', false, 422);
	}
	$subject = 'Website quote request';
	$message = "A new product quote request was submitted on the ALHEZ website.\n\n";
	$message .= "Name: {$name}\nEmail: {$email}\n";
	$message .= 'Phone: ' . ($phone !== '' ? $phone : 'Not provided') . "\n";
	$message .= "Organization: {$organization}\nProduct or service: {$service}\nDelivery location: {$location}\n\n";
	$message .= "Products, specifications, or questions:\n{$comments}\n";
	$confirmation = 'Your quote request has been sent to ALHEZ.';
}

$recipient = getenv('ALHEZ_FORM_RECIPIENT') ?: 'contact@alhez.co.tz';
$headers = "From: ALHEZ Website <{$recipient}>\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

if (!mail($recipient, $subject, $message, $headers)) {
	website_form_respond('We could not send your request right now. Please email contact@alhez.co.tz or call +255 757 382 236.', false, 500);
}

website_form_respond('Thank you, ' . $name . '. ' . $confirmation, true);
