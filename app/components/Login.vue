<template>
    <Page enableSwipeBackNavigation="false" actionBarHidden="true">

        <FlexboxLayout class="page">

                <StackLayout class="form">

                    <StackLayout class="input-field">
                        <TextField v-model="formdata.email" class="input" hint="Email" keyboardType="email" autocorrect="false"></TextField>
                        <StackLayout class="hr-light m-2"></StackLayout>
                    </StackLayout>

                    <StackLayout class="input-field">
                        <TextField v-model="formdata.password" class="input" hint="password" keyboardType="password" autocorrect="false" secure="true"></TextField>
                        <StackLayout class="hr-light m-2"></StackLayout>
                    </StackLayout>

                    <StackLayout v-if="!isLoggingIn" class="input-field">
                        <TextField v-model="formdata.confirm" class="input" hint="confirm password" keyboardType="password" autocorrect="false" secure="true"></TextField>
                        <StackLayout class="hr-light m-2"></StackLayout>
                    </StackLayout>

                    <Button 
                    v-if="isLoggingIn"
                    text='LogIn'
                    class="btn-login"
                    @tap=login()
                    >
                    </Button>

                    <Button 
                    v-else
                    text='Register'
                    class="btn-login"
                    @tap=submit()
                    >
                    </Button>
                    <Label class="login-label sign-up-label" @tap="toggleForm()">
                        <FormattedString>
                            <Span v-if="isLoggingIn" text="Don't have an account?"></Span>
                            <Span v-else text="Back to Login."></Span>
                        </FormattedString>
                    </Label>
                    <ActivityIndicator v-if="loading" color="purple" busy="true"></ActivityIndicator>

                    <Label class="login-label sign-up-label" @tap="toggleForm()">
                        <FormattedString>
                            <Span v-if="fail && submitted" text="Please enter a valid email"></Span>
                            <Span v-if="!fail && submitted" text="Success."></Span>
                        </FormattedString>
                    </Label>

                </StackLayout>
        </FlexboxLayout>
    </Page>
</template>

<script>
const httpModule = require("http");
const dialogs = require("tns-core-modules/ui/dialogs");
import master from "../Master"


import axios from "axios";

// import axios from 'axios';
export default {
    components: {
        master
    },
    data(){
        return{
            formdata:{
                email: '',
                password: '',
                confirm: '',
                fail: false,
            },
            isLoggingIn: true,
            loading: false,
            fail: false,
            submitted: false
        }
    },
    methods:{
        submit(){
            this.loading = true;
            console.log("yes");
            axios.post('http://10.0.2.2:8000/api/user/create/', {
                email: this.formdata.email,
                name: this.formdata.email,
                password: this.formdata.password
            }).then(function (response) {
                console.log("success");
                console.log(response);
            })
            .catch(function (error) {
                this.fail = true;
            });
            this.submitted = true;
            this.loading = false;
        },
        login(){
            this.loading = true;
            this.$store.dispatch('user/login', this.formdata);
            this.loading = false;
            if (this.$store.getters['user/getToken']){
                console.log("made it here");
                console.log(master);
                console.log(this.$navigateTo(master));
                this.$navigateTo(master);
            }
        },
        toggleForm(){
            this.isLoggingIn = !this.isLoggingIn;
            console.log(this.isLoggingIn);
        }
    }
}
</script>

<style lang="scss">
.class 
.page {
  align-items: center;
  flex-direction: column;
}
.form {
  margin-left: 30;
  margin-right: 30;
  flex-grow: 2;
  vertical-align: middle;
}
.btn-login{
    background-color: #e60023;
    color: white;
}

.login-label {
  horizontal-align: center;
   bottom: 0;
   right: 0;

}
</style>
