import { useRouter } from "expo-router"
import { Pressable, SafeAreaView, StyleSheet, Text } from "react-native"


export default function OrderSuccess() {



  const router = useRouter()

  const handleSubmit = ()=>{
    router.push('/order')
  }

 
  return (
    <SafeAreaView style={styles.container}>


      <Text style={styles.title}>
        Order success
      </Text>
     

      <Pressable onPress={handleSubmit} style={({pressed})=>[styles.btn, pressed && styles.pressed]}>
                                  <Text style={{color: '#f2f2f2'}}>Go to orders</Text>
                              </Pressable>
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
    alignItems: 'center',
    justifyContent: 'center'
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



