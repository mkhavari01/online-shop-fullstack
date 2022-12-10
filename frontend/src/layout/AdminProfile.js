import "../assets/css/header.css";

const AdminProfile = (props) => {
  return (
    <>
      <header>
        <label for="check">
          <i class="fas fa-bars" id="sidebar_btn"></i>
        </label>
        <div class="left_area">
          <h3>
            Coding <span>Snow</span>
          </h3>
        </div>
        <div class="right_area">
          <a href="#" class="logout_btn">
            Logout
          </a>
        </div>
      </header>

      <div class="sidebar">
        <center>
          <img
            src="https://i0.wp.com/www.inovafarma.com.br/blog/wp-content/uploads/gravatar/fotoperfil2019.jpg?w=250&ssl=1"
            class="profile_image"
            alt=""
          />
          <h4>Ciclano</h4>
        </center>
        <a href="#">
          <i class="fas fa-desktop"></i>
          <span>Dashboard</span>
        </a>
        <a href="#">
          <i class="fas fa-cogs"></i>
          <span>Components</span>
        </a>
        <a href="#">
          <i class="fas fa-table"></i>
          <span>Tables</span>
        </a>
        <a href="#">
          <i class="fas fa-th"></i>
          <span>Forms</span>
        </a>
        <a href="#">
          <i class="fas fa-info-circle"></i>
          <span>About</span>
        </a>
        <a href="#">
          <i class="fas fa-sliders-h"></i>
          <span>Settings</span>
        </a>
      </div>

      <div class="content">{props.children}</div>
    </>
  );
};

export { AdminProfile };
