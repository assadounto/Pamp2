import { makeStyles } from '@rneui/themed';
import { useTheme, Button, Slider } from '@rneui/themed';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text, View, Modal, Pressable } from 'react-native';
import { verticalScale, horizontalScale } from '../src/Dimensions';
import Selector from './Selector';
import { FontFamily } from '../GlobalStyles';
import { Icon } from '@rneui/base';
import { setFilter } from '../src/redux/filter';
import Blur from '../src/screens/start_screens/Blur';

const SearchFilter = ({search,modal,setModal,setPage}) => {
    const { theme } = useTheme();
    const dispatch = useDispatch();
    const filter = useSelector(state => state.filter);
    const location = useSelector(state => state.user.location); // Assuming you have this in your state

    const styles = useStyles();

    const handleSubmit = async () => {
        try {
            // Reset to the first page
            setModal(!modal); // Toggle the modal state

            if (search && typeof search === 'function') {
                setPage(1); 
                await search(); // Trigger the search with the updated filter criteria
            } else {
                console.error('Search is not a function');
            }
        } catch (error) {
            console.error('Error occurred while searching:', error);
        }
    };

    function convertMetersToReadableFormat(meters) {
        if (meters < 1000) {
            return `${meters}m`;
        } else {
            const kilometers = meters / 1000;
            return `${kilometers.toFixed(1)}km`;
        }
    }

    return (
        <>
 
        <Modal animationType='slide' transparent={true} visible={modal}>
            <View style={styles.pop2}>
                <Text style={styles.title}>Filter</Text>
                <Pressable onPress={() => setModal(!modal) } style={styles.close}>
                    <Icon
                        type='ionicon'
                        size={30}
                        name='close-outline'
                        color={theme.colors.dg}
                    />
                </Pressable>
                <Selector label={'Sort by'} name={filter.sort} setItem={(sort) => dispatch(setFilter({ sort }))} items={['Recommended', 'Newest', 'Nearest', 'Top rated']} />
                <View style={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between' }}>
                    <Text style={styles.text}>Distance</Text>
                    <Text style={styles.text}>{convertMetersToReadableFormat(filter.distance)}</Text>
                </View>
                <Slider
                    value={filter.distance}
                    onValueChange={(distance) => dispatch(setFilter({ distance }))}
                    maximumValue={50000}
                    minimumValue={0}
                    step={1}
                    orientation="horizontal"
                    minimumTrackTintColor={theme.colors.lg}
                    maximumTrackTintColor={theme.colors.slate}
                    trackStyle={{ backgroundColor: 'red', borderRadius: 20 }}
                    thumbStyle={{ width: 20, height: 20, backgroundColor: theme.colors.lg }}
                />
                <View style={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between' }}>
                    <Text style={styles.text}>Price</Text>
                    <Text style={styles.text}>{filter.price}</Text>
                </View>
                <Slider
                    value={filter.price}
                    onValueChange={(price) => dispatch(setFilter({ price }))}
                    maximumValue={500}
                    minimumValue={0}
                    step={1}
                    orientation="horizontal"
                    minimumTrackTintColor={theme.colors.lg}
                    maximumTrackTintColor={theme.colors.slate}
                    trackStyle={{ backgroundColor: 'red', borderRadius: 20 }}
                    thumbStyle={{ width: 20, height: 20, backgroundColor: theme.colors.lg }}
                />
                <Selector label={'Service type'} name={filter.type} setItem={(type) => dispatch(setFilter({ type }))} items={['All', 'Salon', 'Home']} />
                <Button
                    title="Save"
                    onPress={handleSubmit}
                    titleStyle={styles.tbtn}
                    buttonStyle={styles.button}
                />
            </View>
        </Modal>
              { modal && <Blur /> }
        </>
    );
};

const useStyles = makeStyles((theme) => ({
    title: {
        fontFamily: FontFamily.sourceSansProBold,
        fontSize: 24,
        color: theme.colors.dg,
        textAlign: 'center'
    },
    close: {
        position: "absolute",
        right: 30,
        top: 25
    },
    text: { marginVertical: 18, fontSize: 15, fontFamily: FontFamily.sourceSansProSemibold, color: theme.colors.dg },
    button: {
        width: '90%',
        height: verticalScale(61),
        backgroundColor: '#86D694',
        borderWidth: horizontalScale(1),
        borderColor: '#86D694',
        marginVertical: verticalScale(20),
        alignSelf: 'center',
        borderRadius: horizontalScale(25),
    },
    tbtn: {
        fontFamily: FontFamily.sourceSansProBold
    },
    pop2: {
        position: 'absolute',
        bottom: verticalScale(0),
        backgroundColor: theme.colors.card,
        borderRadius: horizontalScale(20),
        alignSelf: 'center',
        padding: horizontalScale(25),
        alignContent: 'center',
        width: '100%',
    },
}));

export default SearchFilter;
