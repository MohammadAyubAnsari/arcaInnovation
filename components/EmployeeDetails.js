import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  findManager,
  findSubordinates,
} from "../utils/findmanagersAndSubordinates";

const EmployeeDetails = ({ route }) => {
  const { employee, employees } = route.params;
  const manager = findManager(employee, employees);
  const subordinates = findSubordinates(employee, employees);

  const cardStyle = [
    styles.container,
    { backgroundColor: employee.backgroundColor },
  ];

  const textColor =
    employee.backgroundColor === "yellow" ||
    employee.backgroundColor === "white"
      ? "black"
      : "white";

  const subordinateColor =
    employee.backgroundColor === "yellow" ||
    employee.backgroundColor === "white"
      ? "black"
      : "white";

  return (
    <View style={cardStyle}>
      <Text style={[styles.title, { color: textColor }]}>{employee.name}</Text>
      <Text style={{ color: textColor }}>Email: {employee.email}</Text>
      <Text style={{ color: textColor }}>Phone: {employee.phone}</Text>
      <Text style={{ color: textColor }}>Address: {employee.address}</Text>

      {manager && (
        <Text style={{ color: textColor }}>Manager: {manager.name}</Text>
      )}

      {subordinates.length > 0 && (
        <>
          <Text style={{ color: textColor }}>Subordinates:</Text>
          <View style={styles.subordinatesList}>
            {subordinates.map((subordinate) => (
              <Text style={{ color: textColor }} key={subordinate.id}>
                {subordinate.name}
              </Text>
            ))}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 250,
    alignContent: "center",
    justifyContent: "center",
    padding: 10,
    margin: 10,
    flex: 1 / 3,
    width: "95%",
    borderRadius: 20,
    marginLeft: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  text: {
    fontSize: 18,
    fontStyle: "italic",
  },
  subordinatesList: {
    marginLeft: 15,
    fontSize: 14,
  },
});

export default EmployeeDetails;
