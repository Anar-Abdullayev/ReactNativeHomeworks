import * as FileSystem from 'expo-file-system';

const destinationFolder = 'movieImages/'


export async function CopyFileAsync(fromUri: string, toUri: string) {
    try {
        const dir = FileSystem.documentDirectory + destinationFolder;

        const dirInfo = await FileSystem.getInfoAsync(dir);

        if (!dirInfo.exists) {
            await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
        }

        const filename = fromUri.split('/').pop();

        if (!filename) throw new Error('Invalid file name');

        const dest = dir + filename;

        await FileSystem.copyAsync({ from: fromUri, to: dest });

        return dest;
    } catch (err: any) {
        console.error(err);
        return null;
    }
};

export async function DeleteFileAsync(uri: string) {
    const fileInfo = await FileSystem.getInfoAsync(uri);
    if (fileInfo.exists) {
        await FileSystem.deleteAsync(uri);
    }
}

export async function GetDirectoryInfo(uri: string) {
    const info = await FileSystem.readDirectoryAsync(uri);
    console.log(info);
}