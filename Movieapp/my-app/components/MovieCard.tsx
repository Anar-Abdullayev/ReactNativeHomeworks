import { Movie } from "@/models/Movie";
import { Image, StyleSheet, Text, View } from "react-native";
import TagView from "./TagView";

interface Props {
    movie: Movie
}

export default function MovieCard({ movie }: Props) {

    return (
        <View style={styles.container}>
            <Image source={{ uri: movie.imageUrl }} style={styles.image} />
            <View style={styles.infoContainer}>
                <View style={{flex:1}}><Text style={styles.color}>{movie.name}</Text></View>
                <TagView title={movie.tags[0]} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginRight: 10,
        maxWidth: 180,
        overflow: 'hidden'
    },
    image: {
        height: 250,
        width: 180,
    },
    color: { color: 'white' },
    infoContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10, minHeight: 40, gap: 5 },
})