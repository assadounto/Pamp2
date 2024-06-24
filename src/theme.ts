import { createTheme } from '@rneui/themed';

const theme = createTheme({
    lightColors: {
        lg:'#86D694',//#BCC4CC
        dg: '#00463C',
        card: 'white',
        lgb: '#86D694',
        white:'#ffff',
        slate: '#F7F7F7',
        activeTabBg:  '#86D694',
        tabColorActive: '#F9F9F9',
        tabColor: '#86D694',
        placeholder: '#BBB9BC',
        linkBorder: '#BBB9BC',
        caution: '#F9F9F9'
    },
    darkColors: {
        lg: '#86D694',
        dg: '#F8FAFC',
        card: '#1C1C1E',
        lgb: '#86D694',
        white: '#ffff',
        slate: '#1C1C1E',
        activeTabBg: '#1C1C1E',
        tabColorActive: '#F9F9F9',
        tabColor: '#3E3E40',
        placeholder: '#ffff',
        linkBorder: 'white',
        caution: '#707070'
    },



});



export { theme };