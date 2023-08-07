import { View } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setThemeMode } from "../reducers/themeReducer";

export default ThemePicker = () => {
  const dispatch = useDispatch();
  const themeState = useSelector(state => state.themeMode);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Light', value: 'LIGHT' },
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
    dispatch(setThemeMode(value));
  }

  // set the theme and show current value
  useEffect(() => {
    if (themeState) {
      DropDownPicker.setTheme(themeState);
      setValue(themeState);
    }
  }, [themeState])

  return (
    <View style={{ position: "absolute", top: 55, right: 10, zIndex: 1000 }}>
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