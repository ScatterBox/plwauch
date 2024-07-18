<?php
$section = $_POST['section'];

$conn = new mysqli('localhost', 'root', '', 'gradingsystem');
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$query = "SELECT DISTINCT year_level FROM students WHERE section = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param('s', $section);
$stmt->execute();
$result = $stmt->get_result();

while ($row = $result->fetch_assoc()) {
    echo '<option value="' . $row['year_level'] . '">' . $row['year_level'] . '</option>';
}

$conn->close();
?>
