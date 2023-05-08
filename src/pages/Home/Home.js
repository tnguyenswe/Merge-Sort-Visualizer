import React, { useState, useEffect } from "react";
import "./Home.css";
import {getMergeSortAnimations} from '../Algorithms/algorithms.js';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

const Home = (props) => {
    const [myList, setMyList] = useState([]);

    const displayList = (e) => {
        e.preventDefault();
        console.log(myList);
    }

    const mergeSort = () => {
        const animations = getMergeSortAnimations(myList);
        for (let i = 0; i < animations.length; i++) {
          const arrayBars = document.getElementsByClassName('array-item-container');
          const isColorChange = i % 3 !== 2;
          if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
            setTimeout(() => {
              barOneStyle.backgroundColor = color;
              barTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS);
          } else {
            setTimeout(() => {
              const [barOneIdx, newHeight] = animations[i];
              const barOneStyle = arrayBars[barOneIdx].style;
              barOneStyle.height = `${newHeight}px`;
            }, i * ANIMATION_SPEED_MS);
          }
        }
      }

    // Function to generate randomized array of size arraySize.
    const randomizeArray = () => {
        const arraySize = 100;
        const tempArray = [];
        for(let i=0; i<arraySize; i++){
            tempArray.push(randomIntFromInterval(10, 100));
        }
        setMyList(tempArray);
    }

    // Random number generator
    const randomIntFromInterval = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // Generates new random array to be sorted upon page load.
    useEffect(() => {
        randomizeArray();
    }, []);

    return (
        <div className="container-div">
            <h1 className="title-text">
                Sorting Algorithm Visualizer
            </h1>

            <button onClick={randomizeArray}>
                Randomize Array
            </button>

            <button onClick={displayList}>
                Display List
            </button>

            <button onClick={mergeSort}>
                Merge Sort
            </button>

            <div className="array-div">
                {myList.map((val, index) => {
                    return <div className="array-item-container" key={index} style={{height: `${val}px`, backgroundColor: PRIMARY_COLOR}} ></div>
                })}
            </div>
        </div>
    )
}

export default Home;