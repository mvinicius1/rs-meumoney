
import React from 'react';
import { Register } from './src/screens/Register';
import { ThemeProvider } from 'styled-components';
import theme from './src/global/styles/theme';
import {
        useFonts,
        Roboto_400Regular,
        Roboto_500Medium,
        Roboto_700Bold
} from '@expo-google-fonts/roboto';
import AppLoading from 'expo-app-loading';


export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold
  });
  
  if (!fontsLoaded){
    return <AppLoading/>
  };

  return (
    <ThemeProvider theme={theme}>
      <Register />
    </ThemeProvider>

  );
}

