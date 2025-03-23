import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { appColors } from '../constant/appColors'
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = {}

const Header = (props: Props) => {
    const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
        <Text style = {styles.logo}>OREBI</Text>
        <TouchableOpacity style = {styles.searchBar}>
            <Text style = {styles.searchTxt}>Search</Text>
            <Icon name='search' size={20} color={appColors.gray}/>
        </TouchableOpacity>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent:'center',
        backgroundColor: appColors.white,
        paddingHorizontal: 20,
        paddingBottom: 10,
        gap: 15
    },
    logo: {
        fontSize: 24,
        fontWeight: '700',
        color: appColors.orange,
    },
    searchBar: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    searchTxt: {
        color: appColors.gray,
    }
})