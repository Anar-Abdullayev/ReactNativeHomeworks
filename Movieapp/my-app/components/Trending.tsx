import { readAllData } from "@/lib/DbFromFileService";
import { Movie } from "@/models/Movie";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TrendingCard from "./TrendingCard";

export default function Trending() {
    const [trendings, setTrendings] = useState<Movie[]>([]);
    const tabBarHeight = useBottomTabBarHeight();
    useEffect(() => {
        (async () => {
            const data = await readAllData();
            setTrendings(data);
        })();
    }, [])

    const insets = useSafeAreaInsets();

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.backgroundTextContainer}><Text style={styles.backgroundTitle}>trending</Text></View>
            <Text style={styles.title}>Trending</Text>
            <View style={{ paddingLeft: 35, marginTop: 15, height: '100%' }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={trendings}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <TrendingCard movie={item} />}
                    contentContainerStyle={{ paddingBottom: insets.bottom }}
                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    backgroundTextContainer: {
        position: 'absolute',
        marginTop: -10,
        opacity: 0.2
    },
    backgroundTitle: {
        color: 'orange',
        fontSize: 75,
        fontWeight: 'bold'
    },
    title: {
        fontSize: 25,
        color: 'white',
        paddingLeft: 35,
        fontWeight: 'bold'
    },
})