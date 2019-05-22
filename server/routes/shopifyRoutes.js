// Install Route
const nonce = require('nonce')();
const keys = require('./../config/keys');
const apiKey = keys.SHOPIFY_API_KEY
const apiSecret = keys.SHOPIFY_API_SECRET_KEY;
const accessToken = keys.SHOPIFY_ACCESS_TOKEN;
const scopes = 'read_products, read_customers';
const forwardingAddress = "https://829502b4.ngrok.io";
const shop = 'getyourmod-e.myshopify.com';
const crypto = require('crypto');
const cookie = require('cookie');
const querystring = require('querystring');
const request = require('request-promise');
var shopifyId = '1125011554367';
var imageIds = new Set();

const mongoose = require('mongoose');
const axios = require('axios');
const User = mongoose.model('users');


module.exports = (app) => {
app.get('/shopify', (req, res) => {
  if (shopifyId){
      const state = nonce();
      const redirectUri = forwardingAddress + '/shopify/callback';
      const installUrl = 'https://' + shop +
      '/admin/oauth/authorize?client_id=' + apiKey +
      '&scope=' + scopes +
      '&state=' + state +
      '&redirect_uri=' + redirectUri;

      res.cookie('state', state);
      res.redirect(installUrl);
    } else {
      let loginLink = 'https://myfitmode.com/account/login';
      res.redirect(loginLink);
      return res.status(400).send('Missing shop parameter. Please add ?shop=your-development-shop.myshopify.com to your request');
    }
  }
);

app.post('/shopifyId', (req, res) => {
  console.log(req.body);
  shopifyId = req.body.cId;
});



app.get('/shopify/callback', (req, res) => {
  const { shop, hmac, code, state } = req.query;
  const stateCookie = cookie.parse(req.headers.cookie).state;

  if (state !== stateCookie) {
    return res.status(403).send('Request origin cannot be verified');
  }

  if (shop && hmac && code) {
    // DONE: Validate request is from Shopify
    const map = Object.assign({}, req.query);
    delete map['signature'];
    delete map['hmac'];
    const message = querystring.stringify(map);
    const providedHmac = Buffer.from(hmac, 'utf-8');
    const generatedHash = Buffer.from(
      crypto
        .createHmac('sha256', apiSecret)
        .update(message)
        .digest('hex'),
        'utf-8'
      );
    let hashEquals = false;

    try {
      hashEquals = crypto.timingSafeEqual(generatedHash, providedHmac)
    } catch (e) {
      hashEquals = false;
    };

    if (!hashEquals) {
      return res.status(400).send('HMAC validation failed');
    }

    // DONE: Exchange temporary code for a permanent access token
    const accessTokenRequestUrl = 'https://' + shop + '/admin/oauth/access_token';
    const accessTokenPayload = {
      client_id: apiKey,
      client_secret: apiSecret,
      code,
    };

    request.post(accessTokenRequestUrl, { json: accessTokenPayload })
    .then((accessTokenResponse) => {
      let accessToken = accessTokenResponse.access_token;

      console.log(accessToken);
      // DONE: Use access token to make API call to 'shop' endpoint
      const shopRequestUrl = 'https://' + shop + '/admin/api/2019-04/custom_collections/.json';
      const shopRequestHeaders = {
        'X-Shopify-Access-Token': accessToken,
      };

      request.get(shopRequestUrl, { headers: shopRequestHeaders })
      .then((shopResponse) => {
        res.status(200).end(shopResponse);
      })
      .catch((error) => {
        res.status(error.statusCode).send(error.error.error_description);
      });
    })
    .catch((error) => {
      res.status(error.statusCode).send(error.error.error_description);
    });

  } else {
    res.status(400).send('Required parameters missing');
  }
});

async function createUser(userDetails) {
  const existingUser = await User.findOne({ shopifyId:  userDetails.id});
  if (existingUser) {
    //we already have a user with the given profile ID
    return existingUser;
  }
  if (userDetail.default_address) {

    const user = await new User({
      firstName: userDetails.first_name,
      lastName: userDetails.last_name,
      email: userDetails.email,
      shopifyId: userDetails.id,
      address: `${userDetails.default_address.address1}, ${userDetails.default_address.city}, ${userDetails.default_address.province_code}, ${userDetails.default_address.zip}`,
      phone: userDetails.phone
    }).save();
    return user;
  } else {
    const user = await new User({
      firstName: userDetails.first_name,
      lastName: userDetails.last_name,
      email: userDetails.email,
      shopifyId: userDetails.id,
      phone: userDetails.phone
    }).save();
    return user;
  }
}

app.get('/shopify/customer', (req, res) => {
  let url = 'https://' + shop + '/admin/customers/' + shopifyId + '.json';

  let options = {
    method: 'GET',
    uri: url,
    json: true,
    resolveWithFullResponse: true,
    headers: {
      'X-Shopify-Access-Token': accessToken
    }
  }

  var customerData;

  request.get(options)
    .then((response) => {
      console.log(response.body);
      customerData = response.body.customer;
      if (response.statusCode == 201) {
        res.json(true)
      } else {
        var user = createUser(customerData)
        user.then(function(value) {
          console.log(value);
          res.send(customerData);
        })
      }
    })
    .catch((err) => {
      console.log(err);
      res.json(false);
    })

})

  app.get('/shopify/products/blocks', (req, res)=> {
    // individual product ids from Shopify, each with its own variants array
    // let productIds = [1607825850431, 1536692551743, 96175194126, 1536838828095, 1538069856319]
    var products = {blocks: [], images: {}};


      let url = 'https://' + shop + '/admin/products/'+ 1607825850431 + '.json';
      let options = {
        method: 'GET',
        uri: url,
        json: true,
        resolveWithFullResponse: true,
        headers: {
          'X-Shopify-Access-Token': accessToken
        }
      }
      let imageIds = new Set();

      request.get(options)
        .then((response) => {
          console.log(response.body.product.variants);
          let variants = response.body.product.variants;

          variants.forEach((variant) => {
            let product = {
              title: response.body.product.title,
              flavor: variant.title,
              price: variant.price,
              imageId: variant.image_id,
              productId: variant.product_id,
              variantId: variant.id
            }
            imageIds.add([variant.product_id, variant.image_id]);
            products.blocks.push(product);
          })
          let imgUrl = 'https://' + shop + '/admin/products/'+ 1607825850431 + '/images.json';
          let imageOptions = {
            method: 'GET',
            uri: imgUrl,
            json: true,
            resolveWithFullResponse: true,
            headers: {
              'X-Shopify-Access-Token': accessToken
            }
          }
          return request(imageOptions)
          .then((response) => {
            let images = response.body.images

            images.forEach((image) => {
              if(image.variant_ids.length == 1) {
                let variantId = image.variant_ids[0];
                products.images[variantId] = image.src
              }
            })
            console.log(JSON.stringify(products));
            res.send(products)
          })
        })
        .catch((err) => {
          console.log(err);
          res.json(false);
        })

    });

    app.get('/shopify/products/hydration', (req, res)=> {
      // individual product ids from Shopify, each with its own variants array
      // let productIds = [1607825850431, 1536692551743, 96175194126, 1536838828095, 1538069856319]
      var products = {hydration: [], images: {}};


        let url = 'https://' + shop + '/admin/products/'+ 1536692551743 + '.json';
        let options = {
          method: 'GET',
          uri: url,
          json: true,
          resolveWithFullResponse: true,
          headers: {
            'X-Shopify-Access-Token': accessToken
          }
        }

        request.get(options)
          .then((response) => {
            console.log(response.body.product.variants);
            let variants = response.body.product.variants;

            variants.forEach((variant) => {
              let product = {
                title: response.body.product.title,
                flavor: variant.title,
                price: variant.price,
                imageId: variant.image_id,
                productId: variant.product_id,
                variantId: variant.id
              }
              imageIds.add([variant.product_id, variant.image_id]);
              console.log(JSON.stringify(products));
              products.hydration.push(product);
            })
            let imageUrl = 'https://' + shop + '/admin/products/'+ 1536692551743 + '/images.json';
            let imageOptions = {
              method: 'GET',
              uri: imageUrl,
              json: true,
              resolveWithFullResponse: true,
              headers: {
                'X-Shopify-Access-Token': accessToken
              }
            }

            return request.get(imageOptions)
          })
          .then((response) => {
            let images = response.body.images

            images.forEach((image) => {
              if(image.variant_ids.length == 1) {
                let variantId = image.variant_ids[0];
                products.images[variantId] = image.src
              }
          })
          let url = 'https://' + shop + '/admin/products/'+ 96175194126 + '.json';
          let options  = {
            method: 'GET',
            uri: url,
            json: true,
            resolveWithFullResponse: true,
            headers: {
              'X-Shopify-Access-Token': accessToken
            }
          }

          return request.get(options)
        })

              .then((response) => {
                let variants = response.body.product.variants;

                variants.forEach((variant) => {
                  let product = {
                    title: response.body.product.title,
                    flavor: variant.title,
                    price: variant.price,
                    imageId: variant.image_id,
                    productId: variant.product_id,
                    variantId: variant.id
                  }
                  imageIds.add([variant.product_id, variant.image_id]);
                  console.log(JSON.stringify(products));
                  products.hydration.push(product);
                })
                let imageUrl = 'https://' + shop + '/admin/products/'+ 96175194126 + '/images.json';
                let imageOptions = {
                  method: 'GET',
                  uri: imageUrl,
                  json: true,
                  resolveWithFullResponse: true,
                  headers: {
                    'X-Shopify-Access-Token': accessToken
                  }
                }
                return request.get(imageOptions)
              })
              .then((response) => {
                let images = response.body.images

                images.forEach((image) => {
                  if(image.variant_ids.length == 1) {
                    let variantId = image.variant_ids[0];
                    products.images[variantId] = image.src
                  }

              })
              res.send(products);
            })
          .catch((err) => {
            console.log(err);
            res.json(false);
          })

      })


      app.get('/shopify/products/protein', (req, res)=> {
        // individual product ids from Shopify, each with its own variants array
        // let productIds = [1607825850431, 1536692551743, 96175194126, 1536838828095, 1538069856319]
        var products = {protein: [], images: {}};


          let url = 'https://' + shop + '/admin/products/'+ 1536838828095 + '.json';
          let options = {
            method: 'GET',
            uri: url,
            json: true,
            resolveWithFullResponse: true,
            headers: {
              'X-Shopify-Access-Token': accessToken
            }
          }

          request.get(options)
            .then((response) => {
              console.log(response.body.product.variants);
              let variants = response.body.product.variants;

              variants.forEach((variant) => {
                let product = {
                  title: response.body.product.title,
                  flavor: variant.title,
                  price: variant.price,
                  imageId: variant.image_id,
                  productId: variant.product_id,
                  variantId: variant.id
                }
                imageIds.add([variant.product_id, variant.image_id]);
                console.log(JSON.stringify(products));
                products.protein.push(product);
              })
              let imageUrl = 'https://' + shop + '/admin/products/'+ 1536838828095 + '/images.json';
              let imageOptions = {
                method: 'GET',
                uri: imageUrl,
                json: true,
                resolveWithFullResponse: true,
                headers: {
                  'X-Shopify-Access-Token': accessToken
                }
              }

              return request.get(imageOptions)
            })
            .then((response) => {
              let images = response.body.images

              images.forEach((image) => {
                if(image.variant_ids.length == 1) {
                  let variantId = image.variant_ids[0];
                  products.images[variantId] = image.src
                }
            })
            let url = 'https://' + shop + '/admin/products/'+ 1538069856319 + '.json';
            let options  = {
              method: 'GET',
              uri: url,
              json: true,
              resolveWithFullResponse: true,
              headers: {
                'X-Shopify-Access-Token': accessToken
              }
            }

            return request.get(options)
          })

                .then((response) => {
                  let variants = response.body.product.variants;

                  variants.forEach((variant) => {
                    let product = {
                      title: response.body.product.title,
                      flavor: variant.title,
                      price: variant.price,
                      imageId: variant.image_id,
                      productId: variant.product_id,
                      variantId: variant.id
                    }
                    imageIds.add([variant.product_id, variant.image_id]);
                    console.log(JSON.stringify(products));
                    products.protein.push(product);
                  })
                  let imageUrl = 'https://' + shop + '/admin/products/'+ 1538069856319 + '/images.json';
                  let imageOptions = {
                    method: 'GET',
                    uri: imageUrl,
                    json: true,
                    resolveWithFullResponse: true,
                    headers: {
                      'X-Shopify-Access-Token': accessToken
                    }
                  }
                  return request.get(imageOptions)
                })
                .then((response) => {
                  let images = response.body.images

                  images.forEach((image) => {
                    if(image.variant_ids.length == 1) {
                      let variantId = image.variant_ids[0];
                      products.images[variantId] = image.src
                    }

                })
                res.send(products);
              })
            .catch((err) => {
              console.log(err);
              res.json(false);
            })

        })



  // 71781482559 is the id of the subscription products collections from Shopify
  // let url = 'https://' + shop + '/admin/products/'+ 1538069856319+ '.json';

  // console.log(JSON.stringify(products));
}
