import React from 'react'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'

import Navbar from './Navbar'
import Footer from './Footer'
import { Box } from 'rebass'

const Layout = ({ children, title }) => (
  <>
    <Helmet>
      <title>{title}</title>
    </Helmet>
    <Navbar />
    <Box
      sx={{
        maxWidth: 800,
        mx: 'auto',
        px: 2,
        pt: 5,
        pb: 5,
      }}
    >
      {children}
    </Box>
    <Footer />
  </>
)

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
}

export default Layout
