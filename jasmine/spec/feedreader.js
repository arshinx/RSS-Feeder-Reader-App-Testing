/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         allFeeds.forEach(function(obj, i) {
           it('URL(s) must be defined and may not be Empty', function() {
             expect(allFeeds[i].url).toBeDefined();
             expect(allFeeds[i].url.length).not.toBe(0);
           });
         });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         allFeeds.forEach(function(obj, i) {
           it('Name(s) must be defined!', function() {
             expect(allFeeds[i].name).toBeDefined();
           });
           it('Name(s) must have at minimum one character!', function() {
             expect(allFeeds[i].name.length).not.toBe(0);
           });
         });
    });


    /* A new test suite named "The menu" */
    describe("The menu", function() {

        /* A test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         var body = $(document.body);

         it('Menu must be hidden by default!', function() {
           expect(body.hasClass("menu-hidden")).toBe(true);
         });

         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked.
          *
          * This test has two expectations:
          * (a) does the menu display when clicked.
          * (b) does it hide when clicked again.
          */
          var menuIcon = $('.menu-icon-link');

          it ('visibility changes on click', function() {

            // Does the menu display when button is clicked
            menuIcon.click();
            expect(body.hasClass("menu-hidden")).toBe(false);

            // Does the menu hide when button is clicked again
            menuIcon.click();
            expect(body.hasClass("menu-hidden")).toBe(true);
        });

    });

    /* A new test suite named "Initial Entries" */
    describe("Initial Entries", function() {

        /* A test that ensures when the (loadFeed
         * function is called) and (completes its work):
         * there is at least a single '.entry' element
         * within the '.feed' container.
         *
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

         // (loadFeed function is called) and (completes its work)
         beforeEach(function(done) {
           loadFeed(0, done);
         });

         /*
            At least one '.entry' element is present
            within the '.feed' container.
         */
         it ("There must be at least one '.entry' element!", function() {
           // Get Elements
           var elements = $('.feed .entry');

           // More than one elements present
           expect(elements.length).toBeGreaterThan(0);
          });

     }); // end describe suite

    /* A new test suite named "New Feed Selection" */
    describe("New Feed Selection", function() {

        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        // Elements
        var feed = $('.feed');
        var previousContent;
        var updatedContent;

        // Loading Completes
        beforeEach(function(done) {
          loadFeed(1, function() {
            // save previous content
            previousContent = feed.find("h2").text();
            // complete
            done();
          });
        });

        // If new feed is loaded by 'loadFeed' function, content changes
        it("Content must change when a new feed loads!", function(done){

          // Load
          loadFeed(0, function() {

            // Save new content for comparison
            updatedContent = feed.find("h2").text();

            // Compare
            expect(updatedContent).not.toEqual(previousContent);

            // Complete
            done();

          });
        });

      }); // "New Feed Selection" suite ends

}()); // End of Main Function
