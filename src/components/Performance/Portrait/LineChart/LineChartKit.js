import React, { useContext, useEffect} from "react";
import { StyleSheet, SafeAreaView, Button } from "react-native";
import { ECharts } from "react-native-echarts-wrapper";
import globalStyles from "../../../../styles/globalStyles";
import { ThemeContext } from 'styled-components/native';

const LineChartKit = props => {
    const StyledTheme = useContext(ThemeContext)
    console.log('dataa ', props.data)
    console.log('labels ', props.labels)
    console.log('keys ', props.ativos)

    onRef = ref => {
        if (ref) {
             chart = ref;
        }
    };

    const colors = ['rgb(26, 192, 151)','rgb(75, 50, 128)']
    option = {
        color: colors,
        grid: {
            left: '2%',
            right: '3%',
            bottom: '3%',
            containLabel: true,
        },
        xAxis: {
            type: "category",
            // max: props.labels.length,
            data: props.labels,
            splitLine: {
                show: false
             },
            axisTick: {
                show: false,
                alignWithLabel: true,
                interval: props.periodo ===  'Tudo' ? 20 : 5,
            },
            axisLabel: {
                interval: props.periodo ===  'Tudo' ? 7 : 0,
                rotate: 50,
                fontFamily: 'HelveticaNeue-Medium',
                fontWeight: 'bold',
                margin: 10
            },
            axisLine: {
                onZero: true,
                lineStyle: {
                    color: StyledTheme.colors.fontColor
                }
            }
            
        },
        yAxis: {
            type: "value",
            splitLine: {
                show: false
             },
            axisLabel: {
                formatter: '{value} %',
                fontFamily: 'HelveticaNeue-Medium',
                fontWeight: 'bold',
                color: StyledTheme.colors.fontColor
            },
            scale: false
        },
        series: props.data
        // [
        //     {
        //         symbol: 'none',
        //         name: "Carteira",
        //         data: [13.08, 13.13, 12.74, 13.34, 14.04, 13.79, 14.01, 13.78, 14.03,
        //             13.58, 13.75, 13.8, 13.66, 13.36, 13.19, 13.17, 13.07, 12.9, 13.44,
        //             12.9, 13.27, 13.57, 13.96, 13.93, 14.08, 14.16, 13.99, 13.65, 13.91,
        //             13.79, 14.04, 13.86, 13.84, 12.91, 13.2, 13.27, 12.71, 12.28, 12.41,
        //             12.42, 12.28, 12.54, 12.92, 12.04, 12.05, 12.25, 12.77, 12.66, 12.79,
        //             12.6, 13.09, 12.58, 12.93, 12.68, 12.49, 12.18, 12.47, 12.46, 12.45,
        //             12.8, 12.81],
        //         type: "line",
        //         smooth: true,
                
        //     },
        //     {
        //         symbol: 'none',
        //         name: "CDI",
        //         data: [9.45, 9.45, 9.46, 9.47, 9.48, 9.49, 9.5, 9.5, 9.51, 9.52, 9.53, 9.54,
        //             9.54, 9.55, 9.56, 9.57, 9.58, 9.59, 9.59, 9.6, 9.61, 9.62, 9.63, 9.63,
        //             9.64, 9.65, 9.66, 9.67, 9.68, 9.68, 9.69, 9.7, 9.71, 9.72, 9.72, 9.73,
        //             9.74, 9.75, 9.76, 9.77, 9.77, 9.78, 9.79, 9.8, 9.81, 9.81, 9.82, 9.83,
        //             9.84, 9.85, 9.86, 9.86, 9.88, 9.89, 9.9, 9.91, 9.92, 9.93, 9.94, 9.96,
        //             9.97],
        //         type: "line",
        //         smooth: true
        //     }
        // ]
        ,
        tooltip: {
            trigger: "axis",
            backgroundColor: 'rgba(50,50,50,0.9)',
            // formatter: '{a}: {b} %'
            // formatter: '{a0}: {c0} <br /> {a1}: {c1}'
            formatter: function (params) {
                return  (
                    'Data: ' + params[0].name + '<br />' +
                    `<span style="height: 25px; width: 25px; background-color: ${params[0].color}; border-radius: 50%; display: inline-block;"></span>` +
                     params[0].seriesName + ': ' + params[0].value +' %' + '<br />' 
                    +
                    params[1].seriesName + ': ' + params[1].value + ' %'
                    )
            }
        },
        legend: {
            data: props.ativos,
            textStyle:{
                fontSize: 18,
                color: StyledTheme.colors.fontColor
            },
            bottom: '-15',
            padding: 10
            
        
        }


    };

    additionalCode = `
        chart.on('click', function(param) {
            var obj = {
            type: 'event_clicked',
            data: param.data
            };

            sendData(JSON.stringify(obj));
        });
    `;

    

    onData = param => {
        const obj = JSON.parse(param);

        if (obj.type === "event_clicked") {
            alert(`you tapped the chart series: ${obj.data}`);
        
        }
    };

    

    onButtonClearPressed = () => {
        chart.clear();
    };

    // chart.setOption(option)   
    useEffect(() => {
        chart.setBackgroundColor(StyledTheme.colors.background)
        chart.setOption(option)
    },[StyledTheme, option])
    return (
        <SafeAreaView 
                style={{ height: 370, width: globalStyles.dimensions.width * 0.9, backgroundColor:StyledTheme.colors.background}} 
               >
            {/* <Button title="Clear" onPress={onButtonClearPressed} /> */}

            <ECharts
               
                ref={onRef}
                option={option}
                additionalCode={additionalCode}
                onData={onData}
                onLoadEnd={() => {
                    chart.setBackgroundColor('StyledTheme.colors.background');
                     
                }}
            />
        </SafeAreaView>
    );
}

export default LineChartKit;