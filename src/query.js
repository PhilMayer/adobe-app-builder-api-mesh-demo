const SEARCH_TERM = "earings";
const NUMBER_OF_RESULTS = 6;

// const query = {
//   query: `{
//       products(search: "${SEARCH_TERM}", pageSize: ${NUMBER_OF_RESULTS}) {
//         total_count
//         items {
//           name
//           sku
//           description {
//             html
//           }
//           price_range {
//             minimum_price {
//               regular_price {
//                 value
//                 currency
//               }
//             }
//           }
//           image {
//             url
//           }
//         }
//       }

//     }`
// };

const query = {
  query: `{
    products(search: "earings") {
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
        ... on SimpleProduct {
          demoDetails {
            
            sku
            location
            quantity
          }
        }
      }
    }
  }`
};
export default query;
