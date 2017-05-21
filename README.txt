Welcome to the NodePop API

This API serves ads to clients..........

The Data Base stores Ads and Users.

The structure of the Ads documents is as follow:
name: String (Name of the product the user is willing to sell or to buy)
onSale: Boolean (true, is the user wants to sell the product and false if wants to buy)
price: Number (Price for sell or willing to pay)
image: String (A picture of the product)
tags: [String] (Keywords for making the search easier)

The structure of the Users documents is as follow:
name: String (User's name)
email: String (User's email)
password: String (User's passcode)

To use this API:

1.- From shell, execute 'npm run installDB' to clean the tables and create new documents in Data base collections.

2.- To create a user make a POST request to localhost:3000/users with the fields (name, email and password) on the
    body of the request and urlencode format.

3.- In order to make any query to the Data Base you must first Authenticate your user. Make a POST request to
    localhost:3000/users/authenticate with the email and password fields on the body of the request and urlencode
    format. This request will give back a token that most be used to make any query to the Data Base.

4.- You can make querys to the Data Base making a GET request to localhost:3000/ads with parameters on the Query String
    of the request. You can filter by name, by price range (price=100-300), less than price (price=-100), more than
    price (price=100-), equal price (price=100), by tags and any combinations of all of those. You can also, ask to
    include the total of Ads that match your query including the includeTotal=true parameter, you can limit your results
    to any number of documents with limit=n, where n is the number of documents you want. With the start=n you can ask
    your results to begin from the n document of the matched documents on you query. IMPORTANT: it's required to use
    the token given by the Authentication to make any query to the Data Base.