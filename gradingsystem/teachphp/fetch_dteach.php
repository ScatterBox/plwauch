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

$year_level = $_POST['year_level'];
$section = $_POST['section'];
$subject = $_POST['subject'];

$sql = "SELECT s.user_id, s.fname, s.mname, s.lname, s.age, s.gender, s.birthdate, s.address, 
               s.year_level, s.section, s.email, s.lrn, 
               GROUP_CONCAT(sb.subject_name SEPARATOR ', ') AS subjects 
        FROM students s
        INNER JOIN student_subjects ss ON s.user_id = ss.student_id
        INNER JOIN subjects sb ON ss.subject_id = sb.subject_id
        WHERE sb.year_level = ? AND sb.section = ? AND sb.subject_name = ?
        GROUP BY s.user_id";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $year_level, $section, $subject);
$stmt->execute();

$result = $stmt->get_result();
$students = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $students[] = $row;
    }
}

echo json_encode($students);

$conn->close();

?>
