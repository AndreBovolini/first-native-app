import AsyncStorage from "@react-native-async-storage/async-storage";


let token = AsyncStorage.getItem("token");


export default token;