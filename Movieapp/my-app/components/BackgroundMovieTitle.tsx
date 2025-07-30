import { StyleSheet, Text, View } from "react-native";

export default function BackgroundMovieTitle({ title }: { title: string }) {

    return (
        <View style={styles.backgroundTextContainer}><Text style={styles.backgroundTitle}>{title}</Text></View>
    )
}


const styles = StyleSheet.create({
    backgroundTextContainer: {
        position: 'absolute',
        marginTop: 5,
        opacity: 0.2
    },
    backgroundTitle: {
        color: 'orange',
        fontSize: 55,
        fontWeight: 'bold'
    },
})