import { usePathname, useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { FlatList, Modal, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native"
import LoadingPage from "../../components/LoadingPage"
import NoItemComponent from "../../components/NoItemComponent"
import ThemeCard from "../../components/ThemeCard"
import { useCart } from "../../hooks/useCart"
import { useProduct } from "../../hooks/useProduct"
import { useUser } from "../../hooks/useUser"


export default function Order(){
    const {products, fetchProducts} = useProduct()
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState('')
  const [orders, setOrders] = useState(null)
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const {user} = useUser()
    const {cart, removeItemFromCart, getOrders} = useCart()
    

    const pathName = usePathname()

    useEffect(()=>{
        async function loadOrder(){
             if(!orders)
      {
         const response = await getOrders()
         if(response.status === "success")
         {
            console.log('success')
            setOrders(response.orders)
         }
         setLoading(false)
        }
        }
      setLoading(true)
     loadOrder()
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

            <Text style={[styles.title, {marginTop: 50}]}>Order list</Text>

            {orders === null?
            
              <LoadingPage/>:

             orders.length>0?
              <FlatList 
              data={orders}
              keyExtractor={(item)=> item.id}
              contentContainerStyle={styles.list}
              renderItem={({item})=>(

                <Pressable onPress={()=> router.push(`/orderDetail/${item.id}`)}>

                  <ThemeCard style={styles.card}>

                    <Text style={[styles.bookTitle, {textAlign: 'center', marginBottom: 20}]}>{item.createdAt.substring(0,10)}</Text>
                     <Text style={[styles.bookTitle, {textAlign: 'center', marginBottom: 20}]}>{item.status}</Text>
                    <Pressable style={[styles.btn,{backgroundColor: "#1061ad"}]} onPress={()=> router.push(`/orderDetail/${item.id}`)}>
                      <Text  style={[{textAlign: 'center', color: '#fff'}]}>Detail</Text>
                    </Pressable>
                  </ThemeCard>
                </Pressable>
              )}
            />
            
            
            :

              <NoItemComponent/>
          }


          
            
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
