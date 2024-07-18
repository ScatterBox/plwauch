<?php
session_start();
if ($_SESSION['role'] !== 'teacher') {
    header("Location: login.php");
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Retrieve the form data
    $name = $_POST['name'];
    $total = $_POST['total'];
    $date = $_POST['date'];
    $subject_id = $_POST['subject_id'];

    // Connect to the database
    $conn = new mysqli('localhost', 'root', 'password', 'gradingsystem');

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Insert the data into the performance_tasks table
    $sql = "INSERT INTO performance_tasks (name, total_score, date, subject_id) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sisi', $name, $total, $date, $subject_id);

    if ($stmt->execute()) {
        echo "Activity successfully created!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $stmt->close();
    $conn->close();
}
?>
