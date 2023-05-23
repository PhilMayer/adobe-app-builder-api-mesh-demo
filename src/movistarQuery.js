const query = {
    query: `{
      products(search: "${SEARCH_TERM}") {
        items {
          name
          sku
          price_range {
            minimum_price {
              regular_price {
                value
                currency
              }
            }
          }
          image {
            url
          }
        }
      }
      movistar(filter: "${SEARCH_TERM}") {
        responseList {
          items {
            name
            data {
              fields {
                urlFiche
                }
              }
            }
          }
        }
    }`
  };
