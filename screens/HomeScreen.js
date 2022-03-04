import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialIcons";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import COLORS from "../consts/colors";
import plants from "../consts/plants";
import TypeWriter from 'react-native-typewriter'
//import Typist from "react-typist";

const width = Dimensions.get("window").width / 2 - 30;

//---------------setting base url here
let baseURL = "";

{
  Platform.OS == "android"
    ? (baseURL = "http://10.0.2.2:3000/api/v1/")
    : (baseURL = "http://localhost:3000/api/v1/");
}

const HomeScreen = ({ props, navigation }) => {
  const [productList, setProductList] = useState();
  const [productFilter, setProductFilter] = useState();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();
  const [count, setCount] = useState(1);

  useFocusEffect(
    useCallback(() => {
      // Get Token
      AsyncStorage.getItem("jwt")
        .then((res) => {
          setToken(res);
        })
        .catch((error) => console.log(error));

      axios.get(`${baseURL}products`).then((res) => {
        setProductList(res.data);
        console.log("==============data here============================");
        console.log(productList);
        setProductFilter(res.data);
        setLoading(false);
      });

      return () => {
        setProductList();
        setProductFilter();
        setLoading(true);
      };
    }, [])
  );

  const searchProduct = (text) => {
    if (text == "") {
      setProductFilter(productList);
    }
    setProductFilter(
      productList.filter((i) =>
        i.name.toLowerCase().includes(text.toLowerCase())
      )
    );
  };
  //-------this is to delete the product---------------------------
  const deleteProduct = (id) => {
    axios
      .delete(`${baseURL}products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const products = productFilter.filter((item) => item.id !== id);
        setProductFilter(products);
      })
      .catch((error) => console.log(error));
  };

  const CategoryList = () => {
    return (
      <View style={style.categoryContainer}>
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setCategoryIndex(index)}
          >
            {/*---setting index from here*/}
            <Text
              style={[
                style.categoryText,
                catergoryIndex === index && style.categoryTextSelected, //if index is same apply style property(categoryTextSelected)
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const Card = ({ data }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate("Details", data)}
      >
        {/*-----move to next screen with data--------*/}
        <View style={style.card}>
          <View style={{ alignItems: "flex-end" }}>
            {/*-----to show icon itms on top right --------*/}
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center", //---if the icon is liked thne change color
                backgroundColor: data.like
                  ? "rgba(245, 42, 42,0.2)"
                  : "rgba(0,0,0,0.2) ",
              }}
            >
              <Icon
                name="favorite"
                size={18}
                color={data.image ? COLORS.red : COLORS.black}
              />
            </View>
          </View>
          {/*-----to shw the image here-------------starts-----*/}
          <View
            style={{
              height: 100,
              alignItems: "center",
            }}
          >
            <Image
              source={{
                uri: data.image
                  ? data.image
                  : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
              }} //http://localhost:3000/public/uploads/images.jpeg-1645441860829.jpeg
              style={{
                flex: 1,
                resizeMode: "contain",
                width: 100,
                height: 100,
              }}
            />
          </View>
          {/*-----to shw the image here-------------ends-----*/}
          <Text style={{ fontWeight: "bold", fontSize: 17, marginTop: 10 }}>
            {data.name}
          </Text>
          <Text>only:{data.countInStock} left</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 5,
            }}
          >
            <Text style={{ fontSize: 19, fontWeight: "bold" }}>
              ${data.price}
            </Text>
            <View
              style={{
                height: 25,
                width: 25,
                backgroundColor: COLORS.green,
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  color: COLORS.white,
                  fontWeight: "bold",
                }}
              >
                +
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView
      style={{ flex: 1, paddingHorizontal: 10, backgroundColor: COLORS.white }}
    >
      <View style={style.header}>
        {/*----this is hedaer part-------starts----*/}
        <View>
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>Welcome to</Text>
          <TypeWriter typing={1} style={{ fontSize: 38, color: COLORS.green, fontWeight: "bold" }}>Ecom Shop</TypeWriter>
          
        </View>
        <Icon name="shopping-cart" size={28} />
      </View>
      {/*----this is header part----------------------------ends----------------------*/}
      <View
        style={{ marginTop: 30, flexDirection: "row", marginHorizontal: 6 }}
      >
        {/*----search option and filter-------starts----*/}
        <View style={style.searchContainer}>
          <Icon name="search" size={25} style={{ marginLeft: 20 }} />
          <TextInput
            placeholder="Search"
            onChangeText={(text) => searchProduct(text)}
            style={style.input}
          />
        </View>
        <View style={style.sortBtn}>
          <Icon name="sort" size={30} color={COLORS.white} />
        </View>
      </View>
      {/*----search option and filter------------------------------------------------------ends----*/}

      <FlatList
        columnWrapperStyle={{ justifyContent: "space-between" }} //----this ensures proper space in columns
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 10,
          paddingBottom: 50,
          marginHorizontal: 7,
        }}
        numColumns={2}
        data={productFilter}
        renderItem={({ item }) => {
          return <Card data={item} />;
        }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const style = StyleSheet.create({
  categoryContainer: {
    flexDirection: "row",
    marginTop: 30,
    marginBottom: 20,
    justifyContent: "space-between",
  },
  categoryText: { fontSize: 16, color: "grey", fontWeight: "bold" },
  categoryTextSelected: {
    color: COLORS.green,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: COLORS.green,
    backgroundColor: COLORS.green,
    color: "white",
    padding: 4,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    height: 225,
    backgroundColor: COLORS.light,
    width,
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,

    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  header: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 8,
  },
  searchContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  input: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    color: COLORS.dark,
  },
  sortBtn: {
    marginLeft: 10,
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: COLORS.green,
    justifyContent: "center",
    alignItems: "center",
  },
});
