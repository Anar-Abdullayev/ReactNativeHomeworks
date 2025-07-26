import { readAllData } from "@/lib/DbFromFileService";
import { Movie } from "@/models/Movie";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import MovieCard from "./MovieCard";

export default function Movies() {
    const [movies, setMovies] = useState<Movie[]>([]);
    useEffect(() => {
        (async () => {
            const data = await readAllData();
            setMovies(data);
        })();
    }, [])
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.backgroundTextContainer}><Text style={styles.backgroundTitle}>upcoming</Text></View>
            <Text style={styles.title}>Movie</Text>
            <View style={{ marginTop: 15 }}>
                <FlatList
                    horizontal={true}
                    style={{ paddingLeft: 35 }}
                    data={movies}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <MovieCard movie={item} />}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </View>
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
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        paddingLeft: 35
    },
})