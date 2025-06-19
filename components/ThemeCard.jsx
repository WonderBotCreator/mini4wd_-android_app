import { StyleSheet, View } from "react-native"

const ThemeCard = ({style, ...props})=>{
    return(
        <View
            style={[{backgroundColor: "#fff"}, styles.card, style]}
            {...props}
        />
    )
}


export default ThemeCard

const styles = StyleSheet.create({
    card:{
        borderRadius: 5,
        padding: 20
    }
})