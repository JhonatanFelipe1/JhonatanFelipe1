import React, {useEffect, useContext} from 'react';
import {Image, Text, StyleSheet } from 'react-native';
import styles, { Container, LoadingIcon } from './styles';

import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import Api from '../../../Api';
import { UserContext } from '../../../contexts/UserContext';

export default () => {
    
    const {dispatch: userDispach} = useContext(UserContext);    
    const navigation = useNavigation();
    
    useEffect(() => {
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token');
                if (token) {
                    let res = await Api.checkToken(token);
                    if(res.token) {
                        
                        await AsyncStorage.setItem('token', res.token);
                        
                            userDispach({
                                type: 'setAvatar',
                                payload:{
                                    avatar: res.data.avatar
                                }
                            });
            
                            navigation.reset({
                                routes:[{name:'MainTab'}]
                            });

                    } else {
                        navigation.navigate('SignIn');
                    }
                } else {
                   navigation.navigate('SignIn');
                }
        }   
        checkToken();
    },[]);


    return(
        <Container>
            <Image style={styles.Logo}source={require('../../../assets/LOGOAPP.png')} />
            <LoadingIcon size={"large"} color={"#FFFFFF"} />
        </Container>
    );
}   

