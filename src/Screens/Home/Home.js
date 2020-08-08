import React from 'react'
import { View, Text, Button, SafeAreaView, ScrollView, StyleSheet, Image,StatusBar } from 'react-native'
import { CommonActions } from '@react-navigation/native';
import Icons from 'react-native-vector-icons/MaterialIcons'

import { Center } from '../../components/Center'
import { useAuth } from '../../contexts/AuthContext'
import MiniCard from '../../components/Media/MiniCard'
import ExploreCard from '../../components/Explore/ExploreCard'

function Home({ navigation }) {
  const auth = useAuth()
  const [{ user }, authDispatch] = useAuth()
  const name = (user && user.name) ?? null

  return (
    <ScrollView style={styles.root}>

      <View>
        <Text style={styles.title}>Welcome, {name}</Text>
      </View>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
        style={{ marginLeft: 15, marginBottom: 15, flexDirection: 'row' }}>
        {[0, 1, 2, 3, 4].map((itm, idx) => (
          <MiniCard key={idx}/>
        ))}
      </ScrollView>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
        style={{ marginLeft: 15, marginBottom: 15, flexDirection: 'row' }}>
        {[0, 1, 2, 3, 4].map((itm, idx) => (
          <MiniCard key={idx} />
        ))}
      </ScrollView>



      <View>
        <ExploreCard />
      </View>

      <View>
        {/* <Text>{JSON.stringify(user, null, 2)}{name}</Text> */}
        {/* <Button title='Sign Out' onPress={() => authDispatch.signOut()} /> */}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    paddingVertical: 30,
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    padding: 20,
    marginTop: 20,
  },
  miniCard: {
    borderWidth: 1,
    borderColor: 'gray',
    height: 150,
    width: 150,
    marginTop: 10,
    marginLeft: 20,
    borderRadius: 5
  },
  miniCardImage: {
    flex: 3,
    overflow: 'hidden',
  },
  miniCardText: {
    flex: 1
  }
})

export default Home
