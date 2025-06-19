import { Image } from "expo-image"
import { usePathname, useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { FlatList, Modal, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native"
import LoadingPage from "../../components/LoadingPage"
import NoItemComponent from "../../components/NoItemComponent"
import ThemeCard from "../../components/ThemeCard"
import { useCart } from "../../hooks/useCart"
import { useProduct } from "../../hooks/useProduct"
import { useUser } from "../../hooks/useUser"


export default function Cart(){
    const {products, fetchProducts} = useProduct()
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState('')
    const [cartItem, setCartItem] = useState(null)
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const {user} = useUser()
    const {cart, removeItemFromCart} = useCart()

    const pathName = usePathname()

    useEffect(()=>{
      setLoading(true)
      if(!cartItem)
      {
        console.log('get cart')
        setCartItem(cart)
         setLoading(false)
      }
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
      setSelectedProductId(itemID)
      setModalVisible(true)

    }

    const handleCloseModal = ()=>{
      setSelectedProductId('')
       setModalVisible(false)
    }
    
    const handleProceedCart = ()=>{
      router.push('/confirmOrder')
    }

    const totalCost = cart.map(item=>item.product.price * item.amount).reduce((partialSum, a) => partialSum + a, 0);

    return(
        <SafeAreaView style={styles.container}>
         
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
              <Text style={styles.modalText}>Are you sure you want to remove this item ?</Text>

              <View style={[{flexDirection: 'row'}]}>
               <Pressable
                style={[styles.button, styles.confirmBTN, {marginHorizontal: 3}]}
                onPress={() => handleRemoveItem()}>
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

            <Text style={[styles.title, {marginTop: 50}]}>Cart list</Text>

            {!cartItem?
            
              <LoadingPage/>:

             cart.length>0?
              <FlatList 
              data={cart}
              keyExtractor={(item)=> item.itemId}
              contentContainerStyle={styles.list}
              renderItem={({item})=>(

                <Pressable style={[{justifyContent:'center' , alignItems: 'center', marginBottom: 10}]} onPress={()=> router.push(`/productDetail/${item.product.id}`)}>
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
                  <ThemeCard style={styles.card}>

                    <Text numberOfLines={1} style={[styles.bookTitle,{flex: 5, paddingHorizontal: 10}]}>{item.product.name}</Text>
                    <Text style={[styles.bookTitle,{flex: 1}]}>{item.amount}</Text>
                    <Pressable style={[styles.btn,{backgroundColor: "#e35252", flex:2}]} onPress={()=>handleModal(item.itemId)}>
                      <Text  style={[{fontSize:12,textAlign: 'center', color: '#fff'}]}>Remove</Text>
                    </Pressable>
                  </ThemeCard>
                </Pressable>
                 
              )}
            />
            
            
            :

              <NoItemComponent/>
          }

            {cart.length > 0?
          

          <View style={[{alignContent: 'center', justifyContent: 'center' , marginTop: 20}]}>
            <Text style={{textAlign: 'right', marginHorizontal: 20, fontSize: 20, marginVertical: 10}}>Total cost: {totalCost} ฿</Text>
          <Pressable style={styles.btn} onPress={handleProceedCart}>
            <Text style={[{textAlign: 'center', color: '#fff'}]}>Proceed cart</Text>
          </Pressable>
</View>:
<></>
          
          }

          
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
 btn:{
        backgroundColor: '#1061ad',
        padding: 20,
        marginHorizontal: 20,
        borderRadius: 10,
       
    },

  
  confirmBTN:{
    backgroundColor: '#1061ad',
  },
  cancelBTN:{
     backgroundColor: '#e35252',
  },
list:{
  marginTop:40,
  marginBottom: 50,
  paddingVertical: 20,
  backgroundColor: "#fff"
},
  
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    marginBottom: 20,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },

  bookTitle:{
    fontWeight: 'bold',
    fontSize: 12,
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
    flexDirection: 'row',
    borderLeftColor: "#3857f2",
    borderLeftWidth: 4,
    alignItems: "center",
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
