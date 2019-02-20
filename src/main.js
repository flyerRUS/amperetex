'use strict';

// vendor
import Vue from 'vue/dist/vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'slick-carousel/slick/slick.css'
import AOS from 'aos/dist/aos.js'
import 'aos/dist/aos.css'

AOS.init({
    disable: function () {
        return window.innerWidth < 576;
    }
});

// common
import './common/styles/effects.styl'
import './common/styles/fonts.styl'
import './common/styles/global-variables.styl'
import './common/styles/style.styl'
import './common/styles/mixins.styl'

// bem components
import './bem-components/logo/logo.styl'

import './bem-components/site-header/site-header.styl'

import './bem-components/section/section.styl'

import './bem-components/languages/languages.styl'

import './bem-components/first-screen/first-screen.styl'

import './bem-components/advantages/advantages.styl'

import './bem-components/about-factory/about-factory.styl'

import './bem-components/partners/partners.styl'

import './bem-components/feedback-form/feedback-form.styl'

import './bem-components/consultation-offer/consultation-offer.styl'

import './bem-components/privileges/privileges.styl'

import './bem-components/button/button.styl'

import './bem-components/make-contract/make-contract.styl'

import './bem-components/seo-speech/seo-speech.styl'

import './bem-components/calculator/calculator.styl'

import './bem-components/last-section/last-section.styl'

import './bem-components/preview-card/preview-card.styl'

import './bem-components/site-footer/site-footer.styl'

import './bem-components/use/use'
import './bem-components/use/use.styl'

// vue components
import CostCalculator from './components/CostCalculator.vue';
import FeedbackForm from './components/FeedbackForm.vue';

new Vue({
    el: '#app',

    components: {
        CostCalculator, FeedbackForm
    }
});
