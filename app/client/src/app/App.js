/**
 * @flow
 */

import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { injectGlobal } from 'styled-components'
import { hot } from 'react-hot-loader'
import { ScrollToTop } from '../common/components'
import NewHome from './pages/NewHome'
import { Home, Generator, About } from './pages'
import { colors } from '../common/theme'

injectGlobal`
  html, body, #app {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 0.95em;
    background: ${colors.background};
    color: ${colors.foreground};
  }

  ::selection {
    background: ${colors.primary};
    color: white;
  }

  ::-moz-selection {
    background: ${colors.primary};
    color: white;
  }

  .grabbing {
    cursor: move; /* fallback */
    cursor: grabbing;
  }
`

function App() {
  return (
    <ScrollToTop>
      <Switch>
        <Route exact path="/" component={NewHome} />
        <Route path="/home" component={Home} />
        <Route path="/generator" component={Generator} />
        <Route path="/about" component={About} />
        <Route path="*" render={() => <h1>ono 404</h1>} />
      </Switch>
    </ScrollToTop>
  )
}

export default hot(module)(App)
