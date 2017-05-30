var pizzapi = require('pizzapi');
var myStore = new pizzapi.Store({});
pizzapi.Util.findNearbyStores(
  '944 Market Street, 7th floor, San Francisco, CA 94102',
  'Delivery',
  function (storeData) {
    // console.log(storeData.result.Stores[0].StoreID);
    myStore.ID = storeData.result.Stores[0].StoreID;
    myStore.getInfo(
      function (storeData) {
        // console.log(storeData);
      }
    );
    var jsonAddress = {
      Street: '944 Market Street, 8th floor',
      City: 'San Francisco',
      Region: 'CA',
      PostalCode: "94102"
    };
    var customer = {
      address: jsonAddress,
      firstName: 'Paul',
      lastName: 'Kang',
      phone: '1-559-545-7498',
      email: 'simmern.kang@gmail.com'
    }
    var newItem = {
      code: '12SCREENPKG'
    };
    var order = new pizzapi.Order({
      customer: customer,

      //optional set the store ID right away 
      storeID: "7764",

      deliveryMethod: 'Delivery' //(or 'Carryout') 
    });
    order.addItem(
      new pizzapi.Item({
        code: '14SCREEN',
        options: ['P','K', 'G'],
        quantity: 1
      })
    );
    order.validate(
      function(result) {
          // console.log("We did it!",result);
      }
  );
  order.price(
      function(result) {
          console.log("Price!", result.result)
      }
  );
  var cardNumber = '';
 
  var cardInfo = new order.PaymentObject();
  cardInfo.Amount = order.Amounts.Customer;
  cardInfo.Number = cardNumber;
  cardInfo.CardType = order.validateCC(cardNumber);
  cardInfo.Expiration = '';//  01/15 just the numbers "01/15".replace(/\D/g,''); 
  cardInfo.SecurityCode = '';
  cardInfo.PostalCode = '93619'; // Billing Zipcode 
 
  order.Payments.push(cardInfo);
 
  order.place(
      function(result) {
          console.log("Order placed!", result);
      }
  );
  pizzapi.Track.byPhone(
      5595457498,
      function(pizzaData){
          console.log(pizzaData);
      }
  );
  }
);