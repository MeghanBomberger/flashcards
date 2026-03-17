import { useState, useEffect } from 'react';
import { useFonts as usePermanentMarker, PermanentMarker_400Regular } from '@expo-google-fonts/permanent-marker';
import { useFonts as useIndieFlower, IndieFlower_400Regular } from '@expo-google-fonts/indie-flower';
import { useFonts as useAmaticSC, AmaticSC_400Regular, AmaticSC_700Bold } from '@expo-google-fonts/amatic-sc';
import { useFonts as useQuicksand, Quicksand_400Regular, Quicksand_700Bold } from '@expo-google-fonts/quicksand';
import { useFonts as useAbel, Abel_400Regular } from '@expo-google-fonts/abel';
import { useFonts as useSatisfy, Satisfy_400Regular } from '@expo-google-fonts/satisfy';
import { useFonts as useShadowsIntoLight, ShadowsIntoLight_400Regular } from '@expo-google-fonts/shadows-into-light';
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
  const [permanentMarkerLoaded] = usePermanentMarker({ PermanentMarker_400Regular });
  const [indieFlowerLoaded] = useIndieFlower({ IndieFlower_400Regular });
  const [amaticSCLoaded] = useAmaticSC({ AmaticSC_400Regular, AmaticSC_700Bold });
  const [quicksandLoaded] = useQuicksand({ Quicksand_400Regular, Quicksand_700Bold });
  const [abelLoaded] = useAbel({ Abel_400Regular });
  const [satisfyLoaded] = useSatisfy({ Satisfy_400Regular });
  const [shadowsIntoLightLoaded] = useShadowsIntoLight({ ShadowsIntoLight_400Regular });

  const fontsLoaded = permanentMarkerLoaded && indieFlowerLoaded && amaticSCLoaded && quicksandLoaded && abelLoaded && satisfyLoaded && shadowsIntoLightLoaded;
  if (!fontsLoaded) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Loading fonts...</Text></View>;
  }
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
