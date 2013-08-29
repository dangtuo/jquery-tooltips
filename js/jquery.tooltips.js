$(function () {
    var time = 250;
    var hideDelay = 500;
    var hideDelayTimer = null;
    var arraw = {
        right : '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="svg-triangle"><polygon points="0,4 6,0 6,8"/></svg>',
        top : '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="svg-triangle"><polygon points="0,0 4,6 8,0"/></svg>',
         bottom: '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="svg-triangle"><polygon points="0,6 4,0 8,6 "/></svg>',
        left : '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="svg-triangle"><polygon points="0,0 0,8 6,4"/></svg>'
    }
    $(document).on('mouseover', '.tuo-popover',function(){
        if (hideDelayTimer) clearTimeout(hideDelayTimer);
    });

    $(document).on('mouseover', '.tuo-tooltip',function(){
        if (hideDelayTimer) clearTimeout(hideDelayTimer);
        var position = $(this).attr('data-position') || 'top';
        var id = $(this).attr('data-id');
        if(!id){id = ('a' + Math.random()).replace('.','');}
        $(this).attr('data-id',id);
        if($('#' + id).length > 0) return false;
        var info = $(this).find('.tuo-popover').clone(true).addClass('tuo-tooltip-showbox').attr('id',id).show();
        var top = 0,left = 0,offset_left = $(this).offset().left,offset_top = $(this).offset().top,width = $(this).width(),height = $(this).height();
        $('.tuo-tooltip-showbox').remove(); 
        info.append(arraw[position]);
        info.hide().appendTo($('body'));
        if(position == 'right'){
            tar_top = offset_top + height/2 - info.outerHeight()/2;
            tar_left = offset_left + width;
        }else if(position == 'top'){
            tar_top = offset_top - info.outerHeight();
            tar_left = offset_left + width/2 - info.outerWidth()/2;
        }else if(position == 'left'){
            tar_top = offset_top + height/2 - info.outerHeight()/2;
            tar_left = offset_left - info.outerWidth();
        }else if(position == 'bottom'){
            tar_top = offset_top + height;
            tar_left = offset_left + width/2 - info.outerWidth()/2;
        }
        info.addClass(position);
        info.css({
            top: tar_top,
            left: tar_left
        }).fadeIn(200);
        return false;
    });

    $(document).on('mouseout', '.tuo-tooltip,.tuo-popover',function(){
        if (hideDelayTimer) clearTimeout(hideDelayTimer);
        hideDelayTimer = setTimeout(function () {
            hideDelayTimer = null;
            $('.tuo-tooltip-showbox').remove();
        }, hideDelay);
        return false;
    });
});