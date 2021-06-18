import React, {useState, useRef, useEffect, useContext } from 'react';
import {
    View,
    Text,
    Animated,
    Switch,
    Easing,
    StyleSheet,
    TouchableWithoutFeedback,
  } from 'react-native';

  const ToggleAnimation = props => {
    const [initialState, setInitialState] = useState(false)
    const animation = useRef (new Animated.Value (!! initialState? 1: 0)).current; 
    const [toggled, setToggled] = useState (!! initialState); 
    const [containerWidth, setContainerWidth] = useState (0);
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    
    return (
        <View style={styles.container}>
          <Switch
            trackColor={{ false: "#767577", true: "#62d44d" }}
            thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            
          />
        </View>
      );
    
    
    // const dynamicStyles = {
    //     container: (animation) => ({
    //       alignItems: 'center',
    //       backgroundColor: animation.interpolate({
    //         inputRange: [0, 1],
    //         outputRange: ['#000', '#87cefa'],
    //       }),
    //       borderRadius: 25,
    //       height: 50,
    //       justifyContent: 'center',
    //       paddingHorizontal: 57,
    //     }),

    //   };
    // return (
    //     <TouchableWithoutFeedback
    //         onPress={() => {
    //             setToggled(!toggled);
    //             Animated.timing(animation, {
    //             duration: 300,
    //             toValue: toggled === 0 ? 1 : 0,
                
    //             }).start();
    //             onPress();
    //         }}
    //     >
    //     <Animated.View 
    //         style = {dynamicStyles.container (animation)} 
    //         onLayout ={({ 
    //               nativeEvent: { 
    //               layout: {width}, 
    //             }, 
    //           }) => setContainerWidth (width)}
    //     > 
            
    //      </Animated.View> 
    //     </TouchableWithoutFeedback>
    // )
  }


  export default ToggleAnimation;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    }
  });
