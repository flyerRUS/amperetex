<template>
    <form @submit.prevent="submitForm"
          class="feedback-form"
          :class="{
          'feedback-form--vertical': vertical,
          'feedback-form--horizontal': horizontal
          }">
        <div class="feedback-form__sent" v-if="showSentCaption">отправлено!</div>
        <div class="feedback-form__inputs">
            <label class="feedback-form__label make-contract__label">
                <input v-model="userName" type="text" name="userName" required placeholder="Ваше имя"
                       class="feedback-form__input" autocomplete="off">
            </label>

            <label class="feedback-form__label">
                <masked-input v-model="phone" type="tel" mask="\+\7 (111) 1111-11" placeholder="Телефон"
                              class="feedback-form__input" autocomplete="on"/>

                <!--<input v-model="phone" type="tel" name="userTel" required placeholder="Телефон"-->
                       <!--class="feedback-form__input" autocomplete="off">-->
            </label>
        </div>

        <slot></slot>
    </form>
</template>

<script>
    import axios from 'axios';
    import MaskedInput from 'vue-masked-input';

    export default {
        name: 'FeedbackForm',

        components: {
            MaskedInput
        },

        props: {
            url: {
                type: String,
                required: true
            },

            horizontal: {
                type: Boolean
            },

            vertical: {
                type: Boolean
            }
        },

        data() {
            return {
                userName: '',

                phone: '',

                showSentCaption: false
            };
        },

        methods: {
            submitForm: function () {
                axios.post(this.url,
                    {
                        userName: this.userName,

                        phone: this.phone
                    })
                    .then(() => {
                        this.showSentCaption = true;

                        this.userName = '';
                        this.phone = '';

                        setTimeout(() => {
                            this.showSentCaption = false;
                        }, 3000);
                    })
                    .catch(err => {
                        console.error(err);
                    })
            }
        }
    }
</script>

<style lang="stylus">
    @require '../common/styles/global-variables.styl'

    .feedback-form
        position: relative
        padding: $default-offset * 5 0 $default-offset * 3
        display: flex
        flex-direction: column
        justify-content: center
        @media (min-width: $medium)
            flex-direction: row

        &--vertical
            flex-direction: column
            align-items: center
            @media (min-width: $extra-large)
                align-items: flex-start

            .feedback-form__inputs
                width: 100%
                display: flex
                flex-direction: column
                align-items: center
                @media (min-width: $extra-large)
                    width: auto
                    flex-direction: row
                    display: block

                input
                    width: 100%
                    margin-bottom: $default-offset * .5
                    background-color: $white
                    border: 1px solid $heather
                    color: $firefly
                    @media (min-width: $small)
                        margin-right: $default-offset * 2
                        width: 540px
                    @media (min-width: $extra-large)
                        width: 215px
                        margin-right: $default-offset * .5


            .feedback-form__label
                width: 100%
                @media (min-width: $small)
                    width: auto

            .feedback-form__button
                margin-top: $default-offset
                width: 100%
                font-size: 13px
                font-family: $font-family-general--semi-bold
                @media (min-width: $small)
                    width: 440px

        &--horizontal
            .feedback-form__button
                width: 100%
                @media (min-width: $small)
                    width: 330px
                    align-self center
                @media (min-width: $medium)
                    width: 215px

        &__sent
            position: absolute
            size(100%)
            top: 0
            left: 0
            display: flex
            justify-content: center
            align-items: center
            background-color: $firefly
            text-transform: uppercase
            color: $white
            font-size: 1em
            font-weight: 900
            @media (max-width: $medium)
                font-size: 1em

        &__label
            margin-bottom: $default-offset * 2
            @media (min-width: $medium)
                margin-bottom: 0

        &__input
            margin-right: $default-offset
            padding: $default-offset * 2
            size(100%, 50px)
            border: 1px solid $rhino
            background-color: $firefly
            font-size: 14px
            font-family: $font-family-general--light
            color: $white
            @media (min-width: $medium)
                size(215px, 50px)
</style>