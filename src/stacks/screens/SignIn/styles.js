import React from 'react';
import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';


export const Container = styled.SafeAreaView`
    background-color: #ffa300;
    flex: 1;
    justify-content: center;
    align-items: center;

`;
export const InputArea = styled.View`
    padding: 10px;
    width: 90%;
`;  

export const Botao = styled.TouchableOpacity`
    height: 60px;
    background-color: #cc8100;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
    opacity: 1.0;
    box-shadow: 20px 5px 5px black;
`;
export const CustomButtomText = styled.Text`
    font-size: 18px;
    color: #fff;

`;
export const SignMessageButton = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    margin-top: 30px;
    margin-bottom: 20px;
`;
export const SignMessageButtonText = styled.Text`
    font-size: 16px;
    color: #fff;    
`;
export const SignMessageButtonTextBold = styled.Text`
    font-size: 16px;
    color: #fff;
    font-weight: bold;
    margin-left: 5px;  
`;  

const styleds = StyleSheet.create({
    Logo1:{
        width: 300,
        height: 300,
        borderRadius:75,
    },
})
export default styleds;