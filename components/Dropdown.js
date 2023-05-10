import React, {  useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Icon} from '@rneui/base';
import { use } from '../src/redux/homeapi';
import Modal_Pop from './Modal';
import { Border } from '../GlobalStyles';


const Dropdown = ({ label,onselect ,setOption}) => {
  const [visible, setVisible] = useState(false);
 
  const toggleDropdown = () => {
    setVisible(!visible);
    onselect(true)
  };

  const renderDropdown = () => {
    if (visible) {
      return (
         <Modal_Pop  setOption={setOption} onchange={(val)=>{setVisible(val);onselect(val)}} />
      );
    }
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={toggleDropdown}
    >
      {renderDropdown()}
      <Text style={styles.buttonText}>{label}</Text>
      <Icon type='font-awesome' name='chevron-down' color={'#B0EBBD'} size={15}/>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf:'center',
    height: 50,
    width: '90%',
    paddingHorizontal: 20,
    zIndex: 1,
    borderColor:'#B0EBBD',
    borderWidth:1,
    borderRadius:20
    
  },
  buttonText: {
    flex: 1,
    color:'#BBB9BC',
    textAlign: 'left',
    fontSize:14
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: '#fff',
    top: 50,
  },
});

export default Dropdown;