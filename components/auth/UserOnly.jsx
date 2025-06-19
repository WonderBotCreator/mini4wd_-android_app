import { useRouter } from "expo-router"
import { useEffect } from "react"
import { useUser } from "../../hooks/useUser"
import LoadingPage from "../LoadingPage"


const UserOnly = ({children})=>{
    const {user, authChecked} = useUser()

    const router = useRouter()

    useEffect(()=> {
        if(authChecked && user === null){
            router.replace('/login')
        }
        console.log("loading")
    }, [user, authChecked])

    
    if(!authChecked || !user)
    {
        return(<LoadingPage/>)
    }

    return children
}

export default UserOnly