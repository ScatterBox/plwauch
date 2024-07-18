<?php
session_start();
if ($_SESSION['role'] !== 'admin') {
    header("Location: login.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Admin Dashboard</title>
    <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.3.0/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/2.0.8/css/dataTables.bootstrap5.css">
    <link rel="stylesheet" href="styles/style.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.3.0/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.datatables.net/v/bs5/jq-3.7.0/dt-2.0.8/datatables.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
    <style>
        h1 {
            margin-top: 20px;
        }

        .smaller-table {
            font-size: 0.8em;
            width: 80%;
            margin: auto;
        }

        .smaller-table th,
        .smaller-table td {
            padding: 5px;
        }
    </style>
</head>

<body>
    <div class="container-fluid">
        <aside class="sidebar">
            <div class="sidebar-header">
                <img src="images/logo.jpg" alt="logo" />
                <div class="header-text">
                    <h2>Admin</h2>
                    <h2>Dashboard</h2>
                </div>
            </div>
            <ul class="sidebar-links">
                <li>
                    <a href="tl.php" onclick="showFaculty()">
                        <span class="material-symbols-outlined"> person </span>Teachers</a>
                </li>
                <li>
                    <a href="#" onclick="showAdmin()">
                        <span class="material-symbols-outlined"> person </span>Admin</a>
                </li>
                <li>
                    <a href="#" onclick="showManageClass()">
                        <span class="material-symbols-outlined"> person </span>Students</a>
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

        <div class="col-md-9" id="mainContent">
            <h1 style="text-align: center;">List of Teachers</h1>
            <button onclick="showNewTeacher()"
                style="margin-bottom: 20px; padding: 10px 20px; font-size: 16px; color: white; background-color: #007BFF; border: none; border-radius: 5px; cursor: pointer;">Add
                New Teacher</button>
            <table id="fTable" class="table table-striped smaller-table" style="width:100%">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Fullname</th>
                        <th scope="col">Age</th>
                        <th scope="col">Address</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Subjects</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    include 'conn.php'; // Include your database connection file
                    
                    $sql = "SELECT t.user_id, t.fname, t.mname, t.lname, t.ename, t.age, t.gender, t.address, 
                                GROUP_CONCAT(s.subject_name SEPARATOR ', ') AS subjects 
                            FROM teachers t
                            LEFT JOIN subjects s ON t.user_id = s.created_by
                            GROUP BY t.user_id";

                    $result = $conn->query($sql);

                    $data = array();
                    while ($row = $result->fetch_assoc()) {
                        echo '<tr>';
                        echo '<th scope="row">' . $row['user_id'] . '</th>';
                        echo '<td>' . $row['fname'] . ' ' . $row['mname'] . ' ' . $row['lname'] . ' ' . $row['ename'] . '</td>';
                        echo '<td>' . $row['age'] . '</td>';
                        echo '<td>' . $row['address'] . '</td>';
                        echo '<td>' . ucfirst($row['gender']) . '</td>';
                        echo '<td>' . ($row['subjects'] ? $row['subjects'] : 'No subjects') . '</td>';
                        echo '</tr>';
                    }
                    $conn->close();
                    ?>
                </tbody>
            </table>
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>
    <script src="https://cdn.datatables.net/2.0.8/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/2.0.8/js/dataTables.bootstrap5.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <script>
        $(document).ready(function () {
            $('#fTable').DataTable({
                "paging": true, // Enable Pagination
                "searching": true, // Enable Instant Search
                "ordering": true, // Enable Multi-column Ordering
                "responsive": true // Make it Mobile Friendly
            });
        });

        function confirmLogout() {
            return confirm("Are you sure you want to logout?");
        }

        function showNewTeacher() {
            var mainContent = document.getElementById('mainContent');
            mainContent.innerHTML = `  <?php include 'conn.php'; ?>
    <style>
        h3 {
            margin-top: 20px;
        }
        .smaller-table {
            font-size: 0.8em; /* Adjust as needed */
            width: 80%; /* Adjust as needed */
            margin: auto;
        }
        .smaller-table th, .smaller-table td {
            padding: 5px; /* Adjust as needed */
        }
    </style>
    <h3>Teacher Submitter Form</h3>
    <div class="registration-form">
        <form id="teacherForm">
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <label for="fname">First Name:</label>
                        <input type="text" class="form-control item" id="fname" name="fname" placeholder="Example: Juan" required>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label for="mname">Middle Name:</label>
                        <input type="text" class="form-control item" id="mname" name="mname" placeholder="Example: Dela" required>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label for="lname">Last Name:</label>
                        <input type="text" class="form-control item" id="lname" name="lname" placeholder="Example: Crunchy" required>
                    </div>
                </div>
            </div>
            
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <label for="ename">Extension Name:</label>
                        <input type="text" class="form-control item" id="ename" name="ename" placeholder="Example: Sr.">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label for="nickname">Display name:</label>
                        <input type="text" class="form-control item" id="nickname" name="nickname" placeholder="Example: Tutu" required>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label for="age">Age:</label>
                        <input type="number" class="form-control item" id="age" name="age" placeholder="Example: 12" required>
                    </div>
                </div>
            </div>
            
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <label for="gender">Gender:</label>
                        <select class="form-control item" id="gender" name="gender" required>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label for="birthdate">Birthdate:</label>
                        <input type="date" class="form-control item" id="birthdate" name="birthdate" placeholder="Example: 01/01/2001" required>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label for="address">Address:</label>
                        <input type="text" class="form-control item" id="address" name="address" placeholder="Example: Purok. Pinetree, Brgy. Oringao, Kabankalan City, Negros Occidental." required>
                    </div>
                </div>
            </div>
            
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <label for="username">Username:</label>
                        <input type="text" class="form-control item" id="username" name="username" placeholder="Example: @JuanFGSNHS" required>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label for="password">Password:</label>
                        <input type="password" class="form-control item" id="password" name="password" placeholder="" required>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label for="role">Role:</label>
                        <input type="text" class="form-control item" id="role" name="role" value="teacher" readonly>
                    </div>
                </div>
            </div>
            
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <label for="img">Profile Image URL:</label>
                        <input type="text" class="form-control item" id="img" name="img" placeholder="Example: juan.jpg" required>
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="form-group mt-4">
                        <button type="submit" class="btn btn-primary">Create Account</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
    `;

            // Get the form element
            var form = document.getElementById('teacherForm');

            // Attach a submit event handler to the form
            form.addEventListener('submit', function (event) {
                // Prevent the form from being submitted normally
                event.preventDefault();

                // Ask for confirmation before submitting
                Swal.fire({
                    title: 'Is the information correct?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, submit it!',
                    cancelButtonText: 'No, review it'
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Create a new FormData object from the form
                        var formData = new FormData(form);

                        // Use AJAX to submit the form data
                        var request = new XMLHttpRequest();
                        request.open('POST', 'tdbconn.php');
                        request.onreadystatechange = function () {
                            if (request.readyState === 4 && request.status === 200) {
                                // The request has completed successfully
                                var response = JSON.parse(request.responseText);
                                if (response.success) {
                                    Swal.fire({
                                        title: 'Success!',
                                        text: response.message,
                                        icon: 'success',
                                        confirmButtonText: 'OK'
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            showFaculty();
                                        }
                                    });
                                } else {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Error',
                                        text: response.message
                                    });
                                }

                                // Reset the form fields
                                form.reset();
                            }
                        };
                        request.send(formData);
                    }
                });
            });
        }
    </script>
</body>

</html>