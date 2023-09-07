import "./styles.css";
import "react-tooltip/dist/react-tooltip.css";
import React from "react";
import { Tooltip } from "react-tooltip";
import query from "./query.js";
import CodeSidebar from './codeSidebar';

const API_MESH_URL =
  "https://graph.adobe.io/api/3f27897d-5eea-4d61-b3ad-9f43c885d24f/graphql?api_key=411ca26f6df84e89919e90397925a9d6";

class APIMeshExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiMeshRes: '',
      products: [],
      salePrice: 0.5
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
          <img className="nav" src="weHealthcareLogo.png"/>
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
                          ${item.price_range.minimum_price.regular_price.value * this.state.salePrice}
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
