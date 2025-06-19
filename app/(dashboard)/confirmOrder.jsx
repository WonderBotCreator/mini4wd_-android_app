import { Image } from "expo-image"
import { usePathname, useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
import LoadingPage from "../../components/LoadingPage"
import ThemeCard from "../../components/ThemeCard"
import { useCart } from "../../hooks/useCart"
import { useProduct } from "../../hooks/useProduct"
import { useUser } from "../../hooks/useUser"

export default function ConfirmOrder(){
    const {products, fetchProducts} = useProduct()
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState('')
    const [cartItem, setCartItem] = useState([])
    const router = useRouter()
    const [loading, setLoading] = useState(true)

    const {user,getProfile} = useUser()
    const {cart, removeItemFromCart, submitOrder} = useCart()

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



    const handleRemoveItem = async()=>{
      setModalVisible(false)
      setLoading(true)
      try{
        const response = await removeItemFromCart(selectedProductId)
        if(response.status === 'success'){
          setLoading(false)
        }
      }catch(error){

      }
    }

    const handleModal = (itemID)=>{
      setModalVisible(true)

    }

    const handleCloseModal = ()=>{
      setSelectedProductId('')
       setModalVisible(false)
    }

    const handleSubmitOrder = async()=>{
      setModalVisible(false)
      setLoading(true)
      
      try{
        const data ={
          firstname: firstname,
          lastname: lastname,
          address: address,
          phone: phone
        }
        const response = await submitOrder(data)

        if(response.status === "success"){
          setLoading(false)
          router.push('/orderSuccess')
        }
      }catch(error){

      }
    }



    
    if(loading)
    {
        return(<LoadingPage/>)
    }
   
    const totalCost = cart.map(item=>item.product.price * item.amount).reduce((partialSum, a) => partialSum + a, 0);
    return(
        <SafeAreaView style={styles.container}>
         <ScrollView  >
           <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          backdropColor='#00000'
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Are you sure you want to submit order ?</Text>

              <View style={[{flexDirection: 'row'}]}>
               <Pressable
                style={[styles.button, styles.confirmBTN, {marginHorizontal: 3}]}
                onPress={() => handleSubmitOrder()}>
                <Text style={styles.textStyle}>Confirm</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.cancelBTN, {marginHorizontal: 3}]}
                onPress={() => handleCloseModal()}>
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
              </View>
            </View>
          </View>
        </Modal>

            <Text style={[styles.title, {marginVertical: 50}]}>Confirm Order</Text>
          
            {loading || !cart?
            
              <LoadingPage/>:
              cart.map(item=>(

                <Pressable key={item.itemId} style={[{backgroundColor: "#fff",justifyContent:'center' , alignItems: 'center', marginBottom: 10}]} onPress={()=> router.push(`/productDetail/${item.product.id}`)}>
                    <Image
                    contentFit="fill"
                                  source={item.product.image}
                                  style={{
                                    height: 250,
                                    width: 250,
                                    justifyContent: 'center',
                                    alignContent: 'center',
                                    marginHorizontal: 20
                                  }}
                                />
                  <ThemeCard style={[styles.card, {flexDirection: 'row'}]}>

                    <Text numberOfLines={1} style={[styles.bookTitle,{flex: 5, paddingHorizontal: 10}]}>{item.product.name}</Text>
                    <Text style={[styles.bookTitle,{flex: 3}]}>Num: {item.amount}</Text>
                  <Text style={[styles.bookTitle,{flex: 5}]}>Total: {item.amount * item.product.price}฿</Text>
                  </ThemeCard>
                </Pressable>

              ))
              

          }

          <View style={[{marginTop: 10, marginHorizontal: 20, alignContent: 'stretch', justifyContent: 'center'}]}>
            <Text style={styles.title}>
                    Address Information
                  </Text>
                  <Text>Firstname</Text>
                  <TextInput value={firstname} onChangeText={setFirstname}   style={[{ marginBottom: 20, marginTop: 20 }, styles.textInput]} placeholder="firstname" />
                   <Text>Lastname</Text>
                  <TextInput value={lastname} onChangeText={setLastname}  style={[{ marginBottom: 20 }, styles.textInput]} placeholder="lasname" />
                  <Text>Address</Text>
                  <TextInput value={address} onChangeText={setAddress}   multiline = {true}
numberOfLines = {3} style={[{  marginBottom: 20 }, styles.textInput]} placeholder="address" />
                  <Text>Phone number</Text>
                  <TextInput value={phone} onChangeText={setPhone}  style={[{  marginBottom: 20 }, styles.textInput]} placeholder="phone" />
                  
          </View>

            

          <View style={[{alignContent: 'center', justifyContent: 'center'}]}>

             <Text style={{textAlign: 'right', marginHorizontal: 20, fontSize: 20, marginVertical: 10}}>Total cost: {totalCost} ฿</Text>
          <Pressable onPress={handleModal} style={styles.btn}>
            <Text style={[{textAlign: 'center', color: '#fff'}]}>Submit order</Text>
          </Pressable>
</View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
 btn:{
        backgroundColor: '#1061ad',
        padding: 20,
        marginBottom: 30,
        marginHorizontal: 20,
        borderRadius: 10,
       
      
    },
    textInput:{
backgroundColor: '#fff',
padding: 20,
    borderRadius: 6,
    },

  
  confirmBTN:{
    backgroundColor: '#1061ad',
  },
  cancelBTN:{
     backgroundColor: '#e35252',
  },
list:{
  marginTop:40,
},
  
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center'
  },

  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottok: 10,
    textAlign: 'center',
  },

  bookTitle:{
    fontWeight: 'bold',
    fontSize: 18,
    marginBottok: 10,
  },

  img: {
    marginVertical: 20,
  },

  card:{
    width: "90%",
    marginHorizontal: "5%",
    marginVertical: 10,
    padding: 10,
    paddingLeft: 14,
    borderLeftColor: "#3857f2",
    borderLeftWidth: 4
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


  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})
