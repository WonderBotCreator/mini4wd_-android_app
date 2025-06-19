import { View } from "react-native";


type Props = {
    width?: number,
    height: number
};

export default function Spacer({width = 100, height = 40}: Props){
    return(
        <View style={{width: "100%", height}}/>
    )
}