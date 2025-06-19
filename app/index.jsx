import { Image } from 'expo-image';
import { Link, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from "react-native";

const PlaceholderImage = require('@/assets/images/mini4wd_logo.png')

const Index = ()=> {
  const router = useRouter()
  const handleLogin = ()=>{
    router.replace('/login')
  }

  const handleRegister = ()=>{
    router.replace('/register')
  }


  return (
    <View style={styles.container}>
      
      <Image source={PlaceholderImage} style={styles.image}  transition={1000} contentFit="contain"/>
     

      <Text style={[styles.title, {color: 'white'}]}>MINI4WD SHOP</Text>

      <Pressable style={({pressed})=>[styles.btn, pressed && styles.pressed]}>
                                  <Link href="/login" style={{color: '#1061ad', textAlign: 'center'}}>Login</Link>
                              </Pressable>

      <Pressable style={({pressed})=>[styles.btn, pressed && styles.pressed]}>
                                  <Link href="/register" style={{color: '#1061ad', textAlign: 'center'}}>Sign Up</Link>
                              </Pressable>

     
    </View>
  );
}

export default Index

const styles = StyleSheet.create({
  btn:{
        backgroundColor: '#fff',
        padding: 18,
        marginBottom: 15,
        marginTop: 30,
        borderRadius: 10,
        width: "90%",
    },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1061ad',
  },

  title: {
    fontWeight: 'bold',
    fontSize: 24
  },

  img: {
    flex: 1,

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
