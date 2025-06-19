import { Pressable, StyleSheet, Text, View } from "react-native"

const DisplayCard = ({name, price, id, image})=>{
    return(
        <Pressable style={styles.container}>
            <View style={styles.details}>
            <Text style={styles.text}>{name}</Text>
            <Text style={styles.text}>{price}</Text>
            </View>
        </Pressable>
    )
}

export default DisplayCard

const styles = StyleSheet.create({
    container:{
        width: '80%',
        height: '50%',
        minWidth: 250,
        minHeight: 160,
        backgroundColor: "#1061ad",
        borderRadius: 25,
        marginTop: 45,
        marginRight: 25,
        flexDirection: "row"
    },
    details:{
        width: '70%',
        padding: 15,
        justifyContent: 'space-around'
    },
    text:{
        color: "#fff"
    },

    image:{
        width: 135,
        height: 155,
       
    }
})