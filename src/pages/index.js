import * as React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PizzaCalculator from "../components/PizzaCalculator"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <PizzaCalculator />
  </Layout>
)

export default IndexPage
