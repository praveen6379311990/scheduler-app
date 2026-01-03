<?php
require '../config/database.php';

$date = $_GET['date'] ?? null;

if (!$date) {
    echo json_encode([]);
    exit;
}


// 1️⃣ Check if slots already exist
$check = $pdo->prepare(
    "SELECT COUNT(*) FROM time_slots WHERE slot_date = ?"
);
$check->execute([$date]);

$slotCount = $check->fetchColumn();

// 2️⃣ If no slots, auto-generate
if ($slotCount == 0) {
    $start = new DateTime("$date 10:00");
    $end   = new DateTime("$date 17:00");

    while ($start < $end) {
        $slotStart = $start->format("H:i:s");
        $start->modify("+30 minutes");
        $slotEnd = $start->format("H:i:s");

        $insert = $pdo->prepare(
            "INSERT INTO time_slots (slot_date, start_time, end_time)
             VALUES (?, ?, ?)"
        );
        $insert->execute([$date, $slotStart, $slotEnd]);
    }
}

$stmt = $pdo->prepare("
    SELECT * FROM time_slots 
    WHERE slot_date = ? AND is_booked = 0
");
$stmt->execute([$date]);

echo json_encode($stmt->fetchAll());
