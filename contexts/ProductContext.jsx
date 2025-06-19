import axios from "axios"
import { createContext, useEffect, useState } from "react"
import { useUser } from "../hooks/useUser"

export const ProductContext = createContext()

export function ProductProvider({ children }) {
    const baseUrl = process.env.EXPO_PUBLIC_API_URL
    const [products, setProducts] = useState([])
    const {user} = useUser()

    async function fetchProducts() {
        try{

            const config = {
                headers: { Authorization: user.token },
            }

             const response = await axios.get(baseUrl+'/api/product')

             if(response.data.status === "success")
             {
                setProducts(response.data.products)
                return(response.data.products)
             }
        }catch(error){

        }
    }

    async function fetchProductById(id){
        try{
            const config = {
                headers: { Authorization: user.token },
            }

            const response = await axios.get(baseUrl+'/api/product/'+id, config)
            if(response.data.status === "success")
            {
                return response.data
            }

        }catch(error){

        }
    }


    useEffect(()=>{
        if(user){
            fetchProducts();
        }else{
            setProducts([])
        }
    },[user])

    return (
        <ProductContext.Provider value={{ products, fetchProducts, fetchProductById}}>
            {children}
        </ProductContext.Provider>
    )
}