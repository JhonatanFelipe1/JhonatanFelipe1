import React, {useState} from 'react';
import {Platform} from 'react-native';
import { Container,
         Scroller,
         
         HeaderArea,
         HeaderTitle,
         SearchButton,

         LocationArea,
         LocationInput,
         LocationFinder,



} from './styles';
import Search from '../../../assets/Search.svg';
import Local from '../../../assets/Local.svg';
import { useNavigation } from '@react-navigation/native';
import { request, PERMISSIONS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';

export default () => {
    
    const navigation = useNavigation();
    
    const [locationText, setLocationText] = useState('');
    const [coords, setCoords] = useState(null);
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState ([]);

    const handleLocationFinder = async () => {
        setCoods(null);
        let result = await request(
                Platform.OS === 'ios' ?
                    PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
                    :
                    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        );
            if(result == 'granted') {
                setLoading(true);
                setLocationText('');
                setList([]);

                Geolocation.getCurrentPosition((info)=>{
                    setCoords(info.coords);
                    getAnimals();
                });

            }

    }
 
    const getAnimals = () => {

    }
    
    return(

       <Container>
        <Scroller>
            
            <HeaderArea>
                <HeaderTitle numberOfLines={2}>Encontre seu animal para adotar</HeaderTitle>
                <SearchButton onPress={()=>navigation.navigate('Search')}  >
                    <Search  width="26" height="26" fill="#FFFFFF"  />
                </SearchButton>
            </HeaderArea>

            <LocationArea>
                <LocationInput
                    placeholder="Onde você está?"
                    placeholderTextColor= '#FFFFFF'
                    value={locationText}
                    onChangeText={t=>setLocationText(t)}
                />
                <LocationFinder>
                    <Local width="24" height="24" fill="#FFFFFF" />   
                </LocationFinder>
            </LocationArea>



        </Scroller>
    </Container>
    );
}