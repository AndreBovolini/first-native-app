import React, {useState, useContext, useEffect, useRef} from 'react';
import {
    View,
    Text,TouchableOpacity
} from 'react-native'
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
import globalStyles from '../../../../styles/globalStyles'
import { ThemeContext } from 'styled-components/native';
import { formatISO9075, toDate } from 'date-fns';
LocaleConfig.locales['pt'] = {
  monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
  monthNamesShort: ['Jan.','Fev.','Mar.','Abril','Maio','Junho','Julho.','Agosto','Set.','Out.','Nov.','Dez.'],
  dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sabado'],
  dayNamesShort: ['Dom.','Seg.','Ter.','Qua.','Qui.','Sex.','Sab.'],
  today: 'Hoje'
};

LocaleConfig.defaultLocale = 'pt';

const RenderCalendar = props => {
    const [days, setDays] = useState()
    const [month, setMonth] =useState('July')
    const [year, setYear] = useState('1950')
    const [markedDates, setMarkedDates] = useState(
        {
    }
    )
    const StyledTheme = useContext(ThemeContext)
    
    useEffect(()=> {
        
        // let date = props.current.toLocaleDateString('pt-BR', {timeZone: 'UTC'})
        let date = formatISO9075(props.current, {representation:'date'})
        setYear(date.slice(6))
        
        // let dateFormatted = date.slice(6) + '-' + date.slice(3,5)  + '-' + date.slice(0,2)
        //console.log(typeof(props.current.toLocaleDateString('pt-BR', {timeZone: 'UTC'})))
        setMarkedDates({
            [date]: {
                selected: true, marked: true, selectedColor: '#00adf5',
            },
        })
    },[])

      
      const handleDayPress = (day) => {
          console.log('min',props.minDate)
        //console.log(day)
        
        setMarkedDates({
            [day.dateString]: {
                selected: true, marked: true, selectedColor: '#00adf5',
            },
        })
        setDays(day.dateString)
        props.onChange(day.timestamp)
        //console.log('days',days)
      }
    //console.log( 'hey', props.minDate ? props.minDate : props.maxDate)

   
    

    return (
        <View>
        <Calendar
            // current={props.id === 'inicial' ? props.minDate: props.maxDate}
            current={props.current}
            minDate = {props.id === 'inicial' ? props.minDate : null}
            maxDate={props.id === 'final' ? props.maxDate : new Date()}
            onDayPress={(day) => handleDayPress(day)}
            enableSwipeMonths={true}
            
            // markingType={'simple'}
            //customHeader={CustomHeader}
            markedDates={markedDates}
            style={{
                borderRadius: 10,
                width: globalStyles.dimensions.width*0.7,
                marginLeft: globalStyles.dimensions.width*0.15,
                marginTop: 5,
                marginBottom: 10,
                // borderLeftWidth: 2,
                // borderBottomWidth: 2,
                // borderLeftColor: '#2A0DB8',
                // borderBottomColor: '#2A0DB8'
            }}
            theme={{
            backgroundColor: '#ffffff',
            calendarBackground: StyledTheme.colors.background,
            textSectionTitleColor: StyledTheme.colors.fontColor,
            textSectionTitleDisabledColor: '#d9e1e8',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#00adf5',
            dayTextColor: StyledTheme.colors.fontColor,
            textDisabledColor: StyledTheme.colors.firstLayer,
            dotColor: '#00adf5',
            selectedDotColor: '#ffffff',
            arrowColor: StyledTheme.colors.fontColor,
            
            disabledArrowColor: '#d9e1e8',
            monthTextColor: StyledTheme.colors.fontColor,
            // indicatorColor: 'blue',
            textDayFontFamily: 'HelveticaNeue-Medium',
            textMonthFontFamily: 'HelveticaNeue-Medium',
            textDayHeaderFontFamily: 'HelveticaNeue-Medium',
            // textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            // textDayHeaderFontWeight: '300',
            textDayFontSize: 15,
            textMonthFontSize: 15,
            }}
            
      />
        </View>
    )

}

export default RenderCalendar ;