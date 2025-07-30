import { StyleSheet, Text, View } from "react-native";

export default function TagView({ title }: any) {
    return (
        <View style={styles.tag}>
            <Text style={[styles.tagText]}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    tag: {
        paddingHorizontal: 7,
        borderWidth: 1,
        borderColor: 'rgba(255,165,0,0.3)',
        borderRadius: 5
    },
    tagText: {
        color: 'orange',
        fontSize: 12
    }
})