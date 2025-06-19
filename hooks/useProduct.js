import { useContext } from "react"
import { ProductContext } from "../contexts/ProductContext"

export function useProduct(){
    const context = useContext(ProductContext)

    if(!context){
        throw new Error("Product must be used within a ProductProvider")
    }

    return context
}