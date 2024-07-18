function showManageClass() {
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
<h1 style="text-align: center;">List of Students</h1>
<button onclick="showAddUser()" style="margin-bottom: 20px; padding: 10px 20px; font-size: 16px; color: white; background-color: #007BFF; border: none; border-radius: 5px; cursor: pointer;">Add New Student</button>
<table id="studentTable" class="table table-striped smaller-table" style="width:100%">
<thead>
    <tr>
        <th scope="col">#</th>
        <th scope="col">Full Name</th>
        <th scope="col">Age</th>
        <th scope="col">Gender</th>
        <th scope="col">Birthdate</th>
        <th scope="col">Address</th>
        <th scope="col">Year Level</th>
        <th scope="col">Section</th>
        <th scope="col">Subjects</th>
        <th scope="col">Email</th>
        <th scope="col">LRN</th>
    </tr>
</thead>
<tbody>
</tbody>
</table>
`;

    // Fetch the student data from the server using AJAX
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'fetch_data.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send();

    xhr.onload = function () {
        if (this.status === 200) {
            // Parse the JSON data
            var students = JSON.parse(this.responseText);

            // Get the table body
            var tbody = document.querySelector('#studentTable tbody');

            // Insert the student data into the table
            for (var i = 0; i < students.length; i++) {
                var tr = document.createElement('tr');
                var fullname = students[i].fullname;
                tr.innerHTML = `
            <th scope="row">${i + 1}</th>
            <td>${fullname}</td>
            <td>${students[i].age}</td>
            <td>${students[i].gender}</td>
            <td>${students[i].birthdate}</td>
            <td>${students[i].address}</td>
            <td>${students[i].year_level}</td>
            <td>${students[i].section}</td>
            <td>${students[i].subjects || 'No subjects'}</td>
            <td>${students[i].email}</td>
            <td>${students[i].lrn}</td>
        `;
                tbody.appendChild(tr);
            }

            // Initialize DataTable
            $('#studentTable').DataTable();
        }
    };
}



function showAddUser() {
    var mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = ` <?php include 'conn.php'; ?>
<style>
h3 {
    margin-top: 20px;
}
.row {
    margin-bottom: 20px;
}
</style>
<h3>Student Submitter Form</h3> 
<div class="registration-form">
<form id="studentForm">
    <div class="row">
        <!-- form fields as defined earlier -->
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
        <div class="col-md-4">
            <div class="form-group">
                <label for="ename">Extension Name:</label>
                <input type="text" class="form-control item" id="ename" name="ename" placeholder="Example: Sr.">
            </div>
        </div>  
        <div class="col-md-4">  
            <div class="form-group">
                <label for="pname">Parent's name:</label>
                <input type="text" class="form-control item" id="pname" name="pname" placeholder="Example: Pname" required>
            </div>
        </div>    
        <div class="col-md-4">
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" class="form-control item" id="email" name="email" placeholder="Example: jpg@gmail.com" >
            </div>
        </div>    
        <div class="col-md-4">
            <div class="form-group">
                <label for="lrn">Lrn:</label>
                <input type="text" class="form-control item" id="lrn" name="lrn" placeholder="Example: LRN" required>
            </div>
        </div> 
        <div class="col-md-4">   
            <div class="form-group">
                <label for="nickname">Display Name:</label>
                <input type="text" class="form-control item" id="nickname" name="nickname" placeholder="Example: Tutu" required>
            </div>
        </div>    
        <div class="col-md-4">
            <div class="form-group">
                <label for="age">Age:</label>
                <input type="number" class="form-control item" id="age" name="age" placeholder="Example: 12" required>
            </div>
        </div>   
        <div class="col-md-4"> 
            <div class="form-group">
                <label for="gender">Gender:</label>
                <select class="form-control item" id="gender" name="gender" required>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
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
                <input type="text" class="form-control item" id="role" name="role" value="student" readonly>
            </div>
        </div>  
        <div class="col-md-4"> 
            <div class="form-group">
                <label for="img">Image:</label>
                <input type="text" class="form-control item" id="img" name="img" placeholder="Example: image.jpg">
            </div>
        </div>    
        <div class="col-md-4">
            <div class="form-group">
                <label for="section">Section:</label>
                <input type="text" class="form-control item" id="section" name="section" placeholder="Example: Sardonyx" required>
            </div>
        </div> 
        <div class="col-md-4">
            <div class="form-group">
                <label for="year_level">Year Level:</label>
                <select class="form-control item" id="year_level" name="year_level">
                    <option value="grade9">Grade 9</option>
                    <option value="grade10">Grade 10</option>
                </select>
            </div>
        </div>    
        <div class="col-md-8">
            <div class="form-group mt-4">
                <button type="submit" class="btn btn-primary">Create Class</button>
            </div>
        </div>
    </div>
</form>
</div>
`;

    // Get the form element
    var form = document.getElementById('studentForm');

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
                request.open('POST', 'submit.php');
                request.onreadystatechange = function () {
                    if (request.readyState === 4 && request.status === 200) {
                        // The request has completed successfully
                        if (this.responseText.includes('Error: A user with the same username already exists.')) {
                            Swal.fire(
                                'Error!',
                                'A user with the same username already exists.',
                                'error'
                            );
                        } else if (this.responseText.includes('Error: A user with the same full name already exists.')) {
                            Swal.fire(
                                'Error!',
                                'A user with the same full name already exists.',
                                'error'
                            );
                        } else {
                            Swal.fire({
                                title: 'Success!',
                                text: 'New record created successfully',
                                icon: 'success',
                                confirmButtonText: 'OK'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    showManageClass();
                                }
                            });

                            // Reset the form fields
                            form.reset();
                        }
                    }
                };
                request.send(formData);
            }
        });
    });
}