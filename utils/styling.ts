
import { Coffee } from "@/type";
import { Dimensions, PixelRatio } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const [shortDimension, longDimension] =
  SCREEN_WIDTH < SCREEN_HEIGHT
    ? [SCREEN_WIDTH, SCREEN_HEIGHT]
    : [SCREEN_HEIGHT, SCREEN_WIDTH];

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

export const scale = (size: number) =>
  Math.round(
    PixelRatio.roundToNearestPixel(
      (shortDimension / guidelineBaseWidth) * (size as number)
    )
  );

export const verticalScale = (size: number) =>
  Math.round(
    PixelRatio.roundToNearestPixel(
      (longDimension / guidelineBaseHeight) * (size as number)
    )
  );


  export const getCategoriesFromData = (data: Coffee[]) => {
    const temp: Record<string, number> = {};
    for (let i = 0; i < data.length; i++) {
      if (temp[data[i].name] === undefined) {
        temp[data[i].name] = 1;
      } else {
        temp[data[i].name]++;
      }
    }
    let categories = Object.keys(temp);
    categories.unshift("All");
    return categories;
  };

export const getCategoryList = (category: string, data: Coffee[])=>{

  if (category == 'All') {
    return data
  } else {
    let coffeeList = data.filter((item) => item.name === category)
    return coffeeList
  }
    
  }