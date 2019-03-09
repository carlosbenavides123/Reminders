<template>
    <FlexboxLayout class="page">

            <StackLayout class="form">

                <StackLayout class="input-field">
                    <TextField v-model="email" class="input" hint="Email" keyboardType="email" autocorrect="false"></TextField>
                    <StackLayout class="hr-light m-2"></StackLayout>
                </StackLayout>

                <StackLayout class="input-field">
                    <TextField v-model="password" class="input" hint="password" keyboardType="password" autocorrect="false" secure="true"></TextField>
                    <StackLayout class="hr-light m-2"></StackLayout>
                </StackLayout>

                <StackLayout v-if="!isLoggingIn" class="input-field">
                    <TextField class="input" hint="confirm password" keyboardType="password" autocorrect="false" secure="true"></TextField>
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
            </StackLayout>
    </FlexboxLayout>
</template>

<script>
export default {
    data(){
        return{
            email: '',
            password: '',
            isLoggingIn: true
        }
    },
    methods:{
        submit(){
            console.log("yes")
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
