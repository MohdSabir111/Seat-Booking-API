## Seat_Booking_API


## HOME PAGE
 - **https://mohdsabir111-seat-booking-api.onrender.com**

   
  ## Routes

  - **https://mohdsabir111-seat-booking-api.onrender.com/seats**   __<b> Get All Seat</b> 
  
- **https://mohdsabir111-seat-booking-api.onrender.com/seats/64a92e4a47d927197afd2116**     __<b>  Get Seat Pricing</b> 
 
   
- **https://mohdsabir111-seat-booking-api.onrender.com/all-seat-csv**    __<b> Get All Seat CSV </b>

  
- **https://mohdsabir111-seat-booking-api.onrender.com/seat-pricing-CSV/:id**__<b>  Get Seat Pricing CSV </b>

- **https://mohdsabir111-seat-booking-api.onrender.com/seats**  __<b>  Create New Seat </b>
- <b>Use METHOD : POST and Send this data in body </b>
    ```
  {
  "seatNumber": "C1",
  "seatClass": "economy",
  "isBooked": false,
  "minPrice": 1500,
  "normalPrice": 1600,
  "maxPrice": 1700
   }

   ```
 - **https://mohdsabir111-seat-booking-api.onrender.com/booking**  __<b>  Create New Booking </b>
- <b>Use METHOD : POST and Send this data in body </b>
 ```
{
  "seatIds": ["64a92eb647d927197afd211a"], 
  "userName": "sabir", 
  "phoneNumber": "+91988760" 
}
```
- **https://mohdsabir111-seat-booking-api.onrender.com/bookings?userIdentifier=sabir** __<b>  Retrieve Bookings By userIdentifier(userName) </b>
- <b>Use METHOD : GET and Send this data in Params </b>
  ```
  userIdentifier(key)  sabir(value)
  ```
- **https://mohdsabir111-seat-booking-api.onrender.com/booking/:id** __<b>  DELETE Booking By id</b>
- <b>Use METHOD : DELETE and Send the id data in Params </b>
- **https://mohdsabir111-seat-booking-api.onrender.com/seats/:id**__<b>  DELETE Seat By id</b>
   - <b>Use METHOD : DELETE and Send the id data in Params </b>


 
  
  <br/>

## Tools Used

 <p align="justify">
<img height="140" width="140" src="https://www.startechup.com/wp-content/uploads/January-11-2021-Nodejs-What-it-is-used-for-and-when-where-to-use-it-for-your-enterprise-app-development.jpg">
<img height="140" width="140" src="https://www.edureka.co/blog/wp-content/uploads/2019/07/express-logo.png">
<img height="140" width="140" src="https://g.foolcdn.com/art/companylogos/square/mdb.png">
<img height="140" width="140" src="https://mms.businesswire.com/media/20210806005076/en/761650/22/postman-logo-vert-2018.jpg">
<img height="140" width="140" src="https://www.pngitem.com/pimgs/m/13-131098_visual-studio-code-logo-hd-png-download.png">
</p>


## Requirements

For development, you will only need Node.js and a node global package installed in your environement and mongodb for database.

### Node

- Node Installtion on Windows
  Go on to the [official Node.js website](https://nodejs.org/en/) and download the installer. Also, be sure to have `.git` available in your PATH,
  `npm` might need it (You can find [git](https://git-scm.com/)).
- Other operating System
  You can find more information about the installation on the official [Node.js website](https://nodejs.org/en/) and the official [NPM website](https://www.npmjs.com/).

If the installation was successful, you should be able to run the following command.

```
$ node --version
v16.13.0

$ npm --version
8.2.0
```

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

```
$ npm install npm -g

```

<br/>

## To run the project on your local machine:

1. Open terminal.

2. Change the current working directory to the location where you want the cloned directory.

   ```
   $ git clone https://github.com/MohdSabir111/Flight-Price-Api

   ```

3. Install all the dependencies by running :

   ```
   npm install

   ```

4. Run npm start to run the project at local host, port 8000:

   ```
   $ npm start

   ```

<br/>
