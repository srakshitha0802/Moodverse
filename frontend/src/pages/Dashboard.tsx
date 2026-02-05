import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard(){
  // sample distribution from local journal
  const data = {
    labels: ['Happy','Calm','Sad','Angry','Surprised'],
    datasets:[{ data: [12,19,3,2,4], backgroundColor:['#FBBF24','#60A5FA','#94A3B8','#FB7185','#C084FC'] }]
  }

  return (
    <div className="container m-4">
      <h1 className="text-2xl font-bold">Wellness Dashboard</h1>
      <p className="muted">Mood trend charts and statistics.</p>
      <div style={{maxWidth:420,marginTop:16}}>
        <div className="card card-md">
          <h3 style={{marginTop:0}}>Mood Distribution</h3>
          <Pie data={data} />
        </div>
      </div>
    </div>
  )
}