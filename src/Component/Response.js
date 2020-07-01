import React from "react"
import Table from "./table"
import CardDeck from "react-bootstrap/CardDeck"
import CardColumns from "react-bootstrap/CardColumns"
class Response extends React.Component{
    
    constructor()
    {
        super();
        let state = {
            response:[]
        }
        this.state = state;
    }

    componentDidMount()
    {
        this.setState(
            {
                response:this.props.response
            }
        )
    }
    render()
    {
  

 
        return(
// Make it a card Deck
<CardColumns>
    {console.log("Inside Response :",this.props.response)}
            {this.state.response.map((item,i)=>{
                if(item.normalForm === this.props.normalForm)
                return(
                <Table key={i} data={item}/>
                )
            }
            )}
            
            </CardColumns>
        )
 
         
    }
}

export default Response;