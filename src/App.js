import "./styles.css";
import "react-tooltip/dist/react-tooltip.css";
import React from "react";
import { Tooltip } from "react-tooltip";
import query from "./query.js";
import CodeSidebar from './codeSidebar';


// const API_MESH_URL =
//   "https://graph.adobe.io/api/c29aab13-2a06-41c5-8f67-5632ad62598c/graphql?api_key=077cf40dae5144ef8b799b0d53964e24";
const API_MESH_URL =
  "https://graph.adobe.io/api/fe0779e3-2d3e-45db-b043-5c8dcf7a9f04/graphql?api_key=99f0c5c18d2249b188d92529f31ccdf1";

class APIMeshExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiMeshRes: '',
      products: [],
      salePrice: 55
    };
  }

  componentDidMount() {
    let options = {
      method: "post",
      body: JSON.stringify(query),
      headers: {
        "content-type": "application/json"
      }
    };

    fetch(API_MESH_URL, options)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);

        this.setState({
          apiMeshRes: res.data,
          products: res.data.products.items
        });
      });
  }

  render() {
    return (
      <>
        <div>
          <img className="nav" src="nav.png"/>
          <h2>Your search results</h2>
            
          <div className="results">
            <div>
              <ul>
                {this.state.products.map((item, idx) => (
                  <>
                  <li id={idx} key={item.sku}>
                  <img id={item.image.url} src={item.image.url} />
                    <p className="item-name auto-width" id={item.name}>{item.name}</p>

                    {this.state.salePrice ? (
                      <div className="price-container">
                        <p
                          className="price strike"
                          id={idx + item.price_range.minimum_price.regular_price.value}
                        >
                          ${item.price_range.minimum_price.regular_price.value}
                        </p>
                        <p className="price sale" id={idx + this.state.salePrice}>
                          ${this.state.salePrice}
                        </p>
                      </div>
                    ) : (
                      <p id="price">
                        ${item.price_range.minimum_price.regular_price.value}
                      </p>
                    )}

                    <button>ADD TO CART</button>
                    <span>&#9825;</span>

                    {item.demoDetails ? (
                      <div>
                        <p className="auto-width" id={item.sku}>
                          Items remaining: {item.demoDetails.quantity}
                        </p>
                        <p className="auto-width" id={item.sku + idx}>Location: {item.demoDetails.location}</p>
                      </div>
                    ) : (
                      <div></div>
                    )}
                    
                    <Tooltip
                      anchorId={item.image.url}
                      place="bottom"
                      content="Source: Venia Catalogue" />

                    <Tooltip
                      anchorId={item.name}
                      place="bottom"
                      content="Source: Venia Catalogue" />

                    <Tooltip
                      anchorId={idx + item.price_range.minimum_price.regular_price.value}
                      place="bottom"
                      content="Source: Venia Catalogue" />

                    <Tooltip
                      anchorId={idx + this.state.salePrice}
                      place="bottom"
                      content="Source: Sales data" />

                    <Tooltip
                      anchorId={item.sku}
                      place="bottom"
                      content="Source: Inventory data" />

                    <Tooltip
                      anchorId={item.sku + idx}
                      place="bottom"
                      content="Source: Inventory data" /> 

                  </li></>
                ))}
              </ul>
            </div>
            <div>
              <CodeSidebar meshResponse={this.state.apiMeshRes}/>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default APIMeshExample;
