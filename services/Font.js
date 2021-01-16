import * as Font from 'expo-font';

export const loadFont = () => {
    let [fontsLoaded] = Font.useFonts({
        'RobotoRegular': require('../assets/fonts/Roboto-Regular.ttf'),
        'RobotoBold': require('../assets/fonts/Roboto-Bold.ttf'),
        'RobotoLight': require('../assets/fonts/Roboto-Light.ttf')
    });
    return(fontsLoaded);

} 

