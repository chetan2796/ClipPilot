import Link from "next/link";

const Header = () => {
  return (
    <header className="header">
      <nav
        className="navbar navbar-expand-lg navbar-light bg-white shadow-sm"
        style={{ position: "fixed", top: "0", width: "100%", zIndex: "1030" }}
      >
        <div className="container">
          <Link
            href="/root_path"
            className="btn btn-outline-primary btn-sm me-2 navbar-bra nd fw-bold text-black"
          >
            i-kart
          </Link>

          <div className="d-flex align-items-center ms-auto">
            <div className="dropdown profile-dropdown">
              <button
                className="btn btn-light dropdown-toggle rounded-circle d-flex profile-btn"
                type="button"
                id="userDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              ></button>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="userDropdown"
              >
                <Link
                  href="/profile_path"
                  className="btn btn-outline-primary btn-sm me-2 dropdown-item text-black"
                >
                  Profile
                </Link>
                <li>
                  <Link
                    href="/users_sign_out_path"
                    className="btn btn-outline-primary btn-sm me-2 dropdown-item text-black"
                  >
                    Sign Out
                  </Link>
                </li>
              </ul>
            </div>
            <Link
              href="/users_sign_out_path"
              className="btn btn-outline-primary btn-sm me-2 text-black"
            >
              Sign in
            </Link>
            <Link
              href="/users_sign_out_path"
              className="btn btn-primary btn-sm text-black"
            >
              Sign up
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
