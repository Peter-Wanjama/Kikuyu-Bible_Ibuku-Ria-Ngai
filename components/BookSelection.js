import { useContext } from "react";
import { BibleContext } from "../contexts/BibleContext";
import { Text, View } from "react-native";

const BookSelection =(props)=>{
    //const testament = props.testament;
    //console.log(testament);
    const { book, chapter, verse } = useContext(BibleContext);
  return (
      <Text>{book} {chapter}.{verse}</Text>
  )
}
export default BookSelection;