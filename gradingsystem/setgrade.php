<?php
session_start();
if ($_SESSION['role'] !== 'teacher') {
    header("Location: login.php");
    exit();
}

// Retrieve the subject_id from the URL
$subject_id = isset($_GET['subject_id']) ? $_GET['subject_id'] : null;
if (!$subject_id) {
    echo "Error: No subject selected.";
    exit();
}
?>

<?php include 'styles/hui.php' ?>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.3.0/css/bootstrap.min.css">
<link rel="stylesheet" href="https://cdn.datatables.net/2.0.8/css/dataTables.bootstrap5.css">
<link rel="stylesheet" href="styles/style.css">
<link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.3.0/css/bootstrap.min.css" rel="stylesheet">
<link href="https://cdn.datatables.net/v/bs5/jq-3.7.0/dt-2.0.8/datatables.min.css" rel="stylesheet">
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

<body>
    <div class="container-fluid">
        <aside class="sidebar">
            <div class="sidebar-header">
                <img src="images/logo.jpg" alt="logo" />
                <div class="header-text">
                    <h2>Teacher</h2>
                    <h2>Dashboard</h2>
                </div>
            </div>
            <ul class="sidebar-links">
                <h4>
                    <span>Manage Info</span>
                    <div class="menu-separator"></div>
                </h4>
                <li>
                    <a href="teacher.php">
                        <span class="material-symbols-outlined">
                            person_add
                        </span>View Class</a>
                </li>
                <h4>
                    <span>Account</span>
                    <div class="menu-separator"></div>
                </h4>
                <li>
                    <a href="logout.php" onclick="return confirmLogout()"><span class="material-symbols-outlined">
                            logout </span>Logout</a>
                </li>
            </ul>
            <div class="user-account">
                <div class="user-profile">
                    <img src="<?php echo './images/' . $_SESSION['user']['img']; ?>" alt="Profile Image" />
                    <div class="user-detail">
                        <h3><?php echo $_SESSION['user']['nickname']; ?></h3>
                        <span><?php echo ucfirst($_SESSION['user']['role']); ?></span>
                    </div>
                </div>
            </div>
        </aside>

        <!-- Main content -->
        <div class="row-md-9" id="mainContent">
            <div id="gradingForm" class="container mt-5">
                <form id="gradingFormContent" class="row g-3">
                    <h2>Create an activity</h2>
                    <div class="col-md-4">
                        <label for="category" class="form-label">Category:</label>
                        <select id="category" name="category" class="form-select">
                            <option value="performance_tasks">Performance Task</option>
                            <option value="quarterly_assessment">Quarterly Assessment</option>
                            <option value="written_works">Written Work</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                        <label for="name" class="form-label">Name:</label>
                        <input type="text" id="name" name="name" class="form-control">
                    </div>
                    <div class="col-md-4">
                        <label for="total" class="form-label">Total Marks:</label>
                        <input type="text" id="total" name="total" class="form-control">
                    </div>
                    <div class="col-md-4">
                        <label for="date" class="form-label">Date created:</label>
                        <input type="date" id="date" name="date" class="form-control">
                    </div>
                    <div class="col-12">
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </div>
                    <input type="hidden" id="subject_id" name="subject_id" value="<?php echo $subject_id; ?>">
                </form>
            </div>
        </div>
    </div>

    <script>
        document.getElementById('gradingFormContent').addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent the form from being submitted normally

            // Access the form values
            var category = document.getElementById('category').value;
            var name = document.getElementById('name').value;
            var total = document.getElementById('total').value;
            var date = document.getElementById('date').value;
            var subject_id = document.getElementById('subject_id').value;

            // Determine the URL to send the request based on the category
            var url = '';
            switch (category) {
                case 'performance_tasks':
                    url = 'teachphp/performancetask.php';
                    break;
                case 'quarterly_assessment':
                    url = 'teachphp/quarterlyassessment.php';
                    break;
                case 'written_works':
                    url = 'teachphp/writtenworks.php';
                    break;
            }

            // Send the form data via AJAX
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onload = function () {
                if (this.status == 200) {
                    alert('Activity successfully created!');
                    window.location.href = 'teacher.php'; // Redirect to teacher.php after successful submission
                } else {
                    alert('Error creating activity.');
                }
            };

            xhr.send('name=' + name + '&total=' + total + '&date=' + date + '&subject_id=' + subject_id);
        });
    </script>

        <script
            src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.3.0/js/bootstrap.bundle.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

</body>

</html>