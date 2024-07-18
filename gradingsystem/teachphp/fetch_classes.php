<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "gradingsystem";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Connection failed: ' . $conn->connect_error]));
}

$created_by = $_POST['created_by'];

$sql = "SELECT subject_id, subject_name, year_level, section, created_by, 
               (SELECT CONCAT(fname, ' ', mname, ' ', lname, ' ', ename) FROM teachers WHERE user_id = created_by) AS created_by_fullname 
        FROM subjects 
        WHERE created_by = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $created_by);
$stmt->execute();
$result = $stmt->get_result();
$classes = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $classes[] = $row;
    }
}

echo json_encode($classes);

$conn->close();
?>
