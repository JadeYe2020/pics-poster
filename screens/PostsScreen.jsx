import { StyleSheet, View, Text, Pressable, FlatList, Image } from "react-native";
import { Storage, API, graphqlOperation } from "aws-amplify";
import { useSelector, useDispatch } from "react-redux";
import { logOutUser } from "../reducers/userReducer";
import { listPosts } from "../src/graphql/queries";
import { useEffect, useState } from "react";
import theme from "../theme";
import Post from "../components/Post";
import ThemePicker from "../components/ThemePicker";


const PostsScreen = ({ navigation }) => {
  const loggedInUser = useSelector(state => state.user);
  const themeMode = useSelector(state => state.themeMode);
  const dispatch = useDispatch();
  const [allPosts, setAllPosts] = useState([]);

  // const downloadImage = (item) => {
  //   Storage.get(item.img)
  //     .then((result) => item.image = result)
  //     .catch((err) => console.log(err));
  // };

  const getAllPosts = async () => {
    let result = null;
    try {
      const res = await API.graphql(graphqlOperation(listPosts));
      if (res) {
        result = res.data.listPosts.items;
        setAllPosts(result);
      }
    } catch (error) {
      console.log("error from getAllPosts()", error.errors[0].message);
    }
    return result;
  }

  useEffect(() => {
    getAllPosts();
  }, [])

  const logOut = () => {
    dispatch(logOutUser());
    navigation.navigate("Login");
  }

  const renderItem = ({ item }) => {
    return <Post item={item} themeMode={themeMode} />
  }

  return (
    <View style={[styles.container, themeMode === "DARK" && styles.darkModeContainer]}>
      <Text style={styles.title}>SavorHub</Text>
      <ThemePicker />

      <View style={{ marginTop: 100, flexDirection: "row", alignItems: "center", alignSelf: "flex-start", padding: 10 }}>
        <Text style={styles.subtitle}>Posts</Text>
        <Pressable style={styles.button} onPress={() => navigation.navigate("Upload")}>
          <Text style={styles.buttonText}>New Post</Text>
        </Pressable>
      </View>

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
    backgroundColor: theme.colors.lightBackground,
    alignItems: 'center',
  },
  darkModeContainer: {
    backgroundColor: theme.colors.darkBackground,
  },
  title: {
    position: "absolute",
    top: 50,
    color: theme.colors.primary,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  subtitle: {
    flex: 1,
    color: theme.colors.primary,
    fontSize: 30,
    alignSelf: "auto",
  },
  button: {
    flex: 0,
    backgroundColor: theme.colors.primary,
    width: 120,
    height: 45,
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