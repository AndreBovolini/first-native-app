import React, { useContext, useEffect, useState} from "react";
import { StyleSheet, SafeAreaView, Button,  ActivityIndicator } from "react-native";
import { ECharts } from "react-native-echarts-wrapper";
import globalStyles from "../../../../styles/globalStyles";
import { ThemeContext } from 'styled-components/native';
import { LoadingView } from '../../../../screens/Performance/styles'
import { connect } from "react-redux";
const LineChartKit = props => {
    const [isLoadingDatas, setIsLoadingDatas] = useState(false);
    
    const StyledTheme = useContext(ThemeContext)
    // console.log('dataa ', props.data)
    console.log('labels ', props.labels)
    // console.log('keys ', props.ativos)

    chartPerformancePortrait = null;

    onChartRef = ref => {
        if (ref) {
             chartPerformancePortrait = ref;
        }
    };

    // console.log(props.data, props.labels, props.ativos, props.periodo)

    const colors = ['rgb(26, 192, 151)','rgb(75, 50, 128)']
    option = {
        backgroundColor: StyledTheme.colors.background,
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
            // formatter: '{a0}: {c0} <br/> {a1}: {c1}'
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

    



     
    useEffect(() => {
        console.warn('mudou o grafico')
        chartPerformancePortrait.setOption(
            {
                xAxis: {
                    data: props.labels,
                    axisTick: {
                        interval: props.periodo ===  'Tudo' ? 20 : 5,
                    },
                    axisLabel: {
                        interval: props.periodo ===  'Tudo' ? 7 : 0,
                    },
                },
                series: props.data,
                legend: {
                    data: props.ativos,
                },
                tooltip: {
                    formatter: function(params) {
                        output =  params[0].name + '<br />'
                        params.forEach((el,i)=> {
                            output += `<span style="height: 10px; width: 10px; background-color: ${el.color}; border-radius: 50%; display: inline-block;"></span> ` + el.seriesName + ': ' + el.value + ' %' +'<br />';
                        })
                        return output
                    }
                    // formatter: '{a0}: {c0} <br/> {a1}: {c1}'
                },
            }
        )
        setTimeout(() => {
            setIsLoadingDatas(true)
            
        }, 2000)
        
    },[props.data, props.periodo, props.labels])

    useEffect(() => {
        chartPerformancePortrait.setOption({
            backgroundColor: StyledTheme.colors.background,
        xAxis: {
            axisLine: {
                onZero: true,
                lineStyle: {
                    color: StyledTheme.colors.fontColor
                }
            }
            
        },
        yAxis: {
            axisLabel: {
                color: StyledTheme.colors.fontColor
            },
        },
            legend: {
                textStyle: {
                  color: StyledTheme.colors.fontColor,
                },
            },
          })

    }, [props.stateCarteira.mode])


    return (
        <SafeAreaView 
                style={{ height: 370, width: globalStyles.dimensions.width * 0.9, backgroundColor:StyledTheme.colors.background}} 
              >
            {/* <Button title="Clear" onPress={onButtonClearPressed} /> */}
            <ECharts
                ref={onChartRef}
                option={option}
            />
            
        </SafeAreaView>
    );
}

const mapStateToProps = state => ({
    stateCarteira: state.dates,
  });

export default connect(mapStateToProps)(LineChartKit);