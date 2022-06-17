import styled, {css} from "styled-components/native";
import {Feather} from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";

interface IconProps{
    type: 'up' | 'down';
}

interface ButtonProps{
    isActive: boolean;
    type: 'up' | 'down';
}

export const Container = styled.TouchableOpacity<ButtonProps>`
width: 48%;
flex-direction: row;
align-items: center;
border-width: ${({isActive}) => isActive? 0 : 1.5}px;
border-style: solid;
border-color: ${({theme}) => theme.colors.text};
border-radius: 5px;
padding: 16px 32px;
justify-content: center;

${({isActive , type}) => isActive && type =='down' && css`
    background-color: ${({theme}) => theme.colors.attention_light};
`};

${({isActive , type}) => isActive && type =='up' && css`
    background-color: ${({theme}) => theme.colors.sucess_ligth};
`};

`;

export const Icon = styled(Feather)<IconProps>`
font-size: ${RFValue(24)}px;
margin-right:12px;
color: ${({theme, type}) =>
    type === 'up'? theme.colors.sucess : theme.colors.attention
}
`;

export const Title = styled.Text`
font-size: ${RFValue(14)}px;
font-family:${({theme}) => theme.fonts.regular}
`
;