import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import News from './News'
import Strategy from './Strategy'


const Resources = () => (
    <Router basename={'/Resources'}>
        <Switch>
            <Route exact path="/News" component={News} />
            <Route exact path="/Strategy" component={Strategy} />
        </Switch>
    </Router>
)

export default Resources
