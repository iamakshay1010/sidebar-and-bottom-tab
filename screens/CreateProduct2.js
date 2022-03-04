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
import { TextInput, Button, Title } from "react-native-paper";
import { Item } from "native-base";
import { useSelector, useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";
//----picker select is not wroking in react native
//---so use  RNPickerSelect=====>(for referance) https://www.npmjs.com/package/react-native-picker-select
import RNPickerSelect from "react-native-picker-select";
//====================================================
let baseURL = "";

{
  Platform.OS == "android"
    ? (baseURL = "http://10.0.2.2:3000/api/v1/")
    : (baseURL = "http://localhost:3000/api/v1/");
}
//===============================================================
// Context
//import AuthGlobal from "../../Context/store/AuthGlobal";
//import { loginUser } from "../../Context/actions/Auth.actions";
import AuthGlobal from "../Context/store/AuthGlobal";

export default CreateProduct = ({ props, navigation }) => {
  const context = useContext(AuthGlobal);
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [richDescription, setRichDescription] = useState();
  const [image, setImage] = useState();
  const [brand, setBrand] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [countInStock, setCountInStock] = useState();
  const [isFeatured, setisFeatured] = useState(false);
  const [error, setError] = useState();
  const [categories, setCategories] = useState([]);
  const [token, setToken] = useState();
  const [mainImage, setMainImage] = useState();
  const [item, setItem] = useState(null);
  const [pickerValue, setPickerValue] = useState();
  const [selectedValue, setSelectedValue] = useState();
  //const dispatch = useDispatch(); ≈

  //console.log(categories);

  useEffect(() => {
    AsyncStorage.getItem("jwt")
      .then((res) => {
        setToken(res);
      })
      .catch((error) => console.log(error));

    // Categories
    axios
      .get(`${baseURL}categories`)
      .then((res) => setCategories(res.data))
      .catch((error) => alert("Error to load categories"));

    // Image Picker
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();

    return () => {
      setCategories([]);
    };
  }, []);
  //------------------------------------------------------------
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setMainImage(result.uri);
      setImage(result.uri);
      // console.log(result.uri);
    }
  };
  //--------------------------------------------------------------------
  const addProduct = () => {
    if (
      name == "" ||
      brand == "" ||
      price == "" ||
      description == "" ||
      category == "" ||
      countInStock == ""
    ) {
      setError("Please fill in the form correctly");
    }

    var data = new FormData();
    // console.log("=============image====================");
    // console.log(image);
    const newImageUri = "file:///" + image.split("file:/").join("");
    // console.log("============new img url=====================");
    // console.log(newImageUri);
    // console.log("=================================");
    const imageName = newImageUri.split("/").pop();
    // console.log("=================================" + imageName);
    // console.log("=================================");
    data.append("image", {
      uri: newImageUri,
      type: mime.getType(newImageUri),
      name: imageName,
    });
    data.append("name", name);
    data.append("brand", brand);
    data.append("price", price);
    data.append("description", description);
    data.append("category", category);
    data.append("countInStock", countInStock);
    data.append("richDescription", richDescription);
    data.append("isFeatured", isFeatured);
    console.log(formData);

    //=======================================================----======================
    var config = {
      method: "get",
      url: "http://localhost:3000/api/v1/products",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.formData));
      })
      .catch(function (error) {
        console.log(error);
      });

    //--------------------------------------------------------------------------
    return (
      <SafeAreaView style={{ flex: 1, paddingHorizontal: 10 }}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <Text style={{ color: "red" }}>image picker</Text>
              <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                <Icon style={{ color: "black" }} name="camera" />
              </TouchableOpacity>
            </View>
            <TextInput
              label="Enter name..."
              placeholder="name"
              name="name"
              id="name"
              value={name}
              style={styles.email}
              onChangeText={setName}
            />
            <TextInput
              placeholder="Description"
              label="Enter Desc..."
              name="description"
              id="description"
              value={description}
              placeholder="description"
              style={styles.email}
              onChangeText={setDescription}
            />
            <TextInput
              placeholder="richDescription"
              label="Enter Rich Desc..."
              style={styles.email}
              onChangeText={setRichDescription}
            />
            <TextInput
              placeholder="brand"
              label="Enter brand..."
              style={styles.email}
              onChangeText={setBrand}
            />
            <TextInput
              placeholder="price"
              label="Enter Price..."
              style={styles.email}
              onChangeText={setPrice}
            />
            {/*-----------this is the picker here------------*/}
            <View style={styles.picker}>
              <Text>Select catagory</Text>
              <RNPickerSelect
                label="Enter catagory..."
                placeholder={{ label: "Choose catagory...", color: "red" }}
                style={styles.cat}
                onValueChange={(value) => setCategory(value)}
                return
                items={categories.map((c) => ({
                  label: c.name,
                  value: c.id,
                }))}
              />
            </View>
            <TextInput
              placeholder="countInStock"
              style={styles.email}
              onChangeText={setCountInStock}
            />
            <TextInput
              placeholder="isFeatured"
              style={styles.email}
              onChangeText={setisFeatured}
            />

            {/* <RNPickerSelect
            pickerProps={{
              accessibilityLabel: category,
            }}
          >
            <Text>{category.name}</Text>
          </RNPickerSelect> */}

            {/* <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            items={[
                { label: 'Football', value: 'football' },
                { label: 'Baseball', value: 'baseball' },
                { label: 'Hockey', value: 'hockey' },
            ]}
        /> */}
            {/* {categories.map((c) => {   })} */}

            <Button
              title="Create Product"
              mode="contained"
              onPress={() => addProduct()}
            >
              Create Product
            </Button>
            {/* <Button
        title="not registered? click here"
        onPress={() => {
          navigation.navigate("Register");
        }}
      /> */}
            {error ? <Text>some error is there</Text> : null}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
}
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 5,
    },
    imagePicker: {
      marginHorizontal: 5,
    },
    imageContainer: {
      flex: 1,
      margin: 4,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    email: {
      width: "70%",
      padding: 10,
      backgroundColor: "#fff",
      margin: 10,
      padding: 0,
    },
    pass: {
      width: "50%",
      padding: 10,
      backgroundColor: "#fff",
      margin: 10,
    },
    picker: {
      alignItems: "center",
    },
    cat: {
      justifyContent: "center",
      width: "50%",
      padding: 10,
      backgroundColor: "#fff",
      marginHorizontal: 5,
      margin: 10,
      alignItems: "center",
      color: "red",
    },
  });

