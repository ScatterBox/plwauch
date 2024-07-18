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
