"use client"
import React, { useState, useEffect } from "react";
import Graph from "./Graph";
import RiskMeter from "./RiskMeter";
// import { useRouter } from "next/navigation";

const Dashboard = ({ home }) => {
    // const router = useRouter();
  const [data, setData] = useState([]);
  const riskPercentage = 90;

  // Load JSON data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/json/normalized_Bold_744H-10_31-11_07.json");
        const jsonData = await response.json();

        // Format data as needed for graphs
        const formattedData = jsonData.map((item) => ({
          time: item["Time"],
          instantaneous: parseFloat(item["Inj Gas Meter Volume Instantaneous"]),
          setpoint: parseFloat(item["Inj Gas Meter Volume Setpoint"]),
          valveOpen: parseFloat(item["Inj Gas Valve Percent Open"]),
        }));

        setData(formattedData);
      } catch (error) {
        console.error("Error fetching JSON data:", error);
      }
    };

    fetchData();
  }, []);

  // Graph Y-axis configurations
  const yKeysConfigs = [
    {
      key: "instantaneous",
      label: "Variable 1",
      color: "hsl(var(--chart-1))", // Graph 1 color
    },
    {
      key: "setpoint",
      label: "Variable 2",
      color: "hsl(var(--chart-2))", // Graph 2 color
    }
  ];

  return (
    <div className="flex flex-col w-full h-auto p-3">
      <div className="flex md:flex-row flex-col w-full justify-center min-h-screen bg-transparent gap-5">
        <div className="flex w-[70%] gap-3 flex-row  h-[300px] flex-wrap ">
              {yKeysConfigs.map(({ key, label, color }, index) => (
              <Graph
                key={index}
                title={`${label} Over Time`}
                description={`Showing ${label.toLowerCase()} over a period`}
                data={data}
                xKey="time"
                yKeys={{
                  [key]: { label, color: "#3b82f6" },
                }}
                footer={
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2 font-medium leading-none">
                      Trending data insights
                    </div>
                    <div className="flex items-center gap-2 leading-none text-muted-foreground">
                      January - June 2024
                    </div>
                  </div>
                }
              />
            ))}
        </div>
        {/* <RiskMeter percentage={riskPercentage} /> */}
      </div>
    </div>
  );
};


export default Dashboard


