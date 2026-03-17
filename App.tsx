import { useState, useEffect } from 'react';
import { View, TextInput, ScrollView, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Storage } from './storage';
import AppBackground from './components/AppBackground';

function Item({ item, onPress }) {
  return (
    <TouchableOpacity
      onPress={() => onPress(item.id)}
      style={[styles.item, item.done && styles.itemDone]}
    >
      <Text style={[styles.itemText, item.done && styles.itemTextDone]}>{item.value}</Text>
    </TouchableOpacity>
  );
}

export default function App() {
  const [text, setText] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    const all = await Storage.getItems();
    setItems(all);
  }

  async function addItem() {
    if (text.trim() === '') return;
    await Storage.addItem({ value: text, done: false });
    setText('');
    await fetchItems();
  }

  async function markDone(id) {
    await Storage.updateItemAsDone(id);
    await fetchItems();
  }

  async function deleteItem(id) {
    await Storage.deleteItem(id);
    await fetchItems();
  }

  const todo = items.filter(i => !i.done);
  const done = items.filter(i => i.done);

  return (
    <AppBackground>
      <View style={styles.container}>
        {/* <Text style={styles.heading}>Flashcards Example</Text>
        <View style={styles.flexRow}>
          <TextInput
            value={text}
            onChangeText={setText}
            onSubmitEditing={addItem}
            placeholder="Add a flashcard question"
            style={styles.input}
          />
        </View>
        <ScrollView style={styles.listArea}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeading}>Todo</Text>
            {todo.map(item => (
              <Item key={item.id} item={item} onPress={markDone} />
            ))}
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeading}>Completed</Text>
            {done.map(item => (
              <Item key={item.id} item={item} onPress={deleteItem} />
            ))}
          </View>
        </ScrollView> */}
      </View>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  flexRow: {
    flexDirection: 'row',
  },
  input: {
    borderColor: '#4630eb',
    borderRadius: 4,
    borderWidth: 1,
    flex: 1,
    height: 48,
    margin: 16,
    padding: 8,
  },
  listArea: {
    flex: 1,
    paddingTop: 16,
  },
  sectionContainer: {
    marginBottom: 16,
    marginHorizontal: 16,
  },
  sectionHeading: {
    fontSize: 18,
    marginBottom: 8,
  },
  item: {
    borderColor: '#000',
    borderWidth: 1,
    padding: 8,
  },
  itemDone: {
    backgroundColor: '#1c9963',
  },
  itemText: {
    color: '#000',
  },
  itemTextDone: {
    color: '#fff',
  },
});
