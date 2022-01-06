import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import News from './News'
import Strategy from './Strategy'
import Calendar from './Calendar'
import Announcement from './Announcement'

const Resources = () => (
    <Router basename={'/Resources'}>
        <Switch>
            <Route exact path="/Announcement" component={Announcement} />
            <Route exact path="/News" component={News} />
            <Route exact path="/News/:id" component={News} />
            <Route exact path="/Calendar" component={Calendar} />
            <Route exact path="/Strategy" component={Strategy} />
            <Route exact path="/Strategy/:id" component={Strategy} />
        </Switch>
    </Router>
)

export default Resources
