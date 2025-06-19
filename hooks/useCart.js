import { useContext } from "react"
import { CartContext } from "../contexts/CartContext"

export function useCart(){
    const context = useContext(CartContext)

    if(!context){
        throw new Error("Cart must be used within a CartProvider")
    }

    return context
}