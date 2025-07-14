import AddToDoItemForm from '@/components/AddTodoItemForm';
import Header from '@/components/Header';
import TodoCard from '@/components/TodoItem';
import { TodoItem } from '@/constants/TodoItem';
import { useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text
} from 'react-native';

const initalToDoList: TodoItem[] = [
  {
    id: 1,
    title: 'Zibilleri atmaq',
    description: 'Coreyi atma',
    status: false
  },
  {
    id: 2,
    title: 'Dersleri oxumaq',
    description: '',
    status: false
  },
  {
    id: 3,
    title: 'MyStat tapsirigi yazmaq',
    description: 'Additional olanlari da yaz',
    status: false
  },
  {
    id: 4,
    title: 'Valorant oyna',
    description: 'Her raunddan win al',
    status: false
  },
  {
    id: 5,
    title: 'Idman et',
    description: '',
    status: false
  }
];

export default function HomeScreen() {
  const [todoList, setTodoList] = useState<TodoItem[]>(initalToDoList);

  const handleToggle = (id: number, value: boolean) => {
    setTodoList(prev => prev.map(todo => todo.id === id ? { ...todo, status: value } : todo));
  };

  const handleDelete = (id: number) => {
    setTodoList(prev => prev.filter(item => item.id !== id));
  };

  return (
    <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={Platform.OS === 'ios' ? 0
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    : -70} style={{flex: 1, paddingBottom: Number(StatusBar.currentHeight)+10}}>
        <SafeAreaView style={[styles.container, { paddingTop: StatusBar.currentHeight }]}>
          <Header />

          <FlatList
            style={styles.flatlist}
            data={todoList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TodoCard
                item={item}
                onDelete={(id: number) => handleDelete(id)}
                onToggle={(id: number, value: boolean) => handleToggle(id, value)}
              />
            )}
            ListHeaderComponent={<Text style={{ fontSize: 18 }}>My ToDo List</Text>}
            ListHeaderComponentStyle={styles.todoListHeader}
          />

          <AddToDoItemForm
            todoList={todoList}
            onSet={(item) => setTodoList(prev => [...prev, item])}
          />
        </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: Number(StatusBar.currentHeight)+10
  },
  flatlist: {
    flex: 1
  },
  todoListHeader: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'gray',
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    marginTop: 15,
    marginBottom: 10
  }
});
