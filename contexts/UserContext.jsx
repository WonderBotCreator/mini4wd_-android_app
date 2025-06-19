import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { createContext, useEffect, useState } from "react";

const baseUrl = 'http://localhost:3001/api'
export const UserContext = createContext();

export function UserProvider({children})
{
    const baseUrl = process.env.EXPO_PUBLIC_API_URL
    const [user, setUser] = useState(null)
    const [authChecked, setAuthChecked] = useState(false)

    async function login(email, password){
        try{
            if(user !== null)
            {
                return
            }

            const response = await axios.post(baseUrl+'/api/login', {email: email, password: password})

            let userData = response.data
            userData.token = `Bearer ${userData.token}`
            setUser(userData)

            const jsonValue = JSON.stringify(userData)
            await AsyncStorage.setItem('user', jsonValue)
            if(response.data.status === 'success'){
                return response.data
            }
        }catch(error){

            return error.response.data
        }
    }

    async function getProfile(){
        try{
            const config = {
                headers: { Authorization: user.token },
            }


            const response = await axios.get(baseUrl+'/api/profile', config)

            if(response.data.status === 'success')
            {
                return response.data
            }
        }catch(error){

        }
    }


    async function updateProfile(data){
        try{
            const config = {
                headers: { Authorization: user.token },
            }

            const profileObject = {
                firstname: data.firstname,
                lastname: data.lastname,
                address: data.address,
                phone: data.phone
            }

            const response = await axios.put(baseUrl+'/api/profile',profileObject, config)


            if(response.data.status === 'success')
            {
                return response.data
            }
        }catch(error){
            return error.response.data
        }
    }

    async function register(email,username, password){
        try{
           
            const response = await axios.post(baseUrl+'/api/register', {email: email,username: username, password: password})

           if(response.data.status === 'success')
           {
                return response.data
           }
        }catch(error){
            return error.response.data
        }
    }

    async function logout(){
        setUser(null)
        await AsyncStorage.removeItem('user')
    }

    async function getInitialUserValue(){
        try{
            const value = await AsyncStorage.getItem('my-key');
            const jsonValue = null ?null: JSON.parse(jsonValue)
            
            if(jsonValue !== null){

                setUser(value)
            }
        }catch(error){

        }finally{
            setAuthChecked(true)
        }
    }

    useEffect(()=>{
        getInitialUserValue();
    },[])

    return(
        <UserContext.Provider value={{user, login, register, logout, getProfile, updateProfile, authChecked}}>
            {children}
        </UserContext.Provider>
    )
}