import { StyleSheet, View, Text, Pressable, FlatList } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { useSelector, useDispatch } from "react-redux";
import { logOutUser } from "../reducers/userReducer";

const PostsScreen = ({ navigation }) => {
  const loggedInUser = useSelector(state => state.user);
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(logOutUser());
    navigation.navigate("Login");
  }

  const allPosts = [
    {
      createdAt: new Date(2023, 8, 6).toLocaleString(),
      author: {
        email: "sample@s.ca",
      },
      img: "uri"
    },
    {
      createdAt: new Date(2023, 8, 6).toLocaleString(),
      author: {
        email: "sample2@s.ca",
      },
      img: "uri"
    },
  ]

  const renderItem = ({ item }) => {
    return (
      <View style={{ borderColor: "grey" }}>
        <Text>{item.author.email}</Text>
        <Text>{item.createdAt}</Text>
        <Text>{item.img}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", padding: 20, }}>
        <Text style={styles.subtitle}>Posts</Text>
        <Pressable style={styles.button} onPress={() => navigation.navigate("Upload")}>
          <Text style={styles.buttonText}>New Post</Text>
        </Pressable>
      </View>
      <Text>Email: {loggedInUser?.email}</Text>

      <FlatList
        data={allPosts}
        renderItem={renderItem}
      />

      <View style={{ position: "absolute", bottom: 50 }}>
        <Pressable style={styles.button} onPress={logOut}>
          <Text style={styles.buttonText}>Log Out</Text>
        </Pressable>
      </View>
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  subtitle: { flex: 1, color: "green", fontSize: 30 },
  button: {
    flex: 0,
    backgroundColor: "green",
    width: 120,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
});

export default PostsScreen;