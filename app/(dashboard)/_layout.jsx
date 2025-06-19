import { Ionicons } from "@expo/vector-icons"
import { Tabs } from "expo-router"
import UserOnly from "../../components/auth/UserOnly"


export default function DashboardLayout(){
    return(
        <UserOnly>
        
         <Tabs name="navigation" screenOptions={{
             headerShown: false,
        tabBarActiveTintColor: '#ffd33d',
         tabBarInactiveTintColor: '#ffffff',
        headerStyle:{
            backgroundColor: '#25292e'
        },
        headerShadowVisible: false,
        headerTintColor: '#fff',
        tabBarStyle:{
            backgroundColor: '#1061ad'
        }
    }}>

         <Tabs.Screen 
        name="home" 
        options={{ title: 'home' , tabBarIcon: ({color, focused})=>(
             <Ionicons name={focused? 'home' : 'home-outline'} color={color} size={24}/>
        )}} />
    

        <Tabs.Screen 
        name="cart" 
        options={{ title: 'cart' , tabBarIcon: ({color, focused})=>(
             <Ionicons name={focused? 'cart' : 'cart-outline'} color={color} size={24}/>
        )}} />


        <Tabs.Screen 
        name="profile" 
        options={{ title: 'profile' , tabBarIcon: ({color, focused})=>(
             <Ionicons name={focused? 'person-circle' : 'person-circle-outline'} color={color} size={24}/>
        )}} />

         <Tabs.Screen 
        name="order" 
        options={{ title: 'orders' , tabBarIcon: ({color, focused})=>(
             <Ionicons name={focused? 'clipboard' : 'clipboard-outline'} color={color} size={24}/>
        )}} />

        

         <Tabs.Screen 
            name="productDetail/[id]"
            options={{href: null}}
        />
        <Tabs.Screen 
            name="confirmOrder"
            options={{href: null}}
        />

        <Tabs.Screen 
            name="editProfile"
            options={{href: null}}
        />

        <Tabs.Screen 
            name="orderSuccess"
            options={{href: null}}
        />

        <Tabs.Screen 
            name="orderDetail/[id]"
            options={{href: null}}
        />
    </Tabs>

   </UserOnly>
    )
}