import { StyleSheet, View, Text, Pressable, FlatList } from "react-native";
import { API, graphqlOperation } from "aws-amplify";
import { useSelector, useDispatch } from "react-redux";
import { logOutUser } from "../reducers/userReducer";
import { listPosts } from "../src/graphql/queries";
import { onCreatePost } from "../src/graphql/subscriptions";
import { useEffect, useState } from "react";
import theme from "../theme";
import Post from "../components/Post";
import ThemePicker from "../components/ThemePicker";


const PostsScreen = ({ navigation }) => {
  const loggedInUser = useSelector(state => state.user);
  const themeMode = useSelector(state => state.themeMode);
  const dispatch = useDispatch();
  const [allPosts, setAllPosts] = useState([]);

  const getAllPosts = async () => {
    let result = null;
    try {
      const res = await API.graphql(graphqlOperation(listPosts));
      if (res) {
        result = res.data.listPosts.items;
        result.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        })
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

  // subscription to update the view when new post is uploaded
  useEffect(() => {
    const createSub = API.graphql(graphqlOperation(onCreatePost)).subscribe({
      next: data => {
        const newPost = data.value.data.onCreatePost;
        if (newPost && allPosts.length > 0) {
          console.log("Add newPost on top.");
          const updatedArray = [newPost, ...allPosts];
          setAllPosts(updatedArray);
        } else {
          getAllPosts();
        }
      },
      error: error => console.warn('error from Sub onCreatePost', error),
    });

    return () => createSub.unsubscribe();
  }, [])


  if (!loggedInUser) {
    navigation.navigate("Login");
  }

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

      {allPosts.length === 0 &&
         <Text style={{color: theme.colors.primary, fontSize: 15, textAlign: "center"}}>{'No posts yet.\nPress "New Post" to upload a new post.'}</Text>
      }

      <View style={styles.flexContainer}>
        <FlatList
          data={allPosts}
          renderItem={renderItem}
        />
      </View>

      <View style={{ position: "absolute", alignSelf: "center", bottom: 50 }}>
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
    alignItems: "stretch",
  },
  darkModeContainer: {
    backgroundColor: theme.colors.darkBackground,
  },
  flexContainer: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 100,
    height: "60%",
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