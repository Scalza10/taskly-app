import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SubTaskItemProps {
  text: string;
  isParent?: boolean;
  parentId?: string;
  parentChecked?: { [key: string]: boolean };
  onPress?: (checked: boolean) => void;
  forceChecked?: boolean;
}

export default function SubTaskItem({ 
  text, 
  isParent = false, 
  parentId,
  parentChecked,
  onPress,
  forceChecked 
}: SubTaskItemProps) {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (!isParent && parentId && parentChecked) {
      setIsChecked(parentChecked[parentId] || false);
    }
    if (forceChecked !== undefined) {
      setIsChecked(forceChecked);
    }
  }, [parentChecked, forceChecked, isParent, parentId]);

  const handlePress = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    if (onPress) onPress(newCheckedState);
  };

  return (
    <Pressable onPress={handlePress} style={styles.container}>
      <View style={[styles.checkbox, isChecked && styles.checked]}>
        {isChecked && <Ionicons name="checkmark" size={16} color="white" />}
      </View>
      <Text style={[
        styles.text,
        isParent && styles.parentText,
        isChecked && styles.checkedText
      ]}>
        {text}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#666',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  text: {
    fontSize: 14,
    color: '#333',
  },
  parentText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkedText: {
    textDecorationLine: 'line-through',
    color: '#666',
  },
});