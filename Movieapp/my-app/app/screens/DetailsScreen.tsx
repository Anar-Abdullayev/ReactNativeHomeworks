import BackgroundMovieTitle from '@/components/BackgroundMovieTitle';
import TagView from '@/components/TagView';
import { formatToShortTime } from '@/lib/time';
import { Movie } from '@/models/Movie';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { Image, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function DetailsScreen({ navigation, route }: any) {
    const { movie }: { movie: Movie } = route.params;
    useEffect(() => {
        const parentNavigation = navigation.getParent();
        parentNavigation?.setOptions({ tabBarStyle: { display: 'none' } })

        return () => {
            parentNavigation?.setOptions({ tabBarStyle: { backgroundColor: 'black' } })
        }
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
            <View style={styles.container}>
                <NavigationBar onGoBack={() => navigation.goBack()} />
                <View>
                    <BackgroundMovieTitle title={movie.name} />
                    <Text style={styles.movieTitle}>{movie.name}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                    <View style={{ width: '50%', height: 290 }}>
                        <View style={styles.imageImdb}>
                            <Ionicons name="star" size={18} />
                            <Text>{movie.imdb.toPrecision(2)}</Text>
                        </View>
                        <Image source={{ uri: movie.imageUrl }} style={styles.image} />
                        <WatchTrailer />
                    </View>
                    <View style={{ flex: 1, paddingLeft: 20, paddingTop: 15, paddingRight: 50 }}>
                        <Text style={{ color: 'gray', fontSize: 25 }}>{formatToShortTime(movie.duration)}</Text>
                        <Text style={[styles.genreText]}>{movie.genre.map((g) => g.replace(':', '')).join(' / ')}</Text>
                        <View style={{ flexDirection: 'row', gap: 15, marginTop: 10 }}>
                            {
                                movie.tags.map((t, index) => <TagView key={index} title={t.replace(':', '')} />)
                            }
                        </View>
                        <View style={{ marginTop: 15 }}>
                            <InfoText info={`${movie.imdb.toPrecision(2)}/10`} infoTitle={'imdb'} />
                            <InfoText style={{ marginTop: 5 }} info={`${movie.rotten}%`} infoTitle={'rotten'} />
                        </View>
                    </View>
                </View>
                <AdditionalInfoPart movie={movie}/>
            </View>
            <BookTicketButton />
        </SafeAreaView>
    )
}

function AdditionalInfoPart({movie}:{movie: Movie}) {
    const [activeButton, setActiveButton] = useState<string>('Info');

    return (
        <View style={additionalInfoStyles.container}>
            <View style={additionalInfoStyles.navBarContainer}>
                <NavButton onClick={() => setActiveButton('Info')} isActive={activeButton === 'Info'} text='Info' />
                <NavButton onClick={() => setActiveButton('Review')} isActive={activeButton === 'Review'} text='Review' />
                <NavButton onClick={() => setActiveButton('Awards')} isActive={activeButton === 'Awards'} text='Awards' />
            </View>

            {activeButton === 'Info' &&
                <View>
                    <Text style={{color:'white', marginTop: 25, fontSize: 20}}>Storyline</Text>
                    <Text style={{color:'gray', marginTop: 15, fontSize: 16}}>{movie.storyline}</Text>
                </View>
            }
        </View>
    )
}


function NavButton({ text, isActive, onClick }: { text: string, isActive: boolean, onClick: () => void }) {
    return (
        <TouchableOpacity onPress={onClick} style={[additionalInfoStyles.navButton, isActive ? { borderBottomColor: 'orange' } : {}]}>
            <View>
                <Text style={[additionalInfoStyles.textColor, isActive ? { color: 'white' } : {}]}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}
const additionalInfoStyles = StyleSheet.create({
    container: {
        paddingLeft: 35,
        marginTop: 15
    },
    navBarContainer: {
        flexDirection: 'row',
    },
    textColor: {
        color: 'gray',
        textAlign: 'center'
    },
    navButton: {
        flex: 1,
        borderBottomWidth: 4,
        borderBottomColor: 'transparent',
        padding: 20
    }
})

const styles = StyleSheet.create({
    genreText: { color: 'orange', marginTop: 10, fontSize: 16 },
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? Number(StatusBar.currentHeight) : 0,
    },
    colorWhite: {
        color: 'white'
    },
    navigationBar: {
        marginTop: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    movieTitle: {
        color: 'white',
        marginTop: 10,
        fontSize: 30,
        marginLeft: 50
    },
    image: {
        height: '100%',
        resizeMode: 'stretch'
    },
    imageImdb: {
        flexDirection: 'row',
        justifyContent: 'center', alignItems: 'center',
        gap: 6,
        backgroundColor: 'white',
        opacity: 0.8,
        width: 55,
        height: 30,
        position: 'absolute',
        top: 0, right: 0,
        zIndex: 1
    }
})

function NavigationBar({ onGoBack }: { onGoBack: () => void }) {
    return (
        <View style={styles.navigationBar}>
            <TouchableOpacity onPress={onGoBack}>
                <Ionicons name="chevron-back" size={45} color="white" />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 15 }}>
                <Ionicons name="bookmark-outline" size={30} color="white" />
                <Ionicons name="ellipsis-vertical" size={30} color="white" />
            </View>
        </View>
    )
}
interface InfoTextProps {
    info: string,
    infoTitle: string,
    style?: ViewStyle | ViewStyle[]
}
function InfoText({ info, infoTitle, style = {} }: InfoTextProps) {
    return (
        <View style={[{ flexDirection: 'row', backgroundColor: 'gray', height: 30, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }, style]}>
            <Text style={[{ color: 'white' }]}>{info}</Text>
            <Text style={[{ color: 'white' }]}>{infoTitle}</Text>
        </View>
    )
}

function WatchTrailer() {
    return (
        <View style={trailerStyle.container}>
            <Ionicons name="play" size={24} color="black" />
            <Text style={{ fontWeight: 'bold' }}>Watch Trailer</Text>
        </View>
    )
}

const trailerStyle = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: 'orange',
        paddingHorizontal: 20,
        paddingVertical: 15,
        flexDirection: 'row',
        gap: 15,
        bottom: 0,
        right: -120,
        alignItems: 'center'
    }
})

function BookTicketButton() {
    const insets = useSafeAreaInsets();
    return (
        <View style={{
            position: 'absolute', bottom: 0, width: '100%', height: 60, backgroundColor: 'orange',
            justifyContent: 'center', alignItems: 'center', marginBottom: insets.bottom
        }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Book Ticket</Text>
        </View>
    )
}

