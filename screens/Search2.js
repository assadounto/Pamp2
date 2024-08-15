import { useTheme } from '@rneui/themed';
import { makeStyles } from '@rneui/themed';
import * as React from "react";
import { FontFamily } from '../GlobalStyles';
import Filter from '../components/icons/Filter';
import { StyleSheet, View, Text, ActivityIndicator, Pressable, Image, TextInput, SafeAreaView, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useGetcategoriesQuery } from "../src/redux/authapi";
import Categories from "../components/Categories";
import { addRecent } from "../src/redux/user";
import SearchFilter from '../components/SearchFilter';
import { setFilter } from '../src/redux/filter';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from "@rneui/base";
import GooglePlacesSearchModal from "../components/Gsearch";
import Gsearch from "../components/Gsearch";
import { backendURL } from "../src/services/http";
import SafeAreaTop from '../components/SafeAreaTop';

const initData = [
  { value: 'All categories' },
];

const Search2 = ({ route }) => {
  const { open = false } = route.params ? route.params : {}
  const filter = useSelector(state => state.filter);
  const [show, setShow] = React.useState(false);
  const dispatch = useDispatch();
  const [showfilter, setShowfilter] = React.useState(false);
  const [loc, setLoc] = React.useState();
  const inputRef = React.useRef(null);
  const userstate = useSelector((state) => state.user);
  const { data } = useGetcategoriesQuery('Popular');
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [option, setoption] = React.useState('');
  const [location, setLocation] = React.useState({ name: 'amasaman' });

  const setNewLocation = (lat, lon, name) => {
    setLoc({ lat, lon, name });
  };
console.log(filter,'s')
  const [query, setQuery] = React.useState('');
  const handleSave=()=>{
    if (query){
      handleSearch()
    } 
  }
  const handleSearch = () => {
    navigation.navigate('Searches1', { query, locationName: loc.name, lat: loc.lat, lon: loc.lon, sort: filter.sort, price: filter.price, type: filter.type, distance: filter.distance });
  };

  const data1 = data && initData.concat(data.map((cat) => {
    return { value: cat.name };
  }));

  const searchRecent = () => {
    if (userstate.recent_view.cat == 'cat') {
      navigation.navigate('Searches1', { locationName: loc.name, category: userstate.recent_view.search, lat: loc.lat, lon: loc.lon, sort: filter.sort, price: filter.price, type: filter.type, distance: filter.distance });
    } else {
      setQuery(userstate.recent_view.search);
      handleSearch();
    }
  };


  const s_style = useStyles();
  const { theme } = useTheme();

  return (
    <>
      <SafeAreaTop>
        <TouchableOpacity activeOpacity={1} style={[s_style.text_input]}>
          <Icon style={s_style.icon} name='search' type="feather" size={25} color='#BCC4CC' />
          <TextInput
            ref={inputRef}
            onFocus={() => setShow(false)}
            style={{ flex: 1, color: theme.colors.dg }}
            autoFocus={true}
            placeholder='Search for a service or venue'
            onChangeText={setQuery}
            placeholderTextColor={theme.colors.placeholder}
            keyboardType="web-search"
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity style={s_style.activityIndicator} onPress={() => setModalVisible(!modalVisible)}>
             <Filter size={25} color='#BCC4CC' />
          </TouchableOpacity>
        </TouchableOpacity>
        <Gsearch handleS={handleSearch} show={show} setShow={setShow} setLoc={setNewLocation} />
        {!show && (
          <Categories
            data={data1}
            onSelect={(val) => {
              setoption(val);
              dispatch(addRecent({ cat: 'cat', search: val }));
              navigation.navigate('Searches1', { category: val, lat: loc.lat,locationName:loc.name, lon: loc.lon, sort: filter.sort, price: filter.price, type: filter.type, distance: filter.distance });
            }}
          />
        )}
        {userstate.recent_view.search && !show && (
          <View style={{ marginHorizontal: 30, marginVertical: 120 }}>
            <Text style={s_style.recent_view}>Recent Searches</Text>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <TouchableOpacity onPress={searchRecent} style={s_style.recent_cont}>
                <Image source={require('../assets/search1.png')} />
              </TouchableOpacity>
              <View style={s_style.text_cont}>
                <Text style={{ color: theme.colors.dg, fontFamily: FontFamily.sourceSansProRegular, fontSize: 17 }}>
                  {userstate.recent_view.search}
                </Text>
              </View>
            </View>
          </View>
        )}
      </SafeAreaTop>
      <SearchFilter modal={modalVisible}  setModal={setModalVisible} search={handleSave} />
    </>
  );
};

export default Search2


const useStyles = makeStyles((theme) => ({
  activityIndicator: {
    position: "absolute", right: 20,
    alignSelf: 'center',

  },
  text_cont: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    height: 56, borderRadius: 20,
  },
  recent_cont: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 56,
    height: 56, borderRadius: 20,
    backgroundColor: theme.colors.lgb
  },
  recent_view: {
    fontFamily: FontFamily.sourceSansProSemibold,
    fontSize: 26,
    color: theme.colors.lg,
    marginVertical: 30
  },
  text_input: {

    backgroundColor: theme.colors.slate,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: theme.colors.slate,
    height: 63,
    width: '90%',
    color: theme.colors.dg,
    paddingHorizontal: 10,
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,

  },
  icon: {
    margin: 15,
    marginTop: 18

  },
  icon2: {
    marginTop: 15,
    alignSelf: 'flex-start'
  },
  text: {
    width: '70%',
    marginTop: 20

  },
  centeredView: {

    width: '100%',
    top: '50%',
    marginTop: 82,
    height: '50%'

  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'red',
    width: '100%',
    top: '30%',
    height: '50%',
    backgroundColor: theme.colors.card,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  mb_20: {
    marginBottom: 20
  }

}))

