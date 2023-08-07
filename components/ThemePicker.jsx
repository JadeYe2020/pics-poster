import { StyleSheet, View, Text, Pressable, FlatList, Image, ActivityIndicator } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Storage, API, graphqlOperation } from "aws-amplify";
import { useEffect, useState } from "react";

export default ThemePicker = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {
      label: 'Light', value: 'LIGHT',
    },
    { label: 'Dark', value: 'DARK' }
  ]);
  
  const storeValue = async (value) => {
    try {
      await AsyncStorage.setItem('my-theme', value);
    } catch (e) {
      console.log("saving error", e);
    }
  };

  const changeTheme = async (value) => {
    await storeValue(value);
    DropDownPicker.setTheme(value);
    setValue(value);
  }

  const getStoredValue = async () => {
    try {
      const value = await AsyncStorage.getItem('my-theme');
      if (value !== null) {        
        DropDownPicker.setTheme(value);
      }
    } catch (e) {
      console.log("error reading value", e);
    }
  };

  useEffect(() => {
    getStoredValue();
  }, [])

  if (value) {
    DropDownPicker.setTheme(value);
  }

  return (
    <View style={{ position: "absolute", top: 50, right: 10, zIndex: 1000 }}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        onChangeValue={changeTheme}
        placeholder="Theme"
        style={{ minHeight: 30, width: 100 }}
        zIndex={1000}
      />
    </View>
  );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  subtitle: {
    position: "absolute",
    top: 50,
    color: "green",
    fontSize: 30,
    textAlign: "center",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    flex: 0,
    backgroundColor: "green",
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