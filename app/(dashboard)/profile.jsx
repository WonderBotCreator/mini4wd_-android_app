import { usePathname, useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import LoadingPage from "../../components/LoadingPage"
import ThemeCard from "../../components/ThemeCard"
import { useUser } from "../../hooks/useUser"

export default function Profile(){
  const {user,logout, getProfile} =  useUser()
  const insets = useSafeAreaInsets()
  const router = useRouter()

  const [loading, setLoading] = useState(true)

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
                  //console.log(router.name)
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
    try{
      await logout();
      router.replace('/')
    }catch(error){

    }
  }

  const handleEditProfile = ()=>{
    router.push('/editProfile')
  }


  if(loading){
    return(<LoadingPage/>)
  }

    return(
      
        <View style={[{paddingTop: insets.top, paddingBottom: insets.bottom},styles.container]}>

            <Text style={styles.title}>Profile</Text>

             <ThemeCard style={styles.card}>
                <Text style={styles.title}>User: {user.username}</Text>
          <Text style={{marginVertical: 5, marginTop: 20}}>Name: {firstname} {lastname}</Text>
          <Text style={{marginVertical: 5}}>address: {address}</Text>
          <Text style={{marginVertical: 5}}>phone: {phone}</Text>
            </ThemeCard>

         
          <Pressable onPress={handleEditProfile} style={({pressed})=>[styles.btn, pressed && styles.pressed]}>
              <Text style={{color: '#f2f2f2', textAlign: 'center'}}>Edit Profile</Text>
          </Pressable>
          <Pressable onPress={handleSubmit} style={({pressed})=>[styles.logoutBTN, pressed && styles.pressed]}>
              <Text style={{color: '#f2f2f2', textAlign: 'center'}}>Logout</Text>
          </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
  btn:{
        backgroundColor: '#1c43e6',
        padding: 18,
        marginBottom: 30,
        marginHorizontal: 20,
        borderRadius: 10
    },
    logoutBTN:{
      backgroundColor: '#e35252',
      padding: 18,
        marginBottom: 30,
        marginHorizontal: 20,
        borderRadius: 10
    },
    pressed:{
        opacity: 0.8
    },
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    marginVertical: 50,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center'
  },

  img: {
    marginVertical: 20,
  },

   card:{
        margin: 20,
        paddingBottom: 50,
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
