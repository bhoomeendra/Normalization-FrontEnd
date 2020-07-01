import React from "react";
import Card from "react-bootstrap/Card";
class Table extends React.Component {
  constructor() {
    super();
    let state = {
      Attributes: [],
      Fds: []
    };
    this.state = state;
  }
  componentDidMount() {
    this.setState({
      Attributes: this.props.data.attr,
      Fds: this.props.data.fds
    });
  }
  FdString() {
    const fds = this.props.data.fds;
    let i = 0;
    var pairs = [];
    for (var fdLeft in fds[0]) {
      pairs.push([fds[0][i], fds[1][i]]);
      i += 1;
    }
    console.log("Pairs", pairs);
    return pairs;
    // console.log("This Are Fds", this.state.Fds);

    //
    // let res = [];
    // console.log("FdString", fds, fds[0][0]);
    //

    // for (var fdLeft in fds[0]) {
    //   res += fds[0][i] + " ---> " + fds[1][i] + " , ";
    //   i += 1;
    // }
    // console.log("Response", res);
    // return res;
  }
  render() {
    console.log("Table Main Props", this.props.data);

    if (this.state === null) return <div>Loding.....</div>;

    return (
      <div>
        {console.log("Table data state ", this.state)}

        <Card bg="Success">
          <Card.Body>
            <Card.Header>
              Normal Form : {this.props.data.normalForm}
            </Card.Header>
            <Card.Text>
              <h5>Attributes</h5>
              {this.props.data.attr.map((attribute, i) =>
                i !== this.props.data.attr.length - 1 ? (
                  <div style={{ display: "inline-block" }}>{attribute}, </div>
                ) : (
                  <div style={{ display: "inline-block" }}>{attribute}</div>
                )
              )}
              <br />
              <h5> Functional Depedency</h5>
              {console.log(typeof this.FdString())}
              {this.FdString().map((fds,i)=>{
               return(
               <div>
                {fds[0]} &nbsp;&nbsp;
              <i class="fas fa-arrow-right" style={{ "font-size": "20px" }}></i>
              &nbsp;&nbsp;
              {fds[1]} 
                </div>

               )
              })}
            </Card.Text>
            <footer class="small">
              ID:{this.props.data.id}  Parent ID:{this.props.data.pId}  
            </footer>
          </Card.Body>
        </Card>
        <br />
      </div>
    );
  }
}

export default Table;
