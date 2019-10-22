import React from 'react'
import { ThemeProvider } from 'theme-ui'

import Home from './pages/Home/index'
import theme from './services/theme'

const App = () => (
  <ThemeProvider theme={theme}>
    <Home />
  </ThemeProvider>
)

export default App
