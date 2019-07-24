import React, { Component } from 'react';
import './App.css';
import Main from './Main';
import { Modal, Form, Input, Button } from 'antd';


let arr = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]
]

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr1: [],
      board: arr,
      calscore: false,
      score: 0,
      scoreClicked: false,
      list: [],
      listdisplay: false,
    }
    this.calculateScore = this.calculateScore.bind(this);
    this.list_display = this.list_display.bind(this);
  }

  componentDidMount() {
    let arr1 = this.state.arr1;
    for (let i = 0; i < 8; i++) {
      let num = Math.floor(Math.random() * 59);
      if (arr1.includes(num)) {
        continue;
      }
      arr1.push(num);
    }
    if (arr1.length !== 8) {
      let remain = 8 - arr1.length;
      for (let j = 0; j < remain; j++) {
        let num = 60 + j;
        arr1.push(num);
      }
    }
    this.setState({
      arr1: arr1,
    });
  }

  calculateScore(value) {
    this.setState({
      scoreClicked: true,
      score: value
    })
  }

  handleOk = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.calculate(values);
      }
    });
  };

  calculate = (values) => {
    var test = window.localStorage.getItem("Ranks");
    let ranks = [];
    if (test) {
      ranks = JSON.parse(test);
    }
    ranks.push({ "name": values.name, "score": this.state.score });
    window.localStorage.setItem("Ranks", JSON.stringify(ranks));
    this.setState({
      calscore: true,
      scoreClicked: false
    })
  }

  list_display() {
    var test1 = []
    var test = window.localStorage.getItem("Ranks");
    if (test) {
      test = JSON.parse(test);
      test1 = [...test];
      function compare(a, b) {
        const scoreA = parseInt(a.score);
        const scoreB = parseInt(b.score);

        let comparison = 0;
        if (scoreA > scoreB) {
          comparison = 1;
        } else if (scoreA < scoreB) {
          comparison = -1;
        }
        return comparison;
      }
      test1.sort(compare);
      test1.reverse().splice(10);
    }
    this.setState({
      list: test1,
      listdisplay: !this.state.listdisplay,
    })
  }

  closeModal = () => {
    this.setState({
      scoreClicked: false,
    });
  }

  openModal = () => {
    this.setState({
      scoreClicked: true,
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <div>
          <h2 style={{ textAlign: "center" }}> Diamond Sweeper </h2>
          <br />
          <br />
          {this.state.calscore === true ? <div>
            <h3 style={{ textAlign: "center" }}><p> Your Score is : {this.state.score} </p></h3>
          </div> : null}
          <br />
          <br />
          <div style={{ textAlign: "center" }}>
            <Button type="primary" onClick={this.list_display}>Show LeaderBoard</Button>
            {this.state.listdisplay === true ? <table> <tr> <th>Rank</th><th>Name</th>
              <th>Scores</th>
            </tr>
              {this.state.list.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.name}</td> <td>{item.score}</td>
                </tr>
              ))
              }
            </table> : null}
          </div>
          <Modal className="Modal" title="Enter Name" visible={this.state.scoreClicked} onOk={this.handleOk} onCancel={this.closeModal}>
            <h2> Your Score is : {this.state.score} </h2>
            <Form>
              <br />

              <Form.Item label="Name">
                {getFieldDecorator('name', {
                  rules: [{ required: true }]
                })(<Input />)}
              </Form.Item>
              <br />
            </Form>
          </Modal>
          <Main calculateScores={this.calculateScore} board={this.state.board} arr1={this.state.arr1} />
        </div>
      </div >
    );
  }


}

export default Form.create()(App);
