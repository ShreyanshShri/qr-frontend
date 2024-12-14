import React from 'react'

import { ResponsiveContainer, 
        Bar, 
        BarChart, 
        XAxis, 
        YAxis, 
        Tooltip, 
        Legend, 
        CartesianGrid, 
        PieChart, 
        Pie,
        PolarRadiusAxis
       } from 'recharts';

const Statistics = ({classAnalyticsData, rygStudentData}) => {
  return (
    <div>
        <h1>Statistics</h1>
    <div className="statistics" style={{
        paddingTop: "30px",
        paddingBottom: "30px",
        borderRadius: "20px",
        backgroundColor: "white",
        height: "360px"
    }}>
    <ResponsiveContainer width="100%" height="100%">
        <BarChart data={classAnalyticsData}>
            <CartesianGrid strokeDasharray="1 1" />
            <XAxis dataKey="date" />
            <YAxis dataKey="attendance" />
            <Tooltip />
            <Legend />
            <Bar dataKey="attendance" fill="#8884d8" />
        </BarChart>
    </ResponsiveContainer>

    <ResponsiveContainer width="100%" height="100%">
    <PieChart margin={{top: 20, right: 0, bottom: 5, left: 0}}>
    <Pie data={rygStudentData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
    <Tooltip />
    </PieChart>
    </ResponsiveContainer>
    </div>
    </div>
  )
}

export default Statistics