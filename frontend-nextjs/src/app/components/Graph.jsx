"use client"

import { AreaChart, Area, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart"

export default function Graph({ title, description, data, xKey, yKeys, footer }) {
  return (
    <Card className="w-[480px] h-[325px] text-white bg-zinc-800 bg-opacity-50 border-none">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={yKeys}>
          <AreaChart
            data={data}
            margin={{
              left: -20,
              right: 12,
              top: 20, // Adjust the top margin to make space for labels
              bottom: 40, // Adjust the bottom margin for x-axis label spacing
            }}
            height={250} // Adjust height of the graph (reduce the vertical space for the graph)
          >
            <CartesianGrid vertical={false} />
            
            {/* X-Axis with Label */}
            <XAxis
              dataKey={xKey}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
  if (typeof value === 'string') {
    // If it's already a string, slice the first 3 characters (e.g., the year)
    return value.slice(0, 3);
  } else if (value instanceof Date) {
    // If it's a Date object, format it as needed
    return value.toISOString().slice(0, 10); // Format to "YYYY-MM-DD"
  }
  return value; // Default case, return the value as is if it's not a string or Date
}}

              label={{ value: "Time", position: "bottom", offset: 10 }} // Add x-axis label
            />
            
            {/* Y-Axis with Label */}
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={3}
              label={{ value: "Valve Open %", angle: -90, position: "left", offset: 0 }} // Add y-axis label
            />
            
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            
            {/* Render Areas dynamically based on yKeys */}
            {Object.keys(yKeys).map((key) => (
              <Area
                key={key}
                dataKey={key}
                type="natural"
                fill={yKeys[key].color}
                fillOpacity={0.4}
                stroke={yKeys[key].color}
                stackId="a"
                className="bg-white"
              />
            ))}
          </AreaChart>
        </ChartContainer>
      </CardContent>
      {/* Footer can be optionally added */}
      {/* {footer && (
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">{footer}</div>
        </CardFooter>
      )} */}
    </Card>
  )
}
