import {color, Text} from '@rneui/base';
import {StyleSheet} from 'react-native';
import {FontFamily} from './GlobalStyles';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
  },
  mt100: {
    marginTop: 100,
  },
  mt10: {
    marginTop: 10,
  },
  mb20: {
    marginBottom: 20,
  },
  textInput: {
    marginBottom:20,
    paddingHorizontal:20,
    fontSize:14,
    width: 330,
    height: 63,
    margin:0,
    alignSelf:'center',
    backgroundColor: '#EFEFEF',
    borderRadius: 23,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    fontFamily: FontFamily.sourceSansProRegular
  },
  t1: {
    fontSize: 26,
    color: '#00463C',
    fontFamily: FontFamily.sourceSansProBold,
  },
  t2: {
    fontSize: 15,
    color: '#00463C',
    fontFamily: FontFamily.sourceSansProRegular,
  },
  t3: {
    fontSize: 15,
    color: '#00463C',
    fontFamily: FontFamily.sourceSansProRegular,
   marginTop:-20,
    alignSelf: 'center',
  },
  t4: {
    fontSize: 15,
    color: '#B0EBBD',
    fontFamily: FontFamily.sourceSansProBold,
    marginTop: 20,
    alignSelf: 'center',
  },
  t5: {
    fontSize: 14,
    color: '#000000',
    fontFamily: FontFamily.sourceSansProRegular,
    marginLeft: 20,
    alignSelf: 'center',
  },
  t6: {
   
   
width:'85%'

   
  },
  m1: {
    margin: 10,
  },
  terms: {
    marginHorizontal: 10,
    marginTop:10,
    fontFamily:FontFamily.sourceSansProRegular
  },
  check: {
    width: 18,
    height: 18,
    resizeMode: 'center',
  },
  checkc: {
    width: 23,
    height: 23,
    padding: 3,
    backgroundColor: '#B0EBBD',
    borderRadius: 5,
   alignItems: 'center',
   ustifyContent: 'center',
  },
  button: {
    width: 330,
    height: 71,
    backgroundColor: '#86D694',
    borderWidth: 1,
    borderColor: '#86D694',
    marginBottom: 10,
    alignSelf: 'center',
    borderRadius: 23,
  },
  scroll: {
    backgroundColor: 'white',
  },
  input: {
    marginTop: 60,
  },
  input2: {
    marginTop: 30,
    alignItems: 'center',
    textAlign: 'center',
  },
  image: {
  
    alignSelf: 'center',
  },
  press: {
    display: 'flex',
    flexDirection: 'row',
    borderColor: '#DEDCDC',
    backgroundColor:'white',
    borderRadius: 23,
    width: 330,
    height: 71,
    alignSelf: 'center',
  },
  forgot: {
    color: '#BBB9BC',
    fontSize: 15,
    alignSelf: 'flex-end',
    marginRight: 20,
    marginBottom: 60,
  },
  bold: {
    fontWeight: 'bold',
  },
  head: {
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 20,
    backgroundColor: 'white',
    marginBottomColor: 'white',
  },
  fs25: {
    fontSize: 26,
  },
  fs18: {
    fontSize: 18,
    width: 230,
  },
  tc: {
    alignSelf: 'center',
    flexWrap: 'wrap',
    fontFamily: FontFamily.sourceSansProRegular
  },

  resethead: {
    width: '80%',
  },
  pop: {
    marginTop: 300,
    width: '95%',
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 20,
    alignSelf: 'center',
    padding: 10,
    
  },

  pop2: {
    position:'absolute',
    bottom:40,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 20,
    alignSelf: 'center',
    padding: 40,
    width: '95%',
    height: 324,
  },
  popimg: {
    resizeMode: 'center',
  },
  tac: {
    textAlign: 'center',
  },
  f1: {
    fontFamily: FontFamily.sourceSansProRegular,
    fontSize: 25,
  },
  Pmain: {
    borderRadius: 40,
    paddingHorizontal: 30,
    backgroundColor: '#ffff',
    width: '90%',
    alignSelf: 'center',
    marginBottom: 20,
  },
  Pcont: {
    backgroundColor: '#F9F9F9',
    marginTop: 30,
  },

  P1: {
    fontFamily: FontFamily.sourceSansProSemibold,
    fontSize: 18,
    color: '#00463C'
  },
  P2: {
    fontFamily: FontFamily.sourceSansProRegular,
    fontSize: 15,
  },
  Pmargin: {
    marginBottom: 20,
  },
  Da: {
    padding: 10,
    marginBottom: 50,
    height: 60,
  },
  EP: {
    backgroundColor: '#ffff',
    width: '90%',
    alignSelf: 'center',
  },
  EI: {
    width: '90%',
    alignSelf:'center',
    borderColor: '#86D694',
    paddingHorizontal:10,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    height:42
  },
  St1: {
    fontFamily: FontFamily.sourceSansProBold,
    fontSize: 26,
    color: '#86D694',
    marginTop: 60,
    marginLeft: 20,
  },
  option: {
    fontSize: 13,
    fontFamily: FontFamily.sourceSansProRegular,
    textAlign: 'center',
  },
  unselected: {
    backgroundColor: 'white',
    borderRadius: 20,
    height:34,
    padding:8,
    marginBottom:30,
    borderColor:'#B0EBBD',
    borderWidth: 1,
    marginHorizontal:7

  },

  selected: {
    backgroundColor: '#86D694',
    borderRadius: 20,
    color: 'white',
    height:34,
    padding:8,
    marginBottom:20,
    marginHorizontal:7
  },
});

export const colors = StyleSheet.create({
  lg: {
    color: '#B0EBBD',
  },
  dg: {
    color: '#00463C',
  },
  w: {
    color: '#FFFFFF',
  },
  dgb: {
    color: '#00463C',
  },
  dg2: {
    color: '#86D694',
  },
  bw: {
    backgroundColor: '#FFFFFF',
  },
  Pc: {
    backgroundColor: '#F9F9F9',
  },
});
