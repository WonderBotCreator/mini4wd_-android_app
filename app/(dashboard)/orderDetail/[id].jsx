
import { UploadClient } from "@uploadcare/upload-client"
import { Image } from "expo-image"
import * as ImagePicker from 'expo-image-picker'
import { useLocalSearchParams, useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native"
import LoadingPage from "../../../components/LoadingPage"
import ThemeCard from "../../../components/ThemeCard"
import { useCart } from "../../../hooks/useCart"
import { useProduct } from "../../../hooks/useProduct"

const OrderDetail = ()=>{

    const client = new UploadClient({ publicKey: 'b0a14fa9e3dc94c88a7c' });
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [paymentImage, setPaymentImage] = useState('')


    const [order, setOrder] = useState(null)
    const [products, setProducts] = useState([])

    const {id} = useLocalSearchParams()
    const {fetchProductById} = useProduct()
    const {getOrder} = useCart()

    const router = useRouter()

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result.assets[0].uri)
      setPaymentImage(result.assets[0].uri);
      console.log(result);

      // const photo = {
      //   uri: result.assets[0].uri,
      //   type: 'image/jpg'
      // };
      // const body = new FormData();
      // body.append('file', photo);
      // body.append('UPLOADCARE_PUB_KEY', 'b0a14fa9e3dc94c88a7c');
      // body.append('UPLOADCARE_STORE', 'auto');

      // try {
      //   setLoading(true)
      //   let response = await fetch('https://upload.uploadcare.com/base/', {
      //     method: 'POST',
      //     body
      //   });
      //   setLoading(false)
      //   console.log(response)

      //   return JSON.parse(response._bodyText);
      // }
      // catch (e) {
      //   console.log(e)
      // }
      // setLoading(true)
      // const response = await client.uploadFile(result.assets[0].uri)
      // setLoading(false)
      // console.log(response)

      //  try {
      // const blob = await fetch(result.assets[0].uri, { method: 'GET' }).then(res => res.blob());

      // const response = await client.uploadFile(blob, {
      //   fileName: result.assets[0].uri,
      //   contentType: 'image/jpg',
      // });
  //      const response = await client.uploadFile(result.assets[0], {
  //     fileName: result.assets[0],
  //     contentType: 'image/jpg',
  //   });
  // //     const response = await base(
  // // result.assets[0].uri,
  // // {
  // //   publicKey: 'b0a14fa9e3dc94c88a7c',
  // //   store: 'auto',
  // // })

  //     console.log(response)
  //   } catch (error) {
  //     console.log({ error });
  //   }
  

    } else {
      alert('You did not select any image.');
    }
  };



    useEffect(()=>{
        async function loadOrderDetail(){
            const response = await getOrder(id)
            if(response.status === "success")
            {
                setOrder(response.order)
                setProducts(response.products)
                setLoading(false)
            }
        }
        setLoading(true)
        loadOrderDetail()
    },[id])

    if(loading){
        return(<LoadingPage/>)
    }

    const totalCost = products.map(item=>item.product.price * item.amount).reduce((partialSum, a) => partialSum + a, 0);

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView>
            <ThemeCard style={styles.card}>
                <Text style={[styles.title,{textAlign: 'center'}]}>Order Detail</Text>
                <Text >Address</Text>
                <Text>{order.address}</Text>
                <Text>Order at</Text>
                <Text>{order.createdAt}</Text>
                {/* <View style={{flexDirection: 'row'}}> */}
                    {/* <Text style={[styles.title, {textAlign : 'right'}]}>Price: {product.price} ฿</Text> */}
                {/* </View> */}
                
            </ThemeCard>

            

            <ThemeCard style={[{justifyConter: 'center',alignItems: 'stretch',marginHorizontal: 10, flex: 1}]}>
                <Text style={styles.title}>Products</Text>
            {
                
                products.map(item=>(

                  <Pressable key={item.itemId} onPress={()=> router.push(`/productDetail/${item.id}`)} style={{   marginVertical:20 }}>
        <View style={{ flex:1, justifyContent: 'center', backgroundColor: "#fff", borderRadius: 10, overflow: "hidden" , paddingVertical: 30}}>
          <View>
            <Image
            contentFit="fill"
              source={item.product.image}
              style={{
                height: 220,
                width: 300,
                marginHorizontal: 20
              }}
            />
          </View>
          <View style={{ justifyContent: 'center', alignContent: 'center' , marginTop: 10}}>
            <Text numberOfLines={2} style={{textAlign: 'center'}}>{item.product?.name}</Text>
            <Text numberOfLines={1} style={{ color: "#777", paddingTop: 5, textAlign: 'center'} }>
              Number: {item?.amount}
            </Text>
             <Text numberOfLines={1} style={{ color: "#777", paddingTop: 5, textAlign: 'center'} }>
              Total: {item.product.price * item.amount} ฿
            </Text>
          </View>
        </View>
      </Pressable>

              ))
            }
            </ThemeCard>
 <ThemeCard style={[{justifyConter: 'center',alignItems: 'stretch',marginHorizontal: 10, flex: 1}]}>
             <Text style={{textAlign: 'right', marginHorizontal: 20, fontSize: 20, marginVertical: 10}}>Total cost: {totalCost} ฿</Text>
            </ThemeCard>

            <ThemeCard style={[{justifyConter: 'center',alignItems: 'stretch',marginHorizontal: 10, flex: 1}]}>

              <Text style={{textAlign: 'left', marginHorizontal: 20, fontSize: 20, marginVertical: 10}}>Status: {order.status}</Text>
            </ThemeCard>

            <ThemeCard style={[{justifyConter: 'center',alignItems: 'stretch',marginHorizontal: 10, flex: 1}]}>
               {paymentImage !== ''?
               
                  <Image
            contentFit="fill"
              source={paymentImage}
              style={{
                height: 200,
                width: 300,
                marginHorizontal: 20
              }}
            />
            :<></>
              }
              <Pressable onPress={pickImageAsync} style={styles.btn}>
               
                          <Text style={[{textAlign: 'center', color: '#fff'}]}>upload payment image</Text>
                        </Pressable>
            </ThemeCard>
            </ScrollView>
            {/* <View style={[{flexDirection: 'row',alignContent: 'center', justifyContent: 'center', marginHorizontal: 10}]}>
                <TextInput value={num}  onChangeText={setNum} style={[{flex:2, marginBottom: 25, marginLeft: 10}, styles.textInput]} placeholder="num"/>
                      <Pressable onPress={handleAddToCard} style={[styles.btn, {flex:1}]}>
                        <Text style={[{textAlign: 'center', color: '#fff'}]}>Add</Text>
                      </Pressable>
            </View> */}
        </SafeAreaView>
    )
}

export default OrderDetail

const styles = StyleSheet.create({
     btn:{
        backgroundColor: '#1061ad',
        padding: 20,
        marginBottom: 30,
        marginHorizontal: 20,
        borderRadius: 10,
       
      
    },
     editBTN:{
        backgroundColor: '#06c270',
        padding: 18,
        marginBottom: 30,
        borderRadius: 10,
        marginHorizontal:40
    },
    container:{
        flex: 1,
        alignItems: 'stretch'
    },
    title:{
        fontSize: 22,
        marginVertical: 10,
    },
    card:{
        margin: 20
    },
     image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  textInput:{
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 6,
    
  },
})