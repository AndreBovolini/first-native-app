import React, { useContext, useEffect, useState} from "react";
import { StyleSheet, SafeAreaView, Button,  ActivityIndicator } from "react-native";
import { ECharts } from "react-native-echarts-wrapper";
import globalStyles from "../../../../styles/globalStyles";
import { ThemeContext } from 'styled-components/native';
import { LoadingView } from '../../../../screens/Performance/styles'
import { connect } from "react-redux";

const LineChartKit = props => {
    const [isLoadingDatas, setIsLoadingDatas] = useState(false);
    const [height, setHeight] = useState(370)
    const [selected, setSelected]=useState(true)
    const [name, setName] = useState('')
    const [index, setIndex] = useState(0)
    const StyledTheme = useContext(ThemeContext)
    // console.log('dataa ', props.data)
    // console.log('labels ', props.labels.length)
    // console.log('keys ', props.ativos)
    const colors = ['rgb(26, 192, 151)','rgb(75, 50, 128)']

    let configs = props.ativos.map((el,i)=>{
        return {
            name: el,
            color: colors[i],
            symbol: `<span style="height: 10px; width: 10px; background-color: ${colors[i]}; border-radius: 50%; display: inline-block;"></span> `
        }
        })
    // console.log(symbol)
    

    chartPerformancePortrait = null;

    onChartRef = ref => {
        if (ref) {
             chartPerformancePortrait = ref;
        }
    };

    // console.log(props.data, props.labels, props.ativos, props.periodo)

    
    option = {
        
        backgroundColor: StyledTheme.colors.background,
        color: colors,
        grid: {
            left: '2%',
            right: '3%',
            bottom: '6%',
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
                margin: 10,
                


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
            formatter: selected ? '{b0} </br>' + configs[0].symbol + '{a0}: {c0} % </br>'  + configs[1].symbol + '{a1}: {c1} %' : 
                    '{b0} </br>' + configs[index].symbol+ '{a0}: {c0} %'
           
        },

        legend: {
           
            data: props.ativos,
            selected: {
                'Carteira': true,
                'CDI': true
            },
            selectedMode: 'onlyHover',
            textStyle:{
                fontSize: 18,
                color: StyledTheme.colors.fontColor
            },
            bottom: '-15',
            padding: 10,
            
            
        
        }


    };
    additionalCode = `
        chart.on('legendselectchanged', function (params) {
        var obj = params;
        //console.log((isSelected ? 'select' : 'unselect') + 'legend' + params.name);
        console.log(params.selected);
        sendData(JSON.stringify(obj))

        })
    `;
   
    onData = (param) => {
        
        let obj = JSON.parse(param)
        //console.log(obj)
        let name = obj.name
        //console.log(name)
        let isSelected = obj.selected[name]
        //console.log(isSelected) 
        configs.forEach((el,i)=>{
            if(!Object.values(el).includes(name)){
                
                setIndex(i)
                }
        })
        
        if (isSelected === false) {
            //alert(`you tapped the chart series: ${isSelected}`);
            setSelected(false)
            setName(name)
        
        }else{
            //alert(`you tapped the chart series: ${isSelected}`);
            setSelected(true)
            setName(name)
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
                    formatter: selected ? '{b0} </br>' + configs[0].symbol + '{a0}: {c0} % </br>'  + configs[1].symbol + '{a1}: {c1} %' : 
                    '{b0} </br>' + configs[index].symbol+ '{a0}: {c0} %'
                    // formatter: function(params) {
                    //     output =  params[0].name + '<br />'
                    //     params.forEach((el,i)=> {
                    //         output += `<span style="height: 10px; width: 10px; background-color: ${el.color}; border-radius: 50%; display: inline-block;"></span> ` + el.seriesName + ': ' + el.value + ' %' +'<br />';
                    //     })
                    //     return output
                    // }
                    // formatter: '{a0}: {c0} <br/> {a1}: {c1}'
                },
            }
        )
        setTimeout(() => {
            setIsLoadingDatas(true)
            
        }, 2000)
        
    },[props.data, props.periodo, props.labels, selected])

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
                additionalCode={additionalCode}
                onData={onData}
            />
            
        </SafeAreaView>
    );
}

const mapStateToProps = state => ({
    stateCarteira: state.dates,
  });

export default connect(mapStateToProps)(LineChartKit);