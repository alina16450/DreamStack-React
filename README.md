This code demonstrates the use of Routing to handle CRUD operations of a bucketItem class, and and separate those operations between 3 pages. 

The home page displays the table of bucketItems, an ability to check and uncheck if it has been visited, and methods to filter and sort. It also shows some general statistics, like how many total, how many visited, among others.

The /add page allows the ability to add a new bucketItem, and provides input validation by checking that everything except description contains only letters. It also does not allow for submmit unless all fiels are filled.

The /edit page allows the user to click an instance on the table and be able to modify any of the values, or delete it by clicking the trash icon by each table item. 

There is also a 404 page for all other variations of the pages. 

There are tests for the class functions as well as the actions that the user can take on the website, using Jest testing. 

It is still a work in progress, I do intend to add several other functionalities, as well as a backend for it which will utilize a database for the bucketItem instances. 
