import React, { useState, useEffect } from "react";
import axios from "axios";

import { getViews } from  '../../../actions/posts.js';
import { useDispatch } from 'react-redux';

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
const tdata = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, {name: 'Page B', uv: 300, pv: 2400, amt: 2400}];

const Dashboard = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);

    useEffect(() => {
        const getViewss = async () => {
            const res = await dispatch(getViews())
            const hay = res.views.map((view) => ({
                name: view.date,
                uv: view.count,
                pv: 2400,
                amt: 2400
            }))
            setData(hay);
        };
        getViewss();
    }, []);

    return(
        <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
        </LineChart>
    )
};

export default Dashboard;