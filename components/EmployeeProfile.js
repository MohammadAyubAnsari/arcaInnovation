import React, { useState, useEffect } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  TextInput,
  Button,
} from "react-native";
import axios from "axios";
import {
  findManager,
  findSubordinates,
} from "../utils/findmanagersAndSubordinates";

const EmployeeProfileCard = ({ employee, employees, navigation }) => {
  const [manager, setManager] = useState(null);
  const [subordinates, setSubordinates] = useState([]);

  useEffect(() => {
    setManager(findManager(employee, employees));
  }, [employee, employees]);

  useEffect(() => {
    setSubordinates(findSubordinates(employee, employees));
  }, [employee, employees]);

  const textColor =
    employee.backgroundColor === "yellow" ||
    employee.backgroundColor === "white"
      ? "black"
      : "white";

  const cardStyle = [
    styles.card,
    { backgroundColor: employee.backgroundColor },
  ];

  const handleCardPress = () => {
    navigation.navigate("EmployeeDetails", { employee, employees });
  };
  return (
    <TouchableOpacity style={cardStyle} onPress={handleCardPress}>
      <Text style={[styles.title, { color: textColor }]}>{employee.name}</Text>
      <Text style={{ color: textColor }}>Email: {employee.email}</Text>
      <Text style={{ color: textColor }}>Phone: {employee.phone}</Text>

      {manager && (
        <Text style={{ color: textColor }}>Manager: {manager.name}</Text>
      )}
    </TouchableOpacity>
  );
};

const EmployeeProfile = ({ navigation }) => {
  const [employeeData, setEmployeeData] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    axios
      .get("https://mocki.io/v1/3a4b56bd-ad05-4b12-a181-1eb9a4f5ac8d")
      .then((response) => setEmployeeData(response.data))
      .catch((error) => console.error("Error fetching employee data:", error));
  }, []);

  const handleAddEmployee = () => {
    const updatedEmployeeData = [
      ...employeeData,
      {
        ...newEmployee,
        id: employeeData.length + 1,
        backgroundColor: "darkgreen",
      },
    ];
    setEmployeeData(updatedEmployeeData);

    setNewEmployee({
      name: "",
      email: "",
      phone: "",
      address: "",
    });

    setShowForm(false);
  };

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>All Employees</Text>
      <TouchableOpacity onPress={toggleFormVisibility}>
        <Text style={styles.employee}>
          {showForm ? "Hide" : "Add an Employee"}
        </Text>
      </TouchableOpacity>

      {showForm && (
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={newEmployee.name}
            onChangeText={(text) =>
              setNewEmployee({ ...newEmployee, name: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={newEmployee.email}
            onChangeText={(text) =>
              setNewEmployee({ ...newEmployee, email: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Phone"
            value={newEmployee.phone}
            onChangeText={(text) =>
              setNewEmployee({ ...newEmployee, phone: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="address"
            value={newEmployee.address}
            onChangeText={(text) =>
              setNewEmployee({ ...newEmployee, address: text })
            }
          />
          <Button title="Add Employee" onPress={handleAddEmployee} />
        </View>
      )}

      <FlatList
        data={employeeData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <EmployeeProfileCard
            employee={item}
            employees={employeeData}
            navigation={navigation}
            isLastItem={index === employeeData.length - 1}
          />
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 5,
  },
  container: {
    flex: 1,
    padding: 10,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
    width: 300,
  },
  card: {
    padding: 10,
    margin: 10,
    borderRadius: 8,
    width: 300,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subordinatesList: {
    marginLeft: 15,
  },
  listContainer: {
    marginTop: 10,
  },
  employee: {
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 24,
    color: "red",
  },
});

export default EmployeeProfile;
