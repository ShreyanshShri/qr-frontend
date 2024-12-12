import React from 'react'

import { ResponsiveContainer, Bar, BarChart, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const Statistics = ({classAnalyticsData}) => {
  return (
    <div>
        <h1 style={{color: "white"}}>Statistics</h1>
    <div className="statistics" style={{
        paddingTop: "30px",
        paddingBottom: "30px",
        borderRadius: "20px",
        backgroundColor: "white",
        height: "360px"
    }}>
    <ResponsiveContainer width="100%" height="100%">
        <BarChart data={classAnalyticsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis dataKey="attendance" />
            <Tooltip />
            <Legend />
            <Bar dataKey="attendance" fill="#8884d8" />
        </BarChart>
    </ResponsiveContainer>
    </div>
    </div>
  )
}

export default Statistics