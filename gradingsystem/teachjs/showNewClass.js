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
                            showClasses();
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

    document.getElementById('backBtn').addEventListener('click', showClasses);
}
