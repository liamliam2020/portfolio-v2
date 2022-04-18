import React from "react";

import { getMergeSortAnimations } from "../../projects/sorting-visualzier/MergeSort";
import { getBubbleSortAnimations } from "../../projects/sorting-visualzier/BubbleSort.js";
import { getQuickSortAnimations } from "../../projects/sorting-visualzier/QuickSort.js";
import { getShellSortAnimations } from "../../projects/sorting-visualzier/ShellSort.js";
import newArray from "../../public/images/sorting-visualizer-icons/Icon_New_Array.png";
import bubbleSortIcon from "../../public/images/sorting-visualizer-icons/Icon_BubbleSort.png";
import mergeSortIcon from "../../public/images/sorting-visualizer-icons/Icon_MergeSort.png";
import quickSortIcon from "../../public/images/sorting-visualizer-icons/Icon_QuickSort.png";
import shellShortIcon from "../../public/images/sorting-visualizer-icons/Icon_ShellSort.png";
import classes from "./SortingVisualizer.module.css";
import Image from "next/image";
import { Slider } from "@mui/material";
import { styled } from "@mui/material/styles";

// TODO button should not be clickable when its sorting still
// TODO disable slider when running

// Change this value for the speed of the animations.
let animationSpeedMs = 3;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 250; //must be even or shell has issues

// This is the main color of the array bars.
const PRIMARY_COLOR = "#f3a33a";

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = "white";

const StyledSlider = styled(Slider)({
  color: "#f3a33a",
});

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      isRunning: false
    };
  }

  // reset on first page load
  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];

    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntfromRange(10, 500));
    }
    this.setState({ array });
  }

  handleMergeSortClicked() {
    this.setState({isRunning: true}, () => {this.mergeSort()});
  }

  mergeSort() {
    // call to js sorting algorithm
    const animations = getMergeSortAnimations(this.state.array);

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByName("array_bar");
      // to figure out if the animation is a bar changing color
      const isColorChange = i % 3 !== 2;

      // change color if bar is being compared
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * animationSpeedMs);
      } else {
        setTimeout(() => {
          // animate swaps
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;

          if (i === animations.length - 1) {
            this.setState({isRunning: false});
          }
        }, i * animationSpeedMs);
      }
    }
  }

  handleBubbleSortClicked() {
    this.setState({isRunning: true}, () => {this.bubbleSort()});
  }

  bubbleSort() {
    // call to js sorting algorithm
    const animations = getBubbleSortAnimations(this.state.array);

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByName("array_bar");
      // to figure out if the animation is a bar changing color
      const isColorChange = i % 4 !== 2 && i % 4 !== 3;

      if (isColorChange) {
        //updating compare color
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * animationSpeedMs);
      } else {
        // animate swaps
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;

          if (i === animations.length - 1) {
            this.setState({isRunning: false});
          }
        }, i * animationSpeedMs);
      }
    }
  }

  handleQuickSortClicked() {
    this.setState({isRunning: true}, () => {this.quickSort()});
  }

  quickSort() {
    // call to js sorting algorithm
    const animations = getQuickSortAnimations(this.state.array);

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByName("array_bar");
      // to figure out if the animation is a bar changing color
      const isColorChange = i % 6 === 0 || i % 6 === 1;
      if (isColorChange) {
        //updating compare color
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 6 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * animationSpeedMs);
      } else {
        //animate swaps
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;

          if (i === animations.length - 1) {
            this.setState({isRunning: false});
          }
        }, i * animationSpeedMs);
      }
    }
  }

  handleShellSortClicked() {
    this.setState({isRunning: true}, () => {this.shellSort()});
  }

  shellSort() {
    // call to js sorting algorithm
    const animations = getShellSortAnimations(this.state.array);

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByName("array_bar");
      // to figure out if the animation is a bar changing color
      const isColorChange = i % 4 !== 2 && i % 4 !== 3;

      if (isColorChange) {
        //updating compare color
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * animationSpeedMs);
      } else {
        // animate swapping
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;

          if (i === animations.length - 1) {
            this.setState({isRunning: false});
          }
        }, i * animationSpeedMs);
      }
    }
  }

  render() {
    const { array, isRunning } = this.state;

    return (
      <div className={classes.SortingVisualizer}>
        <h2>Sorting Algorithm Visualizer</h2>
        <ul className={classes.Controls}>
          <li>
            <button
              onClick={() => this.resetArray()}
              disabled={isRunning}
            >
              <Image src={newArray} height="75" width="75" alt="New Array" />
            </button>
            <figcaption>Make New Array</figcaption>
          </li>
          <li>
            <button
              onClick={() => this.handleMergeSortClicked()}
              disabled={isRunning}
            >
              <Image
                src={mergeSortIcon}
                height="75"
                width="75"
                alt="MergeSort"
              />
            </button>
            <figcaption>Merge Sort</figcaption>
          </li>
          <li>
            <button
              onClick={() => this.handleBubbleSortClicked()}
              disabled={isRunning}
            >
              <Image
                src={bubbleSortIcon}
                height="75"
                width="75"
                alt="BubbleSort"
              />
            </button>
            <figcaption>Bubble Sort</figcaption>
          </li>
          <li>
            <button
              onClick={() => this.handleQuickSortClicked()}
              disabled={isRunning}
            >
              <Image
                src={quickSortIcon}
                height="75"
                width="75"
                alt="QuickSort"
              />
            </button>
            <figcaption>Quick Sort</figcaption>
          </li>
          <li>
            <button
              onClick={() => this.handleShellSortClicked()}
              disabled={isRunning}
            >
              <Image
                src={shellShortIcon}
                height="75"
                width="75"
                alt="ShellSort"
              />
            </button>
            <figcaption>Shell Sort</figcaption>
          </li>
        </ul>
        <div className={classes.Slider}>
          <StyledSlider
            aria-label="Speed"
            onChange={handleSliderChange}
            defaultValue={3}
            valueLabelDisplay="auto"
            step={0.25}
            marks
            min={0}
            max={5}
            disabled={isRunning}
          />
          <p>Sort Speed (Lower is Faster)</p>
        </div>
        <div className={classes.VisualArray}>
          {array.map((value, index) => (
            <div
              name="array_bar"
              key={index}
              style={{ height: `${value}px` }}
            ></div>
          ))}
        </div>
      </div>
    );
  }
}

// From https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
function randomIntfromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function handleSliderChange(event, newValue) {
  animationSpeedMs = newValue;
}
