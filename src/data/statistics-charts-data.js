import { chartsConfig } from "../configs";

const websiteViewsChart = {
  type: "bar",
  height: 220,
  series: [
    {
      name: "Users",
      data: [50, 20, 10, 22, 50, 10, 40],
    },
  ],
  options: {
    ...chartsConfig,
    colors: "#86C232",
    plotOptions: {
      bar: {
        columnWidth: "16%",
        borderRadius: 5,
      },
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: ["M", "T", "W", "T", "F", "S", "S"],
    },
  },
};

const dailySalesChart = {
  type: "line",
  height: 220,
  series: [
    {
      name: "Audio",
      data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
    },
  ],
  options: {
    ...chartsConfig,
    colors: ["#86C232"],
    stroke: {
      lineCap: "round",
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: [
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  },
};

const completedTasksChart = {
  ...dailySalesChart,
  series: [
    {
      name: "Recordings",
      data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
    },
  ],
};

export const statisticsChartsData = [
  {
    color: "blue",
    title: "Active Users",
    description: "Tracks active users in a day",
    footer: "updated a week  ago",
    chart: websiteViewsChart,
  },
  {
    color: "pink",
    title: "Broadcasted Audio",
    description: "15% increase in broadcasted audio today",
    footer: "updated 4 min ago",
    chart: dailySalesChart,
  },
  {
    color: "green",
    title: "Completed Recordings",
    description: "Total recordings per month",
    footer: "just updated",
    chart: completedTasksChart,
  },
];

export default statisticsChartsData;
