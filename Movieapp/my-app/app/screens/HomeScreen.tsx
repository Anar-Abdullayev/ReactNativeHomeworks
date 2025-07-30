import Movies from "@/components/Movies";
import Trending from "@/components/Trending";
import { Platform, SafeAreaView, StatusBar, StyleSheet, View } from "react-native";

export default function HomeScreen({ navigation }: any) {
    console.log(navigation)
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
            <View style={[styles.container]}>
                <Movies />
                <Trending />
            </View>
        </SafeAreaView>

    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1,
        paddingTop: Platform.OS === 'android' ? Number(StatusBar.currentHeight) : 0,

    },
    title: {
        fontSize: 25,
        color: 'white',
        paddingLeft: 35
    },
})