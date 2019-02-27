<template>
    <div class="cost-calculator">
        <div class="cost-calculator__title">{{formTitle}}</div>

        <form class="cost-calculator__form">
            <div class="cost-calculator__label cost-calculator__select-label">
                <span class="cost-calculator__label-value">Продукт</span>

                <vue-single-select v-bind:options="products"
                                   v-model="chosenProduct"
                                   placeholder="Выберите продукт"
                                   option-key="label"
                                   v-bind:classes="{
                                                input: 'cost-calculator__select',
                                                icons: 'icons'
                                    }">

                </vue-single-select>
            </div>

            <div class="cost-calculator__label">
                <span class="cost-calculator__label-value">Кол-во метров</span>

                <vue-slider-component
                        v-model="meters"
                        v-bind:max="1000"
                        v-bind:tooltip="false">
                </vue-slider-component>

                <div class="cost-calculator__slider-values">
                    <div class="cost-calculator__slider-value">
                        от <span>{{meters[0]}}</span>
                        <span v-html="currentProductUnit"></span>
                    </div>

                    <div class="cost-calculator__slider-value">
                        до <span>{{meters[1]}}</span>
                        <span v-html="currentProductUnit"></span>
                    </div>
                </div>
            </div>

            <div class="cost-calculator__radio-labels-wrapper">
                <div class="cost-calculator__label">
                    <span class="cost-calculator__label-value">Нужно ли монтирование</span>

                    <div class="base-radio-wrapper">
                        <div class="base-radio">
                            <label class="base-radio__label">
                                <input v-model="mountingChoice"
                                       v-bind:value="true"
                                       class="base-radio__input"
                                       type="radio" name="mounting">

                                <span class="base-radio__label-value">Да</span>
                            </label>
                        </div>

                        <div class="base-radio">
                            <label class="base-radio__label">
                                <input v-model="mountingChoice"
                                       v-bind:value="false"
                                       class="base-radio__input"
                                       type="radio" name="mounting">

                                <span class="base-radio__label-value">Нет</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div class="cost-calculator__label">
                    <span class="cost-calculator__label-value">Разовая покупка</span>

                    <div class="base-radio-wrapper">
                        <div class="base-radio">
                            <label class="base-radio__label">
                                <input v-model="onceBuyChoice"
                                       v-bind:value="true"
                                       class="base-radio__input"
                                       type="radio" name="once-buy">

                                <span class="base-radio__label-value">Да</span>
                            </label>
                        </div>

                        <div class="base-radio">
                            <label class="base-radio__label">
                                <input v-model="onceBuyChoice"
                                       v-bind:value="false"
                                       class="base-radio__input"
                                       type="radio" name="once-buy">

                                <span class="base-radio__label-value">Нет</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="cost-calculator__promo-cost-wrapper">
                <div class="cost-calculator__label">
                    <span class="cost-calculator__label-value">Промокод</span>

                    <input v-model="promocode" type="text" class="cost-calculator__input-text">

                    <span v-show="promocode" class="cost-calculator__label-notice">Ваша скидка 15%</span>
                </div>

                <div class="cost-calculator__label">
                    <span class="cost-calculator__label-value">Цена</span>

                    <div class="cost-calculator__cost">
                        <span v-if="cost.length">
                            От <span class="cost-calculator__cost-numbers">{{cost[0]}}</span> до <span class="cost-calculator__cost-numbers">{{cost[1]}}</span>
                        </span>

                        <span v-else>0</span>
                        руб.
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import VueSingleSelect from 'vue-single-select';
    import VueSliderComponent from 'vue-slider-component';
    import '../bem-components/base-radio/base-radio.styl';

    export default {
        name: 'CostCalculator',

        components: {
            VueSingleSelect,
            VueSliderComponent
        },

        props: {
            formTitle: {
                type: String
            }
        },

        data() {
            return {
                chosenProduct: '',

                products: [
                    {label: 'Сетка с электродами', value: '100', unit: 'м<sup>2</sup>'},
                    {label: 'Нагревательный кабель', value: '200', unit: 'м'},
                    {label: 'Лента ламинированная', value: '500', unit: 'м'},
                    {label: 'Незамерзающий желоб', value: '1000', unit: 'м'}
                ],

                meters: [1, 1000],

                mountingChoice: true,

                onceBuyChoice: true,

                promocode: ''
            };
        },

        computed: {
            currentProductUnit: function () {
                return this.chosenProduct ? this.chosenProduct.unit : 'м'
            },

            cost: function () {
                const chosenProductValue = this.chosenProduct ? this.chosenProduct.value : 0;

                const costs = this.meters.map(function (limit) {
                    return chosenProductValue * limit;
                });

                if (this.mountingChoice) {
                    costs.forEach(function (cost, i, costs) {
                        costs[i] += 500;
                    });
                }

                if (!this.onceBuyChoice) {
                    costs.forEach(function (cost, i, costs) {
                        costs[i] += 500;
                    });
                }

                if (promocodeIsCorrect.call(this)) {
                    costs.forEach(function (cost, i, costs) {
                        costs[i] *= 0.85;
                    });
                }

                return (chosenProductValue && costs) || [];

                /**
                 * May perform request to server in order to check checkbox` validity
                 * @returns {Boolean}
                 */
                function promocodeIsCorrect() {
                    return !!this.promocode;
                }
            }
        }
    }
