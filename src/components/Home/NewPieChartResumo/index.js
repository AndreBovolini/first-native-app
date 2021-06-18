
import React, { useContext } from 'react';

import { ECharts } from "react-native-echarts-wrapper";

import { ThemeContext } from 'styled-components';

export function NewPieChartResumo(props) {

  
    const StyledTheme = useContext(ThemeContext)

    const options = {
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {d}%'
        },
        legend: {
            left: 'center',
            bottom: '-15',
            padding: 10,
            borderRadius: 10,
            textStyle: {
              color: StyledTheme.colors.fontColor,
            },
            icon: 'circle'
        },
        textStyle: {
        },
        series: [
            {
                name: 'Carteira:',
                type: 'pie',
                radius: ['50%', '80%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 20,
                    borderColor: StyledTheme.colors.background,
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        formatter: 'Carteira',
                        show: false,
                        fontSize: '40',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: props.data
            }
        ]
      }

    return(
                <ECharts
                option={options}
                backgroundColor={StyledTheme.colors.background}
                />
    )
}