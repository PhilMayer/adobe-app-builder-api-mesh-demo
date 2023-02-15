import "./styles.css";
import "react-tooltip/dist/react-tooltip.css";
import React from "react";
import { Tooltip } from "react-tooltip";
import query from "./query.js";

const API_MESH_URL =
  "https://graph.adobe.io/api/c29aab13-2a06-41c5-8f67-5632ad62598c/graphql?api_key=077cf40dae5144ef8b799b0d53964e24";
// const API_MESH_URL =
//   "https://graph.adobe.io/api/fe0779e3-2d3e-45db-b043-5c8dcf7a9f04/graphql?api_key=99f0c5c18d2249b188d92529f31ccdf1";

class APIMeshExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      inventory: [],
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
          products: res.data.products.items
          // inventory: res.data.inventory
        });
      });
  }

  render() {
    return (
      <>
        <div>
          <h2>Your API Mesh query results</h2>
          <ul>
            {this.state.products.map((item, idx) => (
              <li key={item.sku}>
                <h1 id={item.name}>{item.name}</h1>

                {this.state.salePrice ? (
                  <div>
                    <h4
                      className="strike"
                      id={
                        idx + item.price_range.minimum_price.regular_price.value
                      }
                    >
                      ${item.price_range.minimum_price.regular_price.value}
                    </h4>
                    <h4 className="sale" id={idx + this.state.salePrice}>
                      ${this.state.salePrice}
                    </h4>
                  </div>
                ) : (
                  <h4 id="price">
                    ${item.price_range.minimum_price.regular_price.value}
                  </h4>
                )}

                <img id={item.image.url} src={item.image.url} />

                {item.demoDetails ? (
                  <div>
                    <p id={item.sku}>
                      Items remaining: {item.demoDetails.quantity}
                    </p>
                    <p>Location: {item.demoDetails.location}</p>
                  </div>
                ) : (
                  <div></div>
                )}
                <p>Items nearby: 2</p>

                <Tooltip
                  anchorId={item.name}
                  place="bottom"
                  content="Source: Venia Catalogue"
                />

                <Tooltip
                  anchorId={item.image.url}
                  place="bottom"
                  content="Source: Venia Catalogue"
                />

                <Tooltip
                  anchorId={item.sku}
                  place="bottom"
                  content="Source: Inventory data"
                />

                <Tooltip
                  anchorId={
                    idx + item.price_range.minimum_price.regular_price.value
                  }
                  place="bottom"
                  content="Source: Venia Catalogue"
                />

                <Tooltip
                  anchorId={idx + this.state.salePrice}
                  place="bottom"
                  content="Source: Sales data"
                />
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  }
}

export default APIMeshExample;
