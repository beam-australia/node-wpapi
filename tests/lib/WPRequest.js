const expect = require( 'chai' ).expect;

const WPRequest = require( '../../lib/WPRequest' );

describe( 'WPRequest', function() {

	describe( 'constructor', function() {

		it( 'should create a WPRequest instance', function() {
			var query1 = new WPRequest();
			expect( query1 instanceof WPRequest ).to.equal( true );
		});

		it( 'should set any passed-in options', function() {
			var query = new WPRequest({
				booleanProp: true,
				strProp: 'Some string'
			});
			expect( query._options.booleanProp ).to.equal( true );
			expect( query._options.strProp ).to.equal( 'Some string' );
		});

		it( 'should define a _filters object', function() {
			var query = new WPRequest();
			expect( typeof query._filters ).to.equal( 'object' );
		});

		it( 'should define a _supportedMethods array', function() {
			var query = new WPRequest();
			expect( query._supportedMethods.sort().join( '|' ) ).to.equal(
				'delete|get|head|patch|post|put' );
		});

	});

	describe( '_checkMethodSupport', function() {

		it( 'should return true when called with a supported method', function() {
			var query = new WPRequest();
			expect( query._checkMethodSupport( 'get' ) ).to.equal( true );
		});

		it( 'should throw an error when called with an unsupported method', function() {
			var query = new WPRequest();
			query._supportedMethods = [ 'get' ];

			expect(function() {
				return query._checkMethodSupport( 'post' );
			}).to.throw();
		});

	});

	describe( 'WPRequest.prototype.filter', function() {
		var request;

		beforeEach(function() {
			request = new WPRequest();
		});

		it( 'should set the internal _filters hash', function() {
			request.filter({
				someFilterProp: 'filter-value',
				postsPerPage: 7
			});
			expect( request._filters ).to.deep.equal({
				someFilterProp: 'filter-value',
				postsPerPage: 7
			});
		});

		it( 'should support chaining filters', function() {
			request.filter({
				someFilterProp: 'filter-value'
			}).filter({
				postsPerPage: 7
			});
			expect( request._filters ).to.deep.equal({
				someFilterProp: 'filter-value',
				postsPerPage: 7
			});
		});

	});

});
