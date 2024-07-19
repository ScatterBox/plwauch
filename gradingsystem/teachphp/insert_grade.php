<?php
include 'databaseconnect/conn.php'; // Adjust the path as needed

// Get the form data
$category = $_POST['category'];
$name = $_POST['name'];
$total = $_POST['total'];
$date = $_POST['date'];
$created_by = $_POST['created_by']; // Get the created_by field

// Validate input data
if (empty($category) || empty($name) || empty($total) || empty($date) || empty($created_by)) {
    echo "Error: All fields are required.";
    exit();
}

// Sanitize input data
$category = $conn->real_escape_string($category);
$name = $conn->real_escape_string($name);
$total = $conn->real_escape_string($total);
$date = $conn->real_escape_string($date);
$created_by = $conn->real_escape_string($created_by); // Sanitize created_by

// Prepare the SQL statement based on the selected category
$sql = "";
if ($category == 'performance_tasks') {
    $sql = "INSERT INTO performance_tasks (name, total_score, date, created_by) VALUES ('$name', '$total', '$date', '$created_by')";
} elseif ($category == 'quarterly_assessment') {
    $sql = "INSERT INTO quarterly_assessment (name, total_score, date, created_by) VALUES ('$name', '$total', '$date', '$created_by')";
} elseif ($category == 'written_works') {
    $sql = "INSERT INTO written_works (name, total_score, date, created_by) VALUES ('$name', '$total', '$date', '$created_by')";
} else {
    // Handle error if category is not recognized
    echo "Error: Invalid category selected.";
    exit();
}

// Execute the SQL statement
if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
