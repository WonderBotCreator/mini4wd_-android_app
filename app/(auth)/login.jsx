import { useUser } from "@/hooks/useUser";
import { Image } from "expo-image";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import LoadingPage from "../../components/LoadingPage";

const PlaceholderImage = require('@/assets/images/mini4wd_logo.png')

export default function Login(){

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const {login} = useUser()

    const handleSubmit = async ()=>{
      setError(null)
      setLoading(true)
      try{
        //console.log("request")
        const response = await login(email, password)
        //router.replace('/profile')
        setLoading(false)
        //console.log(user)
        //setLoading(false)
        if(response.error)
        {
          setError(response.error[0].message)
          
        }
        else if(response.status === 'success')
        {
          router.replace('/profile')
        }
      }catch(error){
        setError(error.message)
      }
    }


    if(loading){
      return(<LoadingPage/>)
    }



    return(
       
          <View style={styles.container}>
            <Image source={PlaceholderImage} style={styles.image}  transition={1000} contentFit="contain"/>
            

            <Text style={styles.title}>
                Login
            </Text>

            {error !== ''?
                        <Text style={styles.error}>{error}</Text>  : <></>
                      }

            <TextInput value={email} onChangeText={setEmail}keyboardType="email-address" style={[{width: '80%', marginBottom: 20}, styles.textInput]} placeholder="Email"/>
             <TextInput secureTextEntry value={password} onChangeText={setPassword}  style={[{width: '80%', marginBottom: 20}, styles.textInput]} placeholder="password"/>
            <Pressable onPress={handleSubmit} style={({pressed})=>[styles.btn, pressed && styles.pressed]}>
                <Text style={{color: '#1061ad', textAlign: 'center'}}>Login</Text>
            </Pressable>

            
            <Link href="/register">
                <Text style={{textAlign: 'center', color: '#fff'}}>
                    Register
                </Text>
            </Link>
        </View>
            
        
    )
}

const styles = StyleSheet.create({
  textInput:{
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 6,
  },
    btn:{
        backgroundColor: '#fff',
        padding: 20,
        marginBottom: 30,
        borderRadius: 10,
        width: '80%',
        alignContent: 'center',
    },
    pressed:{
        opacity: 0.8
    },

    parentContainer:{
      flex: 1,
      backgroundColor: '#1061ad'
    },
    container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1061ad'
  },

  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 30,
    textAlign: 'center',
    color: '#fff'
  },

  img: {
    marginVertical: 5,
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
  },
  error:{
    color: '#fff',
    padding: 10,
    backgroundColor: '#e35252',
    borderColor: '#e35252',
    borderWidth: 1,
    borderRadius: 6,
    width: '80%',
    marginBottom: 10
  }
})