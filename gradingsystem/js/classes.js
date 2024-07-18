function showNewClass() {
    var mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = newClassFormHtml + `
    <div class="col-md-8">
        <div class="form-group mt-4">
            <button id="backBtn" class="btn btn-secondary">Back</button>
        </div>
    </div>
`;

    var form = document.getElementById('adminForm');
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        var formData = new FormData(this);

        fetch('teachphp/subjectform.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    Swal.fire({
                        title: 'Success!',
                        text: data.message,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            showManageClass();
                        }
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: data.message
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'An error occurred while processing your request.'
                });
            });
    });

    document.getElementById('backBtn').addEventListener('click', showManageClass);
}

function showClasses() {
var mainContent = document.getElementById('mainContent');
mainContent.innerHTML = `
<style>
    h1 { margin-top: 20px; }
    .smaller-table { font-size: 0.8em; width: 80%; margin: auto; }
    .smaller-table th, .smaller-table td { padding: 5px; }
    .add-class-btn { margin: 20px auto; display: flex; justify-content: center; }
</style>
<h1 style="text-align: center;">List of Classes</h1>
<div class="add-class-btn">
    <button id="addClassBtn" class="btn btn-primary">Add Class</button>
</div>
<table id="classTable" class="table table-striped smaller-table" style="width:100%">
    <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Subject Name</th>
            <th scope="col">Year Level</th>
            <th scope="col">Section</th>
            <th scope="col">Created By</th>
            <th scope="col">Actions</th>
        </tr>
    </thead>
    <tbody></tbody>
</table>
`;

var xhr = new XMLHttpRequest();
xhr.open('POST', 'teachphp/fetch_classes.php', true);
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xhr.send('created_by=' + <?php echo $_SESSION['user']['user_id']; ?>);

xhr.onload = function () {
if (this.status == 200) {
    var classes = JSON.parse(this.responseText);
    var tbody = document.querySelector('#classTable tbody');

    for (var i = 0; i < classes.length; i++) {
        var tr = document.createElement('tr');
        tr.innerHTML = `
            <th scope="row">${i + 1}</th>
            <td>${classes[i].subject_name}</td>
            <td>${classes[i].year_level}</td>
            <td>${classes[i].section}</td>
            <td>${classes[i].created_by_fullname}</td>
            <td>
                <button class="btn btn-info view-btn" data-year_level="${classes[i].year_level}" data-section="${classes[i].section}" data-subject="${classes[i].subject_name}">View</button>
                <button class="btn btn-danger delete-btn" data-id="${classes[i].subject_id}">Delete</button>
                <button class="btn btn-success set-grading-btn" data-id="${classes[i].subject_id}">Set Grading</button>
            </td>
        `;
        tbody.appendChild(tr);
    }

    $('#classTable').DataTable();

    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function () {
            var subjectId = this.getAttribute('data-id');
            if (confirm('Are you sure you want to delete this class?')) {
                deleteClass(subjectId);
            }
        });
    });

    document.querySelectorAll('.set-grading-btn').forEach(button => {
        button.addEventListener('click', function () {
            var subjectId = this.getAttribute('data-id');
            window.location.href = 'setgrade.php?subject_id=' + subjectId;
        });
    });

    document.querySelectorAll('.view-btn').forEach(button => {
        button.addEventListener('click', function () {
            var yearLevel = this.getAttribute('data-year_level');
            var section = this.getAttribute('data-section');
            var subject = this.getAttribute('data-subject');
            viewStudents(yearLevel, section, subject);
        });
    });
}
};

document.getElementById('addClassBtn').addEventListener('click', showNewClass);
}



//Delete button
function deleteClass(subjectId) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'teachphp/delete_class.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('subject_id=' + subjectId);

    xhr.onload = function () {
        if (this.status == 200) {
            var response = JSON.parse(this.responseText);
            if (response.success) {
                alert('Class deleted successfully.');
                showClasses();
            } else {
                alert('Failed to delete class.');
            }
        }
    };
}

// LIST OF STUDENTS AND THEIR SUBJECTS
function viewStudents(yearLevel, section, subject) {
    var mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
<style>
    h1 { margin-top: 20px; }
    .smaller-table { font-size: 0.8em; width: 80%; margin: auto; }
    .smaller-table th, .smaller-table td { padding: 8px; }
    .btn-back { margin-top: 20px; }
</style>
<h1 style="text-align: center;">Students in ${yearLevel} - ${section}</h1>
<button id="backBtn" class="btn btn-secondary btn-back">Back</button>
<table id="studentTable" class="table table-striped smaller-table">
    <thead>
        <tr>
            <th>#</th>
            <th>Full Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Birthdate</th>
            <th>Address</th>
            <th>Year Level</th>
            <th>Section</th>
            <th>Subject</th>
            <th>Email</th>
            <th>LRN</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody></tbody>
</table>
`;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'teachphp/fetch_dteach.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            var students = JSON.parse(xhr.responseText);
            var tbody = document.querySelector('#studentTable tbody');

            students.forEach(function (student, index) {
                var tr = document.createElement('tr');
                var fullname = `${student.fname} ${student.mname} ${student.lname}`;
                tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${fullname}</td>
            <td>${student.age}</td>
            <td>${student.gender}</td>
            <td>${student.birthdate}</td>
            <td>${student.address}</td>
            <td>${student.year_level}</td>
            <td>${student.section}</td>
            <td>${student.subjects || 'No subjects'}</td>
            <td>${student.email}</td>
            <td>${student.lrn}</td>
            <td><button class="btn btn-primary btn-grade" data-student-id="${student.user_id}">Grade</button></td>
        `;
                tbody.appendChild(tr);
            });

            $('#studentTable').DataTable({
                "paging": true, // Enable paging
                "lengthChange": false, // Disable page length change
                "searching": true, // Enable search box
                "ordering": true, // Enable column ordering
                "info": true, // Enable table information
                "autoWidth": false, // Disable auto-width
                "responsive": true // Enable responsiveness
            });
        } else {
            console.error('Failed to fetch student data');
        }
    };

    xhr.send(`year_level=${yearLevel}&section=${section}&subject=${subject}`);

    // Event listener for back button
    document.getElementById('backBtn').addEventListener('click', showClasses);
}




//section selection
function fetchSections(yearLevel) {
    $.ajax({
        url: 'teachphp/fetch_sections.php',
        type: 'post',
        data: { year_level: yearLevel },
        success: function (response) {
            $('#section').html(response);
        }
    });
}

//year level selector
function fetchYearLevels(section) {
    $.ajax({
        url: 'teachphp/fetch_year_level.php',
        type: 'post',
        data: { section: section },
        success: function (response) {
            $('#year_level').html(response);
        }
    });
}