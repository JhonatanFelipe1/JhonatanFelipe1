import React, {useState, useEffect} from 'react';
import {Text, View, Image} from 'react-native';
import {
  Container,
  Scroller,
  FakeSwiper,
  PageBody,
  UserInfoArea,
  ServiceArea,
  Descrition,
  SwipeDot,
  SwipeDotActive,
  SwipeItem,
  SwipeImage,
  Avatar,
} from './styles';
import {useNavigation, useRoute} from '@react-navigation/native';
import Api from '../../../Api';
import Swiper from 'react-native-swiper';

export default () => {
  const navigation = useNavigation();
  const route = useRoute();
  const loadAnimal = async () => {
    const data = await Api.getAnimal(userInfo.id);
    console.log(data);
  };


  const [userInfo, setUserInfo] = useState({
    id: route.params.id,
    avatar: route.params.avatar,
    name: route.params.name,
  });
  
  console.log('aba PETS II'+route.params.avatar);

  const [loading, setLoading] = useState(false);
  const [animal, setAnimal] = useState([]);

  useEffect(() => {
    const getAnimalInfo = async () => {
      setLoading(true);

      let json = await Api.getAnimal(userInfo.id);
      if (json.error == '') {
        setUserInfo(json.data);
      } else {
        alert('Erro:' + json.error);
      }
      setLoading(false);
    };
    loadAnimal();
  
  }, []);

  return (
    <Container>
      <Scroller>
        {userInfo.photos && userInfo.photos.length > 0 ? (
           <Swiper  
            style={{height: 240}}
            dot={<SwipeDot />}
            activeDot={<SwipeDotActive />}
            paginationStyle={{top: 15, right: 15, bottom: null, left: null}}
            autoplay={true}>
            {userInfo.photos.map((item, key) => (
              <SwipeItem key={key}>
                <SwipeImage source={{uri: item.url}} resizeMode="cover" />
              </SwipeItem>
            ))}
          </Swiper>
        ) : (
          <FakeSwiper />
        )}
        <PageBody>
        <Text>{userInfo.id}</Text>
        <Avatar source={{uri: userInfo.avatar}} />
          <UserInfoArea />
          <ServiceArea />
          <Descrition />
        </PageBody>
      </Scroller>
    </Container>
  );
};
