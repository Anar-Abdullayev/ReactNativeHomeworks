import { formatToShortTime } from "@/lib/time";
import { Movie } from "@/models/Movie";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, StyleSheet, Text, View } from "react-native";
import TagView from "./TagView";

interface Props {
    movie: Movie
}

export default function TrendingCard({ movie }: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: movie.imageUrl }} style={{ width: '100%', height: '100%' }} />
                <View style={styles.imageInfoContainer}>
                    <View style={styles.imdbContainer}><Ionicons name="star" size={18} /><Text style={{ fontSize: 15, fontWeight: 'bold' }}>{movie.imdb.toPrecision(2)}</Text></View>
                    {
                        movie.tags.map((t,index) => <TagView key={index} title={t.replace(':', '')} />)
                    }
                </View>
            </View>
            <View style={styles.infoContainer}>
                <Text style={[styles.text, styles.title]}>{movie.name}</Text>
                <Text style={[{ color: 'gray' }]}>{formatToShortTime(movie.duration)}</Text>
                <Text style={[styles.genreText]}>{movie.genre.map((g) => g.replace(':', '')).join(' / ')}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
        flexDirection: 'row'
    },
    imageContainer: {
        width: 150,
        height: 160,
        overflow: 'visible'
    },
    infoContainer: {
        flex: 1,
        marginTop: 15,
        marginLeft: 25,
    },
    text: {
        color: 'white'
    },
    title: {
        fontSize: 20,
        flexShrink: 1
    },
    genreText: { color: 'orange', marginTop: 10 },
    imageInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 130,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    imdbContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        backgroundColor: 'orange',
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 5
    }
})