import { Image } from 'expo-image'
import { useRouter } from "expo-router"
import { useState } from "react"
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import LoadingPage from "../../components/LoadingPage"
import { useUser } from "../../hooks/useUser"

const PlaceholderImage = require('@/assets/images/mini4wd_logo.png')

export default function Register(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const {user, register} = useUser()
    const handleSubmit = async()=>{
      setLoading(true)
      setError('')
      try{
        const response = await register(email,username, password)
        setLoading(false)
        console.log(response)
        if(response.error)
        {
          setError(response.error[0].message)
          
        }
        else if(response.status === 'success')
        {
          router.replace('/login')
        }
      }catch(error){

      }
    }


    if(loading){
      return(<LoadingPage/>)
    }
    return(
     
        <View style={styles.container}>
             <Image source={PlaceholderImage} style={styles.image}  transition={1000} contentFit="contain"/>

            <Text style={styles.title}>
                Register
            </Text>

            {error !== ''?
            <Text style={styles.error}>{error}</Text>  : <></>
          }
                        <TextInput value={email} onChangeText={setEmail}keyboardType="email-address" style={[{width: '80%', marginBottom: 20}, styles.textInput]} placeholder="Email"/>
                        <TextInput value={username} onChangeText={setUsername} style={[{width: '80%', marginBottom: 20}, styles.textInput]} placeholder="Username"/>
                       <TextInput secureTextEntry value={password} onChangeText={setPassword}  style={[{width: '80%', marginBottom: 20}, styles.textInput]} placeholder="password"/>
            
            <Pressable onPress={handleSubmit} style={({pressed})=>[styles.btn, pressed && styles.pressed]}>
                            <Text style={{color:  '#1061ad', textAlign: 'center'}}>Register</Text>
                        </Pressable>

           
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
        padding: 18,
        marginBottom: 30,
        borderRadius: 10,
        backgroundColor: '#fff',
        width: '80%'
    },
    pressed:{
        opacity: 0.8
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
    color: '#fff'
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