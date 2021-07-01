
import React, { useContext, useEffect } from 'react';

import { ECharts } from "react-native-echarts-wrapper";

import { ThemeContext } from 'styled-components';
import { connect } from 'react-redux';

const NewPieChart = (props) => {

    onRef = ref => {
        if (ref) {
          chartCarteira = ref;
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
      props.handleSelectPie(obj)
    }
  };

  useEffect(() => {
    chartCarteira.setOption({
        series: [
          {
            data: props.data
          }
        ]
      });
  }, [props.data])


    const StyledTheme = useContext(ThemeContext)


  useEffect(() => {
    chartCarteira.setOption({
      backgroundColor: StyledTheme.colors?.background,
      legend: {
          textStyle: {
            color: StyledTheme.colors?.fontColor,
          },
      },
    });
  }, [props.stateCarteira?.mode])

    const options = {
        backgroundColor: StyledTheme.colors?.background,
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {d}%'
        },
        legend: {
            left: 'center',
            bottom: 'bottom',
            borderRadius: 10,
            textStyle: {
              color: StyledTheme.colors?.fontColor,
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
                    borderColor: 'transparent',
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
                additionalCode={additionalCode}
                onData={onData}
                ref={onRef}
                />
    )
}


const mapStateToProps = state => ({
  stateCarteira: state.dates,
});


export default connect(mapStateToProps)(NewPieChart);