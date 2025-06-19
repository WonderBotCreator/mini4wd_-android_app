import { Colors } from "@/constants/Colors"
import { Link } from "expo-router"
import { StyleSheet, Text, useColorScheme, View } from "react-native"

export default function About(){
    const colorSchema = useColorScheme()
    let theme =  Colors.light

    if(colorSchema !== null && colorSchema !== undefined)
    {
        theme = Colors[colorSchema];
    }

    return(
        <View style={[styles.container, {backgroundColor: theme.background}]}>
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