import React, {useState, useEffect} from 'react'

import img1 from "../assets/images/img1.png";
import img2 from "../assets/images/img2.png";
import img3 from "../assets/images/img3.png";
import img7 from "../assets/images/img7.png";
import img8 from "../assets/images/img8.png";
import img9 from "../assets/images/img9.png";


const Carousel = () => {

    const [pics, setPics] = useState([img1, img2, img3, img7, img8, img9]);
    const [text, setText] = useState("lol")
    const [next, setNext] = useState(true);

    useEffect(() => {
        let t;
        const interval = setInterval(() => {
            let temp = pics;
            let temp2 = temp[0];
            temp.shift();
            temp.push(temp2);
            setPics(temp);
            setText(pics[0])
            setNext(true)
            // console.log(pics)
            t = setTimeout(() => {
                setNext(false);
            }, 1000)
        }, 5000);

        //Clearing the interval
        return () => {
            clearInterval(interval);
            clearTimeout(t)
        }
    }, [pics]);

  return (
    <div className="images">
          <div className={next ? "carousel next" : "carousel"}>
        <span style={{display: "none"}}>{pics[0]}</span>
            <div className="list">
              {pics.map((p, i) => {
                return (
                    <div className="item" key={i}>
                        <img src={p} alt="Attendance system showcase 6" />
                    </div>
                )
              })}
            </div>
            <div className="arrows">
              <button id="prev">&lt;</button>
              <button id="next">&gt;</button>
              <button id="back">See All &#8599;</button>
            </div>
            <div className="orange-right"></div>
          </div>
        </div>
  )
}

export default Carousel