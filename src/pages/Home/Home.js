/** @jsxImportSource theme-ui */
import React, { useState, useEffect } from "react";
import "./Home.css";
import { getMergeSortAnimations } from '../Algorithms/algorithms.js';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// This is the main color of the array bars.
const PRIMARY_COLOR = '#3756D3';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

const Home = (props) => {
    const [myList, setMyList] = useState([]);

    const printList = (e) => {
        e.preventDefault();
        console.log(myList);
    }

    const mergeSort = () => {
        // We get the animations array based on our algorithm's output.
        const animations = getMergeSortAnimations(myList);
        // Loop through the animations array to perform animations.
        for (let i = 0; i < animations.length; i++) {
            // This gets the array items
            const arrayItems = document.getElementsByClassName('array-item-container');
            // We update the color if the index modulus 3 is not equal 2.
            // This is because we only want to animate the first and second values being compared.
            // 0 % 3 = 0, 1 % 3 = 1, 2 % 3 = 2, so it would animate 0 and 1, but not 2.
            const updateColor = i % 3 !== 2;
            if (updateColor) {
                // Get the indices of the values being animated.
                const [barOneIndex, barTwoIndex] = animations[i];
                const barOneStyle = arrayItems[barOneIndex].style;
                const barTwoStyle = arrayItems[barTwoIndex].style;
                // Update the color to be either primary or secondary color.
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                // We use a time out function to determine how long the array item is a different color.
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                // This is the case when the value of a comparison needs to be updated.
                setTimeout(() => {
                    const [barOneIndex, newHeight] = animations[i];
                    const barOneStyle = arrayItems[barOneIndex].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    // Function to generate randomized array of size arraySize.
    const randomizeArray = () => {
        const arraySize = 100;
        const tempArray = [];
        for (let i = 0; i < arraySize; i++) {
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
        <div 
        sx={{
            display: 'flex',
            flexDirection: 'column',
        }}
        >
            <h1 sx={{ fontSize: '24px', pl: '24px', pt: '10px' }} className="title-text">
                Sorting Algorithm <span sx={{ color: 'navy10' }}>Visualizer</span>
            </h1>

            <div sx={{display: 'flex', mt: '20px'}}>
            <button
                sx={{
                    backgroundColor: 'navy10',
                    border: 'none',
                    borderRadius: '50px',
                    padding: '10px',
                    color: 'white',
                    ml: '24px',
                    width: '150px',
                    alignSelf: 'center',
                    mr: '10px'
                }}
                onClick={randomizeArray}>
                Randomize Array
            </button>

            <button
                sx={{
                    backgroundColor: 'navy10',
                    border: 'none',
                    borderRadius: '50px',
                    padding: '10px',
                    color: 'white',
                    alignSelf: 'flex-start',
                    mr: '10px',
                }}
                className="buttons" onClick={printList}>
                Console Log List
            </button>

            <button
                sx={{
                    backgroundColor: 'navy10',
                    border: 'none',
                    borderRadius: '50px',
                    padding: '10px',
                    color: 'white',
                    alignSelf: 'flex-start',
                }}
                className="buttons" onClick={mergeSort}>
                Merge Sort
            </button>

            </div>

            <div
                sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'end',
                    width: '80%',
                    justifySelf: 'center',
                    mt: '30px',
                    ml: '24px',
                }}
            >
                {myList.map((val, index) => {
                    return <div className="array-item-container" key={index} style={{ height: `${val}px`, backgroundColor: PRIMARY_COLOR }} ></div>
                })}
            </div>
        </div>
    )
}

export default Home;