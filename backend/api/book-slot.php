<?php
require '../config/database.php';

$data = json_decode(file_get_contents("php://input"), true);


$slot_id = $data['slot_id'] ?? null;
$name    = trim($data['name'] ?? '');
$email   = trim($data['email'] ?? '');

if (!$slot_id || !$name || !$email) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Name and email are required"
    ]);
    exit;
}

$pdo->beginTransaction();

// Check if already booked
$check = $pdo->prepare("SELECT is_booked FROM time_slots WHERE id=? FOR UPDATE");
$check->execute([$slot_id]);
$slot = $check->fetch();

if ($slot['is_booked']) {
    echo json_encode(["error" => "Slot already booked"]);
    exit;
}

// Book slot
$pdo->prepare("
    INSERT INTO bookings (slot_id, name, email)
    VALUES (?, ?, ?)
")->execute([$slot_id, $name, $email]);

$pdo->prepare("
    UPDATE time_slots SET is_booked=1 WHERE id=?
")->execute([$slot_id]);

$pdo->commit();

echo json_encode(["success" => true]);
