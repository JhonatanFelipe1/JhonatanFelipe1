import React, {useState, useContext} from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { UserContext } from '../../../contexts/UserContext';
import { Image, Text } from 'react-native';
import styleds from './styles';
import { Container, 
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
import NomeIcon from '../../../assets/nome.svg';


export default () => {
    
    
    const navigation = useNavigation();
    
    const [nomeField, setNomeField] = useState('');
    const [emailField, setEmailField] = useState('');
    const [senhaField, setSenhaField] = useState('');
    

    const handleSignClick = async () => {
        if(nomeField != ' ' && emailField != '' && senhaField != '') {
            
            let res = await Api.signUp (nomeField, emailField, senhaField);
               
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
                 alert("Erro: "+res.error);
             }
 
 
         } else {
             alert("Preencha os campos!");
         }
     }
  
               

    const handleMessageButtonClick = () => {
        navigation.reset({
            routes: [{name: 'SignIn'}]
        });
    }


    return (
        <Container>
            <Image style={styleds.Logo1}source={require('../../../assets/LOGOAPP.png')} />
            
            <InputArea>
                <SingnInput 
                    IconSvg={NomeIcon} 
                    placeholder="Digite seu nome"
                    placeholderTextColor="##fff6e6"
                    value={nomeField}
                    onChangeText={t=>setNomeField(t)}
                />               

                
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
                    <CustomButtomText>Cadastrar</CustomButtomText>
                </Botao>
            </InputArea>

            <SignMessageButton onPress={handleMessageButtonClick}   >
                <SignMessageButtonText> Já possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Faça seu login</SignMessageButtonTextBold>
            </SignMessageButton>
            


        </Container>
    );
}