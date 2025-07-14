import { TodoItem } from "@/constants/TodoItem";
import { useState } from "react";
import {
    Alert,
    Button,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

type Properties = {
  todoList: TodoItem[];
  onSet: (item: TodoItem) => void;
};

export default function AddToDoItemForm({ todoList, onSet }: Properties) {
  const [newItem, setNewItem] = useState({ title: "", description: "" });

  const handleAdd = () => {
    if (newItem.title.trim() === "") {
      Alert.alert("Validation", "Title is required.");
      return;
    }

    const newTodo: TodoItem = {
      id: todoList.length > 0 ? todoList[todoList.length - 1].id + 1 : 1,
      title: newItem.title.trim(),
      description: newItem.description.trim(),
      status: false,
    };

    onSet(newTodo);
    setNewItem({ title: "", description: "" });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add New Todo</Text>

      <TextInput
        style={styles.input}
        placeholder="Title"
        value={newItem.title}
        onChangeText={(text) => setNewItem({ ...newItem, title: text })}
      />

      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="Description"
        value={newItem.description}
        multiline
        numberOfLines={3}
        onChangeText={(text) => setNewItem({ ...newItem, description: text })}
      />

      <Button title="Add Todo" onPress={handleAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    marginBottom: 12,
    borderRadius: 6,
    backgroundColor: "#f9f9f9",
  },
  multilineInput: {
    textAlignVertical: "top",
  },
});
