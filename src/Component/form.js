import React from "react";
class Form extends React.Component {
  state = {
    dependency: [],
    show: true
  };
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
    this.setState({
      ...this.state,
      show: false
    });
  };
  render() {
    console.log(this.state.dependency);
    return (
      <div>
        <h3>Normalization Tool</h3>
        <br></br>
        <br></br>
        {this.state.show ? (
          <form className="form" onSubmit={this.handelSubmit}>
            <h2>Attributes in Table</h2>
            <textarea class="rounded" cols="100" rows="3" />
            <h2>Functional Dependencies</h2>
            {this.showDependency()}
            <br></br>
            <button class="btn btn-primary btn-sm" onClick={this.addDependency}>
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
          <div>hello</div>
        )}
      </div>
    );
  }
}

export default Form;
