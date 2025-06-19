import axios from "axios"
import { createContext, useEffect, useState } from "react"
import { useUser } from "../hooks/useUser"

export const CartContext = createContext()

export function CartProvider({ children }) {
    const baseUrl = process.env.EXPO_PUBLIC_API_URL
    const [cart, setcart] = useState([])
    const {user} = useUser()

    async function addItemToCart(data){
        try{
            const config = {
                headers: { Authorization: user.token },
            }

            const itemObject = {
                productID: data.productId,
                amount: data.num
            }

            

            const response = await axios.post(baseUrl+'/api/cart/', itemObject, config)

            if(response.data.status === 'success'){
                const alreadyItem = cart.find(item=> item.product.id === itemObject.productID)

                if(!alreadyItem){
                    setcart(cart.concat({itemId: response.data.itemId,product: response.data.product, amount: parseInt(itemObject.amount)}))
                }else
                {
                    alreadyItem.amount += parseInt(itemObject.amount)
                    setcart(cart.map(item=> item.product.id === itemObject.productID? alreadyItem: item))
                }

                return response.data
            }
            
        }catch(error){
            
        }
    }

    async function getCart(){
        try{
            const config = {
                headers: { Authorization: user.token },
            }

             const response = await axios.get(baseUrl+'/api/cart/', config)
             if(response.data.status === 'success'){
                setcart(response.data.products)
             }
        }catch(error){

        }
    }

    async function removeItemFromCart(id){
        try{
            const config = {
                headers: { Authorization: user.token },
            }

            

            const productObject = {
                productId: id
            }
            
             const response = await axios.delete(baseUrl+'/api/cart/'+id,config)

             if(response.data.status === 'success')
             {

                setcart(cart.filter(item=> item.itemId !== id))
                return response.data
             }
        }catch(error){

        }
    }

    async function submitOrder(data){
        try{
            const config = {
                headers: { Authorization: user.token },
            }
            
            const orderObject = {
                cart: cart,
                address: data.firstname +" "+ data.lastname+ " "+ data.address,
                phone: data.phone
            }



            const response = await axios.post(baseUrl+'/api/order/', orderObject, config)

            if(response.data.status === "success")
            {
                setcart([])
                return response.data
            }

        }catch(error){
            
        }
    }

    async function getOrders(){
        try{
            const config = {
                headers: { Authorization: user.token },
            }

            const response = await axios.get(baseUrl+'/api/order/', config)
           
            if(response.data.status === "success")
            {

                return response.data
            }
        }catch(error){

        }
    }

    async function getOrder(id){
        try{
            const config = {
                headers: { Authorization: user.token },
            }

             const response = await axios.get(baseUrl+'/api/order/'+id, config)

             if(response.data.status === "success")
             {

                return response.data
             }
        }catch(error){

        }
    }

    useEffect(()=>{
        if(user){
            getCart();
        }else{
            setcart([])
        }
    },[user])

    return (
        <CartContext.Provider value={{ cart, addItemToCart, getCart, removeItemFromCart, submitOrder, getOrders, getOrder}}>
            {children}
        </CartContext.Provider>
    )
}