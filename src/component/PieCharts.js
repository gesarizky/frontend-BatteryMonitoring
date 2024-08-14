import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const PieCharts = () => {
  const chartRef = useRef(null);
  let chartInstance = null;

  useEffect(() => {
    const resizeChart = () => {
      if (chartInstance) {
        chartInstance.resize();
      }
    };

    // Initialize ECharts instance
    chartInstance = echarts.init(chartRef.current);

    const options = {
      title: {
        text: "Referer of a Website",
        subtext: "Fake Data",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: "70%",
          data: [
            { value: 1048, name: "Search Engine" },
            { value: 735, name: "Direct" },
            { value: 580, name: "Email" },
            { value: 484, name: "Union Ads" },
            { value: 300, name: "Video Ads" },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };

    // Set options
    chartInstance.setOption(options);

    // Resize chart on window resize
    window.addEventListener("resize", resizeChart);

    // Clean up
    return () => {
      window.removeEventListener("resize", resizeChart);
      chartInstance.dispose();
    };
  }, []);

  return <div ref={chartRef} style={{ width: "100%", height: "100%" }} />;
};

export default PieCharts;
