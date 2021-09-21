import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import globalStyles from '../../../styles/globalStyles'
import TabChart from '../../Carteira/Cards/TabChart/TabChart'
import BarChart from '../../Home/BarChart'

import Carousel, { Pagination }from 'react-native-snap-carousel';
import styled, { ThemeContext } from 'styled-components';
import NewBarChartHome from '../../Home/NewBarChart';

const CardCarousel = (props) => {

    const StyledTheme = useContext(ThemeContext);

    const [carouselItems, setCarouselItems] = useState(
        [
            {
                carteira: 10,
                ibov: 20,
                cdi: 30
            },
            {
                carteira: -10,
                ibov: 20,
                cdi: 10
            },
            {
                carteira: -20,
                ibov: -2,
                cdi: 10
            },
            {
                carteira: 5,
                ibov: -1,
                cdi: 9
            },
            {
                carteira: 4,
                ibov: 12,
                cdi: 16
            },
        ]
    )
    const [activeSlide, SetActiveSlide] = useState(Math.trunc((carouselItems.length)/2))

    

    const updateIndex = (index) => {
        SetActiveSlide(index)
        props.handleGetIndex(index)
    }
    const renderItem = ({item, index}) => {
        return (
            <View style={{
                backgroundColor: StyledTheme.colors.background,
                height: 350,
                padding: 10,
                marginTop: 20,
                marginRight: 35,
                marginBottom: -50 }}
                
                >
                {/* <Text style={{fontSize: 20, color:'#000'}}>{item.title}</Text>
                <Text>{item.text}</Text> */}
                <BarChart data={item}/> 
            </View>
          )
    }

    const pagination = () => {

        return (
            <Pagination
              dotsLength={carouselItems.length}
              activeDotIndex={activeSlide}
              activeAnimationType={'decay'}
              
              containerStyle={{ backgroundColor: StyledTheme.colors.backgroundColor }}
              dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 3,
                  backgroundColor: StyledTheme.colors.invertedBackground
              }}
              inactiveDotStyle={{
                  width: 10,
                  height: 10,
                  backgroundColor: 'transparent',
                  borderWidth: 1,
                  borderColor: StyledTheme.colors.invertedBackground
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={1}
            />
        );
    }
    return (
      
        <View style={{ flex: 1, justifyContent: 'center', }}>
            <Carousel
            firstItem ={activeSlide}
            layout={'default'}
            // ref={ref => carousel = ref}
            data={carouselItems}
            renderItem={renderItem}
            sliderWidth={globalStyles.dimensions.width}
            itemWidth={globalStyles.dimensions.width}
            onSnapToItem={(index) => updateIndex(index)}
            />
            {pagination()}
        </View>
       
    )
}

export default CardCarousel;


