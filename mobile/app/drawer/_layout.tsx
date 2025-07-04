// app/drawer/_layout.tsx
import { Slot } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import NavigationBar from '@/components/NavigationBar';

export default function DrawerLayout() {
  return (
    <View style={styles.container}>
      <Slot /> {/* render các trang con như home, explore, etc */}
      <NavigationBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
