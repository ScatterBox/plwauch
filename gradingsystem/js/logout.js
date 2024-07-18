function confirmLogout() {
    var r = confirm("Are you sure you want to logout?");
    if (r == true) {
        // User confirmed they want to logout
        return true;
    } else {
        // User cancelled the logout operation
        return false;
    }
}