</script>

<style lang="stylus">
    @require '../common/styles/global-variables.styl'

    .cost-calculator
        height: 690px
        position: relative
        padding: 80px 30px
        background-color: $firefly
        color: $white
        box-shadow: 0 19px 58px -14px $firefly
        @media(min-width: $small)
            height: 722px
            padding: 80px 50px
        @media(min-width: $medium)
            height: 648px
            padding: 80px

        &::before
            position: absolute
            content: ''
            top: 0
            left: 0
            width: 100%
            height: 7px
            background-color: $amaranth

        &__title
            margin-bottom: $default-offset * 3
            padding-right: $default-offset * 3.5
            font-size: 22px
            line-height: 32px
            font-family: $font-family-general--light
            text-transform: uppercase

        &__form
            position: relative
            width: 100%

        &__label
            margin-bottom: $default-offset * 3
            width: 100%

        &__select-label
            position: relative
            &::after
                content: ''
                position: absolute
                right: 3px
                bottom: 20px
                border: 4px solid transparent
                border-top: 5px solid $danube
                z-index 0
            .cost-calculator__select
                z-index: 1

        &__label-value
            color: $danube
            font-family: $font-family-general--medium
            font-size: 11px
            line-height: 18px

        &__select
            margin-top: $default-offset
            width: 100%
            padding: $default-offset * .5
            background-color: $firefly
            outline: none
            border: none
            border-bottom: solid 1px $danube
            font-size: 14px
            line-height: 18px
            color: $white

        .icons
            display: none

        &__slider-values
            margin-top: $default-offset * .5
            display: flex
            justify-content: space-between

        &__slider-value
            font-size: 10px
            color: $cello
            font-family: $font-family-general--medium
            span
                color: $white
                font-size: 12px
                line-height: 18px

        &__radio-labels-wrapper
            display: inline-flex
            flex-direction: column
            @media(min-width: 450px)
                display: flex
                flex-direction: row
            @media(min-width: $extra-large)
                justify-content: space-between
            .cost-calculator__label
                width auto
                display: inline-block
                //width: 50%

                &:last-child
                    @media(min-width: 450px)
                        margin-left: $default-offset * 3.5

        &__promo-cost-wrapper
            display: flex
            flex-direction: column
            @media(min-width: $extra-large)
                flex-direction: row
                justify-content: space-between
            .cost-calculator__label
                width 100%
                @media(min-width: $extra-large)
                    width: 50%
                &:last-child
                    margin: 0
                    margin-top: $default-offset * 3
                    @media(min-width: $extra-large)
                        margin: 0
                        margin-left: $default-offset * 2

            .cost-calculator__input-text
                padding-left: $default-offset
                @media(min-width: $extra-large)
                    padding-left: 0

        &__input-text
            margin-top: $default-offset
            width: 150px
            background-color: transparent
            border: none
            border-bottom: 1px solid $danube
            color: $white

        &__label-notice
            display: block;
            margin-top: 20px;
            line-height: 18px
            font-size: 9px
            font-family: $font-family-general--medium
            color: $danube
            @media(min-width: $extra-large)
                margin-top: $default-offset * .5

        &__cost
            margin-top: $default-offset
            font-size: 20px
            line-height: 32px
            font-family: $font-family-general--light
            color: $white

        &__cost-numbers
            font-size: 27px
            font-family: $font-family-general--semi-bold

        .base-radio-wrapper
            margin-top: $default-offset
            padding: $default-offset * .5
            display: flex
            justify-content: center
            border: 1px solid $danube

        .base-radio
            size(71px, 30px)
            background-color: $cello

        .base-radio__label-value
            font-size: 11px
            font-family: $font-family-general--semi-bold
            color: $danube
            text-transform: uppercase
            text-align: center

        .base-radio__input:checked + .base-radio__label-value
            color: $white

        .list-reset
            padding: $default-offset * 0.5
            background-color: $firefly
            border: solid 1px $danube
            border-top: none

        .cursor-pointer
            margin-bottom: $default-offset * 0.5
            font-size: 0.8em

        .vue-slider-dot-handle
            border: 1px solid $danube
            background-color: $firefly!important

        .vue-slider-dot
            top: -6px

        .vue-slider
            margin-top: $default-offset
            height: 1px!important

        .vue-slider-process
            background-color: $danube

        .vue-slider-component .vue-slider-piecewise
            background-color: $cello
</style>