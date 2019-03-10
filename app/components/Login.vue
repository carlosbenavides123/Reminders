<template>
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
                @tap=submit()
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
            </StackLayout>
    </FlexboxLayout>
</template>

<script>
const httpModule = require("http");
const dialogs = require("tns-core-modules/ui/dialogs");

// import axios from 'axios';
export default {
    data(){
        return{
            formdata:{
                email: '',
                password: '',
                confirm: '',
            },
            isLoggingIn: true,
            loading: false,
        }
    },
    methods:{
        submit(){
            this.loading = true;
            console.log("yes");
            httpModule.request({
                url: "http://10.0.2.2:8000/api/user/create/",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                content: JSON.stringify({
                    name: this.formdata.email,
                    email: this.formdata.email,
                    password: this.formdata.password
                })
            }).then((response) => {
                const result = response.content.toJSON();
                console.log(response)
            }, (e) => {
                console.log(e)
            });
            // this.axios.post('http://127.0.0.1:8000/api/reminder/reminders/',this.user)
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
