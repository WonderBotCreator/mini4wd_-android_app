import { Stack } from "expo-router"
import { StatusBar } from "react-native"
import GuestOnly from "../../components/auth/GuestOnly"
import { useUser } from "../../hooks/useUser"

export default function AuthLayout(){

    const {user} = useUser()
    return(
        <GuestOnly>
            <StatusBar style="auto"/>
            <Stack
                screenOptions={{headerShown: false, animation: "none"}}
            />
        </GuestOnly>
    )
}