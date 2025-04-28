    (function($) {
    "use strict";

        $(window).load(function() {
            $("#preloader").on(500).fadeOut();
            $(".preloader").on(600).fadeOut("slow");
        });

        $(function() {
            $.material.init();
            $('.collapse').collapse({
                toggle: false
            });
            $('[data-toggle="tooltip"]').tooltip();
            $(".nav-tabs a").click(function(){
                $(this).tab('show');
            });
        });

        $(document).on('click', 'span.clickable', function(e) {
            var $this = $(this);
            if (!$this.hasClass('panel-collapsed')) {
                $this.parents('.panel').find('.panel-body').slideUp();
                $this.addClass('panel-collapsed');
                $this.find('i').removeClass('fa-angle-up').addClass('fa-angle-down');
            } else {
                $this.parents('.panel').find('.panel-body').slideDown();
                $this.removeClass('panel-collapsed');
                $this.find('i').removeClass('fa-angle-down').addClass('fa-angle-up');
            }
        })


    })(jQuery);
