import { Link } from "expo-router"
import { StyleSheet, Text, View } from "react-native"

export default function Contact(){
    return(
        <View style={styles.container}>
            <Text style={styles.title}>About</Text>

            <Link href="/" style={styles.link}>Back Home</Link>
        </View>
    )
}

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
  link:{
    marginVertical: 10,
    borderBottomWidth: 1
  }
})