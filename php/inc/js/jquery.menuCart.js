;(function ( $, window, document, undefined ) {

    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window is passed through as local variable rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    var pluginName = "menuCart",
    // the name of using in .data()
        dataPlugin = "plugin_" + pluginName,
    // default options
        defaults = {
            dominio: "//desarrollo.acens.priv"
        },
        elemento,
        template='<ul id="menuCart">' +
                    '<li class="menuCart_items"></li>' +
					'<li><a href="#" class="menuCart_icon"></a></li>' +
                 '</ul>';


    // The actual plugin constructor
    var Plugin = function ( element ) {
        /*
         * Plugin instantiation
         */
        this.options = $.extend( {}, defaults );
    };

    Plugin.prototype = {
        init: function ( options ) {
            var el=this.element,me=this;
            // extend options ( http://api.jquery.com/jQuery.extend/ )
            $.extend( this.options, options );
            elemento=$("#menuCart",el);

                $.ajax({
                    url : me.options.dominio +  '/ws/cart/getCesta',
                    dataType: 'jsonp',
                    cache: 'false',
                    crossDomain: true

                }).done(function (data) {
                    el.append(template);
                    var it =$('li.menuCart_items',el);
                    it.text(data.num_items);
                    it.click(function(){
                        window.location = me.options.dominio + "/cart/#/cart";
                    });
                    $('ul li a',el).attr("href",me.options.dominio + "/cart/#/cart");
                    elemento=$("#menuCart",el);
                });
       
        },
        destroy: function () {
            // unset Plugin data instance
            this.element.data( dataPlugin, null );
            elemento.remove();

        }


    }

    /*
     * Plugin wrapper, preventing against multiple instantiations and
     * allowing any public function to be called via the jQuery plugin,
     * e.g. $(element).pluginName('functionName', arg1, arg2, ...)
     */
    $.fn[ pluginName ] = function ( arg ) {

        var args, instance;

        // only allow the plugin to be instantiated once
        if (!( this.data( dataPlugin ) instanceof Plugin )) {

            // if no instance, create one
            this.data( dataPlugin, new Plugin( this ) );
        }

        instance = this.data( dataPlugin );

        instance.element = this;

        // Is the first parameter an object (arg), or was omitted,
        // call Plugin.init( arg )
        if (typeof arg === 'undefined' || typeof arg === 'object') {

            if ( typeof instance['init'] === 'function' ) {
                instance.init( arg );
            }

            // checks that the requested public method exists
        } else if ( typeof arg === 'string' && typeof instance[arg] === 'function' ) {

            // copy arguments & remove function name
            args = Array.prototype.slice.call( arguments, 1 );

            // call the method
            return instance[arg].apply( instance, args );

        } else {

            $.error('Method ' + arg + ' does not exist on jQuery.' + pluginName);

        }
    };

}(jQuery, window, document));