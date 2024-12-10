import React from 'react'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import { scaleLinear } from 'd3-scale'

// You'll need to download this file and place it in your public directory
const geoUrl = "/australia.json"

const seedData = [
  { name: "Red Grass", coordinates: [133.7751, -25.2744], value: 50 },
  { name: "Green Summer Grass", coordinates: [151.2093, -33.8688], value: 80 },
  { name: "Cotton Panic", coordinates: [138.6007, -34.9285], value: 60 },
  { name: "Warrego Summer Grass", coordinates: [145.7731, -16.9203], value: 70 },
]

const colorScale = scaleLinear<string>()
  .domain([0, 100])
  .range(["#ffedea", "#ff5233"])

const AustraliaHeatMap: React.FC = () => {
  return (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{
        scale: 600,
        center: [134, -28]
      }}
    >
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map(geo => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill="#EAEAEC"
              stroke="#D6D6DA"
            />
          ))
        }
      </Geographies>
      {seedData.map(({ name, coordinates, value }) => (
        <Marker key={name} coordinates={coordinates as [number, number]}>
          <circle r={10} fill={colorScale(value)} stroke="#fff" strokeWidth={2} />
          <title>{name}</title>
        </Marker>
      ))}
    </ComposableMap>
  )
}

export default AustraliaHeatMap

