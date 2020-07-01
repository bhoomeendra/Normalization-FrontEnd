import React from "react";
import axios from "axios";
import Response from "./Response";
class Form extends React.Component {
  constructor() {
    super();
    let state = {
      Attributes: "",
      dependency: [],
      show: true,
      res: {},
      showResponse: false,
      normalForm: "2NF"
    };
    this.state = state;
    this.onClick2NF= this.onClick2NF.bind(this);
    this.onClick3NF= this.onClick3NF.bind(this);
    this.onClickBCNF= this.onClickBCNF.bind(this);
  }

  addDependency = (e) => {
    e.preventDefault();
    const id = Math.random();
    const data = {
      id: id,
      left: "",
      right: ""
    };
    this.setState({
      dependency: [...this.state.dependency, data]
    });
  };
  deleteDependency = (e, item) => {
    e.preventDefault();
    //console.log(item);
    let dependency = this.state.dependency.filter((data) => {
      return data.id !== item;
    });

    this.setState(
      {
        dependency: dependency
      },
      () => {
        //console.log(this.state.dependency);
      }
    );
  };
  handleChangeLeft = (e, item) => {
    const left = e.target.value;
    let dependency = this.state.dependency.map((data) =>
      data.id === item ? { ...data, left: left } : data
    );
    this.setState({
      dependency: dependency
    });
  };
  handleChangeRight = (e, item) => {
    const right = e.target.value;
    let dependency = this.state.dependency.map((data) =>
      data.id === item ? { ...data, right: right } : data
    );
    this.setState({
      dependency: dependency
    });
  };
  showDependency = () => {
    if (this.state.dependency.length > 0) {
      return this.state.dependency.map((data) => {
        return (
          <div>
            <div>
              <input
                type="text"
                class="rounded"
                value={data.left}
                placeholder="eg. a,b"
                onChange={(e) => {
                  this.handleChangeLeft(e, data.id);
                }}
              />
              &nbsp;&nbsp;
              <i class="fas fa-arrow-right" style={{ "font-size": "20px" }}></i>
              &nbsp;&nbsp;
              <input
                type="text"
                class="rounded"
                value={data.right}
                placeholder="eg. c,d"
                onChange={(e) => {
                  this.handleChangeRight(e, data.id);
                }}
              />
              &nbsp;&nbsp;
              <button
                class="btn btn-danger btn-sm"
                onClick={(e) => {
                  this.deleteDependency(e, data.id);
                }}
              >
                X
              </button>
            </div>
            <br></br>
          </div>
        );
      });
    }
  };

  handelSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.dependency);
    let attr = this.state.Attributes.split(",");
    let left = this.state.dependency.map((dependency) => {
      return dependency.left.split(",");
    });
    let right = this.state.dependency.map((dependency) => {
      return dependency.right.split(",");
    });
    let data = {
      attribute: attr,
      fd: [left, right]
    };
    let headers = {
      "Content-Type": "appplication/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Request-Header": "X-PINGOTHER , Content-Type"
    };
    axios
      .post("http://localhost:5000/Decompose", data, { headers: headers })
      .then((res) => {
        console.log(res);
        //Make a new page Here
        this.setState({
          res: res,
          show: false
        });
      })
      .catch((err) => {
        console.log("error in API Call", err);
      });
    //console.log(JSON.stringify(data))
  };

  addAttribute = (e) => {
    let attr = e.target.value;

    this.setState({
      Attributes: attr
    });
  };

  onClick2NF(e) {
    this.setState({
      normalForm: "2NF"
    });
  }
  onClick3NF(e) {
    this.setState({
      normalForm: "3NF"
    });
  }
  onClickBCNF(e) {
    this.setState({
      normalForm: "BCNF"
    });
  }
  render() {
    console.log("LOL ", this.state);
    return (
      // Trenary out side the return
      <div style={{ display: "block" }}>
        <h3>Normalization Tool</h3>
        <div>
          <br></br>
          <br></br>
          {this.state.show ? (
            <form className="form" onSubmit={this.handelSubmit}>
              <h2>Attributes in Table</h2>
              <textarea
                placeholder="Enter Comma Separated Attributes : eg . a,b,c,d"
                class="rounded"
                cols="50"
                rows="3"
                onChange={this.addAttribute}
              />
              <h2>Functional Dependencies</h2>
              {this.showDependency()}
              <br></br>
              <button
                class="btn btn-primary btn-sm"
                onClick={this.addDependency}
              >
                {" "}
                Add Dependencies{" "}
              </button>
              <br></br>
              <br></br>
              <input
                type="submit"
                class="btn btn-success"
                onSubmit={this.handelSubmit}
              />
            </form>
          ) : (
            <div>
              <div style={{ float: "left", width: "15%"}}>
                {/* <div style={{ borderRight: "1px solid", lineHeight: "50px"}}></div> */}
                <div>
                  <button
                    class="btn btn-primary btn-sm"
                    style={{ width: "100%", height: "50px" }}
                    onClick={this.onClick2NF}
                  >
                    <strong>2NF</strong>
                  </button>
                  <br />
                  <br />
                  <br />
                  <button
                    class="btn btn-primary btn-sm"
                    style={{ width: "100%", height: "50px" }}
                    onClick={this.onClick3NF}
                  >
                    <strong>3NF</strong>
                  </button>
                  <br />
                  <br />
                  <br />
                  <button
                    class="btn btn-primary btn-sm"
                    style={{ width: "100%", height: "50px" }}
                    onClick={this.onClickBCNF}
                  >
                    <strong>BCNF</strong>
                  </button>
                </div>
              </div>

              <div style={{ width: "80%", background: "", float: "right" }}>
                {console.log("Res: ", this.state.res)}
                <Response
                  response={this.state.res.data}
                  normalForm={this.state.normalForm}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Form;
