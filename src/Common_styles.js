import {color, Text} from '@rneui/base';
import {StyleSheet} from 'react-native';
import {FontFamily} from './GlobalStyles';
import { verticalScale,horizontalScale,moderateScale } from './Dimensions';
export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
  },
  mt100: {
    marginTop: verticalScale(100),
  },
  mt10: {
    marginTop: verticalScale(10),
  },
  mb20: {
    marginBottom: verticalScale(20),
  },
  textInput: {
    marginBottom:verticalScale(20),
    paddingHorizontal:horizontalScale(20),
    fontSize:moderateScale(14),
    width: horizontalScale(330),
    height: verticalScale(63),
    margin:0,
    
    alignSelf:'center',
    backgroundColor: '#FAFAFA',
    borderRadius: horizontalScale(23),
    borderWidth: 1,
    borderColor: '#FAFAFA',
    fontFamily: FontFamily.sourceSansProRegular
  },
  t1: {
    fontSize: moderateScale(26),
    color: '#00463C',
    marginBottom:10,
    fontFamily: FontFamily.sourceSansProBold,
  },
  tbtn:{
    fontFamily:FontFamily.sourceSansProBold
  },
  t2: {
    fontSize: moderateScale(16),
    color: '#BBB9BC',
    textAlign:'center',
    width:'60%',
    marginBottom:10,
    fontFamily: FontFamily.sourceSansProRegular,
  },
  t3: {
    fontSize: moderateScale(15),
    color: '#00463C',
    fontFamily: FontFamily.sourceSansProRegular,
   marginTop:verticalScale(-20),
    alignSelf: 'center',
  },
  t4: {
    fontSize: moderateScale(14),
    color: '#B0EBBD',
    fontFamily: FontFamily.sourceSansProBold,
    marginTop: verticalScale(20),
    alignSelf: 'center',
  },
  t5: {
    fontSize: moderateScale(14),
    color: '#000000',
    fontFamily: FontFamily.sourceSansProRegular,
    marginLeft: horizontalScale(20),
    alignSelf: 'center',
  },
  t6: {
   
marginTop:-20,
width:'85%'

   
  },
  m1: {
    margin: horizontalScale(10),
  },
  terms: {
    marginHorizontal: horizontalScale(10),
    marginTop:verticalScale(10),
    fontFamily:FontFamily.sourceSansProRegular
  },
  check: {
    width: horizontalScale(18),
    height: verticalScale(18),
    resizeMode: 'center',
  },
  checkc: {
    width: horizontalScale(23),
    height: verticalScale(23),
    padding: horizontalScale(3),
    backgroundColor: '#B0EBBD',
    borderRadius: horizontalScale(5),
   alignItems: 'center',
   ustifyContent: 'center',
  },
  button: {
    width: horizontalScale(330),
    height: verticalScale(71),
    backgroundColor: '#86D694',
    borderWidth: horizontalScale(1),
    borderColor: '#86D694',
    marginBottom: verticalScale(10),
    alignSelf: 'center',
    borderRadius: horizontalScale(23),
  },
  scroll: {
    backgroundColor: 'white',
  },
  input: {
    marginTop: verticalScale(20),
  },
  input2: {
    marginTop: verticalScale(30),
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
    borderRadius: horizontalScale(23),
    width: horizontalScale(300),
    height: verticalScale(71),
    alignSelf: 'center',
  },
  forgot: {
    color: '#BBB9BC',
    fontSize: moderateScale(14),
    marginTop:verticalScale(17),

    textAlign:'right'
  },
  bold: {
    fontWeight: 'bold',
  },
  head: {
    alignItems: 'center',
    marginBottom: verticalScale(15),
    marginTop: verticalScale(20),
    backgroundColor: 'white',
    marginBottomColor: 'white',
  },
  fs25: {
    fontSize: moderateScale(26),
  },
  fs18: {
    fontSize: moderateScale(18),
    width: moderateScale(230),
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
    marginTop: verticalScale(300),
    width: '95%',
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: horizontalScale(20),
    alignSelf: 'center',
    padding: horizontalScale(10),
    
  },

  pop2: {
    position:'absolute',
    bottom:verticalScale(40),
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent:'center',
    borderRadius: horizontalScale(20),
    alignSelf: 'center',
    padding: horizontalScale(40),
   alignContent:'center',
    
    width: '95%',
    height: verticalScale(250),
  },
  popimg: {
    resizeMode: 'center',
  },
  tac: {
    textAlign: 'center',
  },
  f1: {
    fontFamily: FontFamily.sourceSansProRegular,
    fontSize: moderateScale(25),
  },
  Pmain: {
    borderRadius: horizontalScale(40),
    paddingHorizontal: horizontalScale(30),
    backgroundColor: '#ffff',
    width: '90%',
    alignSelf: 'center',
    marginBottom: verticalScale(30),
  },
  Pcont: {
    backgroundColor: '#F9F9F9',
    marginTop: verticalScale(30),
  },

  P1: {
    fontFamily: FontFamily.sourceSansProSemibold,
    fontSize: moderateScale(18),
    color: '#00463C'
  },
  P2: {
    fontFamily: FontFamily.sourceSansProRegular,
    fontSize: moderateScale(15),
  },
  Pmargin: {
    marginBottom: horizontalScale(20),
  },
  Da: {
    padding: horizontalScale(10),
    marginBottom: verticalScale(50),
    height: verticalScale(60),
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
    paddingHorizontal:horizontalScale(10),
    borderWidth: horizontalScale(1),
    borderRadius: horizontalScale(10),
    marginBottom: verticalScale(20),
    height:verticalScale(42),
    color:"#86D694"
  },
  St1: {
    fontFamily: FontFamily.sourceSansProBold,
    fontSize: moderateScale(26),
    color: '#86D694',
    marginTop: verticalScale(60),
    marginLeft: horizontalScale(20),
    paddingBottom:verticalScale(10)
  },
  option: {
    fontSize: moderateScale(13),
    fontFamily: FontFamily.sourceSansProRegular,
    textAlign: 'center',
  },
  unselected: {
    backgroundColor: 'white',
    borderRadius: horizontalScale(20),
    height:verticalScale(34),
    padding:horizontalScale(8),
    marginBottom:verticalScale(30),
    borderColor:'#B0EBBD',
    borderWidth: 1,
    marginHorizontal:horizontalScale(7)

  },

  selected: {
    backgroundColor: '#86D694',
    borderRadius: horizontalScale(20),
    color: 'white',
    height:verticalScale(34),
    padding:horizontalScale(8),
    marginBottom:verticalScale(20),
    marginHorizontal:horizontalScale(7)
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
  slate:{
    color:"#DAECD2"
  },
  faded:{
    color: '#BBB9BC',
  },

  bw: {
    backgroundColor: '#FFFFFF',
  },
  Pc: {
    backgroundColor: '#F9F9F9',
  },
});
