import AsyncStorage from "@react-native-async-storage/async-storage";


let tokenType = AsyncStorage.getItem('token_type');


export default tokenType;