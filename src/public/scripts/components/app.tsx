import * as React from "react";
import {
    BrowserRouter as Router,
    Route,
    Link
} from "react-router-dom";
import { HomePage } from "./pages/home-page";
import { ConfigurePage } from "./pages/configure-page";
import { AddTeamPage } from "./pages/add-team-page";

export class App extends React.Component<{}, {}> {
    public render() {
        return (
            <Router>
                <div>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/configure">Configure</Link></li>
                        {/*<li><Link to="/topics">Topics</Link></li>*/}
                    </ul>

                    <hr />

                    <Route exact path="/" component={HomePage} />
                    <Route path="/configure" component={ConfigurePage} />
                    <Route path="/addteam" component={AddTeamPage} />
                    {/*<Route path="/topics" component={Topics} />*/}
                </div>
            </Router>
        );
    }
}

