<?php
session_start();
include 'conn.php'; // Include your database connection file

if ($_SESSION['role'] !== 'student') {
    header("Location: login.php");
    exit();
}

$student_id = $_SESSION['user']['user_id'];

// Fetch the subjects associated with the student
$subjects_query = "
    SELECT s.subject_id, s.subject_name
    FROM subjects s
    JOIN student_subjects ss ON s.subject_id = ss.subject_id
    WHERE ss.student_id = '$student_id'
";
$subjects_result = $conn->query($subjects_query);

if ($subjects_result->num_rows > 0) {
    while ($subject = $subjects_result->fetch_assoc()) {
        $subject_id = $subject['subject_id'];
        $subject_name = $subject['subject_name'];

        echo "<h3>Subject: $subject_name</h3>";

        // Fetch performance tasks for the subject
        $performance_query = "SELECT * FROM performance_tasks WHERE subject_id = '$subject_id'";
        $performance_result = $conn->query($performance_query);
        if ($performance_result->num_rows > 0) {
            echo "<h4>Performance Tasks</h4>";
            while ($performance = $performance_result->fetch_assoc()) {
                echo "Task: " . $performance['name'] . ", Total Score: " . $performance['total_score'] . ", Date: " . $performance['date'] . "<br>";
            }
        }

        // Fetch quarterly assessments for the subject
        $assessment_query = "SELECT * FROM quarterly_assessment WHERE subject_id = '$subject_id'";
        $assessment_result = $conn->query($assessment_query);
        if ($assessment_result->num_rows > 0) {
            echo "<h4>Quarterly Assessments</h4>";
            while ($assessment = $assessment_result->fetch_assoc()) {
                echo "Assessment: " . $assessment['name'] . ", Total Score: " . $assessment['total_score'] . ", Date: " . $assessment['date'] . "<br>";
            }
        }

        // Fetch written works for the subject
        $written_query = "SELECT * FROM written_works WHERE subject_id = '$subject_id'";
        $written_result = $conn->query($written_query);
        if ($written_result->num_rows > 0) {
            echo "<h4>Written Works</h4>";
            while ($written = $written_result->fetch_assoc()) {
                echo "Written Work: " . $written['name'] . ", Total Score: " . $written['total_score'] . ", Date: " . $written['date'] . "<br>";
            }
        }
    }
} else {
    echo "No subjects found for this student.";
}

$conn->close();
?>
