import { StyleSheet, View, Text } from "react-native";
import { StatusBar } from 'expo-status-bar';

const UploadScreen = () => {
  return (
    <View style={styles.container}>
      <Text>UploadScreen</Text>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default UploadScreen;