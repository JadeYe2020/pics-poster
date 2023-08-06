import { StyleSheet, View, Text, Pressable, FlatList, Image } from "react-native";
import { Storage, API, graphqlOperation } from "aws-amplify";
import { useSelector, useDispatch } from "react-redux";
import { logOutUser } from "../reducers/userReducer";
import { listPosts } from "../src/graphql/queries";
import { useEffect, useState } from "react";
import Post from "../components/Post";


const PostsScreen = ({ navigation }) => {
  const loggedInUser = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [allPosts, setAllPosts] = useState([]);

  const downloadImage = (item) => {
    Storage.get(item.img)
      .then((result) => item.image = result)
      .catch((err) => console.log(err));
  };

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

  console.log("allPosts", allPosts);

  const logOut = () => {
    dispatch(logOutUser());
    navigation.navigate("Login");
  }


  const renderItem = ({ item }) => {
    return <Post item={item} />
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", padding: 20, }}>
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