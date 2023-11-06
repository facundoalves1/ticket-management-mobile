import React from "react";
import { Text, View, TextInput, StyleSheet, TouchableOpacity} from "react-native";
import { Formik } from "formik";

const initialValues= {
  user:'',
  password:''
}

export default function LogInPage() {
  return (
    <Formik initialValues={initialValues} onSubmit={values=>console.log(values)}>
      {({handleChange,handleSubmit,values})=>{
        return <View style={styles.container}>
          <TextInput style={styles.textInput} placeholder="Usuario"
          value={values.user}
          onChangeText={handleChange('user')}/>
          <TextInput style={styles.textInput} placeholder="Constraseña" secureTextEntry={true}
          value={values.password}
          onChangeText={handleChange('password')}/>
          {/* <View style={styles.buttonContainer}>
          <Button style={styles.button} onPress={handleSubmit} title='Iniciar Sesión'/>         
          </View> */}
          <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
            <Text style={styles.button}>
              Iniciar Sesión
              </Text>
          </TouchableOpacity>
        </View>
      }}
    </Formik>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },

  textInput: {
    backgroundColor: 'white',
    marginTop: 10,
    borderRadius: 5,
    width: '90%',
    height: 40,
    paddingLeft: 10
  },

  buttonContainer: {

    marginTop: 30,
    width: '90%',
    backgroundColor: '#007bff',
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'

  },

  button: {

    flex: 1,
    color: "white",
    textAlign: "center",
    lineHeight: 40

  }

});