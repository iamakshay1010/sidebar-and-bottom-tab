import React, { useEffect, useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Item, Picker } from "native-base";
import { useSelector, useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import mime from "mime";

import { DataTable, TextInput, Appbar, Button } from "react-native-paper";

//====================================================
let baseURL = "";

{
  Platform.OS == "android"
    ? (baseURL = "http://10.0.2.2:3000/api/v1/")
    : (baseURL = "http://localhost:3000/api/v1/");
}
//===============================================================

const createCatagory = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState();
  const [color, setColor] = useState();
  const [icon, setIcon] = useState();
  const [token, setToken] = useState();
  console.log(categoryName, color, icon);

  useEffect(() => {
    AsyncStorage.getItem("jwt")
      .then((res) => {
        setToken(res);
      })
      .catch((error) => console.log(error));

    axios
      .get(`${baseURL}categories`)
      .then((res) => setCategories(res.data))
      .catch((error) => alert("Error to load categories"));

    return () => {
      setCategories();
      setToken();
    };
  }, []);

  const addCategory = () => {
    const category = {
      name: categoryName,
      color: color,
      icon: icon,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(`${baseURL}categories`, category, config)
      .then((res) => setCategories([...categories, res.data]))
      .catch((error) => alert("Error to load categories"));

    setCategoryName("");
    setColor("");
    setIcon("");
  };

  const deleteCategory = (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .delete(`${baseURL}categories/${id}`, config)
      .then((res) => {
        const newCategories = categories.filter((item) => item.id !== id);
        setCategories(newCategories);
      })
      .catch((error) => alert("Error to load categories"));
  };
  //onPress={() => addCategory()
  return (
    <ScrollView>
      <View style={styles.container1}>
        <View style={styles.putdata}>
          <TextInput
            label="Enter catagory name..."
            value={categoryName}
            onChangeText={setCategoryName}
            style={styles.items}
          />
          <TextInput
            label="Create catagory color..."
            value={color}
            onChangeText={setColor}
            style={styles.items}
          />
          <TextInput
            label="Enter icon name..."
            value={icon}
            onChangeText={setIcon}
            style={styles.items}
          />
          <Button mode="contained" onPress={addCategory}>
            Create catagory
          </Button>
        </View>

        <DataTable style={styles.datatable}>
          <DataTable.Header>
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title>Icons</DataTable.Title>
            <DataTable.Title>Color</DataTable.Title>
            <DataTable.Title>Delete</DataTable.Title>
          </DataTable.Header>
          {categories.map((item) => {
            return (
              <DataTable.Row key={item.id} style={styles.row}>
                <DataTable.Cell style={styles.data}>{item.name}</DataTable.Cell>
                <DataTable.Cell style={styles.data}>{item.icon}</DataTable.Cell>
                <DataTable.Cell style={styles.data}>
                  {item.color}
                </DataTable.Cell>
                <DataTable.Cell
                  onPress={() => deleteCategory(item.id)}
                  style={styles.delete}
                >
                  Delete
                </DataTable.Cell>
              </DataTable.Row>
            );
          })}

          <DataTable.Pagination
            page={1}
            onPageChange={(page) => {
              console.log(page);
            }}
            label="1-2 of 6"
          />
        </DataTable>
      </View>
    </ScrollView>
  );
};

export default createCatagory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  items:{
    marginVertical:4,
    padding:0,
  },
  top: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 210,
  },
  delete: {
    backgroundColor: "red",
    paddingHorizontal: 5,
    marginVertical: 3,
    borderRadius: 4,
    color: "white",
  },
  data: {
    paddingHorizontal: 2,
  },
  putdata: {
    padding: 7,
    borderRadius:10,
  },
  datatable: {
    marginVertical: 10,
    backgroundColor:'#fff'
  },
  row:{
    marginVertical:1,
    backgroundColor:'#fff',
    borderRadius:4,
    marginVertical:2,
  }
});
