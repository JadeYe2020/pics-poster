import { StyleSheet, View, Text } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { useSelector } from "react-redux";

const PostsScreen = () => {
  const loggedInUser = useSelector(state => state.user);

  return (
    <View style={styles.container}>
      <Text>PostsScreen</Text>
      <Text>Email: {loggedInUser.email}</Text>
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

export default PostsScreen;