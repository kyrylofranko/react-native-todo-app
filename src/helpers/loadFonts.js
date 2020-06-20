import * as Font from "expo-font";

export async function loadFonts() {
  await Font.loadAsync({
    'helvetica-regular': require('../../assets/fonts/HelveticaRegular.ttf'),
    'helvetica-bold': require('../../assets/fonts/HelveticaBold.ttf'),
  })
}
