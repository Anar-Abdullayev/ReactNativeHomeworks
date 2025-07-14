// components/TodoCard.tsx
import { TodoItem } from '@/constants/TodoItem';
import Feather from '@expo/vector-icons/Feather';
import Checkbox from 'expo-checkbox';
import { Alert, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

type TodoCardProps = {
    item: TodoItem;
    onToggle?: (id: number, done: boolean) => void;
    onDelete?: (id: number) => void;
};

export default function TodoCard({ item, onToggle, onDelete }: TodoCardProps) {

    const handleToggle = (value: boolean) => {
        onToggle?.(item.id, value);
    };

    const handleDelete = () => {
        Alert.alert('Are you sure?', 'You are going to delete this item. Confirm it please.',[
            {
                text: 'Cancel',
                onPress: () => { return null },
                style: 'cancel'
            },
            { text: 'Delete', onPress: () => { onDelete?.(item.id) }}
        ])
    }

    return (
        <View style={styles.card}>
            <TouchableWithoutFeedback onPress={() => handleToggle(!item.status)}>
                <View style={[styles.container, item.status && styles.doneContainer]}>
                    <View style={styles.textBlock}>
                        <Text
                            style={[styles.title, item.status && styles.lineThrough]}
                            numberOfLines={1}
                        >
                            {item.title}
                        </Text>

                        {item.description ? (
                            <Text
                                style={[styles.description, item.status && styles.lineThrough]}
                                numberOfLines={2}
                            >
                                {item.description}
                            </Text>
                        ) : null}
                    </View>

                    <Checkbox
                        value={item.status}
                        onValueChange={handleToggle}
                        color={item.status ? '#34D399' : undefined}
                    />
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={handleDelete}>
                <View style={{justifyContent:'center'}}>
                    <Feather name="trash-2" size={24} color="black" />
                </View>
            </TouchableWithoutFeedback>
        </View>

    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        gap: 15,
        marginBottom: 10
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex:1,
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 12,

        elevation: 2,
    },

    doneContainer: {
        backgroundColor: '#F0FDF4',
    },

    textBlock: {
        flex: 1,
        paddingRight: 12,
    },

    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827', // gray‑900
    },

    description: {
        marginTop: 2,
        fontSize: 13,
        color: '#6B7280', // gray‑500
    },

    lineThrough: {
        textDecorationLine: 'line-through',
        color: '#9CA3AF', // gray‑400
    },
});
