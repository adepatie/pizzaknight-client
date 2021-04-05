import React, { useState, useEffect, useMemo } from "react"
import { Box, DataTable, Select, TextInput } from "grommet"

const pizzaTypes = [
  {
    name: "New Haven",
    defaultSize: 330,
    ingredients: [
      {
        name: "Flour",
        bakersPercentage: 100,
      },
      {
        name: "Water",
        bakersPercentage: 64,
      },
      {
        name: "Salt",
        bakersPercentage: 2.5,
      },
      {
        name: "Yeast",
        bakersPercentage: 1,
      },
    ],
  },
]

function usePizzaRecipe(pizzaType, pizzaSize, pizzaCount) {
  const { ingredients, defaultSize } = useMemo(
    () => pizzaTypes.filter(({ name }) => name === pizzaType)[0],
    [pizzaType],
    {}
  )

  const size = useMemo(() => pizzaSize || defaultSize, [pizzaSize], 0)
  const totalSize = useMemo(() => size * pizzaCount, [size, pizzaCount], 0)

  const bakersPercentageTotal = useMemo(
    () => ingredients.reduce((acc, value) => acc + value.bakersPercentage, 0),
    [ingredients],
    0
  )

  const flourAmount = useMemo(() => totalSize / (bakersPercentageTotal / 100), [
    totalSize,
    bakersPercentageTotal,
  ])

  const pizzaRecipe = useMemo(
    () => ({
      pizzaType,
      ingredients: ingredients.map(ingredient => ({
        quantity: flourAmount * (ingredient.bakersPercentage / 100),
        ...ingredient,
      })),
      pizzaSize,
      pizzaCount,
    }),
    [ingredients, flourAmount, pizzaSize, pizzaType, pizzaCount],
    {}
  )

  return pizzaRecipe
}

function PizzaCalculator() {
  const [pizzaCount, setPizzaCount] = useState(0)
  const [pizzaSize, setPizzaSize] = useState(0)
  const [pizzaType, setPizzaType] = useState("New Haven")

  const pizzaRecipe = usePizzaRecipe(pizzaType, pizzaSize, pizzaCount)

  useEffect(() => {
    setPizzaSize(pizzaRecipe.pizzaSize)
  }, [pizzaRecipe])

  return (
    <Box direction="column">
      <Box direction="row" pad="small">
        <Box direction="column" pad="small">
          Pizza <br /> Knight
        </Box>
        <Box direction="row" pad="small" justify="start">
          <TextInput
            isNumber={true}
            value={pizzaCount}
            onChange={event => setPizzaCount(event.target.value)}
            size="large"
          />
          <Select
            options={["New Haven", "New York", "Detroit"]}
            value={pizzaType}
            onChange={({ option }) => setPizzaType(option)}
          />
          <span> at </span>
          <TextInput
            isNumber={true}
            value={pizzaSize}
            onChange={event => setPizzaSize(event.target.value)}
            size="large"
          />
        </Box>
      </Box>
      <Box pad="medium">
        <DataTable
          columns={[
            {
              property: "name",
              header: "",
              primary: "true",
            },
            {
              property: "bakersPercentage",
              header: "B%",
              primary: "true",
              render: datum => datum.bakersPercentage.toFixed(1) + "%",
            },
            {
              property: "quantity",
              header: "quantity",
              primary: "true",
              render: datum => datum.quantity.toFixed(2) + "g",
            },
          ]}
          data={pizzaRecipe.ingredients}
        />
      </Box>
    </Box>
  )
}

export default PizzaCalculator
