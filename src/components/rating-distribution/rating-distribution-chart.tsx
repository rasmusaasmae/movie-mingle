"use client";

import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  value: {
    label: "Rating",
  },
  userCount: {
    label: "You",
    color: "hsl(var(--chart-2))",
  },
  userPercentage: {
    label: "You",
    color: "hsl(var(--chart-2))",
  },
  totalCount: {
    label: "Total",
    color: "hsl(var(--chart-1))",
  },
  totalPercentage: {
    label: "Total",
    color: "hsl(var(--chart-1))",
  },
  otherCount: {
    label: "Others",
    color: "hsl(var(--chart-3))",
  },
  otherPercentage: {
    label: "Others",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

type RatingDistributionChartProps = {
  data: {
    value: number;
    userCount: number;
    userPercentage: number;
    totalCount: number;
    totalPercentage: number;
    otherCount: number;
    otherPercentage: number;
  }[];
};

export default function RatingDistributionChart(
  props: RatingDistributionChartProps,
) {
  const [usePercentage, setUsePercentage] = useState(true);
  const userDataKey = usePercentage ? "userPercentage" : "userCount";
  const totalDataKey = usePercentage ? "totalPercentage" : "totalCount";
  const otherDataKey = usePercentage ? "otherPercentage" : "otherCount";

  return (
    <ChartContainer config={chartConfig}>
      <LineChart
        accessibilityLayer
        data={props.data}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="value"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          interval={1}
        />
        <YAxis tickFormatter={(tick) => `${tick}%`} />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              hideLabel
              formatter={(value, name) => (
                <div className="text-muted-foreground flex min-w-[100px] items-center text-xs">
                  <div
                    className="mr-1 h-2.5 w-2.5 shrink-0 rounded-[2px] bg-[--color-bg]"
                    style={
                      {
                        "--color-bg": `var(--color-${name})`,
                      } as React.CSSProperties
                    }
                  />
                  {chartConfig[name as keyof typeof chartConfig]?.label || name}
                  <div className="text-foreground ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums">
                    {Number(value).toFixed(1)}
                    <span className="text-muted-foreground font-normal">%</span>
                  </div>
                </div>
              )}
            />
          }
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Line
          dataKey={userDataKey}
          type="monotone"
          stroke={`var(--color-${userDataKey})`}
          strokeWidth={3}
          dot={false}
        />
        <Line
          dataKey={otherDataKey}
          type="monotone"
          stroke={`var(--color-${otherDataKey})`}
          strokeWidth={3}
          dot={false}
        />
        {/* <Line
          dataKey={totalDataKey}
          type="monotone"
          stroke={`var(--color-${totalDataKey})`}
          strokeWidth={3}
          dot={false}
        /> */}
      </LineChart>
    </ChartContainer>
  );
}
