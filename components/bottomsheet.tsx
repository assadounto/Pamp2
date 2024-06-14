import { useTheme } from '@rneui/themed';
import { makeStyles } from '@rneui/base';
import React, { useCallback, useMemo, useRef, forwardRef, useImperativeHandle } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Gsearch from './Gsearch';

const Bottom = forwardRef((props, ref) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%', '75%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleSearch = async () => {
    // Add your search logic here
  };

  // expose function to parent component using ref
  useImperativeHandle(ref, () => ({
    handlePresentModalPress: () => {
      bottomSheetModalRef.current?.present();
    },
  }));

  // renders
  const styles = useStyles();
const { theme} = useTheme();
return (
    <BottomSheetModalProvider>
  
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <View style={styles.contentContainer}>
            <Gsearch setLoc={handleSearch} handleS={handleSearch} />
          </View>
        </BottomSheetModal>
 
    </BottomSheetModalProvider>
  );
});

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    padding: 24,
  
  },
  contentContainer: {
    flex: 1,
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    backgroundColor: '#EFEFEF',
        padding: 16,
  },
}));

export default Bottom;
