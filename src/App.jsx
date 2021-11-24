import React from "react";
import { Switch, Route } from "react-router";
import routes from "./routes";
import { connect } from 'react-redux';
import { userService } from "./services/user.service";

export class RootCmp extends React.Component {
  state = {
    user: userService.getLoggedinUser()
  }
  componentDidMount = () => {
    console.log("loggedInUser", userService.getLoggedinUser(), this.state.user);
  }



  render() {

   

    return (
      <div>
     
          <Switch>
            {routes.map((route) => (
              <Route
                key={route.path}
                exact
                component={route.component}
                path={route.path}
              />
            ))}
          </Switch>
       
        {/* <AppFooter /> */}
      </div>
    );
  }
}
