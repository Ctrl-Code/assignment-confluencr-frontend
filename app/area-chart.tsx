'use client';

import { AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { useAreaChartData } from './area-chart-store';
import AreaChartPopup from './area-chart-popup';
import { useState } from 'react';

// #end region
const SimpleAreaChart = () => {
    const [chartpopup, setChartpopup] = useState(false)
    const data = useAreaChartData(state => state.data);

    return (
        <div className='flex flex-col'>
            <AreaChartPopup />
            <AreaChart
            style={{ width: '100%', maxWidth: '1200px', maxHeight: '70vh', aspectRatio: 1.618 }}
            responsive
            data={data}
            margin={{
                top: 50,
                right: 50,
                left: 50,
                bottom: 100,
            }}
            >
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis dataKey="name" interval={0} angle={-50} textAnchor='end'/>
            <YAxis width="auto" name='amount'/>
            <Tooltip />
            <Area type="monotone" dataKey="amt" stroke="var(--color-super-grey)" fill="var(--color-super-green)" />
            </AreaChart>
        </div>
    );
};

export default SimpleAreaChart;
