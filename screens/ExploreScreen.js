import React, { useState, useCallback, useMemo } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
//import LineChart from "react-native-chart-kit";
//======working one here========>
//npm i react-native-line-chart
import { LineChart } from "react-native-line-chart";
import { Dimensions } from "react-native";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const screenWidth = Dimensions.get("window").width;
import { DataTable, TextInput, Appbar, Button } from "react-native-paper";
import { Title } from "react-native-paper";

//---------------setting base url here
let baseURL = "";

{
  Platform.OS == "android"
    ? (baseURL = "http://10.0.2.2:3000/api/v1/")
    : (baseURL = "http://localhost:3000/api/v1/");
}

const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43, 145, 0, 20],
    },
  ],
};

const ExploreScreen = ({ navigation }) => {
  var month=[];
  const [userdata, setUserdata] = useState();
  const [users, getUsers] = useState();
  const [token, setToken] = useState();
  const [stats, getStats] = useState();
  const [pStats, setPStats] = useState([]);
  console.log("=====stats here====");
  console.log(stats);
  console.log("=====stats here====");

  console.log("=====item ids=====");
  stats?.map((item)=>{ 
    console.log("this are months no: "+item._id+" this are item no:"+item.total);
   // console.log();
    month.push(item.total);
  })

  console.log("=====months here=====");
  console.log(month);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  // const UpdateItem = (id) => {
  //   navigation.navigate("UpdateUser", id);
  //   };

  useFocusEffect(
    useCallback(() => {
      // Get Token
      AsyncStorage.getItem("jwt")
        .then((res) => {
          setToken(res);
        })
        .catch((error) => console.log(error));

      axios
        .get(`${baseURL}users/get/count`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          //setProductList(res.data);
          // console.log("==============data here============================");
          // console.log(productFilter);
          setUserdata(res.data);
          //setLoading(false);
        });

      axios
        .get(`${baseURL}users`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          //setProductList(res.data);
          // console.log("==============data here============================");
          // console.log(productFilter);
          getUsers(res.data);
          //setLoading(false);
        });

      axios
        .get(`${baseURL}users/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const list = res.data.sort((a, b) => {
            return a._id - b._id;
          });
          //console.log(list);
          getStats(list);

          // getStats(list);
          //setLoading(false);
        });

      return () => {
        setUserdata();
        getUsers();
      };
    }, [])
  );
  return (
    <ScrollView>
      <View>
        <View style={style.titlecontainer}>
          <Text style={style.title}>
            <Title>Analytics and Data of Users Joined</Title>
          </Text>
        </View>
        <View>
          <LineChart
            style={style.container}
            data={{
              labels: ["Jan", "Feb", "Mar", "Aprl", "May", "June","jully", "Sep",
              "Oct",
              "Nov",
              "Dec",],
              datasets: [ 
                {
                  data: month,
                },
              ],
            }}

            // data={stats?.map((item) => {
            //   return setPStats((prev) => [ 
            //     {
            //       labels:[ ...prev,MONTHS[item._id - 1]],
            //       datasets: [
            //         {
            //           data: [...prev, item.total],
            //          // data: [20, 45, 28, 80, 99, 43, 145, 0, 20],
            //         },
            //       ],
            //     },
            //   ]);
            // })}
            

            // // data={stats.map((item)=>setPStats((prev) => [
            //   { lables: MONTHS[item._id - 1],
            //     datasets: [{
            //       data:[...prev,item.total],
            //     }]},
            //   ]))
            // }

          

            width={screenWidth} // from react-native----> "#e26a00"---dark yellow
            height={220}
            chartConfig={{
              backgroundColor: "#e6e1dc", //#e6e1dc
              backgroundGradientFrom: "#e26a00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
        <View style={style.usercount}>
          <Title>
            Total Number of users Count:
            <Text style={styles.textcolor}>{userdata?.userCount}</Text>
          </Title>
        </View>

        <View style={styles.bottompart}>
          <DataTable style={styles.datatable}>
            <DataTable.Header>
              <DataTable.Title>Name</DataTable.Title>
              <DataTable.Title>Email</DataTable.Title>
              <DataTable.Title>Admin</DataTable.Title>
              {/* <DataTable.Title>Edit</DataTable.Title> */}
            </DataTable.Header>
            {users?.map((item) => {
              return (
                <DataTable.Row key={item.id} style={styles.row}>
                  <DataTable.Cell style={styles.data}>
                    {item.name}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.data1}>
                    {item.email}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.data}>
                    {String(item.isAdmin)}
                  </DataTable.Cell>
                  {/* <DataTable.Cell style={styles.data}>
                  <Button onPress={() => UpdateItem(item.id)}>EDIT</Button>
                  </DataTable.Cell> */}
                </DataTable.Row>
              );
            })}

            <DataTable.Pagination
              page={1}
              onPageChange={(page) => {
                console.log(page);
              }}
            />
          </DataTable>
        </View>
      </View>
    </ScrollView>
  );
};

export default ExploreScreen;

const style = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    color:'black'
  },
  titlecontainer: {
    alignItems: "center",
  },
  title: {
    color: "#009387",
    marginVertical: 7,
  },
  usercount: {
    paddingHorizontal: 4,
  },
  row:{
    marginVertical:5,
    backgroundColor:'#fff'
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  top: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 210,
  },
  textcolor: {
    color: "red",
  },
  delete: {
    backgroundColor: "red",
    paddingHorizontal: 6,
    marginVertical: 3,
    borderRadius: 4,
    color: "#fff",
  },
  data: {
    paddingHorizontal: 5,
  },

  putdata: {
    padding: 7,
  },
  datatable: {
    marginVertical: 10,
  },
  bottompart: {
    backgroundColor: "#e6a463",
    borderRadius: 5,
  },
});
