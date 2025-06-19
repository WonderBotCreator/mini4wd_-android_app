import { Image } from "expo-image"
import { useLocalSearchParams, useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
import LoadingPage from "../../../components/LoadingPage"
import ThemeCard from "../../../components/ThemeCard"
import { useCart } from "../../../hooks/useCart"
import { useProduct } from "../../../hooks/useProduct"


const BookDetails = ()=>{
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)

    const [num, setNum] = useState('1')

    const {id} = useLocalSearchParams()
    const {fetchProductById} = useProduct()
    const {addItemToCart} = useCart()

    const router = useRouter()


    const handleSubmit = async()=>{
        try{
            setLoading(true)
            
            const response = await deleteBook({productID: id, num: num})
            if(response.status === "success")
            {
                setLoading(false)
                router.replace('/books')
            }
        }catch(error){

        }
    }

    const handleAddToCard = async()=>{
        setLoading(true)
        try{
            console.log({productId: id, num: parseInt(num)})
            const response = await addItemToCart({productId: id, num: num})

            if(response.status === "success")
            {
                 setLoading(false)
                router.replace('/cart')
            }
        }catch(error){

        }
        
    }

    useEffect(()=>{
        async function loadProduct(){
            const response = await fetchProductById(id)
            if(response.status === "success")
            {
                setProduct(response.product)
                setLoading(false)
            }
        }
        setLoading(true)
        setNum('1')
        loadProduct()
    },[id])

    if(loading || !product){
        return(<LoadingPage/>)
    }

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView>
            <ThemeCard style={styles.card}>
                <Text style={[styles.title,{textAlign: 'center'}]}>{product.name}</Text>
                  <Image source={product.image} style={styles.image}  transition={1000} contentFit="contain"/>
                <Text>{product.description}</Text>
                {/* <View style={{flexDirection: 'row'}}> */}
                    <Text style={[styles.title, {textAlign : 'right'}]}>Price: {product.price} ฿</Text>
                {/* </View> */}
                
            </ThemeCard>

           
            
            </ScrollView>
            <View style={[{flexDirection: 'row',alignContent: 'center', justifyContent: 'center', marginHorizontal: 10}]}>
                <TextInput value={num}  onChangeText={setNum} style={[{flex:2, marginBottom: 25, marginLeft: 10, textAlign:'center'}, styles.textInput]} placeholder="num"/>
                      <Pressable onPress={handleAddToCard} style={[styles.btn, {flex:1}]}>
                        <Text style={[{textAlign: 'center', color: '#fff'}]}>Add</Text>
                      </Pressable>
            </View>
        </SafeAreaView>
    )
}

export default BookDetails

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