import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import globalStyles from '../../../styles/globalStyles'
import TabChart from '../../Carteira/Cards/TabChart/TabChart'
import BarChart from '../../Home/BarChart'

import Carousel, { Pagination }from 'react-native-snap-carousel';

const CardCarousel = (props) => {
    const [carouselItems, setCarouselItems] = useState(
        [
            {
                title:"Item 1",
                text: "Text 1",
            },
            {
                title:"Item 2",
                text: "Text 2",
            },
            {
                title:"Item 3",
                text: "Text 3",
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
                backgroundColor: '#000',
                height: 300,
                padding: 10,
                marginTop: 20,
                marginRight: 35,
                marginBottom: -50 }}>
                {/* <Text style={{fontSize: 20, color:'#000'}}>{item.title}</Text>
                <Text>{item.text}</Text> */}
                <BarChart/> 
            </View>
          )
    }

    const pagination = () => {

        return (
            <Pagination
              dotsLength={carouselItems.length}
              activeDotIndex={activeSlide}
              activeAnimationType={'decay'}
              
              containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)'}}
              dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 3,
                  backgroundColor: 'rgba(255, 255, 255, 0.92)'
              }}
              inactiveDotStyle={{
                  width: 10,
                  height: 10,
                  backgroundColor: 'transparent',
                  borderWidth: 1,
                  borderColor: '#FFF'
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

const styles = StyleSheet.create({
    
})