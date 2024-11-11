import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SubTaskItem from '@/components/SubTaskItem';
import { useState } from 'react';


interface SubTasks {
  [key: string]: string;
}

interface Task {
  Title: string;
  SubTasks: SubTasks;
}

// Mock API response as direct object
const mockApiResponse: Task = {
  "Title": "Task 1: Organize the House",
  "SubTasks": {
    "SubTask1": "Declutter the main living areas:",
    "SubTask1.1": "Go through each room and collect items that don't belong (trash, random objects, etc.)",
    "SubTask1.2": "Sort through items to donate, sell, or throw away",
    "SubTask1.3": "Organize items into designated spaces or storage bins (books, toys, etc.)",

    "SubTask2": "Tidy up the kitchen:",
    "SubTask2.1": "Clear countertops of any non-essential items (appliances, dishes, etc.)",
    "SubTask2.2": "Wipe down all surfaces, including counters, tables, and stovetop",
    "SubTask2.3": "Organize kitchen drawers and cabinets, ensuring utensils and tools are stored in an efficient manner",
    "SubTask2.4": "Sort through the fridge, disposing of expired food and organizing shelves by category (dairy, vegetables, etc.)",

    "SubTask3": "Organize bedrooms:",
    "SubTask3.1": "Make the beds and fluff pillows",
    "SubTask3.2": "Put away any clothes left out (fold, hang, or store in bins)",
    "SubTask3.3": "Organize bedside tables, drawers, and closets (sort through items to donate or store)",
    "SubTask3.4": "Vacuum or sweep the floors",

    "SubTask4": "Organize bathrooms:",
    "SubTask4.1": "Clear countertops and dispose of expired toiletries or products",
    "SubTask4.2": "Wipe down all surfaces (sink, mirror, shelves, etc.)",
    "SubTask4.3": "Organize bathroom drawers and cabinets (arrange toiletries, towels, and cleaning supplies)",
    "SubTask4.4": "Wash or replace used towels and bath mats",

    "SubTask5": "Organize the entryway or hallway:",
    "SubTask5.1": "Remove shoes, coats, and bags from the floor or entryway table",
    "SubTask5.2": "Store shoes in designated bins or racks, and hang coats or jackets in the closet",
    "SubTask5.3": "Organize mail, keys, and other daily items into an easy-to-access tray or bowl",

    "SubTask6": "Organize storage spaces (closets, attic, basement, etc.):",
    "SubTask6.1": "Sort through items in storage, deciding what to keep, donate, or throw away",
    "SubTask6.2": "Label boxes and bins for easy identification",
    "SubTask6.3": "Arrange items by category (holiday decorations, seasonal clothing, etc.) to optimize space",

    "SubTask7": "Final cleaning and finishing touches:",
    "SubTask7.1": "Vacuum or sweep all floors in the house",
    "SubTask7.2": "Mop floors in high-traffic areas (kitchen, bathroom, hallway)",
    "SubTask7.3": "Dust furniture, shelves, and light fixtures",
    "SubTask7.4": "Take out the trash and replace garbage bags",
    "SubTask7.5": "Add decorative items (candles, plants, etc.) to complete the fresh, organized look"
  }
};

const groupSubTasks = (subtasks: SubTasks) => {
  const grouped: { [key: string]: string[] } = {};
  
  Object.entries(subtasks).forEach(([key, value]) => {
    if (!key.includes('.')) {
      grouped[key] = [value];
    } else {
      const parentKey = key.split('.')[0];
      if (!grouped[parentKey]) {
        grouped[parentKey] = [];
      }
      grouped[parentKey].push(value);
    }
  });
  
  return grouped;
};

export default function Index() {
  const groupedTasks = groupSubTasks(mockApiResponse.SubTasks);
  const [parentCheckedStates, setParentCheckedStates] = useState<{ [key: string]: boolean }>({});

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={styles.taskTitle}>{mockApiResponse.Title}</Text>
        {Object.entries(groupedTasks).map(([key, subtasks], index) => (
          <View key={index} style={styles.taskGroup}>
            <SubTaskItem 
              text={subtasks[0]} 
              isParent={true}
              parentId={key}
              onPress={(checked) => {
                setParentCheckedStates(prev => ({
                  ...prev,
                  [key]: checked
                }));
              }}
            />
            <View style={styles.subtaskContainer}>
              {subtasks.slice(1).map((subtask, subIndex) => (
                <SubTaskItem
                  key={subIndex}
                  text={subtask}
                  parentId={key}
                  parentChecked={parentCheckedStates}
                />
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
    padding: 20,
    width: '95%',
  },
  taskTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  taskGroup: {
    marginBottom: 15,
  },
  subtaskContainer: {
    marginLeft: 20,
  },
});