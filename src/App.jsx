import React from "react";
import { Switch, Route,withRouter } from "react-router";
import routes from "./routes";
import { AppHeader } from './cmps/AppHeader';
import { connect } from 'react-redux';
import { userService } from "./services/user.service";

class _App extends React.Component {

   componentDidMount() {
    try {
      const {loggedInUser} = this.props
    }catch (err) {
      console.log(err);
    }
  }

  async componentWillUnmount() {
    const {loggedInUser} = this.props
    if (loggedInUser) {
      await userService.update(loggedInUser)
    }
  }

 
  get style() {
    const {board,location} = this.props
    if (!location.pathname.includes('/board')) return {}
      const style = board ? {
        background: `${board.style.background} center center / cover`,
      }: {background: "#0079bf"} 
      return style
  }

  get isHeaderAppears(){
    const {pathname} = this.props.location
    return (pathname.includes('/board') || pathname.includes('workspace'))
  }
 
  
  render(){
    const {loggedInUser, board,location} = this.props
    return (
      <section style={this.style}>
        {this.isHeaderAppears && <header>
          <AppHeader board={board} loggedInUser={loggedInUser} isBoardStyle={location.pathname.includes('/board')}/>
          </header>}

          <main>
            <Switch>
              {routes.map(route=><Route key={route.path} component={route.component} path={route.path}/>)}
            </Switch>
          </main>
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    board: state.boardModule.board,
    loggedInUser: state.appModule.loggedInUser,
  }
}

const mapDispatchToProps = {
}

const _AppWithRouter = withRouter(_App)
export const App = connect(mapStateToProps, mapDispatchToProps)(_AppWithRouter)