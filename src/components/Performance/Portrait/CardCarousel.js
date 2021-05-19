import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import globalStyles from '../../../styles/globalStyles'
import TabChart from '../../Carteira/Cards/TabChart/TabChart'
import Carousel, { Pagination }from 'react-native-snap-carousel';

const CardCarousel = (props) => {
    const [activeSlide, SetActiveSlide] = useState([])
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

    const renderItem = ({item}) => {
        return (
            <View style={{
                backgroundColor:'floralwhite',
                borderRadius: 10,
                height: 260,
                padding: 30,
                marginTop: 20,
                marginLeft: 25,
                marginRight: 25, }}>
                <Text style={{fontSize: 30, color:'#000'}}>{item.title}</Text>
                <Text>{item.text}</Text>
                
                
            </View>
  
          )
    }

    const pagination = () => {

        return (
            <Pagination
              dotsLength={carouselItems.length}
              activeDotIndex={activeSlide}
              containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
              dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 5,
                  backgroundColor: 'rgba(255, 255, 255, 0.92)'
              }}
              inactiveDotStyle={{
                  // Define styles for inactive dots here
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
        );
    }
    return (
      
        <View style={{ flex: 1, justifyContent: 'center', }}>
            <Carousel
            layout={'default'}
            // ref={ref => carousel = ref}
            data={carouselItems}
            renderItem={renderItem}
            sliderWidth={380}
            itemWidth={globalStyles.dimensions.width*0.9}
            onSnapToItem={(index) => SetActiveSlide(index)}
            />
            {pagination()}
        </View>
       
    )
}

export default CardCarousel;

const styles = StyleSheet.create({
    button: {
        height: 50,
        width: globalStyles.dimensions.width * 0.6,
        backgroundColor: '#1E90FF',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttonText: {
        color: globalStyles.colors.fontColor,
        fontSize: 20,
      },
})