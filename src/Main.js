import React, { Component } from 'react';
import { Icon, Button } from 'antd';
import './Main.css';

let clickedarr = [
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
]

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arr1: this.props.arr1,
            board: this.props.board,
            diamondcount: 8,
            score: 56,
            prevx: -1,
            prevy: -1,
            clickedarray: clickedarr,
        }
        this.buttonclicked = this.buttonclicked.bind(this);
    }

    buttonclicked(button1, x, y) {
        let value = x * 8 + y;
        let X = [];
        let Y = [];
        let mindist = 1000000, minx = -100, miny = -100;
        for (let i = 0; i < this.state.arr1.length; i++) {
            X[i] = Math.floor(this.state.arr1[i] / 8);
            Y[i] = Math.floor(this.state.arr1[i] % 8);
        }
        let boardchange = this.state.board;
        let clickchange = this.state.clickedarray;
        let scores = this.state.score;
        let distance = [];
        let arr1 = this.state.arr1;
        let prevx = this.state.prevx;
        let prevy = this.state.prevy;
        if (prevx !== -1 && prevy !== -1) {
            boardchange[prevx][prevy] = "";
        }
        if (arr1.length > 0 && arr1.includes(value)) {
            boardchange[x][y] = "DIAMOND";
            let index = -1;
            for (let i = 0; i < arr1.length; i++) {
                if (arr1[i] === value) {
                    index = i;
                    break;
                }
            }
            arr1.splice(index, 1);
            clickchange[x][y] = true;
            if (arr1.length === 0) {
                this.props.calculateScores(scores);
            }
            let diamondcount = this.state.diamondcount;
            diamondcount = diamondcount - 1;
            this.setState({
                board: boardchange,
                arr1: arr1,
                diamondcount: diamondcount,
                clickedarray: clickchange,
            })
        }
        // else if (arr1.length === 0) {
        //     this.props.calculateScores(scores);
        // }
        else if (arr1.length > 0) {

            for (let i = 0; i < this.state.arr1.length; i++) {

                distance[i] = Math.sqrt(Math.pow((X[i] - x), 2) + Math.pow((Y[i] - y), 2));
                if (distance[i] < mindist) {
                    mindist = distance[i];
                    minx = X[i];
                    miny = Y[i];
                }
            }
            let xdiff = x - minx;
            let ydiff = y - miny;
            if (xdiff > 0 && ydiff === 0) {
                boardchange[x][y] = 'UP';
                clickchange[x][y] = true;
                scores--;
            }
            else if (xdiff < 0 && ydiff === 0) {
                boardchange[x][y] = 'DOWN';
                clickchange[x][y] = true;
                scores--;
            }
            else if (ydiff > 0 && xdiff === 0) {
                boardchange[x][y] = 'LEFT';
                clickchange[x][y] = true;
                scores--;
            }
            else if (ydiff < 0 && xdiff === 0) {
                boardchange[x][y] = 'RIGHT';
                clickchange[x][y] = true;
                scores--;
            }
            else if (xdiff > 0 && ydiff > 0) {
                boardchange[x][y] = 'LEFT';
                clickchange[x][y] = true;
                scores--;
            }
            else if (xdiff < 0 && ydiff < 0) {
                boardchange[x][y] = 'RIGHT';
                clickchange[x][y] = true;
                scores--;
            }
            else if (xdiff > 0 && ydiff < 0) {
                boardchange[x][y] = 'UP';
                clickchange[x][y] = true;
                scores--;
            }
            else {
                boardchange[x][y] = 'DOWN';
                clickchange[x][y] = true;

                scores--;
            }
            this.setState({
                board: boardchange,
                score: scores,
                prevx: x,
                prevy: y,
                clickedarray: clickchange,
            })
        }
    }

    render() {
        const BoardArray = this.state.board.map((index, x) => {

            return (<div className="container"> {index.map((button, y) => {
                if (button === 0)
                    button = <Icon type="question" />
                else if (button === "UP")
                    button = <Icon type="arrow-up" />
                else if (button === "DOWN")
                    button = <Icon type="arrow-down" />
                else if (button === "RIGHT")
                    button = <Icon type="arrow-right" />
                else if (button === "LEFT")
                    button = <Icon type="arrow-left" />
                else if (button === "DIAMOND")
                    button = <Icon type="sketch" />
                else if (button === "")
                    button = <Icon type="sketch" style={{ color: "white" }} />
                return (
                    <div>
                        {this.state.clickedarray[x][y] === false ? <Button onClick={() => this.buttonclicked(button, x, y)}> {button} </Button> :
                            <Button> {button} </Button>}
                    </div>
                )
            }
            )}
            </div>)
        })
        return (
            <div>
                <br />
                <br />
                <p style={{ textAlign: "center" }}> Diamonds Left  : <h3> {this.state.diamondcount} </h3> </p>
                <br />
                {BoardArray}
            </div>
        )
    }
}

export default Main;