function NavBar() {
  return (
    <nav
      className="navbar is-primary-bg"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand ">
        <a className="navbar-item">
          <img
            className="logo"
            src={require("./../assets/logo.jpg")}
            width="35"
            height="50"
          ></img>
        </a>
      </div>
      <div id="navbar-id" className="navbar-menu">
        <div className="navbar-start">
          <a className="navbar-item has-text-white">Home</a>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <a className="button is-dark">
                <strong>Sign up</strong>
              </a>
              <a className="button is-light">Log in</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
