import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { Image, Text } from 'react-native';
import { UserContext } from '../../../contexts/UserContext';

import styleds, { Container, 
         InputArea,
         Botao,
         CustomButtomText,
         SignMessageButton,
         SignMessageButtonText,
         SignMessageButtonTextBold 
           
} from './styles';

import Api from '../../../Api';

import SingnInput from '../../../components/SignInput';
import EmailIcon from '../../../assets/email.svg';
import SenhaIcon from '../../../assets/senha.svg';


export default ({navigation}) => {
    
    const {dispatch: userDispatch} = useContext(UserContext);
    const [emailField, setEmailField] = useState('');
    const [senhaField, setSenhaField] = useState('');

    const handleSignClick = async () => {
        if(emailField != ' ' && senhaField != '') {

            let json = await Api.singnIn(emailField, senhaField);

            if(json.token) {
               await AsyncStorage.setItem('token', json.token);
            
               userDispatch({
                   type: 'setAvatar',
                   payload:{
                       avatar: json.data.avatar
                   }
               });

               navigation.reset({
                   routes:[{name:'MainTab'}]
               });


               
            } else {
                alert("E-mail e/ou senha incorretos!");
            }

        } else {
            alert("Preencha os campos!");
        }
    }

    const handleMessageButtonClick = async () => {
        navigation.reset({
            routes: [{name: 'SignUp'}]
        });
    }   


    return (
        <Container>
            <Image style={styleds.Logo1}source={require('../../../assets/LOGOAPP.png')} />
            
            <InputArea>
                <SingnInput 
                    IconSvg={EmailIcon} 
                    placeholder="Digite seu e-mail"
                    placeholderTextColor="##fff6e6"
                    value={emailField}
                    onChangeText={t=>setEmailField(t)}
                />

                <SingnInput 
                    IconSvg={SenhaIcon} 
                    placeholder="Digite sua senha"
                    placeholderTextColor="##fff6e6"
                    value={senhaField}
                    onChangeText={t=>setSenhaField(t)}
                    password={true}

                />
                <Botao onPress={handleSignClick} >
                    <CustomButtomText>Login</CustomButtomText>
                </Botao>
            </InputArea>

            <SignMessageButton onPress={handleMessageButtonClick}   >
                <SignMessageButtonText> Ainda não possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold onPress={() => navigation.navigate('SignUp')}
                >Cadastre-se</SignMessageButtonTextBold>
            </SignMessageButton>
            


        </Container>
    );
}