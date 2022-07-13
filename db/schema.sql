var db = require("../models");

module.exports = {
	createSeedData: function() {
		// db.sequelize.dropAllTables
			db.sequelize.sync({ force: true }).then(function() {
				db.Category
					.bulkCreate([
						{
							name: "RTX 3060"
						},
						{
							name: "RTX 3070"
						},
						{
							name: "RTX 3080"
						},
						{
							name: "RTX 3090"
						}


					])
					.then(function() {
						db.Product
							.bulkCreate([
								{
									name: "NVIDIA RTX 3060",
									price: 15.59,
									img: "",
									quantity: 1,
									CategoryId: 1
								},
								{ 
									name: "NVIDIA RTX 3070",
									price: 5.19,
									img: "https://images-na.ssl-images-amazon.com/images/I/613pCvZqzDL.jpg",
									quantity: 1,
									CategoryId: 5
								},
								{
									name: "NVIDIA RTX 3080",
									price: 13.59,
									img: "https://images-na.ssl-images-amazon.com/images/I/61JudlWjJDL._AC_US436_QL65_.jpg",
									quantity: 1,
									CategoryId: 1
								},
								{ 
									name: "NVIDIA RTX 3090",
									price: 4.77,
									img: "https://images-na.ssl-images-amazon.com/images/I/911Jj5qqvLL._SX522_.jpg",
									desc: "Imported from Germany",
									quantity: 100,
									CategoryId: 5
								}				
							])
							.then(function() {
								db.User.bulkCreate([
									{
										firstName: "Brad",
										lastName: "Carlisle",
										email: "brad@carlisle.com",
										pwd: "$2a$10$SRA8F2QC.Vnsx5N97whEi.nmT1Rz88Bg8rZdTtcegp4WywT9RHT6y"
									},
									{
										firstName: "Mike",
										lastName: "Flight",
										email: "mike@gmail.com",
										pwd: "$2a$10$QohRiClPJgBWWZjb1KLNx.vwrjVRmnlipSOo9nWNfTs9FrfBpp69y"
									},
									{
										firstName: "Jerry",
										lastName: "Jepsen",
										email: "jerry@jepsen.com",
										pwd: "$2a$10$W2K0vNA0i24cROeHvaqDeu84UZAJ9EJ87q//xA9.phrhKOyvsKnO6"
									}
								]);
							}).then(function() {
								db.Cart.bulkCreate([
									{
										UserId: 1,
										ProductId: 1,
										quantity: 2
									},
									{
										UserId: 2,
										ProductId: 3,
										quantity: 1
									},
									{
										UserId: 3,
										ProductId: 1,
										quantity: 1

									},
									{
										UserId: 3,
										ProductId: 2,
										quantity: 4
									},
								]);

							}).then(function() {
								db.Billing.bulkCreate([
									{
										orderId: 1,
										billingName: "Fred Lewis",
										billingAddress: "1735 N Wells St",
										billingCity: "Chicago",
										billingState: "IL",
										billingZip: 60610,
										billingCountry: "USA",
										billingPhone: "7734904221"
									},
									
								]);
							}).then(function() {
								db.Shipping.bulkCreate([
									{
										orderId: 1,
										shippingName: "Ricky Waters",
										shippingAddress: "1337 Davis dr",
										shippingCity: "New York",
										shippingState: "NY",
										shippingZip: 610002,
										shippingCountry: "USA",
										shippingPhone: "7734904221"
									}
											
								]);
							}).then(function() {
								db.Order.bulkCreate([
									{
									orderId: 1,
									quantity: 2,
									purchasePrice: 2.99,
									ccLast4: 2344,
									ProductId: 1,
									BillingId: 1,
									ShippingId: 1,
									UserId: 1
									}
											
								]);
							});	
					});
			});
		
	}
};