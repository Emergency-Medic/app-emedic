import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {usePreventBackToSignIn} from '../../hooks/usePreventBackToSignIn'
import { useEffect } from "react";

export default function Home() {
  usePreventBackToSignIn()
  return (
    <Text>Home</Text>
  )
}
