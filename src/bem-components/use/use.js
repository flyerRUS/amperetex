'use strict';

import 'slick-carousel';

const block = 'use';

const elems = {
    list: block + '__slider-list',
    item: block + '__slider-item',
    slide: block + '__slide'
};

const mods = {
    active: elems.item + '--active'
};

$(document).ready(function () {
    const $block = $('.' + block),
        $list = $block.find('.' + elems.list),
        $item = $block.find('.' + elems.item);

    const slideWidth = 300;

    if (window.innerWidth < 1251) {
        let slidesCount = window.innerWidth / slideWidth;

        $list.slick({
            slidesToShow: 4,
            slidesToScroll: 2,
            arrows: false,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 3
                    }
                },

                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2
                    }
                },

                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });


    } else {
        // $item.mouseover(
        //     function () {
        //         $(this).find('.' + elems.slide).addClass(mods.active);
        //     }
        // );
        //
        // $item.mouseleave(
        //     function () {
        //         $(this).find('.' + elems.slide).removeClass(mods.active);
        //     }
        // );
    }
});