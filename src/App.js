import "./styles.css";
import "react-tooltip/dist/react-tooltip.css";
import React from "react";
import { Tooltip } from "react-tooltip";
import query from "./query.js";
import CodeSidebar from "./codeSidebar";

const USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
const API_MESH_URL =
  "https://graph.adobe.io/api/e6c7b68a-30c4-4f06-b468-f12cf4ecd3cf/graphql?api_key=5c3ddb18999249e2b56dee6f4d9d7885";

class APIMeshExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiMeshRes: "",
      products: [],
      salePrice: 0.5,
    };
  }

  componentDidMount() {
    let options = {
      method: "post",
      body: JSON.stringify(query),
      headers: {
        "content-type": "application/json",
      },
    };

    fetch(API_MESH_URL, options)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);

        this.setState({
          apiMeshRes: res.data,
          products: res.data.products.items,
        });
      });
  }

  render() {
    return (
      <>
        <div>
          <img className="nav" src="bodeaLogo.png" />
          <h2>Your search results</h2>

          <div className="results">
            <div>
              <ul>
                {this.state.products.map((item, idx) => (
                  <>
                    <li id={idx} key={item.sku}>
                      <img
                        className="product-image"
                        id={item.image.url}
                        src={item.image.url}
                      />
                      <p className="item-name auto-width" id={idx + item.name}>
                        {item.name}
                      </p>

                      {this.state.salePrice ? (
                        <div className="price-container">
                          <p
                            className="price strike"
                            id={
                              idx +
                              item.price_range.minimum_price.regular_price.value
                            }
                          >
                            $
                            {item.price_range.minimum_price.regular_price.value}
                          </p>
                          <p
                            className="price sale"
                            id={idx + this.state.salePrice}
                          >
                            {USDollar.format(
                              item.price_range.minimum_price.regular_price
                                .value * this.state.salePrice
                            )}
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
                          <p className="auto-width" id={item.sku + idx}>
                            Location: {item.demoDetails.location}
                          </p>
                        </div>
                      ) : (
                        <div></div>
                      )}

                      <Tooltip
                        anchorId={item.image.url}
                        place="bottom"
                        content="Source: Adobe Commerce"
                      />

                      <Tooltip
                        anchorId={idx + item.name}
                        place="bottom"
                        content="Source: Adobe Commerce"
                      />

                      <Tooltip
                        anchorId={
                          idx +
                          item.price_range.minimum_price.regular_price.value
                        }
                        place="bottom"
                        content="Source: Adobe Commerce"
                      />

                      <Tooltip
                        anchorId={idx + this.state.salePrice}
                        place="bottom"
                        content="Source: ERP"
                      />

                      <Tooltip
                        anchorId={item.sku}
                        place="bottom"
                        content="Source: ERP"
                      />

                      <Tooltip
                        anchorId={item.sku + idx}
                        place="bottom"
                        content="Source: ERP"
                      />
                    </li>
                  </>
                ))}
              </ul>
            </div>
            <div>
              <CodeSidebar meshResponse={this.state.apiMeshRes} />
            </div>
          </div>
          <iframe
            src="https://codesandbox.io/p/github/PhilMayer/adobe-app-builder-api-mesh-demo/bodea?file=%2Fmesh.json&embed=1"
            style={{width:'100%', height: '800px', border:0, borderRadius: '4px', overflow:'hidden'}}
            title="PhilMayer/adobe-app-builder-api-mesh-demo/bodea"
            allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
            sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
          ></iframe>
        </div>
      </>
    );
  }
}

export default APIMeshExample;

//style={{width:'100%', height: '500px', border:0, borderRadius: '4px', overflow:'hidden'}}
