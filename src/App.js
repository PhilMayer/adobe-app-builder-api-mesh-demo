import "./styles.css";
import "react-tooltip/dist/react-tooltip.css";
import React from "react";
import { Tooltip } from "react-tooltip";
import query from "./query.js";
import CodeSidebar from './codeSidebar';
import movistarProducts from './movistarProducts'

const API_MESH_URL =
  "https://graph.adobe.io/api/64f754da-0c29-43a9-93bc-8099bcc858f1/graphql?api_key=cc3af46d30c240fe8903c018e799ee8b";

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
          <img className="nav" src="movistar.png"/>
          <h2>Mi Movistar</h2>
            
          <div className="results">
            <div>
              <ul>
                {this.state.products.map((item, idx) => (
                  <>
                  <li id={idx} key={item.sku}>
                  <img id={item.image.url} className="product-image" src={item.image.url} />
                    <p className="item-name auto-width" id={item.name}>{item.name}</p>

                    {this.state.salePrice ? (
                      <div className="price-container">
                        <p id={idx + item.price_range.minimum_price.regular_price.value}>
                          ${item.price_range.minimum_price.regular_price.value}
                        </p>
                       
                      </div>
                    ) : (
                      <p id="price">
                        ${item.price_range.minimum_price.regular_price.value}
                      </p>
                    )}

                    <button>ADD TO CART</button>
                    <span>&#9825;</span>

                    
                    <div id={item.sku + idx}>
                      <p className="auto-width oferta">
                        <strong>Oferta Adicional! </strong> 
                        
                        <a target="_blank" href={movistarProducts[Math.floor(Math.random() * 29)].data.fields.urlFicha.replace(/\\u003d/g, "=")}>{movistarProducts[Math.floor(Math.random() * 29)].name}</a>
                      </p>
                     
                    </div>
                    
                    
                    <Tooltip
                      anchorId={item.image.url}
                      place="bottom"
                      content="URL de origen: https://demo.magentosite.cloud/graphql" />

                    <Tooltip
                      anchorId={item.name}
                      place="bottom"
                      content="URL de origen: https://demo.magentosite.cloud/graphql" />

                    <Tooltip
                      anchorId={idx + item.price_range.minimum_price.regular_price.value}
                      place="bottom"
                      content="URL de origen: https://demo.magentosite.cloud/graphql" />

                    <Tooltip
                      anchorId={item.sku + idx}
                      place="bottom"
                      content="URL de origen: https://orion.col.movistar.es/v1/orion/standard-api/products" /> 

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
