import React, { useState, useEffect } from 'react';
import { View,ScrollView, Text, StyleSheet } from "react-native"

import globalStyles from '../styles/globalStyles';


const PerformanceLandscape = ({children}) => {
    return (
        <View contentContainerStyle={styles.container}>
            <View style={styles.landscapeChartContainer}>
                {children}
            </View>
        </View>
    )
}

export const PerformanceTableLandscape = ({children}) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.landscapeChartContainer}>
                {children}
            </View>
        </ScrollView>
    )
}

export default PerformanceLandscape;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: globalStyles.colors.backGround,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    landscapeChartContainer: {
        width: globalStyles.dimensions.height,
        height: globalStyles.dimensions.width,
        
    }
})