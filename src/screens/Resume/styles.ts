import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import {Feather} from '@expo/vector-icons';

export const Container = styled.View`
background-color: ${({theme}) => theme.colors.background};
flex:1;
`;

export const Header = styled.View`
background-color: ${({ theme }) => theme.colors.primary};
width: 100%;
height: ${RFValue(113)}px;
align-items: center;
justify-content: flex-end;
padding-bottom: 19px;
`;

export const Title = styled.Text`
color: ${({ theme }) => theme.colors.shape};
font-family: ${({ theme }) => theme.fonts.regular};
font-size: ${RFValue(18)}px;
`;    

export const Content = styled.ScrollView`
padding: 24px;
`

export const MonthSelect = styled.View`
 width: 100%;
 flex-direction: row;
 justify-content: space-between;
 align-items: center;
 margin: 24px 0;
`;

export const MonthSelectButton = styled.TouchableOpacity`
`;

export const MonthSelectIcon = styled(Feather)`
font-size: ${RFValue(24)}px;
`;

export const MonthText = styled.Text`
font-family: ${({theme}) => theme.fonts.regular};
font-size: ${RFValue(20)}px;
`;

