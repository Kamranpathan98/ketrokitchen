import { StyleSheet, Image, View } from 'react-native'
import React from 'react'
import Swiper from 'react-native-swiper'

const OfferSlider = () => {
  return (
    <View style={styles.container}>
      <Swiper autoplay={true} autoplayTimeout={2} dotColor='black' activeDotColor='gold'>
        <View>
            <Image source={require("@/assets/images/Logo-101.jpg")} style={styles.image}/>
        </View>
        <View>
            <Image source={require("@/assets/images/Logo-102.jpg")} style={styles.image}/>
        </View>
        <View>
            <Image source={require("@/assets/images/Logo-103.jpg")} style={styles.image}/>
        </View>
      </Swiper>
    </View>
  )
}

export default OfferSlider

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 210,
        marginVertical: 10,
        paddingHorizontal:18
    },
    image : {
        width: "100%",
        height: "100%",
    }
})