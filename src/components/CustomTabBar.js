import React, {useContext} from 'react';
import styled from 'styled-components/native';
import {UserContext} from '../contexts/UserContext';
import Home from '../assets/Home.svg';
import Profile from '../assets/Profile.svg';
import Search from '../assets/Search.svg';
import Favorites from '../assets/Favorites.svg';
import AddPet from '../assets/AddPet.svg';

const TabArea = styled.View`
  height: 60px;
  background-color: #ffa300;
  flex-direction: row;
`;

const TabItemCenter = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border-radius: 35px;
  border: 3px solid #ffa300;
  margin-top: -20px;
`;

const TabItem = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const AvatarIcon = styled.Image`
  width: 24px;
  height: 24px;
  border-radius: 12px;
`;

export default ({state, navigation}) => {
  const {state: user} = useContext(UserContext);

  const goTo = screenName => {
    navigation.navigate(screenName);
  };

  return (
    <TabArea>
      <TabItem onPress={() => goTo('Home')}>
        <Home
          style={{opacity: state.index === 0 ? 1 : 0.5}}
          width="24"
          height="24"
          fill="#FFFFFF"
        />
      </TabItem>
      <TabItem onPress={() => goTo('Search')}>
        <Search
          style={{opacity: state.index === 1 ? 1 : 0.5}}
          width="30"
          height="30"
          fill="#FFFFFF"
        />
      </TabItem>
      <TabItemCenter onPress={() => goTo('AddPet')}>
        <AddPet width="32" height="32" fill="#FFA300" />
      </TabItemCenter>
      <TabItem onPress={() => goTo('Favorites')}>
        <Favorites
          style={{opacity: state.index === 3 ? 1 : 0.5}}
          width="24"
          height="24"
          fill="#FFFFFF"
        />
      </TabItem>
      <TabItem onPress={() => goTo('Profile')}>
        {user.avatar != '' ? (
          <AvatarIcon source={{uri: user.avatar}} />
        ) : (
          <Profile
            style={{opacity: state.index === 4 ? 1 : 0.5}}
            width="24"
            height="24"
            fill="#FFFFFF"
          />
        )}
      </TabItem>
    </TabArea>
  );
};
