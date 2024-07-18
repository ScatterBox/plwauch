<?php
$yearLevel = $_POST['year_level'];

$conn = new mysqli('localhost', 'root', '', 'gradingsystem');
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$query = "SELECT DISTINCT section FROM students WHERE year_level = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param('s', $yearLevel);
$stmt->execute();
$result = $stmt->get_result();

while ($row = $result->fetch_assoc()) {
    echo '<option value="' . $row['section'] . '">' . $row['section'] . '</option>';
}

$conn->close();
?>
