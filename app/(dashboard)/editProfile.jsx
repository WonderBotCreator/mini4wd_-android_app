import { usePathname, useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput } from "react-native"
import LoadingPage from "../../components/LoadingPage"
import { useUser } from "../../hooks/useUser"


export default function EditProfile() {

  const [bookTitle, setBookTitle] = useState('')
  const [bookDescription, setBookDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')


  const {user, getProfile, updateProfile} = useUser()

  const router = useRouter()

  const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [address, setAddress] = useState('')
    const [phone , setPhone] = useState('')

  const pathName = usePathname()
   useEffect(()=>{
          async function loadProfile(){
              const response = await getProfile()
              if(response.status === "success")
              {
                  setFirstname(response.profile.firstname)
                  setLastname(response.profile.lastname)
                  setAddress(response.profile.address)
                  setPhone(response.profile.phone)
                  setLoading(false)
              }
          }
          setLoading(true)
          loadProfile()
      },[pathName])



  const handleSubmit = async()=>{
    setLoading(true)
    try{
      const data = {
        firstname: firstname,
        lastname: lastname,
        address: address,
        phone: phone
      }
      //console.log(data)
      const response = await updateProfile(data)
      if(response.error)
      {
          setLoading(false)
          setError(response.error[0].message)
          return
      }
      if(response?.status === "success")
      {
        setLoading(false)

        setFirstname('')
        setLastname('')
        setAddress('')
        setPhone('')
        router.replace('/profile')
      }
      
    }catch(error){

    }
  }

  if(loading)
  {
    return(<LoadingPage/>)
  }

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView >


      <Text style={[styles.title, {marginTop: 20}]}>
        Edit Profile
      </Text>

      {error !== ''?
                  <Text style={styles.error}>{error}</Text>  : <></>
      }
      <Text style={{textAlign: 'left', marginHorizontal: 20, marginTop: 20}}>Firstname</Text>
      <TextInput value={firstname} onChangeText={setFirstname}  style={[{ marginBottom: 10, marginTop: 20 , marginHorizontal: 20}, styles.textInput]} placeholder="Firstname" />
       <Text style={{textAlign: 'left', marginHorizontal: 20, marginTop: 20}}>Lastname</Text>
      <TextInput value={lastname} onChangeText={setLastname} style={[{ marginTop: 20,  marginBottom: 10, marginHorizontal: 20 }, styles.textInput]} placeholder="lastname" />
      
      <Text style={{textAlign: 'left', marginHorizontal: 20, marginTop: 20}}>Address</Text>
      <TextInput value={address} onChangeText={setAddress} style={[{ marginTop: 20, height: 200, marginBottom: 10 , marginHorizontal: 20, textAlignVertical: 'top'}, styles.textInput]} placeholder="address" />
      <Text style={{textAlign: 'left', marginHorizontal: 20, marginTop: 20}}>Phone</Text>
      <TextInput value={phone} onChangeText={setPhone} style={[{ marginTop: 20,  marginBottom: 10 , marginHorizontal: 20}, styles.textInput]} placeholder="Phone number" />
      <Pressable onPress={handleSubmit} style={({ pressed }) => [styles.btn, pressed && styles.pressed, {marginHorizontal: 20}]}>
        <Text style={{ color: '#f2f2f2', textAlign: 'center' }}>save</Text>
      </Pressable>
    </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  textInput:{
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 6,
  },
btn:{
        backgroundColor: '#1c43e6',
        padding: 18,
        marginBottom: 30,
        borderRadius: 10
    },
    pressed:{
        opacity: 0.8
    },
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    marginTop: 50,
    
  },

  title: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center'
  },

  img: {
    marginVertical: 20,
  },

  card: {
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

  link: {
    marginVertical: 10,
    borderBottomWidth: 1
  }
})
