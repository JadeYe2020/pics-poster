import { StyleSheet, View, Text, Pressable, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert, } from "react-native";
import { Formik } from "formik";
import * as Crypto from 'expo-crypto';
import { API, graphqlOperation } from 'aws-amplify';
import { usersByEmail } from "../src/graphql/queries";
import { createUser } from "../src/graphql/mutations";
import { useSelector, useDispatch } from 'react-redux';
import { setLoggedInUser } from "../reducers/userReducer";
import theme from "../theme";

// to validate input
const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Please enter your email';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Please enter the password';
  } else if (!/^[a-zA-Z0-9]{8,}$/.test(values.password)) {
    errors.password = 'Password has to be 8 characters long mix of letters and numbers';
  }

  return errors;
}

const getUserByEmail = async (email) => {
  let result = null;
  try {
    const res = await API.graphql(graphqlOperation(usersByEmail, { email }));
    res && (result = res.data.usersByEmail.items[0]);
  } catch (error) {
    console.log("error from getUserByEmail()", error.errors[0].message);
  }
  return result;
}

const createNewUser = async (values) => {
  let result = null;
  try {
    const res = await API.graphql(graphqlOperation(createUser, { input: values }));
    res && (result = res.data.createUser);
  } catch (error) {
    console.log("error from createUser()", error.errors[0].message);
  }
  return result;
}

const hashPassword = async (plainText) => {
  try {
    const digest = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      plainText
    );
    // console.log('Digest: ', digest);
    return digest;
  } catch (error) {
    console.log("error from Crypto.digestStringAsync()", error);
    return null;
  }
}


const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  // const loggedInUser = useSelector(state => state.user);

  const handleLogin = async (values, actions) => {
    try {
      // console.log(values)
      const { email, password } = values;
      const userFromDB = await getUserByEmail(email);

      const promiseFromHash = Promise.resolve(hashPassword(password));
      promiseFromHash.then(hashed => {
        // check if the email has been registered before
        if (userFromDB) {
          // when the email has been registered, compare the passwords
          if (userFromDB.password === hashed) {
            // update state of user
            dispatch(setLoggedInUser({ email: userFromDB.email, id: userFromDB.id }));
            actions.resetForm({
              values: { ...values, password: "" }
            });
            // navigate to Posts screen
            navigation.navigate("Posts");
          } else {
            Alert.alert("Wrong password", "Please re-enter your password.");
            actions.resetForm({
              values: { ...values, password: "" }
            });
          }
        } else {
          // the email has not been registered before, create a new user
          const hashedValues = { email, password: hashed };
          const promiseFromCreate = Promise.resolve(createNewUser(hashedValues));
          promiseFromCreate.then(newUser => {
            // console.log("newUser", newUser)
            // update state of user
            dispatch(setLoggedInUser({ email: newUser.email, id: newUser.id }));
            // navigate to Posts screen
            navigation.navigate("Posts");
          })
        }
      })

    } catch (error) {
      Alert.alert("Unexpected Error", "An unexpected error happened.\nPlease try again later.")
    }
  }

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validate={validate}
      onSubmit={(values, actions) => handleLogin(values, actions)}
    >
      {({ handleChange, handleBlur, handleSubmit, handleReset, values, errors, touched }) => (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Text style={styles.title}>SavorHub</Text>
            <View style={{ gap: 15 }}>
              <View>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.inputBox}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
              </View>

              <View>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.inputBox}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry
                />
                {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
              </View>
            </View>
            <View style={{ flexDirection: "row", gap: -20 }}>
              <Pressable style={styles.button} onPress={handleReset}>
                <Text style={styles.buttonText}>Clear</Text>
              </Pressable>
              <Pressable style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Log In</Text>
              </Pressable>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      )}
    </Formik>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  title: {
    position: "absolute",
    top: 50,
    color: theme.colors.primary,
    fontSize: theme.fontSizes.title,
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  inputBox: {
    height: 50,
    margin: 20,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
    marginVertical: 8,
    padding: 8,
    fontSize: 20
  },
  button: {
    flex: 1,
    margin: 20,
    backgroundColor: theme.colors.primary,
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
  label: {
    color: theme.colors.primary,
    fontSize: 25,
    textAlign: "center",
  },
  errorText: {
    color: "red",
    marginLeft: 21,
    marginTop: -5,
  },
});

export default LoginScreen;