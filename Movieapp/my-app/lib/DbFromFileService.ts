import { Movie } from '@/models/Movie';
import * as FileSystem from 'expo-file-system';

const fileDbPath = FileSystem.documentDirectory + 'movies.txt';


export async function readAllData() {
    const fileInfo = await FileSystem.getInfoAsync(fileDbPath);
    if (!fileInfo.exists) {
        console.log('The specified path does not exist: ', fileDbPath);
        return [];
    }

    try {
        const content = await FileSystem.readAsStringAsync(fileDbPath);

        const movies: Movie[] = content.split('\n').filter(line => line.trim() !== '').map(line => {
            const [id, name, storyline, imageUrl, imdb, rotten, tags, genre, duration ] = line.split(':,,');

            return {
                id: Number(id),
                name,
                storyline,
                imageUrl,
                imdb: Number(imdb),
                rotten: Number(rotten),
                tags: tags.split(':,'),
                genre: genre.split(':,'),
                duration: Number(duration)
            }
        })
        return movies;
    } catch (error) {
        console.log('Read file error: ', error);
        return [];
    }
}

export async function writeAllDataAsync(movies: Movie[]) {
    const content = movies
        .map(
            (p) =>
                `${p.id}:,,${p.name}:,,${p.storyline}:,,${p.imageUrl}:,,${p.imdb}:,,${p.rotten}:,,${p.tags.map(t=>`${t}:`)}:,,${p.genre.map(g=>`${g}:`)}:,,${p.duration}`
        )
        .join('\n');

    try {
        await FileSystem.writeAsStringAsync(fileDbPath, content, {
            encoding: FileSystem.EncodingType.UTF8
        });
        console.log('Saved successfully', fileDbPath);
    } catch (err) {
        console.error('Failed to write file:', err);
    }
}

export async function resetDb() {
    const dbFile = await FileSystem.getInfoAsync(fileDbPath);
    const imagesFolder = await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'movieImages/');
    if (dbFile.exists)
        FileSystem.deleteAsync(fileDbPath, { idempotent: true });
    if (imagesFolder.exists)
        FileSystem.deleteAsync(imagesFolder.uri, { idempotent: true });

    const movie1:Movie = {
        id: 1,
        duration:123,
        genre: ['Action'],
        imageUrl: 'https://m.media-amazon.com/images/M/MV5BMmFiZGZjMmEtMTA0Ni00MzA2LTljMTYtZGI2MGJmZWYzZTQ2XkEyXkFqcGc@._V1_.jpg',
        imdb: 8,
        name: 'Spider Man - No Way Home',
        rotten: 10,
        storyline: `With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear.`,
        tags: ['3DMax', 'iMax']
    }
    
    const movie2:Movie = {
        id: 2,
        duration:97,
        genre: ['Animation','Comedy'],
        imageUrl: 'https://lumiere-a.akamaihd.net/v1/images/p_bighero6_19753_20bd6206.jpeg',
        imdb: 7,
        name: 'Big Hero 6',
        rotten: 5,
        storyline: `A special bond develops between plus-sized inflatable robot Baymax and prodigy Hiro Hamada, who together team up with a group of friends to form a band of high-tech heroes.`,
        tags: ['3DMax', 'iMax']
    }

    
    
    const movie3:Movie = {
        id: 3,
        duration:140,
        genre: ['Drama'],
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/8/81/Poster-pursuithappyness.jpg',
        imdb: 9,
        name: 'The Pursuit of Happyness',
        rotten: 3,
        storyline: `A struggling salesman takes custody of his son as he's poised to begin a life-changing professional career.`,
        tags: ['3DMax', 'iMax']
    }

    
    const movie4:Movie = {
        id: 4,
        duration:100,
        genre: ['Comedy'],
        imageUrl: 'https://m.media-amazon.com/images/M/MV5BZGU5ZmZjNDUtYzBiZS00NWVlLTgwMjAtM2M2OGFmM2M4MmRkXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
        imdb: 8.5,
        name: 'Bedazzled',
        rotten: 25,
        storyline: `Hopeless dweeb Elliot Richards is granted seven wishes by the Devil to snare Allison, the girl of his dreams, in exchange for his soul.`,
        tags: ['3DMax', 'iMax']
    }


    const movies: Movie[] = [movie1, movie2, movie3, movie4]
    writeAllDataAsync(movies);
}