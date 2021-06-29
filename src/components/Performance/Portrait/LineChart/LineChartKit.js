import React, { useContext, useEffect, useState} from "react";
import { StyleSheet, SafeAreaView, Button,  ActivityIndicator } from "react-native";
import { ECharts } from "react-native-echarts-wrapper";
import globalStyles from "../../../../styles/globalStyles";
import { ThemeContext } from 'styled-components/native';
import { LoadingView } from '../../../../screens/Performance/styles'
const LineChartKit = props => {
    const [isLoadingDatas, setIsLoadingDatas] = useState(false);
    
    const StyledTheme = useContext(ThemeContext)
    // console.log('dataa ', props.data)
    // console.log('labels ', props.labels)
    // console.log('keys ', props.ativos)

    onRef = ref => {
        if (ref) {
             chart = ref;
        }
    };

    // console.log(props.data, props.labels, props.ativos, props.periodo)

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
        ,
        tooltip: {
            trigger: "axis",
            backgroundColor: 'rgba(50,50,50,0.9)',
        },
        legend: {
            data: props.ativos,
            textStyle:{
                fontSize: 18,
                color: StyledTheme.colors.fontColor
            },
            bottom: '-15',
            padding: 10,
            
            
        
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
        setTimeout(() => {
            setIsLoadingDatas(true)
            
        }, 2000)
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
                backgroundColor={StyledTheme.colors.background}
            />
            
        </SafeAreaView>
    );
}

export default LineChartKit;