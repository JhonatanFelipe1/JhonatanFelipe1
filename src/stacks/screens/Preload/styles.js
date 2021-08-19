import React from 'react';
import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';


export const Container = styled.SafeAreaView`
    background-color: #ffa300;
    flex: 1;
    justify-content: center;
    align-items: center;
`;
export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 50px;
`;

const styles = StyleSheet.create({
    Logo: {
        width: 350,
        height: 350,
        borderRadius:100,
    },

})
 
export default styles;