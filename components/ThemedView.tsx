import { Colors } from "@/constants/Colors";
import { useColorScheme, View } from "react-native";

type Props = {
    style: Object;
};

export default function ThemedView({style, ...props}: Props){
    const colorSchema = useColorScheme()
        let theme =  Colors.light
    
        if(colorSchema !== null && colorSchema !== undefined)
        {
            theme = Colors[colorSchema];
        }
    return(
        <View style={[{backgroundColor: theme.background}, style]} {...props}/>
    )
}