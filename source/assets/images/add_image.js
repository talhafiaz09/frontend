import * as React from "react"
import Svg, { Path, Circle, G } from "react-native-svg"

function AddImage(props) {
  return (
    <Svg viewBox="0 0 308.8 308.8" {...props}>
      <Path
        d="M35.6 18.8h180c19.6 0 35.6 16 35.6 35.6v185.2c0 19.6-16 35.6-35.6 35.6h-180C16 275.2 0 259.2 0 239.6V54c0-19.2 16-35.2 35.6-35.2z"
        fill="#4a566e"
      />
      <Path
        d="M116.4 186.4l-52.8-52.8L0 197.2v42c0 19.6 16 35.6 35.6 35.6h180c19.6 0 35.6-16 35.6-35.6v-68.4l-59.6-60-75.2 75.6z"
        fill="#00b594"
      />
      <Circle cx={114.8} cy={103.6} r={22.4} fill="#ffcc03" />
      <Circle cx={251.2} cy={232.4} r={57.6} fill="#fff" />
      <G fill="#00b594">
        <Path d="M224 240.8c-4.4 0-8.4-3.6-8.4-8.4s3.6-8.4 8.4-8.4h54.4c4.8 0 8.4 3.6 8.4 8.4s-3.6 8.4-8.4 8.4H224z" />
        <Path d="M259.6 259.6c0 4.8-3.6 8.4-8.4 8.4s-8.4-3.6-8.4-8.4v-54c0-4.4 3.6-8.4 8.4-8.4 4.4 0 8.4 3.6 8.4 8.4v54z" />
      </G>
    </Svg>
  )
}

export default AddImage;
