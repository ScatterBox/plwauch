<?php
session_start();
if ($_SESSION['role'] !== 'admin') {
    header("Location: login.php");
    exit();
}
?>

<?php include 'styles/hui.php' ?>

<body>

<?php include 'body.php'; ?>

    
<script src="js/addoptions.js"></script>
<script src="js/adminlist.js"></script>
<script src="js/flogout.js"></script>
<script src="js/logout.js"></script>
<script src="js/stdentlist.js"></script>
<script src="js/teachers.js"></script>


</body>

</html>