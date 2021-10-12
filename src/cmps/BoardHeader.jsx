import React from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { ReactComponent as BoardIcon } from "../assets/img/board-icon.svg";
// import { ReactComponent as HomeIcon } from "../assets/img/home-icon.svg";
import { ReactComponent as ArrowDown } from "../assets/img/arrow-down.svg";
import { onLogout } from "../store/user.actions.js";

class _BoardHeader extends React.Component {
    onLogout = () => {
    this.props.onLogout();
  };
  render() {
    const user = this.props.user;
    if (!user) return <div></div>;
    return (
      <header className="board-header flex ">
        <div className="left-container flex">
        <div className="logo flex align-center">
          <NavLink to="/boardlist">
            <BoardIcon />
            <span>Thello</span>
          </NavLink>
        </div>
        <div className="flex">
          {/* <NavLink className="btn-header home-icon" to="/boardlist">
            <HomeIcon />
          </NavLink> */}
          <NavLink className="btn-board-header" to="/boardlist">
            {/* <BoardIcon /> */}
            <span>Boards</span>
            <ArrowDown />
          </NavLink>
        </div>
        </div>

        <nav>
          {
            <span className="user-info flex">
              <Link
                to={`user/${user._id}`}
                style={{ marginRight: 10 + "px", marginTop: 5 + "px" }}
              >
                {user.username}
              </Link>
              <button
                className="btn-header flex"
                to="/"
                onClick={this.onLogout}
              >
                <NavLink key="/" to="/">
                  Logout
                </NavLink>
              </button>
            </span>
          }
        </nav>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.userModule.users,
    user: state.userModule.user,
    isLoading: state.systemModule.isLoading,
  };
}
const mapDispatchToProps = {
  onLogout,
};

export const BoardHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(_BoardHeader);
