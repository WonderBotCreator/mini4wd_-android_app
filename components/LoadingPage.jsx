import { ActivityIndicator, StyleSheet, Text, View } from "react-native"

const LoadingPage = ()=>{
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Loading</Text>
            <ActivityIndicator size="large" color="black"/>
        </View>
    )
}

export default LoadingPage


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  title: {
    fontWeight: 'bold',
    fontSize: 18
  },

  img: {
    marginVertical: 20,
  },

  card:{
    backgroundColor: '#eee',
    padding: 20,
    borderRadius: 3,
    boxShadow: '4px 4px rgba(0,0,0,0.1)'
  },
   imageContainer: {
    flex: 1,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },

  link:{
    marginVertical: 10,
    borderBottomWidth: 1
  }
})