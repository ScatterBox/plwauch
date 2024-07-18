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

            students.forEach(function(student, index) {
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
                "paging": true,
                "lengthChange": false,
                "searching": true,
                "ordering": true,
                "info": true,
                "autoWidth": false,
                "responsive": true
            });
        } else {
            console.error('Failed to fetch student data');
        }
    };

    xhr.send(`year_level=${yearLevel}&section=${section}&subject=${subject}`);

    document.getElementById('backBtn').addEventListener('click', showClasses);
}
