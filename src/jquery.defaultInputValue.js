/*
 * DefaultInputValue
 *
 * Copyright 2011 Justin McGuire. Licensed under the MIT License.
 * Contact: mcguire.justin@gmail.com
 *
 * Version 0.5
 *
 * Fill in a text input with a default value, that disappears when you click on
 * it to fill in a real value.
 *
 */

(function($) {

$.fn.defaultInputValue = function(options) {

    var main_opts = $.extend({}, $.fn.defaultInputValue.defaults, options);

    return this.each(function(){
    
        var opts = $.meta ? $.extend({}, main_opts, $(this).data()) : main_opts;
        
        // when the user clicks on this element, delete the text if it is the
        // default
        $(this).click(function(){
            if ($(this).hasClass(opts.no_value_class)) {
                $(this).val('')
                $(this).removeClass(opts.no_value_class);
            }
        });

        // when user changes focus, fill in the default text if the field is
        // blank
        $(this).blur(function(){
            if ($(this).val() == '') {
                $(this).val( opts.default_text );
                $(this).addClass(opts.no_value_class);
            }
        });
        
        // activate the "deselect" now, to fill in the default if appropriate
        $(this).blur();

        // upon form submission, we don't want to submit any default values
        var input = $(this);
        $(this).closest('form').get().submit(function(){
            if (input.hasClass(opts.no_value_class))
                input.val('');
        });
        
    });

};

// config defaults
$.fn.defaultInputValue.defaults = {
    default_text: '', // the user must supply this, it's the default value of the text field
    no_value_class: 'no_value', // this is the class that will be applied to the input element when
                                // it is filled with the default text
};

})(jQuery);

