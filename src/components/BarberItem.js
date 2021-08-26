import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';


const Area = styled.TouchableOpacity`
  background-color: #ffffff;
  margin-bottom: 20px;
  border-radius: 20px;
  padding: 15px;
  flex-direction: row;
`;

const Avatar = styled.Image`
  width: 88px;
  height: 88px;
  border-radius: 20px;
`;

const InfoArea = styled.View`
  margin-left: 20px;
  justify-content: space-between;
`;

const UserName = styled.Text`
  font-size: 17px;
  font-weight: bold;
`;

const SeeProfileButtom = styled.View`
  width: 126px;
  height: 46px;
  border: 1px solid #ffa300;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

const SeeProfileButtomText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #ffb637;
`;



export default ({data}) => {
  
  const navigation = useNavigation();

  const handleClick = () => {
      navigation.navigate('Pet', {
        id: data.id,
        avatar: data.avatar,
        name: data.name
      });
  }

  return (
    <Area onPress={handleClick} >
      <Avatar source={{uri: data.avatar}} />
      <InfoArea>
        <UserName>{data.name}</UserName>

        <SeeProfileButtom>
          <SeeProfileButtomText>Ver mais detalhes</SeeProfileButtomText>
        </SeeProfileButtom>
      </InfoArea>
    </Area>
  );
};
