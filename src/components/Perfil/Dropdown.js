import SelectDropdown from 'react-native-select-dropdown'
import React, {useState, useContext, useRef} from 'react'
import {View} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { ThemeContext } from 'styled-components/native';

const DropComponent = () => {
    const StyledTheme = useContext(ThemeContext)
    const countries = ["R$", "% (cotização)", "% (TIR)"]
    
    
  return (
      
        
    <SelectDropdown
        data={countries}
        onSelect={(selectedItem, index) => {
            console.log(selectedItem, index)
        }}
        
        defaultButtonText= 'Selecione'
        buttonStyle={{
            backgroundColor: StyledTheme.colors.background,
            width: 160,
            borderBottomWidth: 1,
            borderColor: '#FFF'
        }}
        renderDropdownIcon={() => {
            return (
               <Icon name="chevron-down" color={StyledTheme.colors.fontColor} size={15} />
            )
         }}
        buttonTextStyle={{
            color: StyledTheme.colors.fontColor,
            
        }}
        
        dropdownStyle={{
            backgroundColor:  StyledTheme.colors.firstLayer,
            borderWidth: 1,
            borderColor: '#FFF',
            marginTop: -2,
            paddingHorizontal: 10
           
        
        }}
        rowStyle={{
            backgroundColor:StyledTheme.colors.firstLayer
            
        }}
        rowTextStyle={{
            color: StyledTheme.colors.fontColor,
            
       
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem
        }}
        rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item
        }}
    />
        
  );
}
export default DropComponent;