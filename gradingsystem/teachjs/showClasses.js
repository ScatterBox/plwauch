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
    xhr.send('created_by=' + loggedInUserId);

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
