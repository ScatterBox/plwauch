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
