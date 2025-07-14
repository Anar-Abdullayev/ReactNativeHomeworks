import { StyleSheet, Text, View } from "react-native";

export default function Header() {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Manage your ToDo</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        backgroundColor: '#ff5733',
        padding: 15
    },
    title: {
        fontSize: 20
    }
})