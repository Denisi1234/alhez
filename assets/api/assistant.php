<?php

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, max-age=0');
header('X-Content-Type-Options: nosniff');
header('X-Robots-Tag: noindex, nofollow');

function alhez_assistant_respond($status, $payload) {
	http_response_code($status);
	echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
	exit;
}

function alhez_assistant_contains($text, $phrases) {
	foreach ($phrases as $phrase) {
		if (strpos($text, $phrase) !== false) {
			return true;
		}
	}
	return false;
}

function alhez_assistant_answer($question) {
	$text = strtolower(trim(preg_replace('/\s+/', ' ', $question)));

	if (preg_match('/^(hello|hi|hey|habari)(\b|$)/', $text) || alhez_assistant_contains($text, array('good morning', 'good afternoon'))) {
		return 'Hello. I can help with ALHEZ products, delivery across Tanzania, quotations, and company information. What would you like to know?';
	}
	if (alhez_assistant_contains($text, array('quote', 'quotation', 'request a price', 'get a price', 'buy', 'purchase', 'order'))) {
		return 'To request pricing, submit the products and quantities you need through our quote form: https://alhez.co.tz/quote.html. You can also email contact@alhez.co.tz or call +255 757 382 236. Prices and stock are confirmed by our team.';
	}
	if (alhez_assistant_contains($text, array('deliver', 'delivery', 'shipping', 'ship to', 'reach', 'coverage', 'region', 'district', 'where do you'))) {
		return 'ALHEZ serves healthcare and academic institutions across Tanzania. Delivery options and timing depend on the requested items and destination, so please confirm them with our team at contact@alhez.co.tz or +255 757 382 236.';
	}
	if (alhez_assistant_contains($text, array('price', 'cost', 'how much', 'in stock', 'available now', 'availability', 'inventory'))) {
		return 'Prices and live stock are not listed on the website. Please send the product name, specifications, and quantity through https://alhez.co.tz/quote.html or email contact@alhez.co.tz for confirmation.';
	}
	if (alhez_assistant_contains($text, array('partner', 'partnership', 'supplier', 'become a supplier', 'collaborat'))) {
		return 'For partnership and supplier enquiries, email partnership@alhez.co.tz with a short introduction and the products or services you offer.';
	}
	if (alhez_assistant_contains($text, array('hour', 'open', 'opening time', 'working time', 'when are you'))) {
		return 'The website lists opening hours as Monday–Friday, 8:00 AM–6:00 PM; Saturday, 9:00 AM–2:00 PM; Sunday closed. For urgent confirmation, call +255 757 382 236.';
	}
	if (alhez_assistant_contains($text, array('email', 'contact', 'phone', 'call', 'address', 'location', 'office'))) {
		return 'ALHEZ office mailing address: P.O. Box 14244, Dar es Salaam, Tanzania. Call +255 757 382 236. General enquiries: info@alhez.co.tz; product and quote enquiries: contact@alhez.co.tz; partnerships: partnership@alhez.co.tz.';
	}
	if (alhez_assistant_contains($text, array('install', 'maintenance', 'after sales', 'after-sales', 'repair', 'service support', 'warranty'))) {
		return 'ALHEZ provides after-sales support, including installation, orientation, and routine maintenance for applicable equipment. Support depends on the product; contact contact@alhez.co.tz with the item details.';
	}
	if (alhez_assistant_contains($text, array('about alhez', 'who are you', 'what is alhez', 'company', 'about your', 'about the company'))) {
		return 'ALHEZ Medical Supplies Limited is a Tanzania-based supplier of medical, hospital, laboratory, scientific, veterinary, dental, PPE, and educational equipment and supplies. The company supports healthcare, academic, research, and other institutions across Tanzania.';
	}
	if (alhez_assistant_contains($text, array('product', 'supply', 'supplies', 'equipment', 'medical', 'laboratory', 'lab', 'scientific', 'veterinary', 'dental', 'ppe', 'consumable', 'microscope', 'centrifuge', 'reagent'))) {
		return 'ALHEZ supplies medical and hospital equipment, laboratory and scientific products, veterinary and dental supplies, PPE, consumables, and educational equipment. Browse categories at https://alhez.co.tz/products.html. For a specific item, send its name, specifications, and quantity through https://alhez.co.tz/quote.html.';
	}
	if (alhez_assistant_contains($text, array('thank', 'thanks', 'asante'))) {
		return 'You’re welcome. If you need product information or a quotation, contact contact@alhez.co.tz or call +255 757 382 236.';
	}

	return 'I can help with ALHEZ products, quotations, delivery coverage, after-sales support, and company information. Please try asking about one of those topics, or email contact@alhez.co.tz for help.';
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
	alhez_assistant_respond(405, array('error' => 'This endpoint accepts chat messages only.'));
}

$origin = isset($_SERVER['HTTP_ORIGIN']) ? parse_url($_SERVER['HTTP_ORIGIN'], PHP_URL_HOST) : null;
$request_host = isset($_SERVER['HTTP_HOST']) ? parse_url('http://' . $_SERVER['HTTP_HOST'], PHP_URL_HOST) : null;
if ($origin && $request_host && strtolower($origin) !== strtolower($request_host)) {
	alhez_assistant_respond(403, array('error' => 'The assistant request was not accepted. Please refresh the page and try again.'));
}

$raw_body = file_get_contents('php://input');
if ($raw_body === false || strlen($raw_body) > 20000) {
	alhez_assistant_respond(413, array('error' => 'That conversation is too long. Please start a new message.'));
}

$request = json_decode($raw_body, true);
if (!is_array($request) || !isset($request['messages']) || !is_array($request['messages'])) {
	alhez_assistant_respond(400, array('error' => 'Please send a valid message.'));
}

$latest_user_message = '';
foreach (array_slice($request['messages'], -8) as $message) {
	if (!is_array($message) || !isset($message['role'], $message['content'])) {
		continue;
	}
	if ($message['role'] === 'user' && is_string($message['content'])) {
		$content = trim($message['content']);
		if ($content !== '' && strlen($content) <= 1600) {
			$latest_user_message = $content;
		}
	}
}

if ($latest_user_message === '') {
	alhez_assistant_respond(400, array('error' => 'Please enter a message to continue.'));
}

$secure_cookie = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== '' && strtolower($_SERVER['HTTPS']) !== 'off';
session_set_cookie_params(array('lifetime' => 0, 'path' => '/', 'secure' => $secure_cookie, 'httponly' => true, 'samesite' => 'Lax'));
if (!session_start()) {
	alhez_assistant_respond(503, array('error' => 'The assistant is temporarily unavailable. Please email contact@alhez.co.tz.'));
}
$now = time();
$recent_requests = isset($_SESSION['alhez_assistant_requests']) && is_array($_SESSION['alhez_assistant_requests'])
	? array_filter($_SESSION['alhez_assistant_requests'], function ($timestamp) use ($now) { return ($now - (int) $timestamp) < 600; })
	: array();
if (count($recent_requests) >= 30) {
	session_write_close();
	alhez_assistant_respond(429, array('error' => 'Please wait a few minutes before sending more messages.'));
}
$recent_requests[] = $now;
$_SESSION['alhez_assistant_requests'] = array_values($recent_requests);
session_write_close();

alhez_assistant_respond(200, array('answer' => alhez_assistant_answer($latest_user_message)));
