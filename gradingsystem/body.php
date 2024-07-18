<div class="container-fluid">
        <aside class="sidebar">
            <div class="sidebar-header">
                <img src="images/logo.jpg" alt="logo" />
                <div class="header-text">
                    <h2>Admin</h2>
                    <h2>Dashboard</h2>
                </div>
            </div>
            <ul class="sidebar-links">
                <li>
                    <a href="#" onclick="showFaculty()">
                        <span class="material-symbols-outlined"> person </span>Teachers</a>
                </li>
                <li>
                    <a href="#" onclick="showAdmin()">
                        <span class="material-symbols-outlined"> person </span>Admin</a>
                </li>
                <li>
                    <a href="#" onclick="showManageClass()">
                        <span class="material-symbols-outlined">
                            Person
                        </span>
                        Students</a>
                </li>

                <h4>
                    <span>Account</span>
                    <div class="menu-separator"></div>
                </h4>
                <li>
                    <a href="logout.php" onclick="return confirmLogout()"><span class="material-symbols-outlined">
                            logout </span>Logout</a>
                </li>
            </ul>
            <div class="user-account">
                <div class="user-profile">
                    <img src="<?php echo './images/' . $_SESSION['user']['img']; ?>" alt="Profile Image" />
                    <div class="user-detail">
                        <h3><?php echo $_SESSION['user']['nickname']; ?></h3>
                        <span><?php echo ucfirst($_SESSION['user']['role']); ?></span>
                    </div>
                </div>
            </div>

        </aside>

        <!-- Main content -->
        <div class="col-md-9" id="mainContent">

        </div>
    </div>