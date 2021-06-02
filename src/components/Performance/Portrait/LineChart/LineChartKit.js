import React, { useContext, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    processColor,
    ScrollView,
} from 'react-native';

import {
    LineChart,
} from "react-native-chart-kit";

import { Rect, Text as TextSVG, Svg } from "react-native-svg";

import { ThemeContext } from 'styled-components';
import globalStyles from '../../../../styles/globalStyles';

const LineChartKit = props => {
    let [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0, visible: false, value: 0 })
    const StyledTheme = useContext(ThemeContext)

    return (
        <View style={{height: 360}}>
            <LineChart
                data={{
                    labels: [
                        "", "", "", "", "", "", "", "", "", "", "", "", "", "",
                        "", "", "", "", "", "Jan/2021", "", "", "", "", "", "", "", "",
                        "", "", "", "", "", "", "", "", "", "Fev/2021", "", "", "", "",
                        "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
                        "", "", "Mar/2021",
                    ],
                    datasets: [{
                        data:[ 
                            100 ,  110 ,  90 ,  130 ,  80 ,  103, 44, 58, 98, 65, 25,
                            100 ,  110 ,  90 ,  130 ,  80 ,  103, 44, 58, 98, 65, 25,
                            100 ,  110 ,  90 ,  130 ,  80 ,  103, 44, 58, 98, 65, 25,
                            100 ,  110 ,  90 ,  130 ,  80 ,  103, 44, 58, 98, 65, 25,
                            100 ,  110 ,  90 ,  130 ,  80 ,  103, 44, 58, 98, 65, 25,
                            25, 66, 47, 36, 59
                        ]
                    }]
                }}
                width={globalStyles.dimensions.width*0.85} // from react-native
                height={300}
                yAxisLabel="$"
                yAxisSuffix=" k"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    backgroundColor: StyledTheme.colors.background,
                    backgroundGradientFrom: StyledTheme.colors.background,
                    backgroundGradientTo: StyledTheme.colors.background,
                    decimalPlaces: 1, // optional, defaults to 2dp
                    color: () => 'rgb(26, 192, 151)',
                    labelColor:  () => StyledTheme.colors.fontColor,
                    propsForBackgroundLines: {
                        strokeDasharray: "" // solid background lines with no dashes
                   },
                    
                    style: {
                        borderRadius: 10
                    },
                    propsForDots: {
                        r: "",
                        strokeWidth: "2",
                        stroke: StyledTheme.colors.fontColor,
                    }
                }}
                bezier
                yLabelsOffset={5}
                xLabelsOffset={-15}
                verticalLabelRotation={90}
                withInnerLines={false}
                
                style={{
                    padding: 15,
                    marginLeft: -15,
                    
                }}
               
                decorator={() => {
                    return tooltipPos.visible ? <View>
                        <Svg>
                            <Rect x={tooltipPos.x - 15} 
                                y={tooltipPos.y + 10} 

                                width="40" 
                                height="30"
                                fill="black" />
                                <TextSVG
                                    x={tooltipPos.x + 5}
                                    y={tooltipPos.y + 30}
                                    fill="white"
                                    fontSize="16"
                                    fontWeight="bold"
                                    textAnchor="middle">
                                    {tooltipPos.value}
                                </TextSVG>
                        </Svg>
                    </View> : null
                }}

                onDataPointClick={(data) => {

                    let isSamePoint = (tooltipPos.x === data.x 
                                        && tooltipPos.y === data.y)

                    isSamePoint ? setTooltipPos((previousState) => {
                        return { 
                                  ...previousState,
                                  value: data.value,
                                  visible: !previousState.visible
                               }
                    })
                        : 
                    setTooltipPos({ x: data.x, value: data.value, y: data.y, visible: true });

                }}
            />
             
        </View>

    )
}

export default LineChartKit;