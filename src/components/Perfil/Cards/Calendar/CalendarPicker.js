import React, {useState, useContext, useEffect} from 'react';
import {
    View
} from 'react-native'
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
import globalStyles from '../../../../styles/globalStyles'
import { ThemeContext } from 'styled-components/native';

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
    const [markedDates, setMarkedDates] = useState(
        {
    }
    )
    const StyledTheme = useContext(ThemeContext)
    
    useEffect(()=> {
        console.log('aa',markedDates)
    },[markedDates])

      const handleDayPress = (day) => {
        console.log(day)
        setMarkedDates({
            [day.dateString]: {
                selected: true, marked: true, selectedColor: '#00adf5',
            },
        })
        setDays(day.dateString)
        props.onChange(day.timestamp)
        console.log('days',days)
      }
    
    
    
    return (
        <View>
        <Calendar
            current={props.id === 'inicial' ? props.minDate: props.maxDate}

            minDate = {props.id === 'inicial' ? props.minDate : null}
            maxDate={props.id === 'final' ? props.maxDate : new Date()}
            onDayPress={(day) => handleDayPress(day)}
            enableSwipeMonths={true}
            // markingType={'simple'}
            
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