import React, {useState, useEffect} from 'react';
import {Platform, RefreshControl} from 'react-native';
import {
  Container,
  Scroller,
  HeaderArea,
  HeaderTitle,
  SearchButton,
  LocationArea,
  LocationInput,
  LocationFinder,
  Lista,
  LoadingIcon,
} from './styles';
import Search from '../../../assets/Search.svg';
import Local from '../../../assets/Local.svg';
import {useNavigation} from '@react-navigation/native';
import {request, PERMISSIONS} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import Api from '../../../Api';
import BarberItem from '../../../components/BarberItem';

export default () => {
  const navigation = useNavigation();

  const [locationText, setLocationText] = useState('');
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const handleLocationFinder = async () => {
    setCoords(null);
    let result = await request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    );
    if (result == 'granted') {
      setLoading(true);
      setLocationText('');
      setList([]);

      Geolocation.getCurrentPosition(info => {
        setCoords(info.coords);
        getAnimals();
      });
    }
  };

  const getAnimals = async () => {
    setLoading(true);
    setList([]);

    let res = await Api.getAnimals();
    console.log(res);

    if (res.error == '') {
      if (res.loc) {
        setLocationText(res.loc);
      }
      setList(res.data);
    } else {
      alert('Error:' + res.error);
    }

    setLoading(false);
  };

  async function loadAnimals() {
    const response = await Api.getAnimals();

    setList(response.data);
  }

  useEffect(() => {
    loadAnimals();
  }, [list]);

  const onRefresh = () => {
    setRefreshing(false);
    getAnimals();
  };

  return (
    <Container>
      <Scroller
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <HeaderArea>
          <HeaderTitle numberOfLines={2}>
            Encontre seu animal para adotar
          </HeaderTitle>
          <SearchButton onPress={() => navigation.navigate('Search')}>
            <Search width="26" height="26" fill="#FFFFFF" />
          </SearchButton>
        </HeaderArea>

        <LocationArea>
          <LocationInput
            placeholder="Onde você está?"
            placeholderTextColor="#FFFFFF"
            value={locationText}
            onChangeText={t => setLocationText(t)}
          />
          <LocationFinder onPress={handleLocationFinder}>
            <Local width="24" height="24" fill="#FFFFFF" />
          </LocationFinder>
        </LocationArea>

        {loading && <LoadingIcon size="large" color="#FFFFFF" />}

        <Lista>
          {list.map((item, k) => (
            <BarberItem key={k} data={item} />
          ))}
        </Lista>
      </Scroller>
    </Container>
  );
};
