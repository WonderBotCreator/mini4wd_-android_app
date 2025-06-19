import { Image } from "expo-image"
import { usePathname, useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native"
import LoadingPage from "../../components/LoadingPage"
import { useProduct } from "../../hooks/useProduct"
import { useUser } from "../../hooks/useUser"

export default function Home(){
    const {products, fetchProducts} = useProduct()
    const [serach, setSearch] = useState('')
    const [productTypeText, setProductTypeText] = useState('all')
    const [productObject, setProductObject] = useState([])
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const {user} = useUser()

    const pathName = usePathname()

     useEffect(()=>{
            async function loadProduct(){
               setLoading(true)
              const getProducts = await fetchProducts()
              setProductObject(getProducts)
               setLoading(false)
            }
           
            loadProduct()
        },[pathName])

        if(loading){
          return(<LoadingPage/>)
        }

    const handleSearch = (serachInput)=>{
      setSearch(serachInput)
    }

    const handleProductType = (inputType)=>{
      setProductTypeText(inputType)
    }

    const productType = [
      {type:'all'},
      {type:'mini4wd'},
      {type:'tool'},
      {type:'circuit'},
      {type: 'accessory'}
    ]

    const searchType = productTypeText === 'all'? productObject: productObject.filter(item=> item.type.toLowerCase() === productTypeText)
    const searchResult = serach === ''? searchType: searchType.filter(item=> item.name.toLowerCase().includes(serach.toLowerCase()))

    return(
        <SafeAreaView style={styles.container}>

            <Text style={[styles.title, {marginTop: 50}]}>Product list</Text>

            
             <TextInput value={serach} onChangeText={(text)=> handleSearch(text)}  style={[{ marginBottom: 20, marginTop: 20, justifyContent: 'center', marginHorizontal:20 }, styles.textInput]} placeholder="Search" />
              <FlatList data={productType} keyExtractor={(item)=>item.type} contentContainerStyle={{flexDirection: 'row', marginHorizontal: 20, marginVertical:20}} renderItem={({item})=>(

                <Pressable onPress={()=>handleProductType(item.type)}>
                  <Text style={{marginHorizontal: 10, marginVertical: 10, color: productTypeText === item.type? '#1061ad': '#777'}}>{item.type}</Text>
                </Pressable>
              )} />
            <FlatList 
              data={searchResult}
              keyExtractor={(item)=> item.id}
              contentContainerStyle={styles.list}
              renderItem={({item})=>(

                // <Pressable onPress={()=> router.push(`/productDetail/${item.id}`)}>

                //   <ThemeCard style={styles.card}>

                //     <Text style={styles.bookTitle}>{item.name}</Text>
                //     <Text numberOfLines={1}>{item.description}</Text>
                //   </ThemeCard>
                // </Pressable>

                <Pressable  onPress={()=> router.push(`/productDetail/${item.id}`)} style={{ flex: 1, alignItems: "center", justifyContent: "center", margin:10, marginBottom:20 }}>
        <View style={{ backgroundColor: "#eee", borderRadius: 10, overflow: "hidden" }}>
          <View>
            <Image
            contentFit="fill"
              source={item.image}
              style={{
                height: 200,
                width: 150
              }}
            />
          </View>
          <View style={{ padding: 10, width: 155, justifyContent: 'center', alignContent: 'stretch' }}>
            <Text numberOfLines={1} style={{textAlign: 'center'}}>{item.name}</Text>
            <Text numberOfLines={1} style={{ color: "#777", paddingTop: 5, textAlign: 'center'} }>
              {item.price} ฿
            </Text>
          </View>
        </View>
      </Pressable>


              )}
            /> 

            


            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
   textInput:{
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 6,
  },
list:{
  marginTop:10,
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginHorizontal: 10,
  marginBottom: 40,
  alignContent: 'stretch'
},
  
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    marginBottom: 50,
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
  }
})
