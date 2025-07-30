import { readAllData } from "@/lib/DbFromFileService";
import { Movie } from "@/models/Movie";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import BackgroundMovieTitle from "./BackgroundMovieTitle";
import MovieCard from "./MovieCard";

export default function Movies() {
    const [movies, setMovies] = useState<Movie[]>([]);
    useEffect(() => {
        (async () => {
            const data = await readAllData();
            setMovies(data);
        })();
    }, [])
    const navigation = useNavigation<any>();
    const handleGoDetails = (id: number) => {
        const movie = movies.find(m => m.id === id);
        navigation.navigate('details', { movie: movie })
    }
    return (
        <View style={{ flex: 1 }}>
            <BackgroundMovieTitle title="upcoming"/>
            <Text style={styles.title}>Movie</Text>
            <View style={{ marginTop: 15 }}>
                <FlatList
                    horizontal={true}
                    style={{ paddingLeft: 35 }}
                    data={movies}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <MovieCard onClick={handleGoDetails} movie={item} />}
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