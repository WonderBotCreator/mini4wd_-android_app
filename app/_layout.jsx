import { UserProvider } from "@/contexts/UserContext";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { CartProvider } from "../contexts/CartContext";
import { ProductProvider } from "../contexts/ProductContext";

export default function RootLayout() {
  
  return (
  <UserProvider>

  <ProductProvider>
  <CartProvider>
  <StatusBar />
  <Stack screenOptions={{
    headerStyle: {backgroundColor: '#ddd'},
    headerTintColor: '#333',
  }}>
    <Stack.Screen name="index" options={{headerShown: false}} />
    <Stack.Screen name="about" options={{title: 'About'}} />
    <Stack.Screen name="contact" options={{title: 'Contact'}}/>
    <Stack.Screen name="(auth)" options={{headerShown: false}}/>
    <Stack.Screen name="(dashboard)" options={{headerShown: false}}/>
  </Stack>
  </CartProvider>
  </ProductProvider>
  </ UserProvider>
  )
}
