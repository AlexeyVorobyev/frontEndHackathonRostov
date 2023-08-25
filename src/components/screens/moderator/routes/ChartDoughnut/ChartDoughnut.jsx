import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const constructData = (quanityArr) => {
    return {
        labels: ["s23","w23"],
        datasets:[
            {
                label: null,
                data: quanityArr,
                backgroundColor: [
                    '#F68F57',
                    '#2B8ADE',
                ],
                borderColor: [
                    '#FFFFFF',
                    '#FFFFFF',
                ],
                borderWidth: 0,
            },
        ],
    }
};

const ChartDoughnut = ({quanityArr}) => {
    return <Doughnut data={constructData(quanityArr)}/>;
}

export {ChartDoughnut}