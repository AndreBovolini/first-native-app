import { Dimensions } from 'react-native';

export default {
    colors: {
        backGround: '#000000',
        firstLayer: '#161616',
        fontColor: '#FFFFFF',
    },
    dimensions: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    chartColors: {
        background: '#000',
        toooltip: '#252525',
        tooltipText: '#FFF',
        series1: 'rgb(26, 182, 151)',
        series2: 'rgb(59, 145, 153)',
        pieChartColors: ['#5456A2','#7A77B7', '#ABA2D0', '#5f8dca','#7FAADB', '#a7d7d2', '#48A192'],
        pieChartHole: '#000',
    }
}