//Teacher
function showFaculty() {
    var mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
<style>
h1 {
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
<h1 style="text-align: center;">List of Teachers</h1>
<button onclick="showNewTeacher()" style="margin-bottom: 20px; padding: 10px 20px; font-size: 16px; color: white; background-color: #007BFF; border: none; border-radius: 5px; cursor: pointer;">Add New Teacher</button>
<table id="facultyTable" class="table table-striped smaller-table" style="width:100%">
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
</tbody>
</table>
`;

    // Fetch the faculty data from the server using AJAX
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'fetch_teachers.php', true);
    xhr.onload = function () {
        if (this.status == 200) {
            // Parse the JSON data
            var teachers = JSON.parse(this.responseText);

            // Get the table body
            var tbody = document.querySelector('#facultyTable tbody');

            // Insert the teacher data into the table
            for (var i = 0; i < teachers.length; i++) {
                var tr = document.createElement('tr');
                var fullname = `${teachers[i].fname} ${teachers[i].mname} ${teachers[i].lname} ${teachers[i].ename}`;
                tr.innerHTML = `
            <th scope="row">${i + 1}</th>
            <td>${fullname}</td>
            <td>${teachers[i].age}</td>
            <td>${teachers[i].address}</td>
            <td>${teachers[i].gender}</td>
            <td>${teachers[i].subjects || 'No subjects'}</td>
        `;
                tbody.appendChild(tr);
            }

            // Initialize DataTable
            $('#facultyTable').DataTable();
        }
    };
    xhr.send();
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