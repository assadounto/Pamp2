import { makeStyles } from '@rneui/themed';
import { useTheme } from '@rneui/themed';
import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, SafeAreaView } from 'react-native'


const Category_detail = () => {


  const { theme } = useTheme();

  return (
    <SafeAreaView>≈
      <Text style={{ color: 'red' }}>Fav</Text>
    </SafeAreaView>
  )
}

export default Category_detail 
