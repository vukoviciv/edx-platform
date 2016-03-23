(function(edx, interpolate_text, interpolate_ntext) {  // jshint ignore:line
    'use strict';
    /**
     * Runs func as a test case multiple times, using entries from data as arguments. Like Python's DDT.
     * @param data An object mapping test names to arrays of function parameters. The name is passed to it() as the name
     *      of the test case, and the list of arguments is applied as arguments to func.
     * @param func The function that actually expresses the logic of the test.
     */
    var withData = function(data, func) {
        var name;
        /* jshint loopfunc:true */
        for (name in data) {
            if (data.hasOwnProperty(name)) {
                (function(name) {
                    it(name, function() {
                        func.apply(this, data[name]);
                    });
                })(name);
            }
        }
    };


    describe('interpolate_ntext', function() {
        it('replaces placeholder values', function() {
            expect(interpolate_ntext('contains {count} student',  'contains {count} students', 1, {count: 1})).
            toBe('contains 1 student');
            expect(interpolate_ntext('contains {count} student',  'contains {count} students', 5, {count: 2})).
            toBe('contains 2 students');
        });
    });

    describe('interpolate_text', function() {
        it('replaces placeholder values', function() {
            expect(interpolate_text('contains {adjective} students', {adjective: 'awesome'})).
            toBe('contains awesome students');
        });
    });

    /**
     * Temporary clone of the UI Toolkit's StringUtils tests.
     *
     * The intention is that these will be removed once the UI Toolkit's
     * versions are made available to code that cannot use RequireJS.
     */
    describe('edx.StringUtils', function() {
        describe('interpolate', function() {
            it('can interpolate a string with no parameters provided', function() {
                expect(edx.StringUtils.interpolate('Hello, world')).toEqual(
                    'Hello, world'
                );
            });

            withData({
                'can interpolate a string with empty parameters': [
                    'Hello, world', {},
                    'Hello, world'
                ],
                'can interpolate a string with one parameter': [
                    'Hello, {name}', {name: 'Andy'},
                    'Hello, Andy'
                ],
                'does not interpolate additional curly braces': [
                    'Hello, {name}. Here is a { followed by a }', {name: 'Andy'},
                    'Hello, Andy. Here is a { followed by a }'
                ]
            }, function(template, options, expectedString) {
                var result = edx.StringUtils.interpolate(template, options);
                expect(result).toEqual(expectedString);
            });
        });
    });

    /**
     * Temporary clone of the UI Toolkit's HtmlUtils tests.
     *
     * The intention is that these will be removed once the UI Toolkit's
     * versions are made available to code that cannot use RequireJS.
     */
    describe('edx.HtmlUtils', function() {
        beforeEach(function() {
            setFixtures('<div class="test"></div>');
        });

        describe('HtmlSnippet', function() {
            it('can convert to a string', function() {
                expect(new edx.HtmlUtils.HtmlSnippet('Hello, world').toString()).toBe('Hello, world');
            });
        });

        describe('HTML', function() {
            it('returns an HTML snippet', function() {
                expect(edx.HtmlUtils.HTML('Hello, world') instanceof edx.HtmlUtils.HtmlSnippet).toBeTruthy();
            });
        });

        describe('ensureHtml', function() {
            withData({
                'HTML escapes text strings': [
                    'Rock & Roll',
                    'Rock &amp; Roll'
                ],
                'HTML escapes full HTML strings': [
                    '<a href="world">Rock &amp; Roll</a>',
                    '&lt;a href=&quot;world&quot;&gt;Rock &amp;amp; Roll&lt;/a&gt;'
                ],
                'does not escape HTML snippets': [
                    edx.HtmlUtils.HTML('<a href="world">Rock &amp; Roll</a>'),
                    '<a href="world">Rock &amp; Roll</a>'
                ]
            }, function(input, expectedString) {
                var result = edx.HtmlUtils.ensureHtml(input);
                expect(result instanceof edx.HtmlUtils.HtmlSnippet).toBeTruthy();
                expect(result.toString()).toEqual(expectedString);
            });
        });

        describe('interpolateHtml', function() {
            it('can interpolate a string with no parameters provided', function() {
                expect(edx.HtmlUtils.interpolateHtml('Hello, world').toString()).toEqual(
                    'Hello, world'
                );
            });

            withData({
                'can interpolate a string with empty parameters': [
                    'Hello, world', {},
                    'Hello, world'
                ],
                'can interpolate a string with one parameter': [
                    'Hello, {name}', {name: 'Andy'},
                    'Hello, Andy'
                ],
                'does not interpolate additional curly braces': [
                    'Hello, {name}. Here is a { followed by a }', {name: 'Andy'},
                    'Hello, Andy. Here is a { followed by a }'
                ],
                'escapes characters in the template': [
                    'Rock & Roll', {},
                    'Rock &amp; Roll'
                ],
                'does not escape HTML parameters': [
                    'Hello, {anchor}', {anchor: edx.HtmlUtils.HTML('<a href="world">world</a>')},
                    'Hello, <a href="world">world</a>'
                ],
                'escapes characters in parameters': [
                    'I love {name}', {name: 'Rock & Roll'},
                    'I love Rock &amp; Roll'
                ],
                'does not double escape when chaining interpolate calls': [
                    'I love {name}', {name: edx.HtmlUtils.interpolateHtml('Rock & Roll')},
                    'I love Rock &amp; Roll'
                ],
                'full example': [
                    'You are enrolling in {spanStart}{courseName}{spanEnd}',
                    {
                        courseName: 'Rock & Roll',
                        spanStart: edx.HtmlUtils.HTML('<span class="course-title">'),
                        spanEnd: edx.HtmlUtils.HTML('</span>')
                    },
                    'You are enrolling in <span class="course-title">Rock &amp; Roll</span>'
                ]
            }, function(template, options, expectedString) {
                var result = edx.HtmlUtils.interpolateHtml(template, options);
                expect(result instanceof edx.HtmlUtils.HtmlSnippet).toBeTruthy();
                expect(result.toString()).toEqual(expectedString);
            });
        });

        describe('joinHtml', function() {
            withData({
                'can join a single string': [
                    ['Hello, world'],
                    'Hello, world'
                ],
                'escapes characters provided as strings': [
                    ['Rock & Roll'],
                    'Rock &amp; Roll'
                ],
                'does not escape HTML snippets': [
                    [edx.HtmlUtils.HTML('<a href="world">world</a>')],
                    '<a href="world">world</a>'
                ],
                'can join a mixture of strings and HTML snippets': [
                    ['Rock & Roll', ' all over the ', edx.HtmlUtils.HTML('<a href="world">world</a>')],
                    'Rock &amp; Roll all over the <a href="world">world</a>'
                ]
            }, function(items, expectedString) {
                var result = edx.HtmlUtils.joinHtml.apply(this, items);
                expect(result instanceof edx.HtmlUtils.HtmlSnippet).toBeTruthy();
                expect(result.toString()).toEqual(expectedString);
            });
        });

        describe('template', function() {
            it('can render a template with no parameters', function() {
                var template = edx.HtmlUtils.template('Hello, world'),
                    result = template();
                expect(result instanceof edx.HtmlUtils.HtmlSnippet).toBeTruthy();
                expect(result.toString()).toEqual('Hello, world');
            });

            it('can render a template with parameters', function() {
                var template = edx.HtmlUtils.template('Hello, <%- name %>'),
                    result = template({name: 'world'});
                expect(result instanceof edx.HtmlUtils.HtmlSnippet).toBeTruthy();
                expect(result.toString()).toEqual('Hello, world');
            });

            it('adds HtmlUtils as an additional context variable for the template', function() {
                var template = edx.HtmlUtils.template('I love <%= HtmlUtils.ensureHtml("Rock & Roll") %>');
                expect(template().toString()).toEqual('I love Rock &amp; Roll');
            });

            it('adds StringUtils as an additional context variable for the template', function() {
                var template = edx.HtmlUtils.template(
                    '<%= StringUtils.interpolate("Hello, {name}", {name: "world"}) %>'
                );
                expect(template().toString()).toEqual('Hello, world');
            });
        });

        describe('setHtml', function() {
            withData({
                'HTML escapes text strings': [
                    'Rock & Roll',
                    'Rock &amp; Roll'
                ],
                'HTML escapes full HTML strings': [
                    '<a href="world">Rock &amp; Roll</a>',
                    '&lt;a href="world"&gt;Rock &amp;amp; Roll&lt;/a&gt;'
                ],
                'does not escape HTML snippets': [
                    edx.HtmlUtils.HTML('<a href="world">Rock &amp; Roll</a>'),
                    '<a href="world">Rock &amp; Roll</a>'
                ]
            }, function(input, expectedString) {
                var $element = $('.test');
                edx.HtmlUtils.setHtml($element, input);
                expect($element.html()).toEqual(expectedString);
            });
        });

        describe('append', function() {
            withData({
                'HTML escapes text strings': [
                    'Rock & Roll',
                    'Rock &amp; Roll'
                ],
                'HTML escapes full HTML strings': [
                    '<a href="world">Rock &amp; Roll</a>',
                    '&lt;a href="world"&gt;Rock &amp;amp; Roll&lt;/a&gt;'
                ],
                'does not escape HTML snippets': [
                    edx.HtmlUtils.HTML('<a href="world">Rock &amp; Roll</a>'),
                    '<a href="world">Rock &amp; Roll</a>'
                ]
            }, function(input, expectedString) {
                var $element = $('.test');

                // Appends correctly with no children
                edx.HtmlUtils.append($element, input);
                expect($element.html()).toEqual(expectedString);

                // Appends correctly with a pre-existing child
                $element.html('<p>Hello, world</p>');
                edx.HtmlUtils.append($element, input);
                expect($element.html()).toEqual('<p>Hello, world</p>' + expectedString);
            });
        });

        describe('prepend', function() {
            withData({
                'HTML escapes text strings': [
                    'Rock & Roll',
                    'Rock &amp; Roll'
                ],
                'HTML escapes full HTML strings': [
                    '<a href="world">Rock &amp; Roll</a>',
                    '&lt;a href="world"&gt;Rock &amp;amp; Roll&lt;/a&gt;'
                ],
                'does not escape HTML snippets': [
                    edx.HtmlUtils.HTML('<a href="world">Rock &amp; Roll</a>'),
                    '<a href="world">Rock &amp; Roll</a>'
                ]
            }, function(input, expectedString) {
                var $element = $('.test');

                // Prepends correctly with no children
                edx.HtmlUtils.prepend($element, input);
                expect($element.html()).toEqual(expectedString);

                // Prepends correctly with a pre-existing child
                $element.html('<p>Hello, world</p>');
                edx.HtmlUtils.prepend($element, input);
                expect($element.html()).toEqual(expectedString + '<p>Hello, world</p>');
            });
        });
    });
})(edx, interpolate_text, interpolate_ntext);  // jshint ignore:line
