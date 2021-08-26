import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';
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

} from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import Api from '../../../Api';
import Swiper from 'react-native-swiper';

export default () => {

    const navigation = useNavigation();
    const route = useRoute();
    
    const [userInfo, setUserInfo] = useState({
        id: route.params.id,
        avatar: route.params.avatar,
        name: route.params.name
    });

    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        const getAnimalInfo = async () => {
            setLoading(true);

            let json = await Api.getAnimal(userInfo.id);
            if(json.error == '') {
                setUserInfo(json.data);
            } else {
                alert("Erro:"+json.error);
            }
            setLoading(false);
        }
        getAnimalInfo();
    },[]);

    return(
        <Container>
            <Scroller>
                {userInfo.photos && userInfo.photos.length > 0 ?
                    <Swiper
                        style={{height: 240}}
                        dot={<SwipeDot/>}
                        activeDot={<SwipeDotActive/>}
                        paginationStyle={{top: 15, right: 15, bottom: null, left: null}}
                        autoplay={true}
                    >
                        {userInfo.photos.map((item, key)=>(
                            <SwipeItem key={key}>
                                <SwipeImage source={{uri:item.url}} resizeMode="cover" />
                            </SwipeItem>
                        ))}
                    </Swiper>
                    :
                    <FakeSwiper>

                    </FakeSwiper>
                }
                <PageBody>
                    <UserInfoArea>
                        
                    </UserInfoArea>
                    <ServiceArea>

                    </ServiceArea>
                    <Descrition>

                    </Descrition>
                </PageBody>
            </Scroller>
        </Container>
    );
}