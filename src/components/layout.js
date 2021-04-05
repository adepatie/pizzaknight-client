/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import "@fontsource/league-script"
import "@fontsource/roboto-slab"
// Grommet
import { Grommet } from 'grommet'

const theme = {
  global: {
    font: {
      family: 'Roboto Slab',
      size: '14px',
      height: '20px',
    },
    input: {
      extend: (props) => {
        if (props.isNumber) {
          return {
            maxWidth: '50px'
          }
        }
      }
    }
  },
};

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <Grommet theme={theme}>
      {children}
    </Grommet>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
