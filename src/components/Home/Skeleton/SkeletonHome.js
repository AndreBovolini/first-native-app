import React, {useContext, useState} from 'react';
import {Text, 
  StyleSheet,
  ScrollView,
  View
} from 'react-native'

import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { ThemeContext } from 'styled-components';
import globalStyles from '../../../styles/globalStyles';

export default function Placehoder(props) {

  const StyledTheme = useContext(ThemeContext)
    return (
      <ScrollView contentContainerStyle={[styles.container, {backgroundColor: StyledTheme.colors.background}]}>
        <SkeletonContent 
            containerStyle={styles.title}
            boneColor={StyledTheme.colors.skeletonBackground}
            highlightColor={StyledTheme.colors.skeletonHighlight}
            isLoading={props.isLoading} 
            layout={[
              { key: 'title', 
              width:styles.title.width, 
              height: styles.title.height },
            ]}
      />
      <SkeletonContent 
            containerStyle={styles.percentSwitch}
            boneColor={StyledTheme.colors.skeletonBackground}
            highlightColor={StyledTheme.colors.skeletonHighlight}
            isLoading={props.isLoading} 
            layout={[
              { key: 'title', 
              width:styles.percentSwitch.width, 
              height: styles.percentSwitch.height },
            ]}
      />
        <SkeletonContent 
          containerStyle={{ flexDirection: 'row', margin: 2}}
          boneColor={StyledTheme.colors.skeletonBackground}
          highlightColor={StyledTheme.colors.skeletonHighlight}
          isLoading={props.isLoading}
          layout={[
              { key: 'box1', 
              flex: 1,
              width:globalStyles.dimensions.width,
              margin:7, 
              height: 75},
              { key: 'box2', 
              flex: 1,
              width:globalStyles.dimensions.width, 
              margin:7, 
              height: 75},
            ]}
        />
        <SkeletonContent 
          containerStyle={{ flexDirection: 'row', margin: 2, marginTop: -5}}
          boneColor={StyledTheme.colors.skeletonBackground}
          highlightColor={StyledTheme.colors.skeletonHighlight}
          isLoading={props.isLoading}
          layout={[
              { key: 'box3', 
              flex: 1,
              width:globalStyles.dimensions.width,
              margin:7, 
              height: 75},
              { key: 'box4', 
              flex: 1,
              width:globalStyles.dimensions.width, 
              margin:7, 
              height: 75},
            ]}
        />
        <SkeletonContent 
            containerStyle={styles.benchmarkSwitch}
            boneColor={StyledTheme.colors.skeletonBackground}
            highlightColor={StyledTheme.colors.skeletonHighlight}
            isLoading={props.isLoading} 
            layout={[
              { key: 'title', 
              width:styles.benchmarkSwitch.width, 
              height: styles.benchmarkSwitch.height,
              borderRadius: styles.benchmarkSwitch.borderRadius },
            ]}
      />
        <SkeletonContent 
            containerStyle={styles.carousel}
            boneColor={StyledTheme.colors.skeletonBackground}
            highlightColor={StyledTheme.colors.skeletonHighlight}
            isLoading={props.isLoading} 
            layout={[
              { key: 'Carousel', 
              width:styles.carousel.width, 
              height: styles.carousel.height },
            ]}
      />
        <SkeletonContent 
            containerStyle={styles.title}
            boneColor={StyledTheme.colors.skeletonBackground}
            highlightColor={StyledTheme.colors.skeletonHighlight}
            isLoading={props.isLoading} 
            layout={[
              { key: 'Performance', 
              width:215, 
              height: styles.title.height,
              marginTop: 10,
              marginLeft: 2},
            ]}
      />
        <SkeletonContent 
          containerStyle={{ flexDirection: 'row'}}
          boneColor={StyledTheme.colors.skeletonBackground}
          highlightColor={StyledTheme.colors.skeletonHighlight}
          isLoading={props.isLoading}
          layout={[
              { key: 'ChartLine', 
              flex: 1,
              width:globalStyles.dimensions.width,
              marginTop:10, 
              margin: 12,
              height: 230},
            ]}
        />
        <SkeletonContent 
            containerStyle={styles.title}
            boneColor={StyledTheme.colors.skeletonBackground}
            highlightColor={StyledTheme.colors.skeletonHighlight}
            isLoading={props.isLoading} 
            layout={[
              { key: 'Carteira', 
              width: 145, 
              height: styles.title.height,
              marginLeft: 3 },
            ]}
      />
      <SkeletonContent 
          containerStyle={{ flexDirection: 'row'}}
          boneColor={StyledTheme.colors.skeletonBackground}
          highlightColor={StyledTheme.colors.skeletonHighlight}
          isLoading={props.isLoading}
          layout={[
              { key: 'ChartPie', 
              height: 300,
              borderRadius: 200,
              width: 300,
              marginTop: 20, 
              marginLeft: 20,
              marginRight: 20,
              margin: 12},
            ]}
        />
      </ScrollView>
       
    )}

    const styles = StyleSheet.create({
      container: {
          height: 1500,
          width: globalStyles.dimensions.width,
          
          justifyContent: 'flex-start',
          alignItems: 'center',
      },
      title: {
          width: 150, 
          alignSelf: 'flex-start',
          marginVertical: 10, 
          marginLeft: 30,
          height: 50
      },
      percentSwitch: {
        width: 90, 
        alignSelf: 'flex-start',
        marginLeft: 10,
        marginTop: 10,
        height: 40
    },
    benchmarkSwitch: {
      width: 150, 
      alignSelf: 'center',
      marginLeft: 5,
      height: 38,
      borderRadius: 12
    },
    carousel: {
      width: globalStyles.dimensions.width*0.90, 
      alignSelf: 'center',
      height: 330,
      marginTop: 10
    },
      valueBoxContainer: {
          flex:1,
          width: globalStyles.dimensions.width,
          
      }, 
      valueBoxContainerRow: {
          flex: 1, 
          flexDirection: 'row', 
          justifyContent: 'space-around',
          marginVertical: 5,
      },
      titleNavigationContainer: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        marginLeft: 20,
      },
      titleNavigation: {
        color: globalStyles.colors.fontColor,
        fontSize: 30,
        fontWeight: '300',
      },
      chartContainer: {
          width: globalStyles.dimensions.width,
          height: 393,
          marginTop: 20, 
        },
        lineChartContainer: {
          width: globalStyles.dimensions.width,
          height: 230,
          marginTop: 20, 
        },
        label: {
          alignItems: 'center',
          backgroundColor: 'black',
          flex: 0.5
      },
      labelText: {
          fontSize: 40,
          color: 'white',
      },
  })
