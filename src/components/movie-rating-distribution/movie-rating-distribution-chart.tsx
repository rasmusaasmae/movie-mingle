"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  value: {
    label: "Rating",
  },
  count: {
    label: "Count",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

type MovieRatingDistributionChartProps = {
  data: {
    value: number;
    count: number;
  }[];
};

export default function MovieRatingDistributionChart(
  props: MovieRatingDistributionChartProps,
) {
  return (
    <ChartContainer config={chartConfig}>
      <BarChart accessibilityLayer data={props.data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="value"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey="count" fill="var(--color-count)" radius={8} />
      </BarChart>
    </ChartContainer>
  );
}
