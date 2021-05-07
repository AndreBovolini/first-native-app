import React, {useState} from 'react';
import {Text, 
  StyleSheet,
  ScrollView,
  View
} from 'react-native'

import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import globalStyles from '../../styles/globalStyles';
import ValueBox from './valueBox'

import {
  dataHomeBox,
  resposta1
} from '../data/data';

export default function Placehoder(props) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <SkeletonContent 
            containerStyle={styles.title}
            boneColor="#121212"
            highlightColor="#333333"
            isLoading={props.isLoading} 
            layout={[
              { key: 'title', 
              width:styles.title.width, 
              height: styles.title.height },
            ]}
      />
      <SkeletonContent 
            containerStyle={styles.percentSwitch}
            boneColor="#121212"
            highlightColor="#333333"
            isLoading={props.isLoading} 
            layout={[
              { key: 'title', 
              width:styles.percentSwitch.width, 
              height: styles.percentSwitch.height },
            ]}
      />
        <SkeletonContent 
          containerStyle={{ flexDirection: 'row', margin: 2}}
          boneColor="#121212"
          highlightColor="#333333"
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
          boneColor="#121212"
          highlightColor="#333333"
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
            boneColor="#121212"
            highlightColor="#333333"
            isLoading={props.isLoading} 
            layout={[
              { key: 'title', 
              width:styles.benchmarkSwitch.width, 
              height: styles.benchmarkSwitch.height },
            ]}
      />
        <SkeletonContent 
            containerStyle={styles.title}
            boneColor="#121212"
            highlightColor="#333333"
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
          boneColor="#121212"
          highlightColor="#333333"
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
            boneColor="#121212"
            highlightColor="#333333"
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
          boneColor="#121212"
          highlightColor="#333333"
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
          height: 1020,
          width: globalStyles.dimensions.width,
          backgroundColor: globalStyles.colors.backGround,
          justifyContent: 'flex-start',
          alignItems: 'center',
      },
      title: {
          width: 150, 
          alignSelf: 'flex-start',
          marginVertical: 10, 
          marginLeft: 10,
          height: 40
      },
      percentSwitch: {
        width: 80, 
        alignSelf: 'flex-start',
        marginLeft: 5,
        height: 35
    },
    benchmarkSwitch: {
      width: 150, 
      alignSelf: 'center',
      marginLeft: 5,
      height: 30
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
