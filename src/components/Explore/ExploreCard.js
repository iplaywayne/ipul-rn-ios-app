import React from 'react'
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native'
import {
  Block, Button, Card, Icon, Input, NavBar, Text as GalText,
  DeckSwiper
} from 'galio-framework';
import { Divider } from 'react-native-paper'


import { useAuth } from '../../contexts/AuthContext'
import { trimWWWString } from '../../utils'
import { siteLogo } from '../../constants'

const elements = [
  <View style={{ backgroundColor: '#B23AFC', height: 250, width: 250 }}>
    <Text>You wanna see a cool component?</Text>
    <Text>Galio has this cool Deck Swiper</Text>
  </View>,
  <View style={{ backgroundColor: '#FE2472', height: 250, width: 250 }}>
    <Text>What did you expect?</Text>
    <Text>This React Native component works perfectly</Text>
  </View>,
  <View style={{ backgroundColor: '#FF9C09', height: 250, width: 250 }}>
    <Text>Maybe you want to build the next Tinder</Text>
  </View>,
  <View style={{ backgroundColor: '#45DF31', height: 250, width: 250 }}>
    <Text>or maybe you just want a nice deck swiper component</Text>
    <Text>Galio has everything sorted out for you</Text>
  </View>
]

const Swiper = () => (
  <View style={{ flex: 1 }}>
    <Block>
      <DeckSwiper components={elements} />
    </Block>
  </View>
)

function ExploreCard({ item }) {
  const [authState, authDispatch] = useAuth()
  const { user } = authState
  const { name, avatar, details } = user ?? { name: '', avatar: '', details: '' }


  return (
    <ScrollView style={styles.root}>
      <TouchableOpacity onPress={() => console.log(item.acid)}>
        <View>
          <Card
            flex
            borderless
            shadow={true}
            title={item && item.title || 'n/a'}
            caption={item && item.artist || '6 mo'}
            location={item && item.genre || 'n/a'}
            avatar={item && item.art_link || siteLogo}
            // style={{paddingTop: 5}}
            imageStyle={{ borderRadius: 10, height: 300 }}
            // imageBlockStyle={{height:400}}
            image={item && trimWWWString(item.art_link) || siteLogo}
          />
          {/* <Text>{JSON.stringify(item, null, 2)}</Text> */}
          <Divider />
        </View>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 5,
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20
  },
  miniCard: {
    borderWidth: 1,
    borderColor: 'gray',
    height: 200,
    width: 200,
    marginTop: 10,
    marginLeft: 20,
    borderRadius: 5,
    paddingBottom: 50,

  },
  miniCardImage: {
    flex: 3,
    overflow: 'hidden',
  },
  miniCardText: {
    flex: 1
  }
})

export default ExploreCard
