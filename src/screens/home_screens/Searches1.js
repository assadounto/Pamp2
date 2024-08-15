import { useTheme } from '@rneui/themed';
import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Alert, Platform, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Icon, Input } from '@rneui/base';
import { FontFamily } from '../../GlobalStyles';
import SafeAreaTop from '../../../components/SafeAreaTop';
import Filter from '../../../components/icons/Filter';
import VendorSearchCon from '../../../components/VendorSearchCont';
import axios from 'axios';
import { backendURL } from '../../services/http';
import { makeStyles } from '@rneui/themed';
import { setFilter } from '../../redux/filter';
import { useDispatch, useSelector } from 'react-redux';
import SearchFilter from '../../../components/SearchFilter';
const Searches1 = ({ navigation, route }) => {
  const { query, lat, lon, sort, price, type, distance, category, locationName } = route.params;
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [total_entry,setTotalEntry]= useState(0)
  const [totalPages, setTotalPages] = useState(1);
  const [modal, setModal] = useState(false);
  const filter = useSelector(state => state.filter);
  const { theme } = useTheme();
  const inputRef = React.useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchData(1); // Fetch the first page of data
  }, [query, lat, lon, sort, price, type, distance, category, locationName]);

  const fetchData = async (page=1) => {
    console.log(page,'pagr')
    if (loading) return; // Avoid duplicate requests

    setLoading(true);
      console.log(filter.type,'dis')
    try {
      let url = `${backendURL}/search?lat=${lat}&lon=${lon}&sort=${filter.sort}&price=${filter.price}&type=${filter.type}&distance=${filter.distance}&page=${page}`;
      if (query) {
        url += `&query=${query}`;
      }
      if (category) {
        url += `&category=${category}`;
      }
      const response = await axios.get(url);
   if (!response.data.vendors){
     setData([])
     setTotalEntry(0)
     setTotalPages(1);
     return
   }
      if (page === 1) {
        setData(thedata(response.data.vendors));
        
        console.log(response.data.vendors.length,'[')
      } else {
        setData((prevData) => [...prevData, ...thedata(response.data.vendors)]);
        
      }
      console.log(response.data.total_entries,'hh')
      setTotalEntry(response.data.total_entries)
      setTotalPages(response.data.total_pages);
    } catch {
      Alert.alert('Error', 'Network error. Please check your internet connection and try again.');
    } finally {
      setLoading(false);
    }
  };
  const loadMore = () => {
    console.log(page,'load')
    if (page < totalPages) {
      fetchData(page + 1);
      setPage(page + 1);
    }
  };

  const s_style = useStyles();
  const thedata = (dat) => {
    let info = []
    dat.map((vendor) => {
      info.push({
        id: vendor.id,
        image: vendor.cover_url,
        logo: vendor.avatar_url,
        name: vendor.username,
        location: vendor.name,
        dist: vendor.distance,
        home: vendor.home,
        avatar_thumbnail: vendor.avatar_thumbnail,
        cover_thumbnail: vendor.cover_thumbnail,
        ratings: vendor.ratings,
        badge: vendor.badge,
        items: vendor.top_services && vendor.top_services.split(",").map((item) => {
          return {
            value: item
          }
        }
        )
      }
      )
    })
    return info
  }
  return (
    <>
      <SafeAreaTop>

        <TouchableOpacity activeOpacity={1} style={[s_style.text_input]}>
          <Icon onPress={()=>navigation.navigate('main')} style={s_style.icon} name='chevron-back' type="ionicon" size={25} color='#BCC4CC' />
          <TextInput
            ref={inputRef}
            onFocus={() => navigation.navigate('Search')}
            style={{ flex: 1, maxWidth: 220, color: theme.colors.dg }}
            placeholder='Search for a service or venue'
            placeholderTextColor={theme.colors.placeholder}
            keyboardType="web-search"
            value={locationName}
         
          />
          <TouchableOpacity style={s_style.activityIndicator} onPress={() => setModal(!modal)}>
            <Filter size={25} color='#BCC4CC' />
          </TouchableOpacity>
        </TouchableOpacity>
        <VendorSearchCon total_entry={total_entry} loading={loading} loadmore={loadMore} category={category||query} datas={data} navigation={navigation} />
      </SafeAreaTop>
      <SearchFilter setPage={setPage} modal={modal} setModal={setModal} search={fetchData} />
    </>
  );
};

export default Searches1;
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

