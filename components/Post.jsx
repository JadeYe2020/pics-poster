import { StyleSheet, View, Text, Pressable, FlatList, Image } from "react-native";
import { Storage, API, graphqlOperation } from "aws-amplify";
import { useEffect, useState } from "react";

const Post = ({ item }) => {
  const [image, setImage] = useState(null);

  const downloadImage = async (item) => {
    const result = await Storage.get(item.img)
    console.log("result", result);
    setImage(result);
  };

  useEffect(() => {
    downloadImage(item);
  }, [])

  const dateTime = new Date(item.createdAt);
  const formated = dateTime.toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  })

  return (
    <View style={{ borderColor: "grey" }}>
      <Text>{item.author.email}</Text>
      <Text>{formated}</Text>
      <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
    </View>
  )
}

export default Post;