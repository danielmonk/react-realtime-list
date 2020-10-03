import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { render } from 'react-dom'

const newList = async (history) => {
  const list = await createList(uuidv4())
  history.push(`/?uuid=${list.uuid}`)
}

const Home = (props) => {
  const history = useHistory()
  const uuid = queryString.parse(props.location.search).uuid

  if (uuid) return TodoList(uuid)
  else {
    return (
      <div className="container">
        <div className="section">
          <h1>Collaborative Task Lists</h1>
          <small>
            Powered by <a href="https://danielmonk.io">danielmonk</a>
          </small>
        </div>
        <div className="section">
          <button
            onClick={() => {
              newList(history)
            }}
          >
            new task list
          </button>
        </div>
        <div className="section build">
          <h3>
            React Realtime List
          </h3>
        </div>
      </div>
    )
  }
}

render(
  <div className="App">
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        {/* Additional Routes go here */}
      </Switch>
    </Router>
  </div>,
  document.body
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

